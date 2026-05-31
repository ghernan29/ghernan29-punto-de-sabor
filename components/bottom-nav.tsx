"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenText, MessageCircleMore, ShoppingBag, Store } from "lucide-react";

import { useCart } from "@/lib/cart-context";
import { getWhatsappBaseUrl } from "@/lib/whatsapp";

const navItems = [
  { href: "/", label: "Menu", icon: BookOpenText },
  { href: "/carrito", label: "Carrito", icon: ShoppingBag },
  { href: "/pagina", label: "Pagina", icon: Store }
];

export const BottomNav = () => {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const whatsappUrl = getWhatsappBaseUrl();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-md border-t border-orange-100 bg-white/95 px-3 pb-4 pt-2 backdrop-blur">
      <ul className="grid grid-cols-4 gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-xs font-medium transition ${
                  isActive ? "bg-orange-100 text-orange-700" : "text-slate-500"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
                {item.href === "/carrito" && totalItems > 0 ? (
                  <span className="rounded-full bg-orange-500 px-1.5 py-0.5 text-[10px] text-white">
                    {totalItems}
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
        <li>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-xs font-medium text-emerald-700"
          >
            <MessageCircleMore className="h-4 w-4" />
            <span>WhatsApp</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};
