export function Spinner({ className = '' }: { className?: string }) {
  return (
    <div
      className={`inline-block h-6 w-6 animate-spin rounded-full border-2 border-brand-200 border-t-brand-500 ${className}`}
      role="status"
      aria-label="Cargando"
    />
  );
}

export function LoadingState({ label = 'Cargando…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-ink-500">
      <Spinner />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export function MenuSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl bg-white p-3 shadow-card"
        >
          <div className="h-40 w-full rounded-xl bg-brand-100/70" />
          <div className="mt-3 h-4 w-2/3 rounded bg-brand-100/70" />
          <div className="mt-2 h-3 w-full rounded bg-brand-100/50" />
          <div className="mt-2 h-3 w-5/6 rounded bg-brand-100/50" />
        </div>
      ))}
    </div>
  );
}
