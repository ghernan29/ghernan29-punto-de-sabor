"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Info, MessageCircle, ShoppingBag } from "lucide-react";

import { useCart } from "@/components/cart-provider";
import { createQuickWhatsAppUrl } from "@/lib/whatsapp";

const internalItems = [
  { href: "/", label: "Menu", icon: Home },
  { href: "/carrito", label: "Carrito", icon: ShoppingBag },
  { href: "/pagina", label: "Pagina", icon: Info }
];

export function BottomNav() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-orange-100 bg-white/95 px-3 py-2 shadow-[0_-8px_24px_rgba(120,53,15,0.08)] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
        {internalItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-xs font-bold transition ${
                isActive ? "bg-orange-100 text-orange-800" : "text-stone-500 hover:bg-orange-50"
              }`}
            >
              <Icon size={20} aria-hidden="true" />
              <span>{item.label}</span>
              {item.href === "/carrito" && itemCount > 0 ? (
                <span className="absolute right-3 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-600 px-1 text-[10px] text-white">
                  {itemCount}
                </span>
              ) : null}
            </Link>
          );
        })}
        <a
          href={createQuickWhatsAppUrl()}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-xs font-bold text-green-700 transition hover:bg-green-50"
        >
          <MessageCircle size={20} aria-hidden="true" />
          <span>WhatsApp</span>
        </a>
      </div>
    </nav>
  );
}
