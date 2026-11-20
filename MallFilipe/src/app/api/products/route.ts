import { getProducts } from "@/lib/data";
import { normalizeText } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = normalizeText(searchParams.get("q") ?? "");
    const category = searchParams.get("category") ?? "";
    const store = searchParams.get("store") ?? "";
    const offersOnly = searchParams.get("offers") === "true";
    const sort = searchParams.get("sort") ?? "relevance";
    const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 100, 1), 100);

    let result = await getProducts();
    if (query) {
      result = result.filter((product) =>
        normalizeText(
          `${product.name} ${product.description} ${product.category} ${product.storeName}`,
        ).includes(query),
      );
    }
    if (category) result = result.filter((product) => product.category === category);
    if (store) result = result.filter((product) => product.storeSlug === store);
    if (offersOnly) result = result.filter((product) => product.oldPrice !== null);

    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating || b.sold - a.sold);
    if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name, "pt"));

    return Response.json({ count: result.length, products: result.slice(0, limit) });
  } catch (error) {
    console.error("GET /api/products", error);
    return Response.json({ error: "Não foi possível carregar os produtos." }, { status: 500 });
  }
}
