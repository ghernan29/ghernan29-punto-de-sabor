import type { Metadata, Viewport } from "next"
import Link from "next/link"
import { Playfair_Display, Inter } from "next/font/google"

import { BottomNav } from "@/components/bottom-nav"
import { CartQuickBar } from "@/components/cart-quick-bar"
import { FloatingWhatsAppButton } from "@/components/floating-whatsapp-button"
import { Providers } from "@/components/providers"
import "./globals.css"

const headingFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
})

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "Punto de Sabor",
  description:
    "Menu digital, carrito y pedidos por WhatsApp para Punto de Sabor.",
  applicationName: "Punto de Sabor",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
}

export const viewport: Viewport = {
  themeColor: "#f97316",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${headingFont.variable} ${bodyFont.variable} bg-orange-50 font-sans text-slate-900 antialiased`}
      >
        <Providers>
          <div className="min-h-screen pb-36">
            <header className="sticky top-0 z-30 border-b border-orange-100 bg-white/90 backdrop-blur">
              <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
                <Link href="/menu" className="space-y-0.5">
                  <p
                    className="text-sm uppercase tracking-[0.3em] text-brand-700"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Restaurante
                  </p>
                  <p
                    className="text-2xl font-bold"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Punto de Sabor
                  </p>
                </Link>
                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  Pedido rapido
                </span>
              </div>
            </header>

            <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6">
              {children}
            </main>

            <CartQuickBar />
            <FloatingWhatsAppButton />
            <BottomNav />
          </div>
        </Providers>
      </body>
    </html>
  )
}
