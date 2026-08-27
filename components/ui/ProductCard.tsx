"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { useShopStore } from "@/lib/store";
import { Product } from "@/lib/db";

export function ProductCard(product: Product) {
  const {
    id,
    name,
    slug,
    image,
    price,
    originalPrice,
    category,
    isFlashSale,
    isNewArrival,
    discountBadge,
  } = product;

  const addToCart = useShopStore((state) => state.addToCart);
  const toggleWishlist = useShopStore((state) => state.toggleWishlist);
  const wishlist = useShopStore((state) => state.wishlist);
  
  const isWishlisted = wishlist.some((item) => item.id === id);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Determine appropriate badge
  const renderBadge = () => {
    if (isFlashSale) {
      return (
        <span className="bg-red-50 text-red-600 border border-red-200/60 text-[10px] font-bold px-2 py-0.5 rounded-md">
          Hot Deal
        </span>
      );
    }
    if (isNewArrival) {
      return (
        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[10px] font-bold px-2 py-0.5 rounded-md">
          New
        </span>
      );
    }
    if (discountBadge) {
      return (
        <span className="bg-accent/20 text-accent-dark border border-accent/40 text-[10px] font-bold px-2 py-0.5 rounded-md">
          {discountBadge}
        </span>
      );
    }
    return (
      <span className="bg-amber-50 text-amber-700 border border-amber-200/60 text-[10px] font-bold px-2 py-0.5 rounded-md">
        Best Seller
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md hover:border-gray-300 transition-all group flex flex-col h-full overflow-hidden relative">
      
      {/* Top Badges & Wishlist */}
      <div className="p-3.5 pb-0 flex justify-between items-center z-10">
        <div>{renderBadge()}</div>
        <button 
          onClick={() => toggleWishlist(product)}
          className={`w-7 h-7 rounded-full bg-white/90 shadow-xs border border-gray-100 flex items-center justify-center transition-colors ${
            isWishlisted ? "text-red-500" : "text-gray-400 hover:text-red-500"
          }`}
          aria-label="Add to wishlist"
        >
          <Heart size={14} className={isWishlisted ? "fill-red-500" : ""} />
        </button>
      </div>

      {/* Product Image */}
      <Link 
        href={`/product/${slug}`} 
        className="relative w-full aspect-square bg-white flex items-center justify-center p-4"
      >
        <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-300">
          <Image
            src={image || "/placeholder.png"}
            alt={name}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-4 pt-2 flex flex-col flex-grow bg-white border-t border-gray-50">
        <Link href={`/product/${slug}`} className="hover:text-primary transition-colors">
          <h3 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-1 mb-0.5">
            {name}
          </h3>
        </Link>

        <p className="text-[11px] text-gray-400 capitalize mb-2 font-medium">
          {category ? category.replace("-", " ") : "Premium Gear"}
        </p>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mb-3 mt-auto">
          <span className="text-sm sm:text-base font-black text-gray-900">
            ₦{price.toLocaleString()}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="text-[11px] text-gray-400 line-through">
              ₦{originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Cart CTA */}
        <button 
          onClick={handleAddToCart}
          disabled={added}
          className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-xs ${
            added
              ? "bg-emerald-600 text-white"
              : "bg-primary hover:bg-primary-dark text-white hover:-translate-y-0.5"
          }`}
        >
          {added ? (
            <>
              <Check size={14} />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <ShoppingCart size={14} />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
