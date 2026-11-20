import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, HeartHandshake, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import { getMallOverview } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sobre a FLDA",
  description: "Conheça a história, a missão e os valores do MallFilipe, um projeto FLDA.",
};

export default async function AboutPage() {
  const { stores, products, events } = await getMallOverview();

  return (
    <>
      <section className="bg-[var(--ink)] py-20 text-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="eyebrow text-[var(--gold-light)]">A nossa história</span>
            <h1 className="mt-5 font-display text-[clamp(2.8rem,6vw,5.2rem)] font-semibold leading-tight">
              Um mall digital com alma de praça.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-8 text-white/65">
              O MallFilipe nasceu na FLDA com uma ideia simples: juntar o prazer de passear por um centro comercial com a conveniência de comprar online, sem horários nem distâncias.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/lojas" className="btn-gold">Conhecer as lojas <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/index.html" className="btn-outline border-white/30 text-white hover:bg-white hover:text-[var(--ink)]">Ver index.html</Link>
            </div>
          </div>
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.pexels.com/photos/1021235/pexels-photo-1021235.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1000&h=900"
              alt="Arquitetura de um centro comercial"
              className="h-[360px] w-full rounded-[2rem] object-cover"
            />
            <div className="absolute -bottom-6 -left-4 rounded-2xl bg-[var(--gold)] p-5 text-[var(--ink)] shadow-2xl">
              <strong className="font-display text-3xl">FLDA</strong>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em]">Desde o primeiro clique</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell container-shell">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Building2, value: `${stores.length}`, label: "Lojas parceiras" },
            { icon: Sparkles, value: `${products.length}`, label: "Produtos curados" },
            { icon: HeartHandshake, value: `${events.length}`, label: "Experiências por temporada" },
            { icon: ShieldCheck, value: "24/7", label: "Disponibilidade" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="card-soft p-6">
                <Icon className="h-6 w-6 text-[var(--forest)]" />
                <strong className="mt-6 block font-display text-4xl">{item.value}</strong>
                <p className="mt-2 text-xs text-[var(--muted)]">{item.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="eyebrow">O que nos move</span>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-tight">Proximidade, curadoria e confiança.</h2>
            <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
              Trabalhamos com lojas que partilham a nossa exigência: bons produtos, atenção ao detalhe e vontade de criar experiências que ficam na memória.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { icon: Sparkles, title: "Curadoria com critério", text: "Cada marca é convidada a integrar o MallFilipe pela qualidade e identidade, nunca apenas pelo volume." },
              { icon: Leaf, title: "Escolhas conscientes", text: "Valorizamos materiais duráveis, produção responsável e relações comerciais transparentes." },
              { icon: HeartHandshake, title: "Pessoas no centro", text: "Apoio próximo, entregas simples e uma comunidade que participa na vida do mall." },
            ].map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="flex gap-5 rounded-2xl border border-[var(--line)] bg-[var(--cream)] p-6">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[var(--forest)]/10 text-[var(--forest)]"><Icon className="h-5 w-5" /></span>
                  <div><h3 className="font-display text-xl">{value.title}</h3><p className="mt-2 text-sm leading-6 text-[var(--muted)]">{value.text}</p></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell container-shell">
        <div className="rounded-[2rem] bg-[var(--gold-light)]/45 p-8 text-center md:p-14">
          <span className="eyebrow">Uma experiência FLDA</span>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight">Pronto para começar a sua visita?</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">Entre pela versão HTML clássica ou descubra a experiência completa com catálogo, carrinho e encomendas.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn-primary">Voltar ao MallFilipe</Link>
            <Link href="/index.html" className="btn-outline">Abrir index.html</Link>
          </div>
        </div>
      </section>
    </>
  );
}
