import type { BusinessInfo } from "@/lib/types";
import { EmptyState } from "@/components/ui/EmptyState";

type BusinessPageViewProps = {
  info: BusinessInfo | null;
};

export function BusinessPageView({ info }: BusinessPageViewProps) {
  if (!info) {
    return (
      <EmptyState
        title="Información no disponible"
        description="Configura la tabla business_info en Supabase."
        icon="📍"
      />
    );
  }

  const socials = [
    { label: "Instagram", url: info.instagram_url, icon: "📸" },
    { label: "Facebook", url: info.facebook_url, icon: "👍" },
    { label: "TikTok", url: info.tiktok_url, icon: "🎵" },
  ].filter((s) => s.url);

  return (
    <div className="space-y-6 px-4 pb-8">
      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-sage-100">
        <h2 className="font-display text-lg font-bold text-sage-800">
          {info.name}
        </h2>
        {info.description && (
          <p className="mt-2 text-sm leading-relaxed text-sage-600">
            {info.description}
          </p>
        )}
      </section>

      {info.hours_json.length > 0 && (
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-sage-100">
          <h2 className="mb-3 font-display text-lg font-bold text-sage-800">
            Horario
          </h2>
          <ul className="space-y-1 text-sm">
            {info.hours_json.map((row) => (
              <li
                key={row.day}
                className="flex justify-between gap-4 text-sage-700"
              >
                <span className="font-medium">{row.day}</span>
                <span>{row.hours}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {info.address && (
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-sage-100">
          <h2 className="mb-2 font-display text-lg font-bold text-sage-800">
            Ubicación
          </h2>
          <p className="text-sm text-sage-600">{info.address}</p>
          {info.map_embed_url && (
            <div className="mt-3 overflow-hidden rounded-xl ring-1 ring-sage-100">
              <iframe
                title="Mapa"
                src={info.map_embed_url}
                className="h-48 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          )}
        </section>
      )}

      {info.phone && (
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-sage-100">
          <h2 className="mb-2 font-display text-lg font-bold text-sage-800">
            Teléfono
          </h2>
          <a
            href={`tel:${info.phone.replace(/\s/g, "")}`}
            className="text-brand-700 font-semibold hover:underline"
          >
            {info.phone}
          </a>
        </section>
      )}

      {socials.length > 0 && (
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-sage-100">
          <h2 className="mb-3 font-display text-lg font-bold text-sage-800">
            Redes sociales
          </h2>
          <ul className="flex flex-wrap gap-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-sage-100 px-4 py-2 text-sm font-medium text-sage-800 transition hover:bg-brand-100 hover:text-brand-800"
                >
                  <span>{s.icon}</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
