import { MenuPageContent } from "@/components/menu-page-content"
import { StateCard } from "@/components/state-card"
import { getBusinessInfo, getMenuItems } from "@/lib/data"

export default async function MenuPage() {
  const [{ data: items, error: menuError, missingConfig }, { data: businessInfo }] =
    await Promise.all([getMenuItems(), getBusinessInfo()])

  if (missingConfig) {
    return (
      <StateCard
        title="Falta configurar Supabase"
        description="Agrega las variables NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY para cargar el menu y la informacion del negocio."
      />
    )
  }

  if (menuError) {
    return (
      <StateCard
        title="No pudimos cargar el menu"
        description={menuError}
      />
    )
  }

  if (items.length === 0) {
    return (
      <StateCard
        title="Aun no hay productos"
        description="Ejecuta el schema y el seed de Supabase para ver categorias y platos de ejemplo."
      />
    )
  }

  return <MenuPageContent items={items} businessInfo={businessInfo} />
}
