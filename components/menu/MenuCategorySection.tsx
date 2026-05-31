import type { MenuItem } from "@/lib/types";
import { MenuItemCard } from "@/components/menu/MenuItemCard";

type MenuCategorySectionProps = {
  category: string;
  items: MenuItem[];
};

export function MenuCategorySection({
  category,
  items,
}: MenuCategorySectionProps) {
  return (
    <section className="px-4 pb-8" aria-labelledby={`cat-${category}`}>
      <h2
        id={`cat-${category}`}
        className="mb-3 font-display text-xl font-bold text-sage-800"
      >
        {category}
      </h2>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
