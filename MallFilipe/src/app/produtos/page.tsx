import type { Metadata } from "next";
import { Catalog } from "@/components/Catalog";
import { getProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Produtos",
  description: "Catálogo completo de produtos das lojas do MallFilipe.",
};

type Params = Promise<{
  q?: string | string[];
  category?: string | string[];
  store?: string | string[];
}>;

function read(value: string | string[] | undefined): string {
  return typeof value === "string" ? value : "";
}

export default async function ProductsPage({ searchParams }: { searchParams: Params }) {
  const params = await searchParams;
  const products = await getProducts();
  const categories = new Set(products.map((product) => product.category));
  const storeSlugs = new Set(products.map((product) => product.storeSlug));
  const category = read(params.category);
  const store = read(params.store);

  return (
    <>
      <section className="border-b border-[var(--line)] bg-[var(--cream)] py-14">
        <div className="container-shell">
          <span className="eyebrow">Catálogo completo</span>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.6rem,6vw,4.8rem)] font-semibold leading-tight">
            Tudo o que procura, num só lugar
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">
            Pesquise, filtre por loja ou categoria e compare preços. As melhores peças das lojas MallFilipe reunidas numa vitrine digital.
          </p>
        </div>
      </section>
      <section className="section-shell container-shell">
        <Catalog
          products={products}
          initialQuery={read(params.q)}
          initialCategory={categories.has(category) ? category : "Todas"}
          initialStore={storeSlugs.has(store) ? store : "Todas"}
        />
      </section>
    </>
  );
}
