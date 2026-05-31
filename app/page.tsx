import { EmptyState } from "@/components/empty-state";
import { MenuSection } from "@/components/menu-section";
import { getMenuItems } from "@/lib/data";
import type { MenuItem } from "@/lib/types";

export default async function MenuPage() {
  const { data: menuItems, error, isConfigured } = await getMenuItems();
  const groupedItems = groupByCategory(menuItems);

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] bg-stone-950 p-6 text-white shadow-xl shadow-orange-900/10 md:p-10">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-300">Punto de Sabor</p>
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">Tu antojo favorito, listo para pedir.</h1>
          <p className="text-base leading-7 text-orange-50 md:text-lg">
            Explora nuestro menu, arma tu carrito y confirma tu pedido directamente por WhatsApp.
          </p>
        </div>
      </section>

      {!isConfigured ? (
        <EmptyState
          title="Conecta Supabase para cargar el menu"
          description="Copia .env.example a .env.local, agrega tus credenciales de Supabase y ejecuta los scripts SQL incluidos."
        />
      ) : null}

      {error ? <EmptyState title="No pudimos cargar el menu" description={error} /> : null}

      {isConfigured && !error && menuItems.length === 0 ? (
        <EmptyState title="Menu vacio" description="Agrega productos en la tabla menu_items para que aparezcan aqui." />
      ) : null}

      <div className="space-y-10">
        {groupedItems.map(([category, items]) => (
          <MenuSection key={category} category={category} items={items} />
        ))}
      </div>
    </div>
  );
}

function groupByCategory(items: MenuItem[]) {
  const groups = new Map<string, MenuItem[]>();

  for (const item of items) {
    groups.set(item.category, [...(groups.get(item.category) ?? []), item]);
  }

  return Array.from(groups.entries());
}
