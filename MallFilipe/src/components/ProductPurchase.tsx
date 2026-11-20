"use client";

import { useRouter } from "next/navigation";
import { Heart, Minus, Plus, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";
import { AddToCartButton } from "@/components/AddToCartButton";
import { useCart } from "@/components/CartProvider";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductPurchase({ product }: { product: Product }) {
  const { add } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(false);

  function buyNow() {
    add(product, quantity);
    router.push("/carrinho");
  }

  return (
    <div>
      <div className="flex flex-wrap items-end gap-4">
        <span className="font-display text-4xl font-semibold">{formatCurrency(product.price)}</span>
        {product.oldPrice && <span className="pb-1 text-base text-[var(--muted)] line-through">{formatCurrency(product.oldPrice)}</span>}
        {product.oldPrice && (
          <span className="tag mb-1 bg-[#a63f45]/10 text-[#a63f45]">
            Poupa {formatCurrency(product.oldPrice - product.price)}
          </span>
        )}
      </div>

      <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{product.description}</p>

      <div className="mt-6">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">Destaques</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.highlights.map((highlight) => (
            <span key={highlight} className="rounded-full border border-[var(--line)] bg-white px-3 py-1.5 text-xs font-medium">{highlight}</span>
          ))}
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <div className="flex h-12 items-center rounded-full border border-[var(--line)] bg-white px-1">
          <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="grid h-10 w-10 place-items-center rounded-full" aria-label="Diminuir quantidade">
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center font-bold">{quantity}</span>
          <button type="button" onClick={() => setQuantity((value) => Math.min(product.stock, value + 1))} disabled={quantity >= product.stock} className="grid h-10 w-10 place-items-center rounded-full disabled:opacity-30" aria-label="Aumentar quantidade">
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <AddToCartButton product={product} quantity={quantity} className="min-w-40" />
        <button
          type="button"
          onClick={() => setFavorite((value) => !value)}
          aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          className={`grid h-12 w-12 place-items-center rounded-full border transition ${favorite ? "border-[#a63f45] bg-[#a63f45]/10 text-[#a63f45]" : "border-[var(--line)] bg-white"}`}
        >
          <Heart className={`h-5 w-5 ${favorite ? "fill-current" : ""}`} />
        </button>
      </div>

      <button type="button" onClick={buyNow} disabled={product.stock <= 0} className="btn-outline mt-3 w-full disabled:opacity-40">
        Comprar agora
      </button>

      <div className="mt-7 grid gap-3 border-t border-[var(--line)] pt-6 text-xs text-[var(--muted)] sm:grid-cols-3">
        <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-[var(--forest)]" /> Entrega grátis</span>
        <span className="flex items-center gap-2"><RotateCcw className="h-4 w-4 text-[var(--forest)]" /> Devolução fácil</span>
        <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[var(--forest)]" /> Garantia FLDA</span>
      </div>
    </div>
  );
}
