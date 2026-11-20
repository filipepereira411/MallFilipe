"use client";

import { Search, SlidersHorizontal, Store as StoreIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { StoreCard } from "@/components/StoreCard";
import { normalizeText } from "@/lib/format";
import type { Store } from "@/lib/types";

export function StoreDirectory({ stores, initialQuery = "" }: { stores: Store[]; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState("Todas");
  const [floor, setFloor] = useState("Todos");

  const categories = useMemo(
    () => ["Todas", ...new Set(stores.map((store) => store.category))].sort((a, b) => a.localeCompare(b, "pt")),
    [stores],
  );
  const floors = useMemo(
    () => ["Todos", ...new Set(stores.map((store) => store.floor))].sort(),
    [stores],
  );

  const filtered = useMemo(() => {
    const normalized = normalizeText(query);
    return stores.filter((store) => {
      const matchesQuery =
        !normalized ||
        normalizeText(`${store.name} ${store.tagline} ${store.category} ${store.description}`).includes(normalized);
      const matchesCategory = category === "Todas" || store.category === category;
      const matchesFloor = floor === "Todos" || store.floor === floor;
      return matchesQuery && matchesCategory && matchesFloor;
    });
  }, [stores, query, category, floor]);

  return (
    <div>
      <div className="card-soft p-4 md:p-5">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Procurar por loja, categoria ou descrição..."
              className="input-field pl-11"
              aria-label="Procurar lojas"
            />
          </div>
          <div className="relative min-w-44">
            <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
            <select
              value={floor}
              onChange={(event) => setFloor(event.target.value)}
              className="input-field appearance-none pl-11 pr-8"
              aria-label="Filtrar por piso"
            >
              {floors.map((value) => (
                <option key={value} value={value}>{value === "Todos" ? "Todos os pisos" : value}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
          {categories.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setCategory(value)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition ${
                category === value
                  ? "border-[var(--ink)] bg-[var(--ink)] text-white"
                  : "border-[var(--line)] bg-white text-[var(--ink-2)] hover:border-[var(--gold)]"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 mt-8 flex items-center justify-between gap-4">
        <p className="flex items-center gap-2 text-sm text-[var(--muted)]">
          <StoreIcon className="h-4 w-4" />
          <span><strong className="text-[var(--ink)]">{filtered.length}</strong> {filtered.length === 1 ? "loja encontrada" : "lojas encontradas"}</span>
        </p>
        {(query || category !== "Todas" || floor !== "Todos") && (
          <button
            type="button"
            onClick={() => { setQuery(""); setCategory("Todas"); setFloor("Todos"); }}
            className="text-xs font-bold text-[var(--forest)] underline underline-offset-4"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((store) => <StoreCard key={store.id} store={store} />)}
        </div>
      ) : (
        <div className="card-soft grid place-items-center px-6 py-16 text-center">
          <Search className="h-8 w-8 text-[var(--gold)]" />
          <h3 className="mt-4 font-display text-2xl">Nenhuma loja encontrada</h3>
          <p className="mt-2 max-w-md text-sm text-[var(--muted)]">Experimente outro termo ou limpe os filtros para ver todas as lojas do MallFilipe.</p>
        </div>
      )}
    </div>
  );
}
