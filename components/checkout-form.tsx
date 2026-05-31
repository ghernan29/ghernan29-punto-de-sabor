"use client";

import { FormEvent, useMemo, useState } from "react";
import { Loader2, MessageCircle } from "lucide-react";

import { useCart } from "@/components/cart-provider";
import { appConfig, formatMoney, hasWhatsappConfig } from "@/lib/config";
import type { DeliveryType, OrderInsert } from "@/lib/types";
import { buildOrderMessage, createWhatsAppUrl } from "@/lib/whatsapp";

type FormState = {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  notes: string;
  deliveryType: DeliveryType;
};

const initialFormState: FormState = {
  customerName: "",
  customerPhone: "",
  deliveryAddress: "",
  notes: "",
  deliveryType: "delivery"
};

export function CheckoutForm() {
  const { items, subtotal, clearCart } = useCart();
  const [form, setForm] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const deliveryFee = form.deliveryType === "delivery" ? appConfig.deliveryFee : 0;
  const total = subtotal + deliveryFee;
  const canSubmit = items.length > 0 && subtotal >= appConfig.minimumOrderAmount && status !== "submitting";

  const orderMessage = useMemo(
    () =>
      buildOrderMessage({
        customerName: form.customerName,
        customerPhone: form.customerPhone,
        deliveryType: form.deliveryType,
        deliveryAddress: form.deliveryAddress,
        notes: form.notes,
        items,
        subtotal,
        deliveryFee,
        total
      }),
    [deliveryFee, form, items, subtotal, total]
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    if (!hasWhatsappConfig()) {
      setStatus("error");
      setMessage("Falta configurar el número de WhatsApp.");
      return;
    }

    if (items.length === 0) {
      setStatus("error");
      setMessage("Agrega productos antes de enviar tu pedido.");
      return;
    }

    if (subtotal < appConfig.minimumOrderAmount) {
      setStatus("error");
      setMessage(`El pedido mínimo es ${formatMoney(appConfig.minimumOrderAmount)}.`);
      return;
    }

    if (form.deliveryType === "delivery" && !form.deliveryAddress.trim()) {
      setStatus("error");
      setMessage("Escribe la dirección de entrega.");
      return;
    }

    setStatus("submitting");

    const payload: OrderInsert = {
      customer_name: form.customerName.trim(),
      customer_phone: form.customerPhone.trim(),
      delivery_type: form.deliveryType,
      delivery_address: form.deliveryType === "delivery" ? form.deliveryAddress.trim() : null,
      notes: form.notes.trim() || null,
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
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "No se pudo guardar el pedido.");
      }

      setStatus("success");
      setMessage("Pedido guardado. Abriendo WhatsApp para confirmar.");
      window.open(createWhatsAppUrl(orderMessage), "_blank", "noopener,noreferrer");
      clearCart();
      setForm(initialFormState);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "No se pudo enviar el pedido.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-[2rem] border border-orange-100 bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-xl font-black text-stone-950">Datos del pedido</h2>
        <p className="text-sm leading-6 text-stone-600">
          Guardamos tu pedido y abrimos WhatsApp para que el negocio lo confirme directamente.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 rounded-full bg-amber-100 p-1">
        {(["delivery", "pickup"] as DeliveryType[]).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setForm((current) => ({ ...current, deliveryType: type }))}
            className={`rounded-full px-4 py-3 text-sm font-black transition ${
              form.deliveryType === type ? "bg-white text-orange-800 shadow-sm" : "text-stone-600"
            }`}
          >
            {type === "delivery" ? "A domicilio" : "Recoger"}
          </button>
        ))}
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-bold text-stone-700">Nombre</span>
        <input
          required
          value={form.customerName}
          onChange={(event) => setForm((current) => ({ ...current, customerName: event.target.value }))}
          className="w-full rounded-2xl border border-orange-100 bg-amber-50 px-4 py-3 outline-none ring-orange-300 focus:ring-4"
          placeholder="Tu nombre"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-bold text-stone-700">Teléfono</span>
        <input
          required
          inputMode="tel"
          value={form.customerPhone}
          onChange={(event) => setForm((current) => ({ ...current, customerPhone: event.target.value }))}
          className="w-full rounded-2xl border border-orange-100 bg-amber-50 px-4 py-3 outline-none ring-orange-300 focus:ring-4"
          placeholder="Ej. 55 1234 5678"
        />
      </label>

      {form.deliveryType === "delivery" ? (
        <label className="block space-y-2">
          <span className="text-sm font-bold text-stone-700">Dirección de entrega</span>
          <textarea
            required
            value={form.deliveryAddress}
            onChange={(event) => setForm((current) => ({ ...current, deliveryAddress: event.target.value }))}
            className="min-h-24 w-full rounded-2xl border border-orange-100 bg-amber-50 px-4 py-3 outline-none ring-orange-300 focus:ring-4"
            placeholder="Calle, número, colonia y referencias"
          />
        </label>
      ) : null}

      <label className="block space-y-2">
        <span className="text-sm font-bold text-stone-700">Notas opcionales</span>
        <textarea
          value={form.notes}
          onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
          className="min-h-20 w-full rounded-2xl border border-orange-100 bg-amber-50 px-4 py-3 outline-none ring-orange-300 focus:ring-4"
          placeholder="Sin cebolla, cambio, referencias, etc."
        />
      </label>

      <div className="space-y-2 rounded-2xl bg-stone-950 p-4 text-white">
        <SummaryRow label="Subtotal" value={formatMoney(subtotal)} />
        <SummaryRow label="Envío" value={formatMoney(deliveryFee)} />
        <SummaryRow label="Total" value={formatMoney(total)} strong />
        {appConfig.minimumOrderAmount > 0 ? (
          <p className="pt-2 text-xs text-orange-100">Pedido mínimo: {formatMoney(appConfig.minimumOrderAmount)}</p>
        ) : null}
      </div>

      {message ? (
        <p className={`rounded-2xl px-4 py-3 text-sm font-semibold ${status === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={!canSubmit}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-5 py-4 font-black text-white shadow-lg shadow-green-900/20 transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:shadow-none"
      >
        {status === "submitting" ? <Loader2 className="animate-spin" size={20} aria-hidden="true" /> : <MessageCircle size={20} aria-hidden="true" />}
        Pedir por WhatsApp
      </button>
    </form>
  );
}

function SummaryRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${strong ? "text-lg font-black" : "text-sm text-stone-200"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
