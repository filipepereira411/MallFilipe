import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = {
  title: "Carrinho",
  description: "Revise os artigos e finalize a sua encomenda no MallFilipe.",
};

export default function CartPage() {
  return (
    <section className="section-shell container-shell">
      <CartView />
    </section>
  );
}
