import { Suspense } from 'react';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Category, MenuItem } from '@/lib/types';
import { MenuView } from './_menu/MenuView';
import { MenuSkeleton } from '@/components/Loading';
import { EmptyState } from '@/components/Empty';

export const revalidate = 60;

async function loadMenu(): Promise<{
  categories: Category[];
  items: MenuItem[];
  configured: boolean;
  error?: string;
}> {
  if (!isSupabaseConfigured()) {
    return { categories: [], items: [], configured: false };
  }
  const supabase = getSupabase()!;
  const [catRes, itemsRes] = await Promise.all([
    supabase.from('categories').select('*').order('sort_order', { ascending: true }),
    supabase
      .from('menu_items')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('name', { ascending: true }),
  ]);

  if (catRes.error) return { categories: [], items: [], configured: true, error: catRes.error.message };
  if (itemsRes.error) return { categories: catRes.data ?? [], items: [], configured: true, error: itemsRes.error.message };

  return {
    categories: catRes.data ?? [],
    items: (itemsRes.data ?? []).map((i) => ({ ...i, price: Number(i.price) })),
    configured: true,
  };
}

export default async function MenuPage() {
  const data = await loadMenu();

  return (
    <div className="space-y-5">
      <section className="rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 p-6 text-white shadow-card sm:p-8">
        <p className="text-sm font-medium uppercase tracking-wider text-white/80">
          Menú del día
        </p>
        <h1 className="mt-1 font-display text-3xl leading-tight sm:text-4xl">
          Antojitos mexicanos, hechos al momento
        </h1>
        <p className="mt-2 max-w-xl text-sm text-white/90">
          Elige tus platillos favoritos y pídelos a domicilio o para recoger.
          Confirmamos cada pedido por WhatsApp.
        </p>
      </section>

      {!data.configured && (
        <EmptyState
          icon="⚙️"
          title="Conecta Supabase"
          description="Agrega NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en tu .env.local y ejecuta los scripts en supabase/schema.sql y supabase/seed.sql para ver el menú."
        />
      )}

      {data.configured && data.error && (
        <EmptyState
          icon="⚠️"
          title="No pudimos cargar el menú"
          description={data.error}
        />
      )}

      {data.configured && !data.error && data.items.length === 0 && (
        <EmptyState
          icon="🍽️"
          title="Aún no hay platillos"
          description="Ejecuta supabase/seed.sql o agrega elementos a la tabla menu_items para verlos aquí."
        />
      )}

      {data.configured && !data.error && data.items.length > 0 && (
        <Suspense fallback={<MenuSkeleton />}>
          <MenuView categories={data.categories} items={data.items} />
        </Suspense>
      )}
    </div>
  );
}
