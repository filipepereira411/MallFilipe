import Link from "next/link";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { ProductPurchase } from "@/components/ProductPurchase";
import { SectionHeading } from "@/components/SectionHeading";
import { getProductBySlug, getProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [product, products] = await Promise.all([getProductBySlug(slug), getProducts()]);
  if (!product) notFound();

  const related = products
    .filter((item) => item.id !== product.id)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, 4);

  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : null;

  return (
    <>
      <section className="border-b border-[var(--line)] bg-[var(--cream)] py-6">
        <div className="container-shell flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
          <Link href="/" className="hover:text-[var(--ink)]">Início</Link>
          <span>/</span>
          <Link href="/produtos" className="hover:text-[var(--ink)]">Produtos</Link>
          <span>/</span>
          <Link href={`/lojas/${product.storeSlug}`} className="hover:text-[var(--ink)]">{product.storeName}</Link>
          <span>/</span>
          <span className="truncate font-semibold text-[var(--ink)]">{product.name}</span>
        </div>
      </section>

      <section className="section-shell container-shell">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.imageUrl} alt={product.name} className="aspect-square w-full object-cover" />
              <div className="absolute left-5 top-5 flex gap-2">
                {discount !== null && <span className="tag bg-[#a63f45] text-white">-{discount}%</span>}
                {product.badge && <span className="tag bg-white text-[var(--forest)]">{product.badge}</span>}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {["Envio em 24h", "Embalagem cuidada", "Apoio FLDA"].map((label) => (
                <span key={label} className="rounded-xl border border-[var(--line)] bg-white p-3 text-center text-[10px] font-semibold text-[var(--muted)]">{label}</span>
              ))}
            </div>
          </div>

          <div className="lg:pt-4">
            <Link href={`/lojas/${product.storeSlug}`} className="eyebrow">{product.storeName}</Link>
            <h1 className="mt-5 font-display text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-[1.06]">{product.name}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[var(--muted)]">
              <span className="flex items-center gap-1.5 font-semibold text-[var(--ink-2)]"><Star className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" /> {product.rating.toFixed(1)} · {product.sold} vendidos</span>
              <span>{product.category}</span>
              <span>{product.stock > 0 ? `${product.stock} em stock` : "Esgotado"}</span>
            </div>
            <div className="mt-7"><ProductPurchase product={product} /></div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container-shell">
          <SectionHeading eyebrow="Pode combinar com" title="Outras descobertas" href="/produtos" linkLabel="Ver todos os produtos" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => <ProductCard key={item.id} product={item} />)}
          </div>
        </div>
      </section>
    </>
  );
}
