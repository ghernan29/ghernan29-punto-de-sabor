"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { CartIcon, MenuIcon, StoreIcon, WhatsAppIcon } from "./icons";

const items = [
  { href: "/", label: "Menú", icon: MenuIcon },
  { href: "/carrito", label: "Carrito", icon: CartIcon, badge: true },
  { href: "/pagina", label: "Página", icon: StoreIcon },
  { href: "/whatsapp", label: "WhatsApp", icon: WhatsAppIcon },
];

export default function BottomNav() {
  const pathname = usePathname();
  const count = useCart((s) => s.totalQuantity());
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      <ul className="mx-auto flex w-full max-w-2xl items-stretch justify-around">
        {items.map(({ href, label, icon: Icon, badge }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={`relative flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition ${
                  active ? "text-brand-600" : "text-stone-500"
                }`}
              >
                <span className="relative">
                  <Icon className="h-6 w-6" />
                  {badge && mounted && count > 0 && (
                    <span className="absolute -right-2.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">
                      {count}
                    </span>
                  )}
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
