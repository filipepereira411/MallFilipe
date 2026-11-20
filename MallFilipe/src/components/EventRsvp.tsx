"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2, Ticket } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { MallEvent } from "@/lib/types";

export function EventRsvp({ events }: { events: MallEvent[] }) {
  const router = useRouter();
  const [eventId, setEventId] = useState(events[0] ? String(events[0].id) : "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const selected = events.find((event) => String(event.id) === eventId);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch(`/api/events/${selected.id}/rsvp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = (await response.json()) as { message?: string; error?: string };
      if (!response.ok) throw new Error(data.error ?? "Não foi possível reservar o lugar.");
      setStatus("success");
      setMessage(data.message ?? "Lugar reservado!");
      setName("");
      setEmail("");
      router.refresh();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Não foi possível reservar o lugar.");
    }
  }

  if (events.length === 0) return null;

  return (
    <div className="card-soft p-6 md:p-8">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--gold-light)]/50 text-[var(--forest)]">
          <Ticket className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-display text-2xl">Reserve o seu lugar</h2>
          <p className="text-xs text-[var(--muted)]">Inscrição gratuita e confirmação imediata.</p>
        </div>
      </div>

      <form onSubmit={submit} className="mt-6 space-y-3">
        <label className="block text-xs font-bold text-[var(--ink-2)]">
          Evento
          <select value={eventId} onChange={(event) => setEventId(event.target.value)} className="input-field mt-1.5">
            {events.map((item) => (
              <option key={item.id} value={item.id} disabled={item.registrations >= item.capacity}>
                {item.title}{item.registrations >= item.capacity ? " (lotado)" : ""}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-xs font-bold text-[var(--ink-2)]">
          Nome
          <input required value={name} onChange={(event) => setName(event.target.value)} placeholder="O seu nome" className="input-field mt-1.5" />
        </label>
        <label className="block text-xs font-bold text-[var(--ink-2)]">
          Email
          <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nome@exemplo.pt" className="input-field mt-1.5" />
        </label>

        {selected && (
          <p className="text-xs text-[var(--muted)]">
            {Math.max(0, selected.capacity - selected.registrations)} lugares disponíveis · {selected.location}
          </p>
        )}

        <button type="submit" disabled={status === "loading" || !selected || selected.registrations >= selected.capacity} className="btn-gold w-full disabled:opacity-50">
          {status === "loading" ? "A reservar..." : "Confirmar inscrição"}
        </button>

        {message && (
          <p className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium ${status === "error" ? "bg-red-50 text-red-700" : "bg-[var(--forest)]/10 text-[var(--forest)]"}`}>
            {status === "success" && <CheckCircle2 className="h-4 w-4" />}
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
