export function LoadingSpinner({ label = "Cargando…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600"
        role="status"
        aria-label={label}
      />
      <p className="text-sm text-sage-600">{label}</p>
    </div>
  );
}
