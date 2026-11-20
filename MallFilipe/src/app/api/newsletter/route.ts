import { db } from "@/db";
import { subscribers } from "@/db/schema";
import { ensureDatabase } from "@/db/seed";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { name?: unknown; email?: unknown };
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 120) : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 180) {
      return Response.json({ error: "Introduza um email válido." }, { status: 400 });
    }

    await ensureDatabase();
    await db.insert(subscribers).values({ name, email }).onConflictDoNothing();
    return Response.json({ ok: true, message: "Subscrição registada. Bem-vindo ao MallFilipe!" });
  } catch (error) {
    console.error("POST /api/newsletter", error);
    return Response.json({ error: "Não foi possível concluir a subscrição." }, { status: 500 });
  }
}
