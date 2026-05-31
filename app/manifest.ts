import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Punto de Sabor",
    short_name: "Punto Sabor",
    description: "Menu y pedidos por WhatsApp de Punto de Sabor.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff7ed",
    theme_color: "#ea580c",
    lang: "es",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable"
      }
    ]
  };
}
