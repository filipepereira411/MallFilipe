"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "", email }),
      });
      const data = (await response.json()) as { message?: string; error?: string };
      if (!response.ok) throw new Error(data.error ?? "Tente novamente.");
      setStatus("success");
      setMessage(data.message ?? "Subscrição concluída!");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Não foi possível subscrever.");
    }
  }

  return (
    <form onSubmit={submit} className="mt-4">
      <div className="flex rounded-full border border-white/20 bg-white/10 p-1 focus-within:border-[var(--gold)]">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="O seu email"
          aria-label="Email para newsletter"
          className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/35"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-label="Subscrever newsletter"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--gold)] text-[var(--ink)] transition hover:brightness-110 disabled:opacity-60"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      {message && (
        <p className={`mt-2 flex items-center gap-1.5 text-xs ${status === "error" ? "text-red-300" : "text-[var(--gold-light)]"}`}>
          {status === "success" && <CheckCircle2 className="h-3.5 w-3.5" />}
          {message}
        </p>
      )}
    </form>
  );
}
