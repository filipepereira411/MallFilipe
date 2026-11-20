import { getOrderByCode } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  try {
    const { code } = await params;
    const order = await getOrderByCode(decodeURIComponent(code));
    if (!order) return Response.json({ error: "Encomenda não encontrada." }, { status: 404 });
    return Response.json(order);
  } catch (error) {
    console.error("GET /api/orders/[code]", error);
    return Response.json({ error: "Não foi possível carregar a encomenda." }, { status: 500 });
  }
}
