import type { Metadata } from "next";

import { BusinessDetails } from "@/components/business-details";
import { EmptyState } from "@/components/empty-state";
import { getBusinessInfo } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Nuestra Página"
};

export default async function BusinessPage() {
  const { data: info, error, isConfigured } = await getBusinessInfo();

  return (
    <div className="space-y-6">
      {!isConfigured ? (
        <EmptyState
          title="Conecta Supabase para mostrar tu información"
          description="La página del negocio se alimenta de la tabla business_info. Configura las variables de entorno y ejecuta el seed SQL."
        />
      ) : null}

      {error ? <EmptyState title="No pudimos cargar la pagina" description={error} /> : null}

      {isConfigured && !error && !info ? (
        <EmptyState title="Información pendiente" description="Agrega una fila en business_info para mostrar horarios, dirección y redes sociales." />
      ) : null}

      {info ? <BusinessDetails info={info} /> : null}
    </div>
  );
}
