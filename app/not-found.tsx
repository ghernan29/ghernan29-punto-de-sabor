import Link from 'next/link';
import { EmptyState } from '@/components/Empty';

export default function NotFound() {
  return (
    <div className="py-8">
      <EmptyState
        icon="🌵"
        title="No encontramos esa página"
        description="Tal vez se acabó como el último taco al pastor."
        action={
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
          >
            Volver al menú
          </Link>
        }
      />
    </div>
  );
}
