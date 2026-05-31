'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { MenuItem } from '@/lib/types';
import { formatPrice } from '@/lib/format';
import { useCart } from './CartProvider';

export function MenuItemCard({ item }: { item: MenuItem }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const disabled = !item.is_available;

  function handleAdd() {
    if (disabled) return;
    add(item);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition ${
        disabled ? 'opacity-70' : 'hover:-translate-y-0.5 hover:shadow-lg'
      }`}
    >
      <div className="relative h-44 w-full bg-brand-100">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl">🍽️</div>
        )}
        {disabled && (
          <span className="absolute left-3 top-3 rounded-full bg-ink-900/85 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            Agotado
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg leading-tight text-ink-900">{item.name}</h3>
          <span className="shrink-0 font-semibold text-brand-600">
            {formatPrice(Number(item.price))}
          </span>
        </div>
        {item.description && (
          <p className="line-clamp-3 text-sm text-ink-500">{item.description}</p>
        )}

        <div className="mt-auto pt-3">
          <button
            type="button"
            onClick={handleAdd}
            disabled={disabled}
            className={`w-full rounded-full px-4 py-2.5 text-sm font-semibold transition ${
              disabled
                ? 'cursor-not-allowed bg-ink-500/20 text-ink-500'
                : added
                  ? 'bg-accent-500 text-white'
                  : 'bg-brand-500 text-white hover:bg-brand-600 active:scale-[0.98]'
            }`}
          >
            {disabled ? 'Agotado' : added ? '¡Agregado!' : 'Agregar'}
          </button>
        </div>
      </div>
    </article>
  );
}
