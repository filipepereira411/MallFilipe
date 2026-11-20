"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useState, type FormEvent } from "react";

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/produtos?q=${encodeURIComponent(trimmed)}` : "/produtos");
  }

  return (
    <form onSubmit={submit} className="glass-panel flex w-full max-w-xl flex-col gap-2 rounded-2xl p-2 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Encontre uma marca, produto ou loja..."
          aria-label="Pesquisar no centro comercial"
          className="h-11 w-full rounded-xl bg-transparent pl-10 pr-3 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--muted)]"
        />
      </div>
      <button type="submit" className="btn-gold h-11 px-6">
        Explorar
      </button>
    </form>
  );
}
