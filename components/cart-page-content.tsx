"use client";

import Link from "next/link";

import { CartLineItem } from "@/components/cart-line-item";
import { useCart } from "@/components/cart-provider";
import { CheckoutForm } from "@/components/checkout-form";
import { EmptyState } from "@/components/empty-state";

export function CartPageContent() {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <div className="space-y-6">
        <EmptyState title="Tu carrito está vacío" description="Explora el menú y agrega tus antojos favoritos para preparar tu pedido." />
        <Link
          href="/"
          className="inline-flex rounded-full bg-orange-600 px-5 py-3 font-black text-white shadow-sm transition hover:bg-orange-700"
        >
          Ver menú
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <section className="space-y-4" aria-label="Productos en el carrito">
        {items.map((item) => (
          <CartLineItem key={item.id} item={item} />
        ))}
      </section>
      <CheckoutForm />
    </div>
  );
}
