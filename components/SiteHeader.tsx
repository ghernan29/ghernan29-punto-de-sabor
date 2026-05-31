'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from './CartProvider';
import { config } from '@/lib/config';

const links = [
  { href: '/', label: 'Menú' },
  { href: '/carrito', label: 'Pedido' },
  { href: '/pagina', label: 'Nuestra página' },
];

export function SiteHeader() {
  const pathname = usePathname() ?? '/';
  const { totalQuantity } = useCart();

  return (
    <header className="sticky top-0 z-20 border-b border-brand-100/70 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-lg">
            🌶️
          </span>
          <span className="font-display text-xl leading-none text-ink-900">
            {config.businessName}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((l) => {
            const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? 'bg-brand-500 text-white'
                    : 'text-ink-700 hover:bg-brand-100'
                }`}
              >
                {l.label}
                {l.href === '/carrito' && totalQuantity > 0 && (
                  <span className="ml-2 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-bold text-brand-600">
                    {totalQuantity}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/carrito"
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink-900 ring-1 ring-brand-100 sm:hidden"
          aria-label="Ver pedido"
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} className="h-5 w-5 stroke-ink-900">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6"
            />
            <circle cx="10" cy="20" r="1.3" />
            <circle cx="17" cy="20" r="1.3" />
          </svg>
          {totalQuantity > 0 && (
            <span className="absolute -right-1 -top-1 min-w-[18px] rounded-full bg-brand-500 px-1 text-center text-[10px] font-bold leading-[18px] text-white">
              {totalQuantity > 99 ? '99+' : totalQuantity}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
