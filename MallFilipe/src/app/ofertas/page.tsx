import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Percent } from "lucide-react";
import { Catalog } from "@/components/Catalog";
import { getProducts } from "@/lib/data";
import { formatCurrency, discountPercentage } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ofertas",
  description: "Promoções e descontos das lojas do MallFilipe.",
};

export default async function OffersPage() {
  const products = await getProducts();
  const offers = products.filter((product) => product.oldPrice !== null);
  const best = [...offers].sort((a, b) => {
    const discountA = discountPercentage(a.price, a.oldPrice) ?? 0;
    const discountB = discountPercentage(b.price, b.oldPrice) ?? 0;
    return discountB - discountA;
  })[0];
  const totalSavings = offers.reduce((sum, product) => sum + ((product.oldPrice ?? product.price) - product.price), 0);

  return (
    <>
      <section className="relative overflow-hidden bg-[var(--ink)] py-16 text-white">
        <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-[var(--gold)]/15 blur-3xl" />
        <div className="container-shell relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--gold-light)]">
              <Percent className="h-3.5 w-3.5" /> Semana de descontos
            </span>
            <h1 className="mt-6 font-display text-[clamp(2.8rem,6vw,5.2rem)] font-semibold leading-tight">Boas escolhas, <span className="text-[var(--gold-light)]">melhores preços.</span></h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/65">
              {offers.length} propostas com preço especial das lojas MallFilipe. A seleção muda todas as semanas.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="#ofertas" className="btn-gold">Ver promoções <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/lojas" className="btn-outline border-white/30 text-white hover:bg-white hover:text-[var(--ink)]">Explorar lojas</Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--gold-light)]">Poupança total da seleção</p>
            <strong className="mt-3 block font-display text-5xl">{formatCurrency(totalSavings)}</strong>
            <div className="mt-7 border-t border-white/10 pt-6">
              <p className="text-xs text-white/55">Maior desconto desta semana</p>
              {best && (
                <Link href={`/produtos/${best.slug}`} className="mt-3 flex items-center justify-between gap-4 rounded-xl bg-white/10 p-4 transition hover:bg-white/15">
                  <span>
                    <strong className="block text-sm">{best.name}</strong>
                    <span className="mt-1 block text-[11px] text-white/55">{best.storeName}</span>
                  </span>
                  <span className="rounded-full bg-[var(--gold)] px-3 py-1.5 text-xs font-bold text-[var(--ink)]">
                    -{discountPercentage(best.price, best.oldPrice)}%
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="ofertas" className="section-shell container-shell scroll-mt-24">
        <Catalog products={offers} offersOnly />
      </section>
    </>
  );
}
