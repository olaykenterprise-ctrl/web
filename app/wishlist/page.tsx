"use client";

import { useShopStore } from "@/lib/store";
import { ProductCard } from "@/components/ui/ProductCard";
import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

export default function WishlistPage() {
  const wishlist = useShopStore((state) => state.wishlist);
  
  // Prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="container-custom py-12 min-h-[60vh]">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-4 transition">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
        <p className="text-gray-600">
          You have {wishlist.length} item{wishlist.length === 1 ? '' : 's'} saved.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border border-gray-100 text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
            <Heart size={32} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-8 max-w-sm">
            Keep track of items you love. Click the heart icon on any product to save it here!
          </p>
          <Link href="/" className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-dark transition-colors">
            Discover Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {wishlist.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
}
