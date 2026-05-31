import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { BottomNav } from "@/components/bottom-nav";
import { CartProvider } from "@/components/cart-provider";
import { FloatingWhatsAppButton } from "@/components/floating-whatsapp-button";
import { Header } from "@/components/header";
import { PWARegister } from "@/components/pwa-register";
import { appConfig } from "@/lib/config";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(appConfig.siteUrl),
  title: {
    default: "Punto de Sabor",
    template: "%s | Punto de Sabor"
  },
  description: "Menu, carrito y pedidos por WhatsApp para Punto de Sabor.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Punto de Sabor",
    statusBarStyle: "default"
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg"
  }
};

export const viewport: Viewport = {
  themeColor: "#ea580c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <CartProvider>
          <PWARegister />
          <Header />
          <main className="mx-auto min-h-screen max-w-6xl px-4 pb-32 pt-6 md:pb-16">{children}</main>
          <FloatingWhatsAppButton />
          <BottomNav />
        </CartProvider>
      </body>
    </html>
  );
}
