export default function MenuLoading() {
  return (
    <div className="space-y-5">
      <div className="h-60 animate-pulse rounded-[2rem] bg-orange-100" />
      <div className="grid gap-5 md:grid-cols-2">
        <div className="h-72 animate-pulse rounded-[2rem] bg-white" />
        <div className="h-72 animate-pulse rounded-[2rem] bg-white" />
      </div>
    </div>
  )
}
