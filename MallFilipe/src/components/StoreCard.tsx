"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import type { Store } from "@/lib/types";

export function StoreCard({ store }: { store: Store }) {
  return (
    <Link
      href={`/lojas/${store.slug}`}
      className="group block overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-white shadow-[0_12px_35px_rgba(35,42,51,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(35,42,51,0.12)]"
    >
      <div className="relative h-52 overflow-hidden bg-[#ded8cd]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={store.coverImage} alt={`Espaço da loja ${store.name}`} loading="lazy" className="store-card-image h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
        <div
          className="absolute bottom-4 left-4 grid h-12 w-12 place-items-center rounded-2xl border-2 border-white/70 text-sm font-bold text-white shadow-lg"
          style={{ backgroundColor: store.accent }}
        >
          {store.logo}
        </div>
        <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--ink)] backdrop-blur">
          {store.category}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-semibold">{store.name}</h3>
            <p className="mt-1 text-xs text-[var(--muted)]">{store.tagline}</p>
          </div>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--line)] transition group-hover:border-[var(--gold)] group-hover:bg-[var(--gold-light)]">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-[var(--line)] pt-4 text-xs text-[var(--muted)]">
          <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {store.floor} · {store.unit}</span>
          <span className="flex items-center gap-1.5 font-semibold text-[var(--ink-2)]">
            <Star className="h-3.5 w-3.5 fill-[var(--gold)] text-[var(--gold)]" /> {store.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
