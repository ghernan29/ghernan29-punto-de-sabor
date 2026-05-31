import type { ReactNode } from 'react';

export function EmptyState({
  title,
  description,
  icon,
  action,
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center gap-3 rounded-2xl border border-dashed border-brand-200 bg-white/60 px-6 py-12 text-center">
      {icon && <div className="text-4xl">{icon}</div>}
      <h3 className="font-display text-xl text-ink-900">{title}</h3>
      {description && <p className="text-sm text-ink-500">{description}</p>}
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
