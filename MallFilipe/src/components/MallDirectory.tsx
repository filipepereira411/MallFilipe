"use client";

import Link from "next/link";
import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { useState } from "react";
import type { Store } from "@/lib/types";

const floorOrder = ["Piso 0", "Piso 1", "Piso 2"];

export function MallDirectory({ stores }: { stores: Store[] }) {
  const floors = floorOrder.filter((floor) => stores.some((store) => store.floor === floor));
  const [floor, setFloor] = useState(floors[0] ?? "Piso 0");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const floorStores = stores.filter((store) => store.floor === floor);
  const active = floorStores.find((store) => store.slug === activeSlug) ?? floorStores[0];

  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white shadow-[0_20px_60px_rgba(16,29,46,0.08)] lg:grid-cols-[0.85fr_1.15fr]">
      <div className="bg-[var(--ink)] p-6 text-white md:p-8">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--gold-light)]">Planta interativa</span>
        <h3 className="mt-3 font-display text-3xl">Percorra os pisos</h3>
        <p className="mt-2 text-sm leading-6 text-white/55">Escolha um piso e descubra as lojas de cada corredor do MallFilipe.</p>

        <div className="mt-6 flex gap-2">
          {floors.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => { setFloor(value); setActiveSlug(null); }}
              className={`flex-1 rounded-xl px-3 py-3 text-xs font-bold transition ${
                floor === value ? "bg-[var(--gold)] text-[var(--ink)]" : "border border-white/15 bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {value}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-2">
          {floorStores.map((store) => (
            <button
              key={store.id}
              type="button"
              onClick={() => setActiveSlug(store.slug)}
              className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${
                active?.id === store.id ? "border-[var(--gold)] bg-white/10 text-white" : "border-white/10 text-white/65 hover:bg-white/5"
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg text-[10px] font-bold text-white" style={{ backgroundColor: store.accent }}>
                  {store.logo}
                </span>
                {store.name}
              </span>
              <span className="text-[10px] font-semibold text-white/40">{store.unit}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative bg-[#f0ece3] p-6 md:p-8">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(#d8d0c2 1px, transparent 1px), linear-gradient(90deg, #d8d0c2 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative">
          <div className="mb-5 flex items-center justify-between">
            <span className="tag bg-white text-[var(--ink)]">{floor} · {floorStores.length} lojas</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">Vista digital</span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {floorStores.map((store) => (
              <button
                key={store.id}
                type="button"
                onClick={() => setActiveSlug(store.slug)}
                className={`relative flex min-h-24 flex-col justify-between overflow-hidden rounded-xl border-2 bg-white p-3 text-left shadow-sm transition hover:-translate-y-1 ${
                  active?.id === store.id ? "border-[var(--gold)] shadow-lg" : "border-white"
                }`}
              >
                <span className="h-1.5 w-10 rounded-full" style={{ backgroundColor: store.accent }} />
                <span className="mt-3 block text-xs font-bold leading-tight">{store.name}</span>
                <span className="mt-1 text-[10px] font-semibold text-[var(--muted)]">{store.unit}</span>
              </button>
            ))}
          </div>

          {active && (
            <div className="mt-5 rounded-2xl border border-[var(--line)] bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--forest)]">{active.category}</span>
                  <h4 className="mt-1 font-display text-2xl">{active.name}</h4>
                  <p className="mt-1 text-xs text-[var(--muted)]">{active.tagline}</p>
                </div>
                <Link href={`/lojas/${active.slug}`} className="btn-primary h-10 px-4 text-xs">
                  Visitar <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="mt-4 flex flex-wrap gap-4 border-t border-[var(--line)] pt-4 text-xs text-[var(--muted)]">
                <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {active.floor} · {active.unit}</span>
                <span className="flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" /> {active.hours}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
