import { Clock, Facebook, Instagram, MapPin, Phone, Send } from "lucide-react";

import type { BusinessInfo, Json } from "@/lib/types";

type HourEntry = {
  day: string;
  hours: string;
};

export function BusinessDetails({ info }: { info: BusinessInfo }) {
  const hours = parseHours(info.hours);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <section className="space-y-5 rounded-[2rem] border border-orange-100 bg-white p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">Nuestra Pagina</p>
        <h1 className="text-3xl font-black text-stone-950">{info.business_name}</h1>
        <p className="leading-7 text-stone-700">{info.description}</p>

        <div className="grid gap-4 sm:grid-cols-2">
          <InfoCard icon={<Clock aria-hidden="true" />} title="Horario">
            {hours.length > 0 ? (
              <ul className="space-y-1">
                {hours.map((entry) => (
                  <li key={entry.day} className="flex justify-between gap-4 text-sm">
                    <span className="font-bold text-stone-700">{entry.day}</span>
                    <span className="text-right text-stone-600">{entry.hours}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-stone-600">Horario por confirmar.</p>
            )}
          </InfoCard>

          <InfoCard icon={<Phone aria-hidden="true" />} title="Telefono">
            <a className="font-bold text-orange-700 hover:text-orange-800" href={`tel:${info.phone}`}>
              {info.phone}
            </a>
          </InfoCard>
        </div>

        <InfoCard icon={<MapPin aria-hidden="true" />} title="Direccion">
          <p className="text-sm leading-6 text-stone-600">{info.address}</p>
        </InfoCard>

        <div className="flex flex-wrap gap-3">
          <SocialLink href={info.instagram_url} label="Instagram" icon={<Instagram size={18} aria-hidden="true" />} />
          <SocialLink href={info.facebook_url} label="Facebook" icon={<Facebook size={18} aria-hidden="true" />} />
          <SocialLink href={info.tiktok_url} label="TikTok" icon={<Send size={18} aria-hidden="true" />} />
        </div>
      </section>

      <aside className="overflow-hidden rounded-[2rem] border border-orange-100 bg-white shadow-sm">
        {info.map_embed_url ? (
          <iframe
            src={info.map_embed_url}
            title={`Mapa de ${info.business_name}`}
            className="h-[420px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="flex h-[420px] items-center justify-center bg-orange-100 px-8 text-center font-bold text-orange-800">
            Agrega un map_embed_url en Supabase para mostrar el mapa aqui.
          </div>
        )}
      </aside>
    </div>
  );
}

function InfoCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-amber-50 p-4">
      <div className="mb-3 flex items-center gap-2 text-orange-700">
        {icon}
        <h2 className="font-black text-stone-950">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function SocialLink({ href, label, icon }: { href: string | null; label: string; icon: React.ReactNode }) {
  if (!href) {
    return null;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-700"
    >
      {icon}
      {label}
    </a>
  );
}

function parseHours(value: Json): HourEntry[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((entry): entry is HourEntry => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      return false;
    }

    return typeof entry.day === "string" && typeof entry.hours === "string";
  });
}
