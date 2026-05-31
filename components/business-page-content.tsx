import Link from "next/link"
import { Camera, Users, MapPinned, Phone, Music2 } from "lucide-react"

import type { BusinessInfoRow } from "@/types/database"

type BusinessPageContentProps = {
  businessInfo: BusinessInfoRow
}

export function BusinessPageContent({
  businessInfo,
}: BusinessPageContentProps) {
  const socialLinks = [
    {
      href: businessInfo.instagram_url,
      label: "Instagram",
      icon: Camera,
    },
    {
      href: businessInfo.facebook_url,
      label: "Facebook",
      icon: Users,
    },
    {
      href: businessInfo.tiktok_url,
      label: "TikTok",
      icon: Music2,
    },
  ].filter((item) => item.href)

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] bg-hero-gradient p-6 shadow-soft">
        <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
          Nuestra Pagina
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
          La historia y datos de Punto de Sabor
        </h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          {businessInfo.description}
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-[2rem] border border-orange-100 bg-white p-5 shadow-soft">
          <h2 className="text-lg font-semibold text-slate-950">Horario</h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
            {businessInfo.hours}
          </p>
        </article>

        <article className="rounded-[2rem] border border-orange-100 bg-white p-5 shadow-soft">
          <h2 className="text-lg font-semibold text-slate-950">Contacto</h2>
          <div className="mt-4 space-y-4 text-sm text-slate-600">
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 text-brand-700" />
              <div>
                <p className="font-medium text-slate-900">{businessInfo.phone}</p>
                <a
                  href={`tel:${businessInfo.phone}`}
                  className="text-brand-700 hover:underline"
                >
                  Llamar ahora
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPinned className="mt-0.5 h-4 w-4 text-brand-700" />
              <p>{businessInfo.address}</p>
            </div>
          </div>
        </article>
      </section>

      {socialLinks.length > 0 ? (
        <section className="rounded-[2rem] border border-orange-100 bg-white p-5 shadow-soft">
          <h2 className="text-lg font-semibold text-slate-950">Siguenos</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {socialLinks.map((link) => {
              const Icon = link.icon

              return (
                <Link
                  key={link.label}
                  href={link.href!}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-sm font-medium text-brand-700 transition hover:border-brand-200 hover:bg-orange-100"
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              )
            })}
          </div>
        </section>
      ) : null}

      <section className="overflow-hidden rounded-[2rem] border border-orange-100 bg-white shadow-soft">
        <div className="border-b border-orange-100 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-950">Como llegar</h2>
        </div>

        {businessInfo.map_embed_url ? (
          <iframe
            src={businessInfo.map_embed_url}
            title="Mapa Punto de Sabor"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[320px] w-full"
          />
        ) : (
          <div className="px-5 py-8 text-sm text-slate-500">
            Agrega la URL embebida del mapa desde Supabase para mostrarla aqui.
          </div>
        )}
      </section>
    </div>
  )
}
