import Link from "next/link";
import { config } from "@/lib/config";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-stone-50/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-2xl items-center gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-lg">
            🍽️
          </span>
          <span className="text-lg font-extrabold tracking-tight text-ink">
            {config.businessName}
          </span>
        </Link>
      </div>
    </header>
  );
}
