import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Punto de Sabor",
    short_name: "Punto de Sabor",
    description:
      "Menu digital y pedidos por WhatsApp para Punto de Sabor.",
    start_url: "/menu",
    display: "standalone",
    background_color: "#fffaf5",
    theme_color: "#f97316",
    lang: "es",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
