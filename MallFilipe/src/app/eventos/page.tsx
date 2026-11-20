import type { Metadata } from "next";
import { CalendarDays, Clock3, MapPin, Users } from "lucide-react";
import { EventRsvp } from "@/components/EventRsvp";
import { getEvents } from "@/lib/data";
import { formatEventDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Eventos",
  description: "Agenda de experiências e eventos do MallFilipe, da FLDA.",
};

export default async function EventsPage() {
  const events = await getEvents();
  const hero = events[0];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[var(--ink)] py-20 text-white">
        {hero && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hero.imageUrl} alt="Evento MallFilipe" className="absolute inset-0 h-full w-full object-cover opacity-35" />
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,20,34,0.96)] to-[rgba(10,20,34,0.55)]" />
          </>
        )}
        <div className="container-shell relative">
          <span className="eyebrow text-[var(--gold-light)]">Agenda cultural</span>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.8rem,6vw,5rem)] font-semibold leading-tight">
            A vida acontece no MallFilipe
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
            Lançamentos, provas, workshops e encontros para viver o centro comercial para além das montras. Reserve o seu lugar gratuitamente.
          </p>
        </div>
      </section>

      <section className="section-shell container-shell">
        <div className="grid items-start gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-5">
            {events.map((event) => {
              const remaining = Math.max(0, event.capacity - event.registrations);
              return (
                <article key={event.id} className="grid overflow-hidden rounded-[1.6rem] border border-[var(--line)] bg-white shadow-[0_12px_35px_rgba(35,42,51,0.05)] sm:grid-cols-[220px_1fr]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={event.imageUrl} alt={event.title} loading="lazy" className="h-52 w-full object-cover sm:h-full" />
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="tag bg-[var(--gold-light)]/45 text-[var(--forest)]">{event.category}</span>
                      {event.featured && <span className="tag bg-[var(--forest)] text-white">Destaque</span>}
                    </div>
                    <h2 className="mt-4 font-display text-2xl">{event.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{event.description}</p>
                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--line)] pt-4 text-xs text-[var(--muted)]">
                      <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /> {formatEventDate(event.eventDate)}</span>
                      <span className="flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" /> {event.eventTime}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {event.location}</span>
                      <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {remaining} lugares</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="lg:sticky lg:top-28">
            <EventRsvp events={events} />
            <div className="mt-5 rounded-2xl bg-[var(--gold-light)]/40 p-6 text-sm">
              <strong className="font-display text-xl">Clube MallFilipe</strong>
              <p className="mt-2 text-xs leading-6 text-[var(--muted)]">Inscrições gratuitas, prioridade para membros e surpresas em cada evento FLDA.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
