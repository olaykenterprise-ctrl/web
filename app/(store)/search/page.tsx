import { searchProducts } from "@/lib/db";
import { ProductCard } from "@/components/ui/ProductCard";
import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const query = typeof resolvedParams.q === "string" ? resolvedParams.q : "";
  
  const results = await searchProducts(query);

  return (
    <div className="container-custom py-12 min-h-[60vh]">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-4 transition">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Search Results
        </h1>
        {query ? (
          <p className="text-gray-600">
            Showing results for <span className="font-semibold text-primary">"{query}"</span> ({results.length} items found)
          </p>
        ) : (
          <p className="text-gray-600">Please enter a search term.</p>
        )}
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {results.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : (
        query && (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <SearchX size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 max-w-md">
              We couldn't find anything matching "{query}". Try checking your spelling or searching for a more general term.
            </p>
          </div>
        )
      )}
    </div>
  );
}
