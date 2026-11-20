import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3, MapPin, Star } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getProducts, getStoreBySlug } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function StorePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [store, products] = await Promise.all([getStoreBySlug(slug), getProducts()]);
  if (!store) notFound();

  const storeProducts = products.filter((product) => product.storeSlug === slug);
  const related = products.filter((product) => product.storeSlug !== slug && product.category === store.category).slice(0, 4);

  return (
    <>
      <section className="relative isolate min-h-[430px] overflow-hidden bg-[var(--ink)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={store.coverImage} alt={`Espaço ${store.name}`} className="absolute inset-0 h-full w-full object-cover opacity-65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,20,34,0.96)] via-[rgba(10,20,34,0.55)] to-[rgba(10,20,34,0.35)]" />
        <div className="container-shell relative flex min-h-[430px] flex-col justify-end pb-12 pt-10 text-white">
          <Link href="/lojas" className="mb-auto inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur">
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar às lojas
          </Link>
          <div className="mt-10 flex flex-wrap items-end gap-6">
            <span className="grid h-20 w-20 place-items-center rounded-[1.4rem] border-2 border-white/70 font-display text-2xl font-bold shadow-2xl" style={{ backgroundColor: store.accent }}>
              {store.logo}
            </span>
            <div>
              <span className="tag bg-[var(--gold)] text-[var(--ink)]">{store.category}</span>
              <h1 className="mt-3 font-display text-[clamp(2.8rem,6vw,5rem)] font-semibold leading-none">{store.name}</h1>
              <p className="mt-3 text-base text-white/75">{store.tagline}</p>
            </div>
          </div>
          <div className="mt-7 flex flex-wrap gap-3 text-xs">
            <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur"><MapPin className="h-3.5 w-3.5" /> {store.floor} · Loja {store.unit}</span>
            <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur"><Clock3 className="h-3.5 w-3.5" /> {store.hours}</span>
            <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur"><Star className="h-3.5 w-3.5 fill-[var(--gold)] text-[var(--gold)]" /> {store.rating.toFixed(1)} / 5</span>
          </div>
        </div>
      </section>

      <section className="section-shell container-shell">
        <div className="mb-10 grid gap-6 rounded-[2rem] border border-[var(--line)] bg-white p-7 md:grid-cols-[1.4fr_0.6fr] md:p-10">
          <div>
            <span className="eyebrow">Sobre a loja</span>
            <h2 className="mt-3 font-display text-3xl">Uma visita que vale a pena</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">{store.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 self-end text-center">
            <div className="rounded-2xl bg-[var(--paper)] p-5"><strong className="font-display text-3xl">{storeProducts.length}</strong><p className="mt-1 text-[10px] uppercase tracking-wider text-[var(--muted)]">Produtos online</p></div>
            <div className="rounded-2xl bg-[var(--paper)] p-5"><strong className="font-display text-3xl">{store.rating.toFixed(1)}</strong><p className="mt-1 text-[10px] uppercase tracking-wider text-[var(--muted)]">Avaliação</p></div>
          </div>
        </div>

        <SectionHeading eyebrow="Vitrine digital" title={`Descubra ${store.name}`} description="A seleção online desta loja, pronta para adicionar ao carrinho." />
        {storeProducts.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {storeProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <p className="card-soft p-10 text-center text-sm text-[var(--muted)]">Esta loja está a preparar a sua vitrine digital.</p>
        )}
      </section>

      {related.length > 0 && (
        <section className="section-shell bg-white">
          <div className="container-shell">
            <SectionHeading eyebrow="Também pode gostar" title="Perto desta loja" href="/produtos" linkLabel="Ver catálogo" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
