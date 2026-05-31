import { groupMenuByCategory } from "@/lib/menu";
import type { MenuItem } from "@/lib/types";
import { MenuCategorySection } from "@/components/menu/MenuCategorySection";
import { EmptyState } from "@/components/ui/EmptyState";

type MenuViewProps = {
  items: MenuItem[];
};

export function MenuView({ items }: MenuViewProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="Menú vacío"
        description="Aún no hay platillos publicados. Vuelve pronto."
        icon="🍽️"
      />
    );
  }

  const grouped = groupMenuByCategory(items);

  return (
    <>
      {[...grouped.entries()].map(([category, categoryItems]) => (
        <MenuCategorySection
          key={category}
          category={category}
          items={categoryItems}
        />
      ))}
    </>
  );
}
