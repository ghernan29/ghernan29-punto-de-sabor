"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

import { formatCurrency } from "@/lib/currency";
import { useCart } from "@/lib/cart-context";
import { hasSupabaseConfig, publicConfig } from "@/lib/config";
import { getSupabaseClient } from "@/lib/supabase";
import { createOrderWhatsappMessage, createWhatsappOrderLink } from "@/lib/whatsapp";

type OrderType = "delivery" | "pickup";

type CheckoutState = {
  name: string;
  phone: string;
  address: string;
  notes: string;
  orderType: OrderType;
};

const initialState: CheckoutState = {
  name: "",
  phone: "",
  address: "",
  notes: "",
  orderType: "delivery"
};

export const CartCheckout = () => {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const [formState, setFormState] = useState<CheckoutState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const deliveryFee = formState.orderType === "delivery" ? publicConfig.deliveryFee : 0;
  const total = subtotal + deliveryFee;
  const belowMinimum = subtotal > 0 && subtotal < publicConfig.minimumOrder;

  const isFormInvalid = useMemo(() => {
    if (!formState.name.trim() || !formState.phone.trim()) return true;
    if (formState.orderType === "delivery" && !formState.address.trim()) return true;
    return false;
  }, [formState]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);
    setIsError(false);

    if (!items.length) {
      setFeedback("Tu carrito esta vacio.");
      setIsError(true);
      return;
    }

    if (belowMinimum) {
      setFeedback(
        `El minimo de compra es ${formatCurrency(publicConfig.minimumOrder)} antes del domicilio.`
      );
      setIsError(true);
      return;
    }

    if (!hasSupabaseConfig) {
      setFeedback("Falta configurar Supabase en variables de entorno.");
      setIsError(true);
      return;
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      setFeedback("No fue posible inicializar Supabase.");
      setIsError(true);
      return;
    }

    setIsSubmitting(true);
    const message = createOrderWhatsappMessage({
      items,
      subtotal,
      deliveryFee,
      total,
      customer: {
        name: formState.name.trim(),
        phone: formState.phone.trim(),
        orderType: formState.orderType,
        address: formState.address.trim(),
        notes: formState.notes.trim()
      }
    });

    const { error } = await supabase.from("orders").insert({
      customer_name: formState.name.trim(),
      customer_phone: formState.phone.trim(),
      delivery_address: formState.orderType === "delivery" ? formState.address.trim() : null,
      notes: formState.notes.trim() || null,
      order_type: formState.orderType,
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity
      })),
      subtotal,
      delivery_fee: deliveryFee,
      total
    });

    if (error) {
      setFeedback("No pudimos registrar tu pedido. Intenta de nuevo.");
      setIsError(true);
      setIsSubmitting(false);
      return;
    }

    const whatsappLink = createWhatsappOrderLink(message);
    window.open(whatsappLink, "_blank", "noopener,noreferrer");

    setFeedback("Pedido guardado. Te abrimos WhatsApp para confirmar.");
    setIsError(false);
    setFormState(initialState);
    clearCart();
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-5">
      <section className="card space-y-3">
        <h2 className="section-title">Tu carrito</h2>
        {!items.length ? (
          <p className="text-sm text-slate-600">Aun no agregas productos. Ve al menu para empezar.</p>
        ) : (
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 rounded-xl border border-orange-100 bg-orange-50 p-2"
              >
                <div className="relative h-14 w-14 overflow-hidden rounded-lg bg-orange-100">
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  ) : null}
                </div>

                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-slate-600">{formatCurrency(item.price * item.quantity)}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="rounded-full border border-orange-200 p-1 text-orange-700"
                    aria-label={`Reducir ${item.name}`}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-5 text-center text-sm font-semibold">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="rounded-full border border-orange-200 p-1 text-orange-700"
                    aria-label={`Aumentar ${item.name}`}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="rounded-full border border-red-200 p-1 text-red-700"
                    aria-label={`Eliminar ${item.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card space-y-4">
        <h2 className="section-title">Finalizar pedido</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              value={formState.name}
              onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
              className="rounded-xl border border-orange-200 px-3 py-2 outline-none ring-orange-300 focus:ring"
              placeholder="Tu nombre"
              required
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Telefono
            </label>
            <input
              id="phone"
              type="tel"
              value={formState.phone}
              onChange={(event) => setFormState((prev) => ({ ...prev, phone: event.target.value }))}
              className="rounded-xl border border-orange-200 px-3 py-2 outline-none ring-orange-300 focus:ring"
              placeholder="3001234567"
              required
            />
          </div>

          <div className="grid gap-2">
            <span className="text-sm font-medium">Tipo de pedido</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormState((prev) => ({ ...prev, orderType: "delivery" }))}
                className={`rounded-xl px-3 py-2 text-sm font-semibold ${
                  formState.orderType === "delivery"
                    ? "bg-orange-600 text-white"
                    : "bg-orange-100 text-orange-800"
                }`}
              >
                Domicilio
              </button>
              <button
                type="button"
                onClick={() => setFormState((prev) => ({ ...prev, orderType: "pickup" }))}
                className={`rounded-xl px-3 py-2 text-sm font-semibold ${
                  formState.orderType === "pickup"
                    ? "bg-orange-600 text-white"
                    : "bg-orange-100 text-orange-800"
                }`}
              >
                Recoger
              </button>
            </div>
          </div>

          {formState.orderType === "delivery" ? (
            <div className="grid gap-2">
              <label htmlFor="address" className="text-sm font-medium">
                Direccion de entrega
              </label>
              <input
                id="address"
                type="text"
                value={formState.address}
                onChange={(event) => setFormState((prev) => ({ ...prev, address: event.target.value }))}
                className="rounded-xl border border-orange-200 px-3 py-2 outline-none ring-orange-300 focus:ring"
                placeholder="Calle 10 # 5-22, barrio..."
                required
              />
            </div>
          ) : null}

          <div className="grid gap-2">
            <label htmlFor="notes" className="text-sm font-medium">
              Notas (opcional)
            </label>
            <textarea
              id="notes"
              value={formState.notes}
              onChange={(event) => setFormState((prev) => ({ ...prev, notes: event.target.value }))}
              className="min-h-20 rounded-xl border border-orange-200 px-3 py-2 outline-none ring-orange-300 focus:ring"
              placeholder="Sin cebolla, tocar timbre..."
            />
          </div>

          <div className="space-y-1 rounded-xl bg-orange-50 p-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Domicilio</span>
              <span>{formatCurrency(deliveryFee)}</span>
            </div>
            <div className="flex items-center justify-between text-base font-semibold">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <p className="pt-1 text-xs text-slate-600">
              Minimo de compra: {formatCurrency(publicConfig.minimumOrder)} (sin incluir domicilio).
            </p>
          </div>

          {feedback ? (
            <p className={`text-sm ${isError ? "text-red-700" : "text-emerald-700"}`}>{feedback}</p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting || !items.length || isFormInvalid}
            className="w-full rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition enabled:hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isSubmitting ? "Enviando..." : "Pedir por WhatsApp"}
          </button>
        </form>
      </section>
    </div>
  );
};
