import { getStores } from "@/lib/data";
import { normalizeText } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = normalizeText(searchParams.get("q") ?? "");
    const category = searchParams.get("category") ?? "";
    const floor = searchParams.get("floor") ?? "";
    let result = await getStores();

    if (query) {
      result = result.filter((store) =>
        normalizeText(`${store.name} ${store.tagline} ${store.category} ${store.description}`).includes(query),
      );
    }
    if (category) result = result.filter((store) => store.category === category);
    if (floor) result = result.filter((store) => store.floor === floor);

    return Response.json({ count: result.length, stores: result });
  } catch (error) {
    console.error("GET /api/stores", error);
    return Response.json({ error: "Não foi possível carregar as lojas." }, { status: 500 });
  }
}
