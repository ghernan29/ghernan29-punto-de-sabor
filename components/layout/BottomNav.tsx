"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { config } from "@/lib/config";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const navItems = [
  { href: "/", label: "Menú", icon: "🍽️" },
  { href: "/carrito", label: "Carrito", icon: "🛒", badge: true },
  { href: "/pagina", label: "Página", icon: "📍" },
  { href: "__whatsapp__", label: "WhatsApp", icon: "💬" },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-sage-100 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur-md"
      aria-label="Navegación principal"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-around px-2 py-2">
        {navItems.map((item) => {
          const isWhatsApp = item.href === "__whatsapp__";
          const isActive =
            !isWhatsApp &&
            (item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href));

          const whatsappHref = getWhatsAppUrl(
            `¡Hola! Me gustaría hacer un pedido en ${config.siteName}.`
          );

          const className = `flex flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-xs transition-colors ${
            isActive
              ? "text-brand-700 font-semibold"
              : "text-sage-600 hover:text-brand-600"
          }`;

          const content = (
            <>
              <span className="relative text-xl leading-none">
                {item.icon}
                {"badge" in item && item.badge && itemCount > 0 && (
                  <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </span>
              <span>{item.label}</span>
            </>
          );

          return (
            <li key={item.label} className="flex flex-1">
              {isWhatsApp ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {content}
                </a>
              ) : (
                <Link href={item.href} className={className}>
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
