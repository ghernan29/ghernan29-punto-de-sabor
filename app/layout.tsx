import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { BottomNav } from "@/components/bottom-nav";
import { FloatingWhatsappButton } from "@/components/floating-whatsapp-button";
import { publicConfig } from "@/lib/config";
import { Providers } from "@/app/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${publicConfig.businessName} | Pedido en linea`,
  description: "Menu digital y pedidos por WhatsApp de Punto de Sabor.",
  manifest: "/manifest.webmanifest",
  applicationName: publicConfig.businessName,
  keywords: ["restaurante", "menu", "domicilios", "whatsapp", "pwa"],
  icons: {
    icon: [
      { url: "/icons/icon-192.svg", type: "image/svg+xml" },
      { url: "/icons/icon-512.svg", type: "image/svg+xml" }
    ],
    apple: [{ url: "/icons/icon-192.svg", type: "image/svg+xml" }]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f97316"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <main className="min-h-screen">{children}</main>
          <FloatingWhatsappButton />
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
