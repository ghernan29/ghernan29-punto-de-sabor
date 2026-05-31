"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart, useCartTotals } from "@/context/CartContext";
import { CartSummary } from "@/components/cart/CartSummary";
import { createOrder } from "@/lib/orders";
import { buildWhatsAppMessage, openWhatsApp } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/format";
import type { OrderFulfillment } from "@/lib/types";

export function CheckoutForm() {
  const router = useRouter();
  const { lines, clearCart, meetsMinimum, minimumOrder } = useCart();
  const [fulfillment, setFulfillment] = useState<OrderFulfillment>("delivery");
  const { subtotal, deliveryFee, total } = useCartTotals(fulfillment);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!meetsMinimum) {
      setError(
        `El pedido mínimo es ${formatPrice(minimumOrder)}. Agrega más productos.`
      );
      return;
    }

    if (fulfillment === "delivery" && !address.trim()) {
      setError("Ingresa tu dirección de entrega.");
      return;
    }

    setSubmitting(true);

    try {
      const items_json = lines.map((l) => ({
        menu_item_id: l.menuItemId,
        name: l.name,
        price: l.price,
        quantity: l.quantity,
      }));

      await createOrder({
        customer_name: name.trim(),
        customer_phone: phone.trim(),
        delivery_address:
          fulfillment === "delivery" ? address.trim() : null,
        notes: notes.trim() || null,
        fulfillment,
        items_json,
        subtotal,
        delivery_fee: deliveryFee,
        total,
      });

      const message = buildWhatsAppMessage(lines, {
        customerName: name.trim(),
        customerPhone: phone.trim(),
        deliveryAddress:
          fulfillment === "delivery" ? address.trim() : undefined,
        notes: notes.trim() || undefined,
        fulfillment,
        subtotal,
        deliveryFee,
        total,
      });

      openWhatsApp(message);
      clearCart();
      router.push("/carrito?success=1");
    } catch (err) {
      console.error(err);
      setError(
        "No pudimos guardar tu pedido. Revisa la conexión e intenta de nuevo."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-4 pb-8">
      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-sage-800">
          ¿Cómo lo recibes?
        </legend>
        <div className="grid grid-cols-2 gap-2">
          <label
            className={`cursor-pointer rounded-xl border-2 px-3 py-3 text-center text-sm font-medium transition ${
              fulfillment === "delivery"
                ? "border-brand-600 bg-brand-50 text-brand-800"
                : "border-sage-200 bg-white text-sage-600"
            }`}
          >
            <input
              type="radio"
              name="fulfillment"
              value="delivery"
              checked={fulfillment === "delivery"}
              onChange={() => setFulfillment("delivery")}
              className="sr-only"
            />
            🛵 Entrega
          </label>
          <label
            className={`cursor-pointer rounded-xl border-2 px-3 py-3 text-center text-sm font-medium transition ${
              fulfillment === "pickup"
                ? "border-brand-600 bg-brand-50 text-brand-800"
                : "border-sage-200 bg-white text-sage-600"
            }`}
          >
            <input
              type="radio"
              name="fulfillment"
              value="pickup"
              checked={fulfillment === "pickup"}
              onChange={() => setFulfillment("pickup")}
              className="sr-only"
            />
            🏪 Recoger
          </label>
        </div>
      </fieldset>

      <div className="space-y-3">
        <label className="block">
          <span className="text-sm font-medium text-sage-800">Nombre</span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-sage-200 bg-white px-3 py-2.5 text-sage-800 outline-none ring-brand-500 focus:ring-2"
            placeholder="Tu nombre"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-sage-800">Teléfono</span>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full rounded-xl border border-sage-200 bg-white px-3 py-2.5 text-sage-800 outline-none ring-brand-500 focus:ring-2"
            placeholder="+52 …"
          />
        </label>
        {fulfillment === "delivery" && (
          <label className="block">
            <span className="text-sm font-medium text-sage-800">
              Dirección de entrega
            </span>
            <textarea
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={2}
              className="mt-1 w-full rounded-xl border border-sage-200 bg-white px-3 py-2.5 text-sage-800 outline-none ring-brand-500 focus:ring-2"
              placeholder="Calle, número, colonia, referencias"
            />
          </label>
        )}
        <label className="block">
          <span className="text-sm font-medium text-sage-800">
            Notas (opcional)
          </span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-xl border border-sage-200 bg-white px-3 py-2.5 text-sage-800 outline-none ring-brand-500 focus:ring-2"
            placeholder="Sin cebolla, timbre rojo…"
          />
        </label>
      </div>

      <CartSummary
        subtotal={subtotal}
        deliveryFee={deliveryFee}
        total={total}
        showDeliveryFee={fulfillment === "delivery"}
      />

      {error && (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting || !meetsMinimum}
        className="w-full rounded-xl bg-brand-600 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "Enviando…" : "Confirmar y enviar por WhatsApp"}
      </button>
    </form>
  );
}
