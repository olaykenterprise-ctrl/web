"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Check } from "lucide-react";
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
    rating,
    reviews,
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

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden flex flex-col h-full">
      {/* Badges and Actions */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
        {discountBadge ? (
          <span className="bg-accent text-primary-dark text-[10px] font-bold px-2 py-1 rounded-sm">
            {discountBadge}
          </span>
        ) : (
          <div></div>
        )}
        <button 
          onClick={() => toggleWishlist(product)}
          className={`transition-colors bg-white rounded-full p-1.5 shadow-sm ${isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
        >
          <Heart size={16} className={isWishlisted ? "fill-red-500" : ""} />
        </button>
      </div>

      {/* Product Image */}
      <Link href={`/product/${slug}`} className="relative w-full aspect-square bg-gray-50 flex items-center justify-center p-6 block">
        <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-300">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/product/${slug}`} className="hover:text-primary transition-colors">
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 min-h-[40px]">
            {name}
          </h3>
        </Link>
        
        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-1">
            {originalPrice && (
              <span className="text-[11px] text-gray-400 line-through">
                ₦{originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-base font-bold text-gray-900">
              ₦{price.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-1 mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < Math.floor(rating) ? "fill-yellow-400" : "fill-gray-200 text-gray-200"}
                />
              ))}
            </div>
            <span className="text-[10px] text-gray-500">({reviews})</span>
          </div>

          <button 
            onClick={handleAddToCart}
            disabled={added}
            className={`w-full py-2 rounded-lg text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2
              ${added 
                ? 'bg-green-500 text-white' 
                : 'bg-accent text-primary-dark hover:bg-accent-dark hover:text-white hover:scale-[1.02]'
              }`}
          >
            {added ? (
              <>
                <Check size={16} /> Added
              </>
            ) : (
              'Add to Cart'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
