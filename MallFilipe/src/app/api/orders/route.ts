import { eq, inArray, sql } from "drizzle-orm";
import { randomBytes } from "node:crypto";
import { db } from "@/db";
import { orderItems, orders, products, stores } from "@/db/schema";
import { ensureDatabase } from "@/db/seed";

export const dynamic = "force-dynamic";

type IncomingItem = { productId?: unknown; quantity?: unknown };

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      customerName?: unknown;
      email?: unknown;
      phone?: unknown;
      notes?: unknown;
      items?: IncomingItem[];
    };

    const customerName = typeof body.customerName === "string" ? body.customerName.trim().slice(0, 120) : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 180) : "";
    const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 40) : "";
    const notes = typeof body.notes === "string" ? body.notes.trim().slice(0, 500) : "";
    const rawItems = Array.isArray(body.items) ? body.items : [];

    if (!customerName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Introduza o nome e um email válido." }, { status: 400 });
    }

    const quantities = new Map<number, number>();
    for (const item of rawItems) {
      const productId = Number(item.productId);
      const quantity = Math.floor(Number(item.quantity));
      if (!Number.isInteger(productId) || productId <= 0 || !Number.isFinite(quantity) || quantity <= 0) continue;
      quantities.set(productId, Math.min((quantities.get(productId) ?? 0) + quantity, 99));
    }
    if (quantities.size === 0) {
      return Response.json({ error: "O carrinho está vazio." }, { status: 400 });
    }

    await ensureDatabase();
    const ids = [...quantities.keys()].slice(0, 50);
    const rows = await db
      .select({ product: products, store: stores })
      .from(products)
      .innerJoin(stores, eq(products.storeId, stores.id))
      .where(inArray(products.id, ids));

    if (rows.length !== ids.length) {
      return Response.json({ error: "Um dos produtos já não está disponível." }, { status: 409 });
    }

    const lines = rows.map((row) => {
      const quantity = quantities.get(row.product.id) ?? 0;
      if (quantity > row.product.stock) {
        throw new Error(`Stock insuficiente para ${row.product.name}.`);
      }
      return {
        productId: row.product.id,
        productName: row.product.name,
        storeName: row.store.name,
        imageUrl: row.product.imageUrl,
        unitPrice: Number(row.product.price),
        quantity,
      };
    });

    const total = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
    const code = `MF-${new Date().getFullYear()}-${randomBytes(4).toString("hex").toUpperCase()}`;

    const created = await db.transaction(async (tx) => {
      const [order] = await tx
        .insert(orders)
        .values({
          code,
          customerName,
          email,
          phone,
          notes,
          total: total.toFixed(2),
          status: "confirmado",
        })
        .returning();

      await tx.insert(orderItems).values(
        lines.map((line) => ({
          orderId: order.id,
          productId: line.productId,
          productName: line.productName,
          storeName: line.storeName,
          imageUrl: line.imageUrl,
          unitPrice: line.unitPrice.toFixed(2),
          quantity: line.quantity,
        })),
      );

      for (const line of lines) {
        await tx
          .update(products)
          .set({
            stock: sql`greatest(${products.stock} - ${line.quantity}, 0)`,
            sold: sql`${products.sold} + ${line.quantity}`,
          })
          .where(eq(products.id, line.productId));
      }

      return order;
    });

    return Response.json(
      { ok: true, code: created.code, total, status: created.status },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/orders", error);
    const message = error instanceof Error && error.message.startsWith("Stock insuficiente")
      ? error.message
      : "Não foi possível concluir a encomenda.";
    return Response.json({ error: message }, { status: 500 });
  }
}
