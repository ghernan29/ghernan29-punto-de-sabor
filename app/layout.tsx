import type { Metadata, Viewport } from "next";
import "./globals.css";
import { config } from "@/lib/config";
import BottomNav from "@/components/BottomNav";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Header from "@/components/Header";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import { getBusinessInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: `${config.businessName} — Comida a domicilio`,
  description:
    "Explora nuestro menú, arma tu pedido y ordena fácilmente por WhatsApp o a domicilio.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: config.businessName,
  },
  icons: {
    icon: "/icons/icon.svg",
    apple: "/icons/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#ea580c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const business = await getBusinessInfo();
  const whatsappNumber = business?.whatsapp_number || config.whatsappNumber;

  return (
    <html lang="es">
      <body className="with-bottom-nav min-h-screen">
        <Header />
        <main className="mx-auto w-full max-w-2xl px-4">{children}</main>
        <WhatsAppFloat numberOverride={whatsappNumber} />
        <BottomNav />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
