import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Mail, PackageCheck } from "lucide-react";
import { getOrderByCode } from "@/lib/data";
import { formatCurrency } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function OrderPage({ params }: { params: Promise<{ codigo: string }> }) {
  const { codigo } = await params;
  const order = await getOrderByCode(decodeURIComponent(codigo));
  if (!order) notFound();

  const createdAt = new Intl.DateTimeFormat("pt-PT", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(order.createdAt));

  return (
    <section className="section-shell container-shell">
      <div className="mx-auto max-w-4xl">
        <div className="card-soft overflow-hidden">
          <div className="bg-[var(--forest)] px-7 py-12 text-center text-white">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white/15">
              <CheckCircle2 className="h-8 w-8 text-[var(--gold-light)]" />
            </span>
            <h1 className="mt-5 font-display text-4xl">Encomenda confirmada!</h1>
            <p className="mt-3 text-sm text-white/70">Obrigado, {order.customerName}. A FLDA já recebeu o seu pedido.</p>
            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--gold-light)]">Código da encomenda</p>
            <p className="mt-2 font-mono text-2xl font-bold tracking-wider">{order.code}</p>
          </div>

          <div className="p-7 md:p-10">
            <div className="grid gap-5 sm:grid-cols-3">
              <div><p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Estado</p><p className="mt-1 flex items-center gap-2 font-semibold capitalize text-[var(--forest)]"><PackageCheck className="h-4 w-4" /> {order.status}</p></div>
              <div><p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Data</p><p className="mt-1 font-semibold">{createdAt}</p></div>
              <div><p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Contacto</p><p className="mt-1 flex items-center gap-2 truncate text-sm font-semibold"><Mail className="h-4 w-4 shrink-0" /> {order.email}</p></div>
            </div>

            <div className="mt-8 border-t border-[var(--line)] pt-7">
              <h2 className="font-display text-2xl">Resumo da encomenda</h2>
              <div className="mt-5 space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 rounded-xl border border-[var(--line)] bg-white p-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.imageUrl} alt={item.productName} className="h-16 w-16 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{item.productName}</p>
                      <p className="mt-1 text-xs text-[var(--muted)]">{item.storeName} · {item.quantity} × {formatCurrency(item.unitPrice)}</p>
                    </div>
                    <strong className="text-sm">{formatCurrency(item.unitPrice * item.quantity)}</strong>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-end justify-between border-t border-[var(--line)] pt-5">
                <div><p className="text-xs text-[var(--muted)]">Entrega grátis incluída</p><p className="mt-1 text-sm font-semibold">Total pago</p></div>
                <strong className="font-display text-3xl">{formatCurrency(order.total)}</strong>
              </div>
            </div>

            {order.notes && (
              <div className="mt-6 rounded-xl bg-[var(--paper)] p-4 text-sm">
                <strong className="text-xs uppercase tracking-wider">Notas</strong>
                <p className="mt-2 text-[var(--muted)]">{order.notes}</p>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/produtos" className="btn-primary">Continuar a explorar</Link>
              <Link href="/" className="btn-outline">Voltar ao início</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
