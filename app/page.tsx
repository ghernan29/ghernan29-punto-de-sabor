import { getMenuItems } from "@/lib/data";
import { config } from "@/lib/config";
import { isSupabaseConfigured } from "@/lib/supabase";
import MenuList from "@/components/MenuList";

export const revalidate = 60;

export default async function MenuPage() {
  const items = await getMenuItems();

  return (
    <div className="py-4">
      <section className="card mb-2 overflow-hidden bg-gradient-to-br from-brand-500 to-brand-700 p-5 text-white">
        <h1 className="text-2xl font-extrabold leading-tight">
          Sabor casero, a un toque de distancia
        </h1>
        <p className="mt-1 text-sm text-white/90">
          Explora nuestro menú, arma tu pedido y ordena por WhatsApp o a domicilio.
        </p>
      </section>

      {!isSupabaseConfigured && (
        <p className="mb-2 rounded-xl bg-amber-100 px-3 py-2 text-xs text-amber-800">
          Mostrando datos de ejemplo. Configura Supabase en{" "}
          <code>.env.local</code> para usar tu menú real.
        </p>
      )}

      <MenuList items={items} />

      <p className="pb-4 text-center text-xs text-stone-400">
        {config.businessName}
      </p>
    </div>
  );
}
