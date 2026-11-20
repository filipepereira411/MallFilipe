"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { AddToCartButton } from "@/components/AddToCartButton";
import { discountPercentage, formatCurrency } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const discount = discountPercentage(product.price, product.oldPrice);

  return (
    <article className="product-card group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-white shadow-[0_12px_35px_rgba(35,42,51,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(35,42,51,0.12)]">
      <Link href={`/produtos/${product.slug}`} className="relative block aspect-[4/3.6] overflow-hidden bg-[#eee9df]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="product-card-image h-full w-full object-cover"
        />
        <div className="absolute left-3 top-3 flex flex-col items-start gap-2">
          {discount !== null && <span className="tag bg-[#a63f45] text-white">-{discount}%</span>}
          {!discount && product.badge && <span className="tag bg-white/95 text-[var(--forest)]">{product.badge}</span>}
        </div>
        <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--ink)] backdrop-blur">
          {product.storeName}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2 text-[11px] text-[var(--muted)]">
          <span>{product.category}</span>
          <span className="flex items-center gap-1 font-semibold text-[var(--ink-2)]">
            <Star className="h-3 w-3 fill-[var(--gold)] text-[var(--gold)]" />
            {product.rating.toFixed(1)}
          </span>
        </div>
        <Link href={`/produtos/${product.slug}`} className="mt-2 line-clamp-2 font-display text-lg font-semibold leading-snug hover:text-[var(--forest)]">
          {product.name}
        </Link>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-[var(--muted)]">{product.description}</p>
        <div className="mt-4 flex items-end gap-2">
          <span className="text-xl font-bold tracking-tight">{formatCurrency(product.price)}</span>
          {product.oldPrice && (
            <span className="pb-0.5 text-xs text-[var(--muted)] line-through">{formatCurrency(product.oldPrice)}</span>
          )}
        </div>
        <div className="mt-4 flex items-center gap-2 border-t border-[var(--line)] pt-4">
          <AddToCartButton product={product} compact />
          <Link href={`/produtos/${product.slug}`} className="btn-outline h-10 flex-1 px-3 text-xs">
            Ver detalhes
          </Link>
        </div>
      </div>
    </article>
  );
}
