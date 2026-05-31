'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from './CartProvider';
import { config } from '@/lib/config';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface NavItem {
  href: string;
  label: string;
  match: (path: string) => boolean;
  icon: (active: boolean) => JSX.Element;
  external?: boolean;
  badge?: number;
}

export function BottomNav() {
  const pathname = usePathname() ?? '/';
  const { totalQuantity } = useCart();

  const items: NavItem[] = [
    {
      href: '/',
      label: 'Menú',
      match: (p) => p === '/',
      icon: (active) => <IconMenu active={active} />,
    },
    {
      href: '/carrito',
      label: 'Pedido',
      match: (p) => p.startsWith('/carrito'),
      icon: (active) => <IconCart active={active} />,
      badge: totalQuantity,
    },
    {
      href: '/pagina',
      label: 'Página',
      match: (p) => p.startsWith('/pagina'),
      icon: (active) => <IconInfo active={active} />,
    },
    {
      href: buildWhatsAppUrl(
        `¡Hola ${config.businessName}!`,
        config.whatsappNumber
      ),
      label: 'WhatsApp',
      match: () => false,
      icon: () => <IconWhatsApp />,
      external: true,
    },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-brand-100/80 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur sm:hidden">
      <ul className="mx-auto flex max-w-md items-stretch justify-around px-2">
        {items.map((item) => {
          const active = item.match(pathname);
          const content = (
            <span
              className={`flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium transition ${
                active ? 'text-brand-600' : 'text-ink-500 hover:text-ink-900'
              }`}
            >
              <span className="relative">
                {item.icon(active)}
                {!!item.badge && item.badge > 0 && (
                  <span className="absolute -right-2 -top-1 min-w-[18px] rounded-full bg-brand-500 px-1 text-center text-[10px] font-bold leading-[18px] text-white">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </span>
              {item.label}
            </span>
          );

          return (
            <li key={item.label} className="flex flex-1">
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1"
                >
                  {content}
                </a>
              ) : (
                <Link href={item.href} className="flex flex-1">
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

function baseClasses(active: boolean) {
  return `h-6 w-6 ${active ? 'stroke-brand-600' : 'stroke-ink-500'}`;
}

function IconMenu({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} className={baseClasses(active)}>
      <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h10" />
    </svg>
  );
}

function IconCart({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} className={baseClasses(active)}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6" />
      <circle cx="10" cy="20" r="1.3" />
      <circle cx="17" cy="20" r="1.3" />
    </svg>
  );
}

function IconInfo({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} className={baseClasses(active)}>
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M12 8h.01M11 12h1v5h1" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 32 32" className="h-6 w-6 fill-[#25D366]" aria-hidden="true">
      <path d="M19.11 17.42c-.27-.13-1.59-.78-1.83-.87-.25-.09-.42-.13-.6.13-.18.27-.69.87-.84 1.04-.16.18-.31.2-.58.07-.27-.13-1.13-.42-2.16-1.33-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.6-1.46-.83-2-.22-.53-.45-.46-.6-.47h-.51c-.18 0-.47.07-.71.34-.25.27-.94.92-.94 2.25 0 1.33.96 2.61 1.1 2.79.13.18 1.9 2.91 4.6 4.08.64.28 1.14.44 1.53.57.64.2 1.22.17 1.68.1.51-.08 1.59-.65 1.81-1.27.22-.62.22-1.16.16-1.27-.06-.11-.24-.18-.5-.31zM16.02 5.33c-5.89 0-10.67 4.78-10.67 10.67 0 1.88.49 3.71 1.42 5.33L5.33 26.67l5.46-1.41a10.61 10.61 0 0 0 5.23 1.34h.01c5.88 0 10.67-4.78 10.67-10.67 0-2.85-1.11-5.53-3.13-7.55a10.62 10.62 0 0 0-7.55-3.05z" />
    </svg>
  );
}
