import { getProductBySlug, getNewArrivals } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, Truck, ShieldCheck, Zap } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { AddToCartButton } from "./AddToCartButton";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  // Fetch some related products (using new arrivals as a mock)
  const relatedProducts = (await getNewArrivals()).slice(0, 4);

  return (
    <div className="container-custom py-12 min-h-screen">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition">
          <ArrowLeft size={16} /> Back to Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        
        {/* Product Image Gallery */}
        <div className="space-y-4">
          <div className="relative w-full aspect-square bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center p-8 overflow-hidden group">
            <Image 
              src={product.image} 
              alt={product.name} 
              fill 
              className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
            />
            {product.discountBadge && (
              <span className="absolute top-4 left-4 bg-red-500 text-white font-bold px-3 py-1 rounded-sm text-sm z-10">
                {product.discountBadge}
              </span>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {/* Mock thumbnails */}
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className={`relative aspect-square rounded-lg border-2 ${i === 0 ? 'border-primary' : 'border-gray-100'} bg-gray-50 flex items-center justify-center overflow-hidden cursor-pointer hover:border-primary transition-colors`}>
                <Image 
                  src={product.image} 
                  alt={`${product.name} view ${i + 1}`} 
                  fill 
                  className="object-contain p-2"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-xs font-bold tracking-wider uppercase text-gray-500">
              {product.category.replace("-", " ")}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-1">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? "fill-yellow-400" : "fill-gray-200 text-gray-200"}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700 ml-1">{product.rating} Rating</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <span className="text-sm text-gray-500">{product.reviews} Reviews</span>
          </div>

          <div className="mb-8">
            <div className="flex items-end gap-3 mb-2">
              <span className="text-4xl font-bold text-gray-900">
                ₦{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through mb-1">
                  ₦{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">Includes all applicable taxes.</p>
          </div>

          <div className="prose prose-sm text-gray-600 mb-8 max-w-none">
            <p className="text-base leading-relaxed">{product.description}</p>
            <ul className="mt-4 space-y-2">
              <li>Premium build quality and durability.</li>
              <li>Compatible with multiple devices.</li>
              <li>1 Year Manufacturer Warranty.</li>
            </ul>
          </div>

          {/* Client Component for interactive Add to Cart */}
          <div className="mt-auto pt-6">
            <AddToCartButton product={product} />
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
            <div className="flex items-start gap-3">
              <div className="bg-gray-50 p-2 rounded-full text-primary">
                <Truck size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Fast Delivery</h4>
                <p className="text-xs text-gray-500">Nationwide shipping across Nigeria</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-gray-50 p-2 rounded-full text-primary">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Secure Payment</h4>
                <p className="text-xs text-gray-500">Pay on Delivery available</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Related Products */}
      <div className="pt-12 border-t border-gray-100">
        <div className="flex items-center gap-2 mb-8">
          <Zap size={24} className="text-primary fill-primary" />
          <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">You Might Also Like</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map((rp) => (
            <ProductCard key={rp.id} {...rp} />
          ))}
        </div>
      </div>
    </div>
  );
}
