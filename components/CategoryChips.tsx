'use client';

import type { Category } from '@/lib/types';

interface Props {
  categories: Category[];
  active: string;
  onChange: (slug: string) => void;
}

export function CategoryChips({ categories, active, onChange }: Props) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-1">
      <div className="flex min-w-max gap-2">
        {categories.map((c) => {
          const isActive = c.slug === active;
          return (
            <button
              key={c.slug}
              type="button"
              onClick={() => onChange(c.slug)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? 'bg-brand-500 text-white shadow'
                  : 'bg-white text-ink-700 ring-1 ring-brand-100 hover:bg-brand-50'
              }`}
            >
              {c.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
