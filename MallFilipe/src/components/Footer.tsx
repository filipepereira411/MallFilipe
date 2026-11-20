import Link from "next/link";
import { ArrowUpRight, AtSign, Mail, MapPin, Phone } from "lucide-react";
import { NewsletterForm } from "@/components/NewsletterForm";

const columns = [
  {
    title: "Explorar",
    links: [
      { href: "/lojas", label: "Diretório de lojas" },
      { href: "/produtos", label: "Todos os produtos" },
      { href: "/ofertas", label: "Ofertas da semana" },
      { href: "/eventos", label: "Agenda cultural" },
    ],
  },
  {
    title: "MallFilipe",
    links: [
      { href: "/sobre", label: "A nossa história" },
      { href: "/carrinho", label: "O meu carrinho" },
      { href: "/index.html", label: "Versão HTML" },
      { href: "/api/health", label: "Estado do serviço" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-[var(--ink)] text-white">
      <div className="container-shell py-14">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.2fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--gold)] font-display text-lg font-bold text-[var(--ink)]">
                MF
              </span>
              <span>
                <span className="block font-display text-2xl">MallFilipe</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Uma empresa FLDA</span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-7 text-white/60">
              Um centro comercial virtual onde as melhores lojas, experiências e descobertas vivem no mesmo lugar.
            </p>
            <div className="mt-6 flex gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/60">
                <AtSign className="h-4 w-4" />
              </span>
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/60">
                <Mail className="h-4 w-4" />
              </span>
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--gold-light)]">{column.title}</h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="group flex items-center gap-1 text-sm text-white/65 transition hover:text-white">
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--gold-light)]">Clube MallFilipe</h3>
            <p className="mt-5 text-sm leading-6 text-white/60">
              Receba novidades, pré-lançamentos e convites para eventos exclusivos.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} FLDA · MallFilipe. Todos os direitos reservados.</p>
          <div className="flex flex-wrap gap-5">
            <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> Sempre aberto, onde estiver</span>
            <span className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> apoio@mallfilipe.pt</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
