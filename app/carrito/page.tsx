import { CartCheckout } from "@/components/cart-checkout";

export default function CarritoPage() {
  return (
    <div className="page-container space-y-4">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Pedidos y Carrito</h1>
        <p className="text-sm text-slate-600">
          Ajusta cantidades y confirma tu pedido por WhatsApp.
        </p>
      </header>

      <CartCheckout />
    </div>
  );
}
