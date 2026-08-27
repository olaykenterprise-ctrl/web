import Link from "next/link";
import { ArrowRight, PackageSearch } from "lucide-react";
import { ProductCard } from "../ui/ProductCard";
import { getFeaturedProducts } from "@/lib/db";

export async function FeaturedProducts() {
  const products = await getFeaturedProducts(10);

  return (
    <section className="container-custom mb-14 sm:mb-20">
      {/* Header Row */}
      <div className="flex items-end justify-between mb-6 sm:mb-8 pb-3 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">🔥</span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Featured Products
            </h2>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm">
            Handpicked for quality, style and value.
          </p>
        </div>

        <Link
          href="/"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/5 hover:bg-primary/10 px-3.5 py-2 rounded-xl transition-all"
        >
          <span>View All Products</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Real Products Grid or Clean Empty State */}
      {products && products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <div className="bg-[#FAF8F5] rounded-3xl p-10 sm:p-16 text-center border border-gray-200/60 shadow-xs">
          <div className="w-14 h-14 bg-white rounded-2xl mx-auto flex items-center justify-center text-gray-400 shadow-xs mb-3.5 border border-gray-100">
            <PackageSearch size={26} className="text-primary/70" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
            Check back soon!
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto mb-6">
            Products are yet to be added to this catalogue, come back later.
          </p>
          <Link
            href="/adminola/products/new"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-xs"
          >
            Add First Product
          </Link>
        </div>
      )}

      {/* Mobile View All Button */}
      <div className="sm:hidden mt-6 text-center">
        <Link
          href="/"
          className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold text-primary bg-primary/5 py-3 rounded-xl"
        >
          <span>View All Products</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
