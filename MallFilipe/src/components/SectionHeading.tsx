import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  light?: boolean;
};

export function SectionHeading({ eyebrow, title, description, href, linkLabel, light = false }: Props) {
  return (
    <div className="mb-9 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <span className={`eyebrow ${light ? "text-[var(--gold-light)]" : ""}`}>{eyebrow}</span>
        <h2 className={`mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.1] tracking-tight ${light ? "text-white" : "text-[var(--ink)]"}`}>
          {title}
        </h2>
        {description && (
          <p className={`mt-3 max-w-xl text-sm leading-7 ${light ? "text-white/60" : "text-[var(--muted)]"}`}>
            {description}
          </p>
        )}
      </div>
      {href && linkLabel && (
        <Link
          href={href}
          className={`group inline-flex items-center gap-2 text-sm font-bold transition ${light ? "text-[var(--gold-light)] hover:text-white" : "text-[var(--forest)] hover:text-[var(--ink)]"}`}
        >
          {linkLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
