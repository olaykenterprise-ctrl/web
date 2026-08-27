import { getProductsByCategory } from "@/lib/db";
import { ProductCard } from "@/components/ui/ProductCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const products = await getProductsByCategory(resolvedParams.slug);
  
  // Format the slug for display (e.g., "powerbanks" -> "Powerbanks")
  const categoryName = resolvedParams.slug
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="container-custom py-12 min-h-[60vh]">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-4 transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {categoryName}
        </h1>
        <p className="text-gray-600">
          Showing {products.length} {products.length === 1 ? 'result' : 'results'} for {categoryName}
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 rounded-2xl border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Check back soon!</h2>
          <p className="text-gray-600 mb-6">A product is yet to be added to this category, come back later.</p>
          <Link href="/" className="bg-accent hover:bg-accent-dark text-primary-dark px-8 py-3 rounded-full font-bold transition-colors inline-block hover:scale-105">
            View All Products
          </Link>
        </div>
      )}
    </div>
  );
}
