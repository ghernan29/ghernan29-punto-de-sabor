import { MenuBrowser } from "@/components/menu-browser";
import { publicConfig } from "@/lib/config";

export default function MenuPage() {
  return (
    <div className="page-container space-y-5">
      <header className="card bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <p className="text-xs uppercase tracking-wider text-orange-100">Bienvenido</p>
        <h1 className="mt-1 text-2xl font-bold">{publicConfig.businessName}</h1>
        <p className="mt-2 text-sm text-orange-100">
          Elige tus favoritos, agrega al carrito y finaliza tu pedido por WhatsApp.
        </p>
      </header>

      <section className="space-y-2">
        <h2 className="section-title">Menu del dia</h2>
        <p className="text-sm text-slate-600">Todo el sabor en un solo lugar.</p>
      </section>

      <MenuBrowser />
    </div>
  );
}
