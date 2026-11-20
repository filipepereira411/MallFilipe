"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { normalizeText } from "@/lib/format";
import type { Product } from "@/lib/types";

type Props = {
  products: Product[];
  initialQuery?: string;
  initialCategory?: string;
  initialStore?: string;
  offersOnly?: boolean;
};

export function Catalog({
  products,
  initialQuery = "",
  initialCategory = "Todas",
  initialStore = "Todas",
  offersOnly = false,
}: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [store, setStore] = useState(initialStore);
  const [sort, setSort] = useState("relevance");
  const [onlyOffers, setOnlyOffers] = useState(offersOnly);
  const [maxPrice, setMaxPrice] = useState(() => Math.ceil(Math.max(100, ...products.map((p) => p.price)) / 100) * 100);

  const categories = useMemo(
    () => ["Todas", ...new Set(products.map((product) => product.category))].sort((a, b) => a.localeCompare(b, "pt")),
    [products],
  );
  const storeOptions = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((product) => map.set(product.storeSlug, product.storeName));
    return [...map.entries()].sort((a, b) => a[1].localeCompare(b[1], "pt"));
  }, [products]);
  const priceCeiling = Math.ceil(Math.max(100, ...products.map((p) => p.price)) / 100) * 100;

  const filtered = useMemo(() => {
    const normalized = normalizeText(query);
    const result = products.filter((product) => {
      const matchesQuery =
        !normalized ||
        normalizeText(`${product.name} ${product.description} ${product.category} ${product.storeName}`).includes(normalized);
      return (
        matchesQuery &&
        (category === "Todas" || product.category === category) &&
        (store === "Todas" || product.storeSlug === store) &&
        (!onlyOffers || product.oldPrice !== null) &&
        product.price <= maxPrice
      );
    });

    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating || b.sold - a.sold);
    if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name, "pt"));
    return result;
  }, [products, query, category, store, onlyOffers, maxPrice, sort]);

  const hasFilters = Boolean(query) || category !== "Todas" || store !== "Todas" || onlyOffers !== offersOnly || maxPrice < priceCeiling || sort !== "relevance";

  return (
    <div>
      <div className="card-soft p-4 md:p-5">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-[1.3]">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="O que procura hoje?"
              className="input-field pl-11"
              aria-label="Pesquisar produtos"
            />
          </div>
          <select value={store} onChange={(event) => setStore(event.target.value)} className="input-field lg:max-w-56" aria-label="Filtrar por loja">
            <option value="Todas">Todas as lojas</option>
            {storeOptions.map(([slug, name]) => <option key={slug} value={slug}>{name}</option>)}
          </select>
          <select value={sort} onChange={(event) => setSort(event.target.value)} className="input-field lg:max-w-52" aria-label="Ordenar produtos">
            <option value="relevance">Mais relevantes</option>
            <option value="price-asc">Preço: mais baixo</option>
            <option value="price-desc">Preço: mais alto</option>
            <option value="rating">Melhor avaliação</option>
            <option value="name">Nome A–Z</option>
          </select>
        </div>

        <div className="mt-4 flex flex-col gap-4 border-t border-[var(--line)] pt-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {categories.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setCategory(value)}
                className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-bold transition ${
                  category === value
                    ? "border-[var(--forest)] bg-[var(--forest)] text-white"
                    : "border-[var(--line)] bg-white text-[var(--ink-2)] hover:border-[var(--gold)]"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-[var(--ink-2)]">
              <input
                type="checkbox"
                checked={onlyOffers}
                onChange={(event) => setOnlyOffers(event.target.checked)}
                className="h-4 w-4 accent-[var(--forest)]"
              />
              Só promoções
            </label>
            <label className="flex min-w-44 items-center gap-2 text-xs font-semibold text-[var(--ink-2)]">
              <SlidersHorizontal className="h-4 w-4" />
              Até {maxPrice} €
              <input
                type="range"
                min={10}
                max={priceCeiling}
                step={10}
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
                className="h-1.5 w-24 accent-[var(--gold)]"
                aria-label="Preço máximo"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="mb-6 mt-8 flex items-center justify-between gap-4">
        <p className="text-sm text-[var(--muted)]">
          <strong className="text-[var(--ink)]">{filtered.length}</strong> {filtered.length === 1 ? "produto" : "produtos"} disponíveis
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={() => { setQuery(""); setCategory("Todas"); setStore("Todas"); setSort("relevance"); setOnlyOffers(offersOnly); setMaxPrice(priceCeiling); }}
            className="text-xs font-bold text-[var(--forest)] underline underline-offset-4"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className="card-soft grid place-items-center px-6 py-16 text-center">
          <Search className="h-8 w-8 text-[var(--gold)]" />
          <h3 className="mt-4 font-display text-2xl">Não encontrámos esse produto</h3>
          <p className="mt-2 max-w-md text-sm text-[var(--muted)]">Ajuste a pesquisa ou explore as categorias do MallFilipe.</p>
        </div>
      )}
    </div>
  );
}
