import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { events, eventRegistrations } from "@/db/schema";
import { ensureDatabase } from "@/db/seed";

export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const eventId = Number(id);
    const body = (await request.json()) as { name?: unknown; email?: unknown };
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 120) : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!Number.isInteger(eventId) || eventId <= 0) {
      return Response.json({ error: "Evento inválido." }, { status: 400 });
    }
    if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Introduza o nome e um email válido." }, { status: 400 });
    }

    await ensureDatabase();
    const [event] = await db.select().from(events).where(eq(events.id, eventId)).limit(1);
    if (!event) return Response.json({ error: "Evento não encontrado." }, { status: 404 });

    const [{ count }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(eventRegistrations)
      .where(eq(eventRegistrations.eventId, eventId));

    if (count >= event.capacity) {
      return Response.json({ error: "Este evento já não tem lugares disponíveis." }, { status: 409 });
    }

    await db
      .insert(eventRegistrations)
      .values({ eventId, name, email })
      .onConflictDoNothing();

    return Response.json({ ok: true, message: "Lugar reservado com sucesso!" });
  } catch (error) {
    console.error("POST /api/events/[id]/rsvp", error);
    return Response.json({ error: "Não foi possível reservar o lugar." }, { status: 500 });
  }
}
