import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import { ProductCard } from "../ui/ProductCard";
import { getFlashSaleProducts } from "@/lib/db";

export async function FlashSale() {
  const flashSaleProducts = await getFlashSaleProducts();

  return (
    <div className="container-custom mb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap size={24} className="text-primary fill-primary" />
            <h2 className="text-2xl font-bold uppercase tracking-tight text-gray-900">Flash Sale</h2>
          </div>
          <p className="text-gray-500 text-sm ml-8">Limited time offers. Don't miss out!</p>
        </div>

        <div className="flex items-center gap-6 ml-8 md:ml-0">
          {/* Timer */}
          <div className="flex gap-2">
            <div className="flex flex-col items-center bg-primary text-white rounded-md w-12 py-1">
              <span className="text-lg font-bold leading-none">02</span>
              <span className="text-[9px] font-semibold uppercase">Hrs</span>
            </div>
            <div className="flex flex-col items-center justify-center text-primary font-bold">:</div>
            <div className="flex flex-col items-center bg-primary text-white rounded-md w-12 py-1">
              <span className="text-lg font-bold leading-none">15</span>
              <span className="text-[9px] font-semibold uppercase">Mins</span>
            </div>
            <div className="flex flex-col items-center justify-center text-primary font-bold">:</div>
            <div className="flex flex-col items-center bg-primary text-white rounded-md w-12 py-1">
              <span className="text-lg font-bold leading-none">32</span>
              <span className="text-[9px] font-semibold uppercase">Secs</span>
            </div>
          </div>
          
          <Link href="/deals" className="hidden md:flex items-center gap-1 text-primary font-bold text-sm hover:underline">
            View All Deals <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {flashSaleProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      
      <Link href="/deals" className="md:hidden mt-6 flex items-center justify-center gap-1 text-white bg-gray-900 py-3 rounded-lg font-bold text-sm">
        View All Deals
      </Link>
    </div>
  );
}
