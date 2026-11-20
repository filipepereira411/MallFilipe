import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Clock3,
  Coffee,
  Gift,
  Laptop,
  MapPin,
  ShieldCheck,
  Shirt,
  Sofa,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { HeroSearch } from "@/components/HeroSearch";
import { MallDirectory } from "@/components/MallDirectory";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { StoreCard } from "@/components/StoreCard";
import { getMallOverview } from "@/lib/data";
import { formatEventDate } from "@/lib/format";

export const dynamic = "force-dynamic";

const categories = [
  { name: "Moda", icon: Shirt, description: "Coleções contemporâneas" },
  { name: "Tecnologia", icon: Laptop, description: "Gadgets e inovação" },
  { name: "Beleza", icon: Sparkles, description: "Rituais e fragrâncias" },
  { name: "Casa", icon: Sofa, description: "Objetos com história" },
  { name: "Gastronomia", icon: Coffee, description: "Sabores para descobrir" },
  { name: "Cultura", icon: BookOpen, description: "Livros e ideias" },
];

const heroImage =
  "https://images.pexels.com/photos/32212151/pexels-photo-32212151.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1800&h=1050";

export default async function HomePage() {
  const { stores, products, events } = await getMallOverview();
  const featuredStores = stores.filter((store) => store.featured).slice(0, 4);
  const offers = products.filter((product) => product.oldPrice !== null).slice(0, 8);
  const topEvents = events.slice(0, 3);
  const floors = new Set(stores.map((store) => store.floor)).size;

  return (
    <>
      <section className="relative isolate min-h-[640px] overflow-hidden bg-[var(--ink)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heroImage} alt="Átrio moderno do MallFilipe" className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-gradient absolute inset-0" />
        <div className="container-shell relative flex min-h-[640px] flex-col justify-center py-20">
          <div className="max-w-2xl text-white fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
              FLDA · Uma nova forma de fazer compras
            </span>
            <h1 className="mt-7 font-display text-[clamp(3rem,7vw,5.7rem)] font-semibold leading-[1.02] tracking-tight">
              O centro comercial <span className="text-[var(--gold-light)]">que nunca fecha.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/75">
              Lojas selecionadas, marcas que inspiram e experiências memoráveis. Tudo no MallFilipe, aberto onde e quando quiser.
            </p>
            <div className="mt-8"><HeroSearch /></div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/lojas" className="btn-gold">Explorar lojas <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/ofertas" className="btn-outline border-white/35 text-white hover:bg-white hover:text-[var(--ink)]">Ver ofertas</Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 hidden w-64 rounded-2xl border border-white/20 bg-white/10 p-5 text-white backdrop-blur-xl lg:block">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--gold-light)]">MallFilipe live</span>
          <p className="mt-3 font-display text-2xl">Aberto agora, 24/7</p>
          <p className="mt-2 text-xs leading-5 text-white/65">{stores.length} lojas · {products.length} produtos · {floors} pisos digitais</p>
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-[var(--cream)] py-10">
        <div className="container-shell">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Comece por explorar</h2>
            <Link href="/produtos" className="text-xs font-bold text-[var(--forest)]">Ver tudo →</Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.name}
                  href={`/produtos?category=${encodeURIComponent(category.name)}`}
                  className="group rounded-2xl border border-[var(--line)] bg-white p-4 transition hover:-translate-y-1 hover:border-[var(--gold)] hover:shadow-lg"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--paper)] text-[var(--forest)] transition group-hover:bg-[var(--gold-light)]/50">
                    <Icon className="h-5 w-5" />
                  </span>
                  <strong className="mt-4 block text-sm">{category.name}</strong>
                  <span className="mt-1 block text-[10px] leading-4 text-[var(--muted)]">{category.description}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[var(--forest)] py-10 text-white">
        <div className="container-shell grid grid-cols-2 gap-6 lg:grid-cols-4">
          {[
            { value: `${stores.length}`, label: "Lojas selecionadas" },
            { value: `${products.length}`, label: "Produtos disponíveis" },
            { value: `${floors}`, label: "Pisos para descobrir" },
            { value: "24/7", label: "Sempre aberto" },
          ].map((stat) => (
            <div key={stat.label} className="border-l border-white/20 pl-5">
              <strong className="font-display text-3xl text-[var(--gold-light)]">{stat.value}</strong>
              <p className="mt-1 text-xs text-white/65">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell container-shell">
        <SectionHeading
          eyebrow="Lojas em destaque"
          title="Marcas que valem a visita"
          description="Cada loja do MallFilipe foi escolhida pela qualidade, identidade e pela forma como surpreende quem entra."
          href="/lojas"
          linkLabel="Ver diretório completo"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredStores.map((store) => <StoreCard key={store.id} store={store} />)}
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Seleção da semana"
            title="Ofertas que merecem um clique"
            description="Descontos especiais das nossas lojas, reunidos num só lugar e disponíveis por tempo limitado."
            href="/ofertas"
            linkLabel="Ver todas as ofertas"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {offers.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/produtos" className="btn-primary px-7">Descobrir todo o catálogo <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="section-shell container-shell">
        <SectionHeading
          eyebrow="Piso digital"
          title="Encontre o seu caminho no mall"
          description="Uma planta interativa para passear pelos pisos, localizar cada loja e descobrir o que existe em cada corredor."
          href="/lojas"
          linkLabel="Pesquisar lojas"
        />
        <MallDirectory stores={stores} />
      </section>

      <section className="section-shell bg-[var(--ink)] text-white">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Agenda MallFilipe"
            title="Mais do que compras: experiências"
            description="Desfiles, provas, workshops e encontros que dão vida ao nosso centro comercial virtual."
            href="/eventos"
            linkLabel="Ver agenda completa"
            light
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {topEvents.map((event) => (
              <article key={event.id} className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5">
                <div className="relative h-52 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={event.imageUrl} alt={event.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-[var(--gold)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--ink)]">{event.category}</span>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-3 text-[11px] text-white/55">
                    <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /> {formatEventDate(event.eventDate)}</span>
                    <span className="flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" /> {event.eventTime}</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl">{event.title}</h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/55">{event.description}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="flex items-center gap-1.5 text-[11px] text-white/55"><MapPin className="h-3.5 w-3.5" /> {event.location}</span>
                    <Link href="/eventos" className="grid h-8 w-8 place-items-center rounded-full border border-white/20 transition group-hover:bg-[var(--gold)] group-hover:text-[var(--ink)]">
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell container-shell">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] bg-[var(--gold-light)]/45 p-8 md:p-12">
            <span className="eyebrow">Clube MallFilipe</span>
            <h2 className="mt-4 max-w-lg font-display text-[clamp(2rem,4vw,3.4rem)] leading-tight">Vantagens para quem descobre primeiro.</h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-[var(--muted)]">
              Acesso antecipado a coleções, convites para eventos e novidades das lojas. Subscreva a newsletter da FLDA no rodapé e fique a par de tudo.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/produtos" className="btn-primary">Começar a explorar</Link>
              <Link href="/sobre" className="btn-outline">Conhecer a FLDA</Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Truck, title: "Entrega grátis", text: "Em todas as encomendas, sem valor mínimo." },
              { icon: ShieldCheck, title: "Compra segura", text: "Pagamentos e dados protegidos pela FLDA." },
              { icon: Gift, title: "Presentes únicos", text: "Curadoria especial para todas as ocasiões." },
              { icon: Star, title: "Lojas avaliadas", text: "Apenas marcas com qualidade reconhecida." },
            ].map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="card-soft p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--forest)]/10 text-[var(--forest)]"><Icon className="h-5 w-5" /></span>
                  <h3 className="mt-5 font-display text-xl">{benefit.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{benefit.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
