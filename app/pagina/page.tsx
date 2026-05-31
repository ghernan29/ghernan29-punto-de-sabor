import type { Metadata } from 'next';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';
import type { BusinessInfo } from '@/lib/types';
import { EmptyState } from '@/components/Empty';
import { config } from '@/lib/config';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Nuestra página',
};

export const revalidate = 300;

async function loadBusiness(): Promise<BusinessInfo | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = getSupabase()!;
  const { data, error } = await supabase
    .from('business_info')
    .select('*')
    .eq('id', 1)
    .maybeSingle();
  if (error || !data) return null;
  return {
    ...data,
    delivery_fee: Number(data.delivery_fee ?? 0),
    min_order: Number(data.min_order ?? 0),
    hours: Array.isArray(data.hours) ? data.hours : [],
  } as BusinessInfo;
}

export default async function PaginaPage() {
  const info = await loadBusiness();

  if (!info) {
    return (
      <div className="space-y-6">
        <h1 className="font-display text-3xl text-ink-900">Nuestra página</h1>
        <EmptyState
          icon="ℹ️"
          title="Aún no hay información del negocio"
          description="Conecta Supabase y ejecuta supabase/seed.sql para mostrar tu dirección, horarios y redes sociales."
        />
      </div>
    );
  }

  const whatsappHref = buildWhatsAppUrl(
    `¡Hola ${info.name}! Tengo una pregunta.`,
    info.whatsapp_number || config.whatsappNumber
  );

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 p-6 text-white shadow-card sm:p-8">
        <p className="text-sm uppercase tracking-wider text-white/80">{info.tagline ?? 'Bienvenidos'}</p>
        <h1 className="mt-1 font-display text-3xl leading-tight sm:text-4xl">{info.name}</h1>
        {info.description && (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
            {info.description}
          </p>
        )}
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card title="Horarios" icon="🕒">
          {info.hours.length === 0 ? (
            <p className="text-sm text-ink-500">Sin horarios configurados.</p>
          ) : (
            <ul className="divide-y divide-brand-100 text-sm">
              {info.hours.map((h) => (
                <li key={h.day} className="flex items-center justify-between py-1.5">
                  <span className="font-medium text-ink-900">{h.day}</span>
                  <span className="text-ink-700">
                    {h.closed ? 'Cerrado' : `${h.open} – ${h.close}`}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Contacto" icon="📞">
          <ul className="space-y-2 text-sm">
            {info.phone && (
              <li>
                <a
                  href={`tel:${info.phone.replace(/\s/g, '')}`}
                  className="text-ink-900 hover:text-brand-600"
                >
                  {info.phone}
                </a>
              </li>
            )}
            {info.email && (
              <li>
                <a
                  href={`mailto:${info.email}`}
                  className="text-ink-900 hover:text-brand-600"
                >
                  {info.email}
                </a>
              </li>
            )}
            {info.address && <li className="text-ink-700">{info.address}</li>}
          </ul>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1ebd5a]"
          >
            Escribir por WhatsApp
          </a>
        </Card>
      </div>

      {info.map_embed_url && (
        <Card title="Cómo llegar" icon="📍">
          <div className="overflow-hidden rounded-xl">
            <iframe
              src={info.map_embed_url}
              title={`Mapa de ${info.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-64 w-full border-0 sm:h-80"
              allowFullScreen
            />
          </div>
          {info.address && (
            <p className="mt-3 text-sm text-ink-500">{info.address}</p>
          )}
        </Card>
      )}

      <Card title="Síguenos" icon="💬">
        <ul className="flex flex-wrap gap-2">
          {info.instagram_url && (
            <SocialLink href={info.instagram_url} label="Instagram" />
          )}
          {info.facebook_url && (
            <SocialLink href={info.facebook_url} label="Facebook" />
          )}
          {info.tiktok_url && <SocialLink href={info.tiktok_url} label="TikTok" />}
          {!info.instagram_url && !info.facebook_url && !info.tiktok_url && (
            <p className="text-sm text-ink-500">Aún no hay redes sociales configuradas.</p>
          )}
        </ul>
      </Card>
    </div>
  );
}

function Card({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-white p-4 shadow-card sm:p-5">
      <h2 className="mb-3 flex items-center gap-2 font-display text-xl text-ink-900">
        {icon && <span aria-hidden>{icon}</span>}
        {title}
      </h2>
      {children}
    </section>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-ink-900 ring-1 ring-brand-100 hover:bg-brand-100"
    >
      {label}
    </a>
  );
}
