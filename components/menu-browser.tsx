"use client";

import { useEffect, useMemo, useState } from "react";

import type { MenuItem } from "@/lib/database.types";
import { hasSupabaseConfig } from "@/lib/config";
import { getSupabaseClient } from "@/lib/supabase";
import { MenuItemCard } from "@/components/menu-item-card";

const groupByCategory = (items: MenuItem[]): Record<string, MenuItem[]> =>
  items.reduce<Record<string, MenuItem[]>>((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

export const MenuBrowser = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      if (!hasSupabaseConfig) {
        setErrorMessage("Configura las variables de Supabase para mostrar el menu.");
        setLoading(false);
        return;
      }

      const supabase = getSupabaseClient();
      if (!supabase) {
        setErrorMessage("No fue posible inicializar Supabase.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .order("category", { ascending: true })
        .order("sort_order", { ascending: true });

      if (error) {
        setErrorMessage("No pudimos cargar el menu. Intenta nuevamente.");
      } else {
        setItems(data ?? []);
      }
      setLoading(false);
    };

    void fetchMenu();
  }, []);

  const groupedItems = useMemo(() => groupByCategory(items), [items]);
  const categories = Object.keys(groupedItems);

  if (loading) {
    return (
      <section className="space-y-4">
        <div className="card h-28 animate-pulse bg-orange-100" />
        <div className="card h-28 animate-pulse bg-orange-100" />
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="card border-red-100 bg-red-50 text-sm text-red-700">
        <p>{errorMessage}</p>
      </section>
    );
  }

  if (!categories.length) {
    return (
      <section className="card text-center text-sm text-slate-600">
        No hay productos disponibles por ahora.
      </section>
    );
  }

  return (
    <section className="space-y-8">
      {categories.map((category) => (
        <div key={category} className="space-y-3">
          <h2 className="section-title">{category}</h2>
          <div className="space-y-4">
            {groupedItems[category]?.map((item) => <MenuItemCard key={item.id} item={item} />)}
          </div>
        </div>
      ))}
    </section>
  );
};
