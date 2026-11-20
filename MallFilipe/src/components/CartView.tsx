"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Minus, Plus, ShieldCheck, ShoppingBag, Trash2, Truck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useCart } from "@/components/CartProvider";
import { formatCurrency } from "@/lib/format";

export function CartView() {
  const router = useRouter();
  const { items, setQuantity, remove, clear, subtotal, ready } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          email,
          phone,
          notes,
          items: items.map((item) => ({ productId: item.id, quantity: item.quantity })),
        }),
      });
      const data = (await response.json()) as { code?: string; error?: string };
      if (!response.ok || !data.code) throw new Error(data.error ?? "Não foi possível concluir a encomenda.");
      clear();
      router.push(`/pedido/${encodeURIComponent(data.code)}`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Ocorreu um erro inesperado.");
      setSubmitting(false);
    }
  }

  if (!ready) {
    return <div className="card-soft grid min-h-72 place-items-center text-sm text-[var(--muted)]">A preparar o seu carrinho...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="card-soft grid place-items-center px-6 py-20 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-[var(--gold-light)]/40">
          <ShoppingBag className="h-9 w-9 text-[var(--forest)]" />
        </span>
        <h1 className="mt-6 font-display text-4xl">O seu carrinho está vazio</h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-[var(--muted)]">
          Há muitas descobertas à sua espera. Explore as lojas do MallFilipe e comece a sua visita.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/produtos" className="btn-primary">Explorar produtos</Link>
          <Link href="/lojas" className="btn-outline">Ver lojas</Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid items-start gap-7 lg:grid-cols-[1.35fr_0.85fr]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl">O seu carrinho</h1>
          <button type="button" onClick={clear} className="text-xs font-bold text-[var(--muted)] underline underline-offset-4 hover:text-[#a63f45]">
            Esvaziar carrinho
          </button>
        </div>

        {items.map((item) => (
          <article key={item.id} className="flex gap-4 rounded-2xl border border-[var(--line)] bg-white p-4">
            <Link href={`/produtos/${item.slug}`} className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#eee9df]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
            </Link>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--forest)]">{item.storeName}</span>
                  <Link href={`/produtos/${item.slug}`} className="mt-1 block truncate font-display text-lg font-semibold hover:text-[var(--forest)]">{item.name}</Link>
                </div>
                <button type="button" onClick={() => remove(item.id)} className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[var(--muted)] hover:bg-red-50 hover:text-[#a63f45]" aria-label={`Remover ${item.name}`}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center rounded-full border border-[var(--line)]">
                  <button type="button" onClick={() => setQuantity(item.id, item.quantity - 1)} className="grid h-8 w-8 place-items-center rounded-full" aria-label="Diminuir quantidade">
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-7 text-center text-sm font-bold">{item.quantity}</span>
                  <button type="button" onClick={() => setQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.stock} className="grid h-8 w-8 place-items-center rounded-full disabled:opacity-30" aria-label="Aumentar quantidade">
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <strong className="text-lg">{formatCurrency(item.price * item.quantity)}</strong>
              </div>
            </div>
          </article>
        ))}

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-white p-4 text-sm">
            <Truck className="h-5 w-5 text-[var(--forest)]" /> Entrega grátis incluída
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-white p-4 text-sm">
            <ShieldCheck className="h-5 w-5 text-[var(--forest)]" /> Compra segura FLDA
          </div>
        </div>
      </div>

      <aside className="card-soft sticky top-28 p-6">
        <h2 className="font-display text-2xl">Finalizar encomenda</h2>
        <p className="mt-1 text-xs text-[var(--muted)]">Os seus dados são usados apenas para esta encomenda.</p>

        <div className="mt-5 space-y-3">
          <label className="block text-xs font-bold text-[var(--ink-2)]">
            Nome completo
            <input required value={name} onChange={(event) => setName(event.target.value)} placeholder="O seu nome" className="input-field mt-1.5" />
          </label>
          <label className="block text-xs font-bold text-[var(--ink-2)]">
            Email
            <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nome@exemplo.pt" className="input-field mt-1.5" />
          </label>
          <label className="block text-xs font-bold text-[var(--ink-2)]">
            Telefone <span className="font-normal text-[var(--muted)]">(opcional)</span>
            <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+351 900 000 000" className="input-field mt-1.5" />
          </label>
          <label className="block text-xs font-bold text-[var(--ink-2)]">
            Notas <span className="font-normal text-[var(--muted)]">(opcional)</span>
            <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={2} placeholder="Alguma indicação especial?" className="input-field mt-1.5 resize-none" />
          </label>
        </div>

        <div className="mt-6 space-y-2 border-t border-[var(--line)] pt-5 text-sm">
          <div className="flex justify-between text-[var(--muted)]"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
          <div className="flex justify-between text-[var(--muted)]"><span>Entrega</span><span className="font-semibold text-[var(--forest)]">Grátis</span></div>
          <div className="flex items-end justify-between border-t border-[var(--line)] pt-3">
            <span className="font-bold">Total</span>
            <strong className="font-display text-3xl">{formatCurrency(subtotal)}</strong>
          </div>
        </div>

        {error && <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-700">{error}</p>}
        <button type="submit" disabled={submitting} className="btn-gold mt-5 w-full disabled:opacity-60">
          {submitting ? "A confirmar..." : "Confirmar encomenda"}
          {!submitting && <ArrowRight className="h-4 w-4" />}
        </button>
        <p className="mt-3 text-center text-[10px] leading-4 text-[var(--muted)]">Ao confirmar, receberá o código da encomenda para acompanhamento.</p>
      </aside>
    </form>
  );
}
