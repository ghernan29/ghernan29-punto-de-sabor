"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { config, formatCurrency } from "@/lib/config";
import { createOrder } from "@/lib/data";
import type { DeliveryMethod } from "@/lib/types";
import { buildWhatsAppLink, buildWhatsAppMessage } from "@/lib/whatsapp";
import CartLineRow from "./CartLineRow";
import { CartIcon, WhatsAppIcon } from "./icons";

export default function CartView({
  whatsappNumber,
}: {
  whatsappNumber?: string | null;
}) {
  const lines = useCart((s) => s.lines);
  const subtotal = useCart((s) => s.subtotal());
  const clear = useCart((s) => s.clear);

  const [mounted, setMounted] = useState(false);
  const [method, setMethod] = useState<DeliveryMethod>("delivery");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  const deliveryFee = method === "delivery" ? config.deliveryFee : 0;
  const total = subtotal + deliveryFee;
  const belowMinimum = subtotal < config.minimumOrder;
  const remaining = config.minimumOrder - subtotal;

  if (!mounted) {
    return <div className="py-10 text-center text-stone-400">Cargando…</div>;
  }

  if (lines.length === 0) {
    return (
      <div className="card mt-8 flex flex-col items-center gap-3 p-10 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-600">
          <CartIcon className="h-8 w-8" />
        </span>
        <p className="text-lg font-bold text-ink">Tu carrito está vacío</p>
        <p className="text-sm text-stone-500">
          Agrega platillos desde el menú para empezar tu pedido.
        </p>
        <Link href="/" className="btn-primary mt-2">
          Ver el menú
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (belowMinimum) {
      setError(
        `El pedido mínimo es de ${formatCurrency(config.minimumOrder)}.`
      );
      return;
    }
    if (!name.trim() || !phone.trim()) {
      setError("Por favor ingresa tu nombre y teléfono.");
      return;
    }
    if (method === "delivery" && !address.trim()) {
      setError("Ingresa la dirección de entrega.");
      return;
    }

    const items = lines.map((l) => ({
      id: l.id,
      name: l.name,
      price: l.price,
      quantity: l.quantity,
    }));

    setSubmitting(true);
    const result = await createOrder({
      customer_name: name.trim(),
      customer_phone: phone.trim(),
      delivery_method: method,
      address: method === "delivery" ? address.trim() : null,
      notes: notes.trim() || null,
      items,
      subtotal,
      delivery_fee: deliveryFee,
      total,
    });
    setSubmitting(false);

    if (!result.ok) {
      setError(`No se pudo guardar el pedido: ${result.error}`);
      return;
    }

    const message = buildWhatsAppMessage({
      lines,
      subtotal,
      deliveryFee,
      total,
      customerName: name.trim(),
      customerPhone: phone.trim(),
      deliveryMethod: method,
      address: address.trim(),
      notes: notes.trim(),
    });
    const link = buildWhatsAppLink(message, whatsappNumber);

    clear();

    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    } else {
      setError(
        "Pedido registrado, pero falta configurar el número de WhatsApp."
      );
    }
  };

  return (
    <div className="space-y-4 py-4">
      <h1 className="text-2xl font-extrabold tracking-tight">Tu pedido</h1>

      {/* Items */}
      <div className="card divide-y divide-stone-100 px-4">
        {lines.map((line) => (
          <CartLineRow key={line.id} line={line} />
        ))}
      </div>

      {/* Delivery method toggle */}
      <div className="card p-4">
        <p className="mb-2 text-sm font-semibold text-stone-600">
          ¿Cómo lo quieres recibir?
        </p>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              { key: "delivery", label: "Entrega a domicilio" },
              { key: "pickup", label: "Recoger en sucursal" },
            ] as { key: DeliveryMethod; label: string }[]
          ).map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setMethod(opt.key)}
              className={`rounded-xl px-3 py-3 text-sm font-semibold transition ${
                method === opt.key
                  ? "bg-brand-600 text-white shadow-soft"
                  : "bg-stone-100 text-stone-600"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Checkout form */}
      <form onSubmit={handleSubmit} className="card space-y-3 p-4">
        <p className="text-sm font-semibold text-stone-600">Tus datos</p>
        <input
          type="text"
          inputMode="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          required
        />
        <input
          type="tel"
          inputMode="tel"
          placeholder="Teléfono / WhatsApp"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-xl border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          required
        />
        {method === "delivery" && (
          <textarea
            placeholder="Dirección de entrega (calle, número, colonia, referencias)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={2}
            className="w-full rounded-xl border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        )}
        <textarea
          placeholder="Notas (opcional): sin cebolla, salsa extra, etc."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          className="w-full rounded-xl border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
        />
      </form>

      {/* Totals */}
      <div className="card space-y-2 p-4 text-sm">
        <div className="flex justify-between text-stone-600">
          <span>Subtotal</span>
          <span className="font-semibold text-ink">
            {formatCurrency(subtotal)}
          </span>
        </div>
        <div className="flex justify-between text-stone-600">
          <span>Envío</span>
          <span className="font-semibold text-ink">
            {deliveryFee > 0 ? formatCurrency(deliveryFee) : "Gratis"}
          </span>
        </div>
        <div className="flex justify-between border-t border-stone-100 pt-2 text-base font-extrabold">
          <span>Total</span>
          <span className="text-brand-700">{formatCurrency(total)}</span>
        </div>
      </div>

      {belowMinimum && (
        <p className="rounded-xl bg-amber-100 px-3 py-2 text-sm text-amber-800">
          Te faltan {formatCurrency(remaining)} para alcanzar el pedido mínimo de{" "}
          {formatCurrency(config.minimumOrder)}.
        </p>
      )}

      {error && (
        <p className="rounded-xl bg-red-100 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        onClick={handleSubmit}
        disabled={submitting || belowMinimum}
        className="btn-primary w-full bg-[#25D366] py-3 text-base hover:bg-[#1fb959]"
      >
        <WhatsAppIcon className="h-5 w-5" />
        {submitting ? "Procesando…" : "Pedir por WhatsApp"}
      </button>

      <button
        type="button"
        onClick={clear}
        className="w-full text-center text-sm font-medium text-stone-400"
      >
        Vaciar carrito
      </button>
    </div>
  );
}
