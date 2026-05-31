import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-orange-100 bg-amber-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-600 text-xl font-black text-white">
            PS
          </span>
          <div>
            <p className="text-lg font-black leading-none text-stone-950">Punto de Sabor</p>
            <p className="text-xs font-semibold text-orange-700">Comida fresca y lista para ti</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-bold text-stone-700 md:flex">
          <Link className="hover:text-orange-700" href="/">
            Menu
          </Link>
          <Link className="hover:text-orange-700" href="/carrito">
            Carrito
          </Link>
          <Link className="hover:text-orange-700" href="/pagina">
            Nuestra Pagina
          </Link>
        </nav>
      </div>
    </header>
  );
}
