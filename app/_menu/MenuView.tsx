'use client';

import { useMemo, useState } from 'react';
import type { Category, MenuItem } from '@/lib/types';
import { CategoryChips } from '@/components/CategoryChips';
import { MenuItemCard } from '@/components/MenuItemCard';
import { EmptyState } from '@/components/Empty';

const ALL = '__all__';

export function MenuView({
  categories,
  items,
}: {
  categories: Category[];
  items: MenuItem[];
}) {
  const allCategory: Category = {
    id: ALL,
    slug: ALL,
    name: 'Todos',
    sort_order: -1,
    created_at: '',
  };

  const [active, setActive] = useState<string>(ALL);
  const allCategories = [allCategory, ...categories];

  const filtered = useMemo(
    () => (active === ALL ? items : items.filter((i) => i.category === active)),
    [items, active]
  );

  const grouped = useMemo(() => {
    const map = new Map<string, MenuItem[]>();
    for (const item of filtered) {
      const arr = map.get(item.category) ?? [];
      arr.push(item);
      map.set(item.category, arr);
    }
    return Array.from(map.entries())
      .map(([slug, list]) => ({
        category: categories.find((c) => c.slug === slug) ?? {
          id: slug,
          slug,
          name: slug,
          sort_order: 999,
          created_at: '',
        },
        items: list,
      }))
      .sort((a, b) => a.category.sort_order - b.category.sort_order);
  }, [filtered, categories]);

  return (
    <div className="space-y-6">
      <CategoryChips categories={allCategories} active={active} onChange={setActive} />

      {grouped.length === 0 && (
        <EmptyState
          icon="🌮"
          title="No hay platillos en esta categoría"
          description="Pronto agregaremos más opciones."
        />
      )}

      {grouped.map(({ category, items: list }) => (
        <section key={category.slug} className="space-y-3">
          <h2 className="font-display text-2xl text-ink-900">{category.name}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {list.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
