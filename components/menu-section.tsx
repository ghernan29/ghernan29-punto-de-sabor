import { MenuItemCard } from "@/components/menu-item-card";
import type { MenuItem } from "@/lib/types";

export function MenuSection({ category, items }: { category: string; items: MenuItem[] }) {
  return (
    <section className="space-y-4" aria-labelledby={`category-${category}`}>
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">Categoria</p>
        <h2 id={`category-${category}`} className="text-2xl font-black text-stone-950">
          {category}
        </h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
