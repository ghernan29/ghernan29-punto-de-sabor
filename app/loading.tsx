import { MenuSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="py-4">
      <div className="card mb-4 h-28 animate-pulse bg-stone-200" />
      <MenuSkeleton />
    </div>
  );
}
