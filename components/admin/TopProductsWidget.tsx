import Link from "next/link";
import Image from "next/image";

interface ProductItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  soldCount?: number;
  category?: string;
}

interface TopProductsWidgetProps {
  products: ProductItem[];
}

export function TopProductsWidget({ products }: TopProductsWidgetProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 tracking-tight">Top Products</h3>
        <Link
          href="/adminola/products"
          className="text-xs font-bold text-[#00875A] hover:text-emerald-700 transition-colors"
        >
          View All
        </Link>
      </div>

      {/* Product List */}
      <div className="space-y-4 flex-1 flex flex-col justify-around py-1">
        {products.map((product) => (
          <div key={product.id} className="flex items-center justify-between gap-3 group">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[10px] text-gray-400 font-bold">
                    PROD
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <h4 className="text-xs font-bold text-gray-900 truncate max-w-[150px] sm:max-w-[180px]">
                  {product.name}
                </h4>
                <p className="text-xs font-bold text-[#10B981] mt-0.5">
                  ₦{product.price.toLocaleString()}
                </p>
              </div>
            </div>

            <span className="text-[11px] font-semibold text-gray-400 whitespace-nowrap pl-2">
              {product.soldCount || 12} sold
            </span>
          </div>
        ))}

        {products.length === 0 && (
          <div className="py-8 text-center text-gray-400 text-xs">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
}
