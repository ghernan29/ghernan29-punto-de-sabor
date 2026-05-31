import { getBusinessInfo } from "@/lib/data";
import { config } from "@/lib/config";
import {
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  MapPinIcon,
  PhoneIcon,
  TikTokIcon,
} from "@/components/icons";

export const revalidate = 60;
export const metadata = {
  title: "Nuestra Página — Punto de Sabor",
};

export default async function BusinessPage() {
  const info = await getBusinessInfo();

  if (!info) {
    return (
      <div className="card mt-8 p-10 text-center text-stone-500">
        No se encontró información del negocio.
      </div>
    );
  }

  const socials = [
    { url: info.instagram_url, label: "Instagram", Icon: InstagramIcon },
    { url: info.facebook_url, label: "Facebook", Icon: FacebookIcon },
    { url: info.tiktok_url, label: "TikTok", Icon: TikTokIcon },
  ].filter((s) => s.url);

  return (
    <div className="space-y-4 py-4">
      <header className="card bg-gradient-to-br from-brand-500 to-brand-700 p-5 text-white">
        <h1 className="text-2xl font-extrabold">{info.name || config.businessName}</h1>
        {info.description && (
          <p className="mt-2 text-sm leading-relaxed text-white/90">
            {info.description}
          </p>
        )}
      </header>

      {/* Hours */}
      {info.hours && info.hours.length > 0 && (
        <section className="card p-4">
          <h2 className="mb-3 flex items-center gap-2 text-base font-bold">
            <ClockIcon className="h-5 w-5 text-brand-600" />
            Horario
          </h2>
          <ul className="divide-y divide-stone-100 text-sm">
            {info.hours.map((h) => (
              <li key={h.day} className="flex justify-between py-1.5">
                <span className="text-stone-600">{h.day}</span>
                <span className="font-semibold text-ink">
                  {h.closed ? "Cerrado" : `${h.open} – ${h.close}`}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Address + map */}
      {info.address && (
        <section className="card overflow-hidden">
          <div className="p-4">
            <h2 className="mb-1 flex items-center gap-2 text-base font-bold">
              <MapPinIcon className="h-5 w-5 text-brand-600" />
              Dirección
            </h2>
            <p className="text-sm text-stone-600">{info.address}</p>
          </div>
          {info.map_embed_url && (
            <iframe
              title="Mapa"
              src={info.map_embed_url}
              className="h-56 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          )}
        </section>
      )}

      {/* Contact */}
      {info.phone && (
        <section className="card p-4">
          <h2 className="mb-2 flex items-center gap-2 text-base font-bold">
            <PhoneIcon className="h-5 w-5 text-brand-600" />
            Teléfono
          </h2>
          <a
            href={`tel:${info.phone.replace(/\s/g, "")}`}
            className="text-sm font-semibold text-brand-700"
          >
            {info.phone}
          </a>
        </section>
      )}

      {/* Socials */}
      {socials.length > 0 && (
        <section className="card p-4">
          <h2 className="mb-3 text-base font-bold">Síguenos</h2>
          <div className="flex gap-3">
            {socials.map(({ url, label, Icon }) => (
              <a
                key={label}
                href={url as string}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 text-ink transition hover:bg-brand-100 hover:text-brand-700"
              >
                <Icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
