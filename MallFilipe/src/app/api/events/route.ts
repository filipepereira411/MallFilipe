import { getEvents } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const events = await getEvents();
    return Response.json({ count: events.length, events });
  } catch (error) {
    console.error("GET /api/events", error);
    return Response.json({ error: "Não foi possível carregar os eventos." }, { status: 500 });
  }
}
