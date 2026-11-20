"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useCart } from "@/components/CartProvider";

const links = [
  { href: "/", label: "Início" },
  { href: "/lojas", label: "Lojas" },
  { href: "/produtos", label: "Produtos" },
  { href: "/ofertas", label: "Ofertas" },
  { href: "/eventos", label: "Eventos" },
  { href: "/sobre", label: "Sobre" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { count } = useCart();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/produtos?q=${encodeURIComponent(trimmed)}` : "/produtos");
    setMobileOpen(false);
  }

  return (
    <header className="relative z-50">
      <div className="bg-[var(--ink)] text-[11px] font-medium tracking-wide text-white/80">
        <div className="container-shell flex h-9 items-center justify-between gap-4">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
            FLDA apresenta · MallFilipe — sempre aberto, 24/7
          </span>
          <span className="hidden sm:inline">Entrega grátis em todas as encomendas</span>
        </div>
      </div>

      <div className="sticky top-0 border-b border-[var(--line)] bg-[rgba(247,244,238,0.92)] backdrop-blur-xl">
        <div className="container-shell flex h-[74px] items-center justify-between gap-5">
          <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label="MallFilipe, página inicial">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--ink)] font-display text-lg font-bold text-[var(--gold-light)] shadow-lg transition-transform group-hover:-rotate-3">
              MF
            </span>
            <span className="leading-none">
              <span className="block font-display text-[22px] font-semibold tracking-tight">MallFilipe</span>
              <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--muted)]">by FLDA</span>
            </span>
          </Link>

          <form onSubmit={submitSearch} className="relative hidden max-w-md flex-1 lg:block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Procurar produtos, marcas ou lojas..."
              aria-label="Pesquisar no MallFilipe"
              className="h-11 w-full rounded-full border border-[var(--line)] bg-white/80 pl-11 pr-4 text-sm outline-none transition focus:border-[var(--gold)] focus:bg-white"
            />
          </form>

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Navegação principal">
            {links.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3.5 py-2 text-[13px] font-semibold transition ${
                    active ? "bg-[var(--ink)] text-white" : "text-[var(--ink-2)] hover:bg-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/carrinho"
              className="relative grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] bg-white transition hover:border-[var(--gold)]"
              aria-label={`Carrinho com ${count} artigos`}
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--gold)] px-1 text-[10px] font-bold text-[var(--ink)]">
                  {count}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] bg-white xl:hidden"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-[var(--line)] bg-[var(--cream)] px-5 py-5 xl:hidden">
            <form onSubmit={submitSearch} className="relative mb-4">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="O que procura?"
                className="input-field pl-11"
              />
            </form>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl border border-[var(--line)] bg-white px-4 py-3 text-sm font-semibold"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
