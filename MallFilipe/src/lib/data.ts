import { asc, desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  events as eventsTable,
  eventRegistrations,
  orderItems,
  orders,
  products,
  stores,
  type EventRow,
  type ProductRow,
  type StoreRow,
} from "@/db/schema";
import { ensureDatabase } from "@/db/seed";
import type { MallEvent, Order, Product, Store } from "@/lib/types";

function mapStore(row: StoreRow): Store {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    category: row.category,
    floor: row.floor,
    unit: row.unit,
    hours: row.hours,
    logo: row.logo,
    coverImage: row.coverImage,
    accent: row.accent,
    rating: Number(row.rating),
    featured: row.featured,
  };
}

function mapProduct(row: { product: ProductRow; store: StoreRow }): Product {
  return {
    id: row.product.id,
    slug: row.product.slug,
    name: row.product.name,
    description: row.product.description,
    category: row.product.category,
    price: Number(row.product.price),
    oldPrice: row.product.oldPrice === null ? null : Number(row.product.oldPrice),
    imageUrl: row.product.imageUrl,
    badge: row.product.badge,
    highlights: row.product.highlights
      ? row.product.highlights.split(",").map((value) => value.trim()).filter(Boolean)
      : [],
    rating: Number(row.product.rating),
    stock: row.product.stock,
    sold: row.product.sold,
    featured: row.product.featured,
    storeId: row.store.id,
    storeSlug: row.store.slug,
    storeName: row.store.name,
    storeFloor: row.store.floor,
    storeUnit: row.store.unit,
    storeAccent: row.store.accent,
  };
}

export async function getStores(): Promise<Store[]> {
  await ensureDatabase();
  const rows = await db.select().from(stores).orderBy(asc(stores.floor), asc(stores.name));
  return rows.map(mapStore);
}

export async function getStoreBySlug(slug: string): Promise<Store | null> {
  await ensureDatabase();
  const [row] = await db.select().from(stores).where(eq(stores.slug, slug)).limit(1);
  return row ? mapStore(row) : null;
}

export async function getProducts(): Promise<Product[]> {
  await ensureDatabase();
  const rows = await db
    .select({ product: products, store: stores })
    .from(products)
    .innerJoin(stores, eq(products.storeId, stores.id))
    .orderBy(desc(products.featured), desc(products.sold), asc(products.name));
  return rows.map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await ensureDatabase();
  const [row] = await db
    .select({ product: products, store: stores })
    .from(products)
    .innerJoin(stores, eq(products.storeId, stores.id))
    .where(eq(products.slug, slug))
    .limit(1);
  return row ? mapProduct(row) : null;
}

export async function getEvents(): Promise<MallEvent[]> {
  await ensureDatabase();
  const [rows, registrations] = await Promise.all([
    db.select().from(eventsTable).orderBy(asc(eventsTable.eventDate)),
    db
      .select({
        eventId: eventRegistrations.eventId,
        count: sql<number>`count(*)::int`,
      })
      .from(eventRegistrations)
      .groupBy(eventRegistrations.eventId),
  ]);

  const counts = new Map(registrations.map((row) => [row.eventId, Number(row.count)]));
  return rows.map((row: EventRow): MallEvent => ({
    id: row.id,
    title: row.title,
    description: row.description,
    eventDate: row.eventDate,
    eventTime: row.eventTime,
    location: row.location,
    category: row.category,
    imageUrl: row.imageUrl,
    capacity: row.capacity,
    featured: row.featured,
    registrations: counts.get(row.id) ?? 0,
  }));
}

export async function getOrderByCode(code: string): Promise<Order | null> {
  await ensureDatabase();
  const [row] = await db.select().from(orders).where(eq(orders.code, code)).limit(1);
  if (!row) return null;

  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, row.id));
  return {
    id: row.id,
    code: row.code,
    customerName: row.customerName,
    email: row.email,
    phone: row.phone,
    notes: row.notes,
    total: Number(row.total),
    status: row.status,
    createdAt: row.createdAt.toISOString(),
    items: items.map((item) => ({
      id: item.id,
      productId: item.productId,
      productName: item.productName,
      storeName: item.storeName,
      imageUrl: item.imageUrl,
      unitPrice: Number(item.unitPrice),
      quantity: item.quantity,
    })),
  };
}

export async function getMallOverview() {
  await ensureDatabase();
  const [storeList, productList, eventList] = await Promise.all([
    getStores(),
    getProducts(),
    getEvents(),
  ]);
  return { stores: storeList, products: productList, events: eventList };
}
