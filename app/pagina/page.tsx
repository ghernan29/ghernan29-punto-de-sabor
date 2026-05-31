import { BusinessPageContent } from "@/components/business-page-content"
import { StateCard } from "@/components/state-card"
import { getBusinessInfo } from "@/lib/data"

export default async function BusinessPage() {
  const { data, error, missingConfig } = await getBusinessInfo()

  if (missingConfig) {
    return (
      <StateCard
        title="Falta configurar Supabase"
        description="Conecta el proyecto a Supabase para mostrar descripcion, horarios, direccion y redes sociales."
      />
    )
  }

  if (error) {
    return (
      <StateCard
        title="No pudimos cargar la pagina del negocio"
        description={error}
      />
    )
  }

  if (!data) {
    return (
      <StateCard
        title="Sin informacion del negocio"
        description="Inserta una fila en business_info o ejecuta el seed para poblar la pagina automaticamente."
      />
    )
  }

  return <BusinessPageContent businessInfo={data} />
}
