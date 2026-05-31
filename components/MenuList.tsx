"use client";

import { useMemo, useState } from "react";
import type { MenuItem } from "@/lib/types";
import MenuItemCard from "./MenuItemCard";

function groupByCategory(items: MenuItem[]): [string, MenuItem[]][] {
  const map = new Map<string, MenuItem[]>();
  for (const item of items) {
    const list = map.get(item.category) ?? [];
    list.push(item);
    map.set(item.category, list);
  }
  return Array.from(map.entries());
}

export default function MenuList({ items }: { items: MenuItem[] }) {
  const grouped = useMemo(() => groupByCategory(items), [items]);
  const categories = useMemo(() => grouped.map(([cat]) => cat), [grouped]);
  const [active, setActive] = useState<string>("Todas");

  if (items.length === 0) {
    return (
      <div className="card mt-8 flex flex-col items-center gap-2 p-10 text-center">
        <span className="text-4xl">🍽️</span>
        <p className="font-semibold text-ink">Aún no hay platillos</p>
        <p className="text-sm text-stone-500">
          Vuelve pronto, estamos preparando el menú.
        </p>
      </div>
    );
  }

  const visibleGroups =
    active === "Todas" ? grouped : grouped.filter(([cat]) => cat === active);

  return (
    <div>
      {/* Category chips */}
      <div className="sticky top-[57px] z-20 -mx-4 mb-4 bg-stone-50/95 px-4 py-3 backdrop-blur">
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {["Todas", ...categories].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                active === cat
                  ? "bg-brand-600 text-white shadow-soft"
                  : "bg-white text-stone-600 ring-1 ring-stone-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-8 pb-8">
        {visibleGroups.map(([category, categoryItems]) => (
          <section key={category} id={category}>
            <h2 className="mb-3 text-xl font-extrabold tracking-tight text-ink">
              {category}
            </h2>
            <div className="grid gap-3">
              {categoryItems.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
