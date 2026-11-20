import { db } from "@/db";
import { sql } from "drizzle-orm";
import { ensureDatabase } from "@/db/seed";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ensureDatabase();
    await db.execute(sql`select 1`);
    return Response.json({ ok: true, app: "MallFilipe", company: "FLDA" });
  } catch (error) {
    console.error("Healthcheck falhou", error);
    return Response.json({ ok: false }, { status: 500 });
  }
}
