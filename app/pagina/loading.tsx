export default function BusinessLoading() {
  return (
    <div className="space-y-5">
      <div className="h-48 animate-pulse rounded-[2rem] bg-orange-100" />
      <div className="grid gap-5 md:grid-cols-2">
        <div className="h-40 animate-pulse rounded-[2rem] bg-white" />
        <div className="h-40 animate-pulse rounded-[2rem] bg-white" />
      </div>
      <div className="h-80 animate-pulse rounded-[2rem] bg-white" />
    </div>
  )
}
