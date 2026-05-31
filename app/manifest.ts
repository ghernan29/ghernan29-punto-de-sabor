import type { MetadataRoute } from "next";

import { publicConfig } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: publicConfig.businessName,
    short_name: "Punto Sabor",
    description: "Menu y pedidos por WhatsApp",
    start_url: "/",
    display: "standalone",
    background_color: "#fff7ed",
    theme_color: "#f97316",
    lang: "es",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "any"
      },
      {
        src: "/icons/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable"
      }
    ]
  };
}
