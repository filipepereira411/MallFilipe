import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="section-shell container-shell grid min-h-[60vh] place-items-center">
      <div className="text-center">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[var(--gold-light)]/50 text-[var(--forest)]">
          <Compass className="h-9 w-9" />
        </span>
        <span className="eyebrow mt-8 justify-center">Erro 404</span>
        <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.5rem)]">Perdeu-se no mall?</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[var(--muted)]">
          Esta porta ainda não existe, mas há muitas lojas à sua espera. Volte ao átrio principal e continue a explorar.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">Voltar ao início</Link>
          <Link href="/lojas" className="btn-outline">Ver lojas</Link>
        </div>
      </div>
    </section>
  );
}
