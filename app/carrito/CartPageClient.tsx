'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { EmptyState } from '@/components/Empty';
import { formatPrice } from '@/lib/format';
import { buildWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';
import type { OrderType } from '@/lib/types';

interface InitialConfig {
  deliveryFee: number;
  minOrder: number;
  currency: string;
  whatsappNumber: string;
}

export function CartPageClient({ initialConfig }: { initialConfig: InitialConfig }) {
  const { lines, subtotal, increment, decrement, remove, clear, toOrderItems } = useCart();

  const [type, setType] = useState<OrderType>('delivery');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const deliveryFee = type === 'delivery' ? initialConfig.deliveryFee : 0;
  const total = subtotal + deliveryFee;
  const belowMin = subtotal > 0 && subtotal < initialConfig.minOrder;

  const formInvalid = useMemo(() => {
    if (lines.length === 0) return true;
    if (!name.trim() || !phone.trim()) return true;
    if (type === 'delivery' && !address.trim()) return true;
    if (belowMin) return true;
    return false;
  }, [lines.length, name, phone, type, address, belowMin]);

  if (lines.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="font-display text-3xl text-ink-900">Tu pedido</h1>
        <EmptyState
          icon="🛒"
          title="Tu carrito está vacío"
          description="Agrega tus platillos favoritos desde el menú para empezar tu pedido."
          action={
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
            >
              Ver el menú
            </Link>
          }
        />
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (formInvalid || submitting) return;
    setSubmitting(true);
    setErrorMsg(null);

    const items = toOrderItems();
    const payload = {
      customer_name: name.trim(),
      customer_phone: phone.trim(),
      type,
      address: type === 'delivery' ? address.trim() : null,
      notes: notes.trim() || null,
      items,
      subtotal: round2(subtotal),
      delivery_fee: round2(deliveryFee),
      total: round2(total),
    };

    let savedOk = true;
    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabase()!;
        const { error } = await supabase.from('orders').insert(payload);
        if (error) {
          savedOk = false;
          setErrorMsg(
            `No pudimos guardar el pedido en el sistema (${error.message}). Aun así puedes enviarlo por WhatsApp.`
          );
        }
      } catch (err) {
        savedOk = false;
        setErrorMsg(
          `No pudimos guardar el pedido en el sistema. Aun así puedes enviarlo por WhatsApp.`
        );
      }
    }

    const message = buildWhatsAppMessage({
      items,
      subtotal,
      deliveryFee,
      total,
      type,
      customerName: payload.customer_name,
      customerPhone: payload.customer_phone,
      address: payload.address,
      notes: payload.notes,
      currency: initialConfig.currency,
    });
    const url = buildWhatsAppUrl(message, initialConfig.whatsappNumber);

    if (savedOk) clear();

    setSubmitting(false);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function handleQuickWhatsApp() {
    const items = toOrderItems();
    const message = buildWhatsAppMessage({
      items,
      subtotal,
      deliveryFee,
      total,
      type,
      currency: initialConfig.currency,
    });
    const url = buildWhatsAppUrl(message, initialConfig.whatsappNumber);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between gap-4">
        <h1 className="font-display text-3xl text-ink-900">Tu pedido</h1>
        <button
          type="button"
          onClick={clear}
          className="text-xs font-medium text-ink-500 underline-offset-2 hover:text-brand-600 hover:underline"
        >
          Vaciar carrito
        </button>
      </header>

      <section className="space-y-3">
        {lines.map((line) => (
          <article
            key={line.id}
            className="flex gap-3 rounded-2xl bg-white p-3 shadow-card"
          >
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-brand-100">
              {line.image_url ? (
                <Image
                  src={line.image_url}
                  alt={line.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-2xl">🍽️</div>
              )}
            </div>

            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium leading-tight text-ink-900">{line.name}</h3>
                <button
                  type="button"
                  onClick={() => remove(line.id)}
                  className="text-xs text-ink-500 hover:text-brand-600"
                  aria-label={`Quitar ${line.name}`}
                >
                  Quitar
                </button>
              </div>
              <p className="text-sm text-ink-500">
                {formatPrice(line.price, initialConfig.currency)} c/u
              </p>

              <div className="mt-auto flex items-center justify-between pt-2">
                <div className="inline-flex items-center rounded-full bg-brand-50 ring-1 ring-brand-100">
                  <QtyButton onClick={() => decrement(line.id)} label="−" />
                  <span className="w-8 text-center text-sm font-semibold">{line.quantity}</span>
                  <QtyButton onClick={() => increment(line.id)} label="+" />
                </div>
                <span className="font-semibold text-ink-900">
                  {formatPrice(line.price * line.quantity, initialConfig.currency)}
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-2xl bg-white p-4 shadow-card">
        <h2 className="font-display text-xl text-ink-900">Entrega</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <TypeChoice
            active={type === 'delivery'}
            onClick={() => setType('delivery')}
            title="A domicilio"
            subtitle={`Envío ${formatPrice(initialConfig.deliveryFee, initialConfig.currency)}`}
          />
          <TypeChoice
            active={type === 'pickup'}
            onClick={() => setType('pickup')}
            title="Recoger"
            subtitle="Sin costo extra"
          />
        </div>
      </section>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl bg-white p-4 shadow-card"
      >
        <h2 className="font-display text-xl text-ink-900">Tus datos</h2>

        <Field label="Nombre completo" required>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
            className={inputClass}
            placeholder="Ana López"
          />
        </Field>

        <Field label="Teléfono" required>
          <input
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            autoComplete="tel"
            className={inputClass}
            placeholder="55 1234 5678"
          />
        </Field>

        {type === 'delivery' && (
          <Field label="Dirección de entrega" required>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              rows={2}
              autoComplete="street-address"
              className={inputClass}
              placeholder="Calle, número, colonia, referencias…"
            />
          </Field>
        )}

        <Field label="Notas (opcional)">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className={inputClass}
            placeholder="Sin cebolla, pago con $500…"
          />
        </Field>
      </form>

      <section className="rounded-2xl bg-white p-4 shadow-card">
        <h2 className="font-display text-xl text-ink-900">Resumen</h2>
        <dl className="mt-3 space-y-1.5 text-sm">
          <Row label="Subtotal" value={formatPrice(subtotal, initialConfig.currency)} />
          {type === 'delivery' && (
            <Row
              label="Envío"
              value={
                initialConfig.deliveryFee > 0
                  ? formatPrice(initialConfig.deliveryFee, initialConfig.currency)
                  : 'Gratis'
              }
            />
          )}
          <Row
            label="Total"
            value={formatPrice(total, initialConfig.currency)}
            emphasize
          />
        </dl>

        {belowMin && (
          <p className="mt-3 rounded-xl bg-brand-50 px-3 py-2 text-sm text-brand-700">
            El pedido mínimo es {formatPrice(initialConfig.minOrder, initialConfig.currency)}.
            Te faltan {formatPrice(initialConfig.minOrder - subtotal, initialConfig.currency)}.
          </p>
        )}

        {errorMsg && (
          <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">
            {errorMsg}
          </p>
        )}
      </section>

      <div className="sticky bottom-20 z-10 -mx-4 space-y-2 bg-gradient-to-t from-cream via-cream/95 to-cream/0 px-4 pb-2 pt-6 sm:static sm:mx-0 sm:bg-none sm:p-0">
        <button
          type="button"
          onClick={handleSubmit as unknown as () => void}
          disabled={formInvalid || submitting}
          className={`w-full rounded-full px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition ${
            formInvalid || submitting
              ? 'cursor-not-allowed bg-ink-500/40'
              : 'bg-[#25D366] hover:bg-[#1ebd5a] active:scale-[0.99]'
          }`}
        >
          {submitting ? 'Enviando…' : `Pedir por WhatsApp · ${formatPrice(total, initialConfig.currency)}`}
        </button>
        <button
          type="button"
          onClick={handleQuickWhatsApp}
          className="w-full rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink-700 ring-1 ring-brand-100 hover:bg-brand-50"
        >
          Enviar solo el carrito sin guardar
        </button>
      </div>
    </div>
  );
}

const inputClass =
  'w-full rounded-xl border border-brand-100 bg-cream/40 px-3 py-2.5 text-sm text-ink-900 placeholder:text-ink-500/60 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200';

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1">
      <span className="text-xs font-medium uppercase tracking-wide text-ink-500">
        {label}
        {required && <span className="text-brand-500"> *</span>}
      </span>
      {children}
    </label>
  );
}

function QtyButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-8 w-8 rounded-full text-base font-bold text-brand-600 hover:bg-brand-100"
      aria-label={label === '+' ? 'Aumentar' : 'Disminuir'}
    >
      {label}
    </button>
  );
}

function TypeChoice({
  active,
  onClick,
  title,
  subtitle,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-3 py-3 text-left transition ${
        active
          ? 'bg-brand-500 text-white shadow'
          : 'bg-brand-50 text-ink-900 ring-1 ring-brand-100 hover:bg-brand-100'
      }`}
    >
      <div className="text-sm font-semibold">{title}</div>
      <div className={`text-xs ${active ? 'text-white/80' : 'text-ink-500'}`}>{subtitle}</div>
    </button>
  );
}

function Row({
  label,
  value,
  emphasize,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between ${
        emphasize ? 'border-t border-brand-100 pt-2 text-base font-semibold text-ink-900' : 'text-ink-700'
      }`}
    >
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
