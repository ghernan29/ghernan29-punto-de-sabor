import type { Metadata } from "next";

import { BusinessDetails } from "@/components/business-details";
import { EmptyState } from "@/components/empty-state";
import { getBusinessInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Nuestra Pagina"
};

export default async function BusinessPage() {
  const { data: info, error, isConfigured } = await getBusinessInfo();

  return (
    <div className="space-y-6">
      {!isConfigured ? (
        <EmptyState
          title="Conecta Supabase para mostrar tu informacion"
          description="La pagina del negocio se alimenta de la tabla business_info. Configura las variables de entorno y ejecuta el seed SQL."
        />
      ) : null}

      {error ? <EmptyState title="No pudimos cargar la pagina" description={error} /> : null}

      {isConfigured && !error && !info ? (
        <EmptyState title="Informacion pendiente" description="Agrega una fila en business_info para mostrar horarios, direccion y redes sociales." />
      ) : null}

      {info ? <BusinessDetails info={info} /> : null}
    </div>
  );
}
