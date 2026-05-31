export function LoadingState({ label = "Cargando..." }: { label?: string }) {
  return (
    <div className="space-y-4" aria-live="polite" aria-busy="true">
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">{label}</p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-80 animate-pulse rounded-[2rem] bg-orange-100/70" />
        ))}
      </div>
    </div>
  );
}
