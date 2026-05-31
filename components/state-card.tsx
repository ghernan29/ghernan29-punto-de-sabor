type StateCardProps = {
  title: string
  description: string
}

export function StateCard({ title, description }: StateCardProps) {
  return (
    <div className="rounded-3xl border border-dashed border-orange-200 bg-orange-50/70 p-6 text-center shadow-soft">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  )
}
