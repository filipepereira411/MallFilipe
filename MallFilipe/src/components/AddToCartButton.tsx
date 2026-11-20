"use client";

import { Check, Plus, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/components/CartProvider";
import type { Product } from "@/lib/types";

type Props = {
  product: Product;
  quantity?: number;
  compact?: boolean;
  className?: string;
};

export function AddToCartButton({ product, quantity = 1, compact = false, className = "" }: Props) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timeout = window.setTimeout(() => setAdded(false), 1600);
    return () => window.clearTimeout(timeout);
  }, [added]);

  const disabled = product.stock <= 0;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        add(product, quantity);
        setAdded(true);
      }}
      aria-label={`Adicionar ${product.name} ao carrinho`}
      className={`${className} ${
        compact
          ? "grid h-10 w-10 place-items-center rounded-full bg-[var(--ink)] text-white transition hover:bg-[var(--forest)] disabled:opacity-40"
          : "btn-primary flex-1 disabled:opacity-40"
      }`}
    >
      {added ? (
        <>
          <Check className="h-4 w-4" />
          {!compact && "Adicionado"}
        </>
      ) : compact ? (
        <Plus className="h-4 w-4" />
      ) : (
        <>
          <ShoppingBag className="h-4 w-4" />
          {disabled ? "Esgotado" : "Adicionar"}
        </>
      )}
    </button>
  );
}
