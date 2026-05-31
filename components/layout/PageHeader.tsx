type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="px-4 pb-4">
      <h1 className="font-display text-2xl font-bold tracking-tight text-sage-800">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-1 text-sm text-sage-600">{subtitle}</p>
      )}
    </header>
  );
}
