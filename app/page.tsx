import { PageHeader } from "@/components/layout/PageHeader";
import { MenuView } from "@/components/menu/MenuView";
import { fetchMenuItems } from "@/lib/menu";
import { isSupabaseConfigured } from "@/lib/config";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function MenuPage() {
  if (!isSupabaseConfigured()) {
    return (
      <>
        <PageHeader
          title="Punto de Sabor"
          subtitle="Configura Supabase para ver el menú"
        />
        <div className="mx-4 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900 ring-1 ring-amber-200">
          <p className="font-semibold">Variables de entorno faltantes</p>
          <p className="mt-1">
            Copia <code className="rounded bg-amber-100 px-1">.env.example</code>{" "}
            a <code className="rounded bg-amber-100 px-1">.env.local</code> y
            ejecuta <code className="rounded bg-amber-100 px-1">supabase/seed.sql</code>.
          </p>
        </div>
      </>
    );
  }

  let items: Awaited<ReturnType<typeof fetchMenuItems>> = [];
  let error: string | null = null;

  try {
    items = await fetchMenuItems();
  } catch {
    error = "No pudimos cargar el menú. Intenta más tarde.";
  }

  return (
    <>
      <PageHeader
        title="Menú"
        subtitle="Platillos hechos con sazón de casa"
      />
      {error ? (
        <p className="px-4 text-center text-sm text-red-600">{error}</p>
      ) : (
        <MenuView items={items} />
      )}
      <div className="px-4 pb-4">
        <Link
          href="/carrito"
          className="block rounded-xl border border-brand-200 bg-brand-50 py-3 text-center text-sm font-semibold text-brand-800"
        >
          Ver carrito →
        </Link>
      </div>
    </>
  );
}
