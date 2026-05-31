export function MenuItemSkeleton() {
  return (
    <div className="card flex animate-pulse gap-3 p-3">
      <div className="h-24 w-24 flex-shrink-0 rounded-xl bg-stone-200" />
      <div className="flex flex-1 flex-col gap-2 py-1">
        <div className="h-4 w-2/3 rounded bg-stone-200" />
        <div className="h-3 w-full rounded bg-stone-200" />
        <div className="h-3 w-1/2 rounded bg-stone-200" />
        <div className="mt-auto flex items-center justify-between">
          <div className="h-4 w-16 rounded bg-stone-200" />
          <div className="h-8 w-20 rounded-full bg-stone-200" />
        </div>
      </div>
    </div>
  );
}

export function MenuSkeleton() {
  return (
    <div className="space-y-3 py-6">
      <div className="h-6 w-40 rounded bg-stone-200" />
      {Array.from({ length: 5 }).map((_, i) => (
        <MenuItemSkeleton key={i} />
      ))}
    </div>
  );
}
