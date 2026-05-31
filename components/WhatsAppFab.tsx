'use client';

import { usePathname } from 'next/navigation';
import { config } from '@/lib/config';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

const HIDDEN_ROUTES = ['/carrito'];

export function WhatsAppFab() {
  const pathname = usePathname();
  if (HIDDEN_ROUTES.includes(pathname ?? '')) return null;

  const href = buildWhatsAppUrl(
    `¡Hola ${config.businessName}! Quisiera hacer un pedido.`,
    config.whatsappNumber
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-500/30 transition hover:scale-105 active:scale-95 sm:bottom-6"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}

function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.11 17.42c-.27-.13-1.59-.78-1.83-.87-.25-.09-.42-.13-.6.13-.18.27-.69.87-.84 1.04-.16.18-.31.2-.58.07-.27-.13-1.13-.42-2.16-1.33-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.6-1.46-.83-2-.22-.53-.45-.46-.6-.47h-.51c-.18 0-.47.07-.71.34-.25.27-.94.92-.94 2.25 0 1.33.96 2.61 1.1 2.79.13.18 1.9 2.91 4.6 4.08.64.28 1.14.44 1.53.57.64.2 1.22.17 1.68.1.51-.08 1.59-.65 1.81-1.27.22-.62.22-1.16.16-1.27-.06-.11-.24-.18-.5-.31zM16.02 5.33c-5.89 0-10.67 4.78-10.67 10.67 0 1.88.49 3.71 1.42 5.33L5.33 26.67l5.46-1.41a10.61 10.61 0 0 0 5.23 1.34h.01c5.88 0 10.67-4.78 10.67-10.67 0-2.85-1.11-5.53-3.13-7.55a10.62 10.62 0 0 0-7.55-3.05zm0 19.45h-.01a8.83 8.83 0 0 1-4.5-1.23l-.32-.19-3.24.84.87-3.16-.21-.33a8.82 8.82 0 0 1-1.36-4.71c0-4.88 3.97-8.85 8.86-8.85 2.37 0 4.59.92 6.26 2.6a8.79 8.79 0 0 1 2.59 6.26c0 4.88-3.98 8.85-8.86 8.85z" />
    </svg>
  );
}
