import type { Metadata, Viewport } from 'next';
import './globals.css';
import { CartProvider } from '@/components/CartProvider';
import { SiteHeader } from '@/components/SiteHeader';
import { BottomNav } from '@/components/BottomNav';
import { WhatsAppFab } from '@/components/WhatsAppFab';
import { config } from '@/lib/config';

export const metadata: Metadata = {
  title: {
    default: `${config.businessName} — Cocina mexicana a domicilio`,
    template: `%s · ${config.businessName}`,
  },
  description:
    'Pide en línea: menú casero, entregas a domicilio y pedidos por WhatsApp en Punto de Sabor.',
  manifest: '/manifest.webmanifest',
  applicationName: config.businessName,
  appleWebApp: {
    capable: true,
    title: config.businessName,
    statusBarStyle: 'default',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icon-192.png', sizes: '192x192', type: 'image/png' }],
  },
  openGraph: {
    title: config.businessName,
    description: 'Cocina mexicana hecha con cariño. Pide en línea.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#f25a18',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <SiteHeader />
          <main className="mx-auto w-full max-w-5xl px-4 pb-32 pt-4 sm:pb-12">
            {children}
          </main>
          <WhatsAppFab />
          <BottomNav />
        </CartProvider>
      </body>
    </html>
  );
}
