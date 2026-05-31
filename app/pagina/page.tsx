import { BusinessInfoPanel } from "@/components/business-info-panel";

export default function PaginaPage() {
  return (
    <div className="page-container space-y-4">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Nuestra Pagina</h1>
        <p className="text-sm text-slate-600">
          Conoce nuestra historia, horarios, ubicacion y redes.
        </p>
      </header>

      <BusinessInfoPanel />
    </div>
  );
}
