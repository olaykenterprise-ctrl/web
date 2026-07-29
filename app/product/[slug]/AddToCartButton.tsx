"use client";

import { useState } from "react";
import { useShopStore } from "@/lib/store";
import { Product } from "@/lib/db";
import { ShoppingCart, Check } from "lucide-react";

export function AddToCartButton({ product }: { product: Product }) {
  const addToCart = useShopStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button 
      onClick={handleAddToCart}
      disabled={added}
      className={`w-full py-4 rounded-xl text-lg font-bold transition-all duration-300 flex items-center justify-center gap-2
        ${added 
          ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' 
          : 'bg-accent text-primary-dark hover:bg-accent-dark shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:-translate-y-1'
        }`}
    >
      {added ? (
        <>
          <Check size={24} /> Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart size={24} /> Add to Cart
        </>
      )}
    </button>
  );
}
