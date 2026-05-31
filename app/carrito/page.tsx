import type { Metadata } from "next";

import { CartPageContent } from "@/components/cart-page-content";

export const metadata: Metadata = {
  title: "Carrito"
};

export default function CartPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">Pedido</p>
        <h1 className="text-3xl font-black text-stone-950">Carrito</h1>
        <p className="mt-2 text-stone-600">Revisa cantidades, elige entrega o recoger y confirma por WhatsApp.</p>
      </div>
      <CartPageContent />
    </div>
  );
}
