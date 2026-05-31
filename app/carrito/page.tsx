"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { WhatsAppOrderButton } from "@/components/cart/WhatsAppOrderButton";
import { CheckoutForm } from "@/components/cart/CheckoutForm";
import { EmptyState } from "@/components/ui/EmptyState";
import { useCart, useCartTotals } from "@/context/CartContext";
import { useState } from "react";
import type { OrderFulfillment } from "@/lib/types";

function SuccessBanner() {
  const params = useSearchParams();
  if (params.get("success") !== "1") return null;
  return (
    <div className="mx-4 mb-4 rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-800 ring-1 ring-green-200">
      ¡Pedido registrado! Confirma los detalles en WhatsApp con el restaurante.
    </div>
  );
}

function CartContent() {
  const { lines } = useCart();
  const [fulfillment, setFulfillment] = useState<OrderFulfillment>("delivery");
  const { subtotal, deliveryFee, total } = useCartTotals(fulfillment);

  if (lines.length === 0) {
    return (
      <EmptyState
        title="Tu carrito está vacío"
        description="Explora el menú y agrega tus platillos favoritos."
        icon="🛒"
      />
    );
  }

  return (
    <>
      <ul className="flex flex-col gap-3 px-4">
        {lines.map((line) => (
          <CartLineItem key={line.menuItemId} line={line} />
        ))}
      </ul>

      <div className="mt-4 space-y-4 px-4">
        <fieldset className="space-y-2">
          <legend className="text-sm font-semibold text-sage-800">
            Tipo de pedido (vista rápida)
          </legend>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                ["delivery", "🛵 Entrega"],
                ["pickup", "🏪 Recoger"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setFulfillment(value)}
                className={`rounded-xl border-2 px-3 py-2 text-sm font-medium ${
                  fulfillment === value
                    ? "border-brand-600 bg-brand-50 text-brand-800"
                    : "border-sage-200 bg-white text-sage-600"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>

        <CartSummary
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          total={total}
          showDeliveryFee={fulfillment === "delivery"}
        />

        <WhatsAppOrderButton fulfillment={fulfillment} />
      </div>

      <div className="mt-8 border-t border-sage-200 pt-6">
        <h2 className="mb-2 px-4 font-display text-lg font-bold text-sage-800">
          Datos de entrega
        </h2>
        <CheckoutForm />
      </div>
    </>
  );
}

export default function CarritoPage() {
  return (
    <>
      <Suspense fallback={null}>
        <SuccessBanner />
      </Suspense>
      <PageHeader
        title="Carrito"
        subtitle="Revisa tu pedido y confirma por WhatsApp"
      />
      <CartContent />
      <div className="px-4 pb-4 pt-2">
        <Link
          href="/"
          className="block text-center text-sm font-medium text-brand-700 hover:underline"
        >
          ← Seguir comprando
        </Link>
      </div>
    </>
  );
}
