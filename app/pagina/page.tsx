import { PageHeader } from "@/components/layout/PageHeader";
import { BusinessPageView } from "@/components/business/BusinessPageView";
import { fetchBusinessInfo } from "@/lib/business";
import { isSupabaseConfigured } from "@/lib/config";

export const dynamic = "force-dynamic";

export default async function PaginaPage() {
  if (!isSupabaseConfigured()) {
    return (
      <>
        <PageHeader title="Nuestra Página" subtitle="Conócenos" />
        <div className="mx-4 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
          Configura Supabase para mostrar la información del negocio.
        </div>
      </>
    );
  }

  let info: Awaited<ReturnType<typeof fetchBusinessInfo>> = null;
  let error: string | null = null;

  try {
    info = await fetchBusinessInfo();
  } catch {
    error = "No pudimos cargar la información.";
  }

  return (
    <>
      <PageHeader title="Nuestra Página" subtitle="Conócenos" />
      {error ? (
        <p className="px-4 text-center text-sm text-red-600">{error}</p>
      ) : (
        <BusinessPageView info={info} />
      )}
    </>
  );
}
