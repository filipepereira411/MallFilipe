import type { Metadata } from "next";
import { StoreDirectory } from "@/components/StoreDirectory";
import { getStores } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Lojas",
  description: "Diretório completo das lojas do MallFilipe, por piso e categoria.",
};

export default async function StoresPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  const stores = await getStores();

  return (
    <>
      <section className="border-b border-[var(--line)] bg-[var(--ink)] py-16 text-white">
        <div className="container-shell">
          <span className="eyebrow text-[var(--gold-light)]">Diretório MallFilipe</span>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.6rem,6vw,4.8rem)] font-semibold leading-tight">
            {stores.length} lojas, infinitas descobertas
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">
            Passeie pelos pisos, encontre uma marca favorita ou descubra algo novo. Filtre por categoria, piso ou simplesmente siga a curiosidade.
          </p>
        </div>
      </section>
      <section className="section-shell container-shell">
        <StoreDirectory stores={stores} initialQuery={query} />
      </section>
    </>
  );
}
