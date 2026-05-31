import { Utensils } from "lucide-react";

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-[2rem] border border-dashed border-orange-200 bg-white/70 p-8 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-700">
        <Utensils aria-hidden="true" />
      </div>
      <h2 className="text-xl font-black text-stone-950">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-stone-600">{description}</p>
    </div>
  );
}
