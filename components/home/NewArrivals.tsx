import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import { ProductCard } from "../ui/ProductCard";
import { getNewArrivals } from "@/lib/db";

export async function NewArrivals() {
  const newProducts = await getNewArrivals();

  return (
    <div className="container-custom mb-16">
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap size={24} className="text-primary fill-primary" />
            <h2 className="text-2xl font-bold uppercase tracking-tight text-gray-900">New Arrivals</h2>
          </div>
          <p className="text-gray-500 text-sm ml-8">Check out our latest products</p>
        </div>

        <Link href="/new-arrivals" className="flex items-center gap-1 text-primary font-bold text-sm hover:underline">
          View All <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {newProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
