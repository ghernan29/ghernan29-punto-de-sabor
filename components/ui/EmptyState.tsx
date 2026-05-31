type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
};

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
      {icon && <div className="text-4xl opacity-60">{icon}</div>}
      <h2 className="font-display text-lg font-semibold text-sage-800">
        {title}
      </h2>
      {description && (
        <p className="max-w-sm text-sm text-sage-600">{description}</p>
      )}
    </div>
  );
}
