import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Plus, Edit, Trash2, PackageSearch, ExternalLink } from "lucide-react";
import Image from "next/image";

export default async function AdminProducts() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Product Catalogue</h1>
          <p className="text-gray-500 mt-1 font-medium">Manage your inventory, pricing, and active listings.</p>
        </div>
        <Link
          href="/adminola/products/new"
          className="flex items-center gap-2 bg-gradient-to-r from-[#FFC107] to-orange-400 hover:from-yellow-400 hover:to-orange-500 text-gray-950 font-black py-3 px-6 rounded-2xl transition-all shadow-[0_0_20px_-5px_rgba(255,193,7,0.4)] hover:shadow-[0_0_30px_-5px_rgba(255,193,7,0.6)] hover:-translate-y-1"
        >
          <Plus size={20} />
          Add New Product
        </Link>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden relative">
        
        {/* Table Controls (Placeholder for future search/filter) */}
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">
            All Products <span className="bg-gray-200 text-gray-700 py-1 px-2 rounded-lg ml-2">{products?.length || 0}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white border-b border-gray-100 text-gray-400 font-bold text-xs uppercase tracking-wider">
                <th className="p-6 py-4">Product Details</th>
                <th className="p-6 py-4">Category</th>
                <th className="p-6 py-4">Price (₦)</th>
                <th className="p-6 py-4">Badges</th>
                <th className="p-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {products?.map((product) => (
                <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors group">
                  <td className="p-6 flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src={product.image || "/placeholder.png"}
                        alt={product.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-base">{product.name}</p>
                      <Link href={`/product/${product.slug}`} target="_blank" className="text-xs text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1 mt-1">
                        /{product.slug} <ExternalLink size={10} />
                      </Link>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="bg-gray-100 text-gray-600 font-bold px-3 py-1.5 rounded-lg capitalize text-xs">
                      {product.category.replace("-", " ")}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="font-black text-gray-900 text-lg">₦{product.price.toLocaleString()}</div>
                    {product.original_price && (
                      <div className="text-xs text-gray-400 line-through">₦{product.original_price.toLocaleString()}</div>
                    )}
                  </td>
                  <td className="p-6">
                    <div className="flex flex-wrap gap-2">
                      {product.is_flash_sale && (
                        <span className="inline-block bg-red-500/10 text-red-600 font-bold text-[10px] uppercase tracking-wider px-2 py-1 rounded-md border border-red-500/20">Flash Sale</span>
                      )}
                      {product.is_new_arrival && (
                        <span className="inline-block bg-blue-500/10 text-blue-600 font-bold text-[10px] uppercase tracking-wider px-2 py-1 rounded-md border border-blue-500/20">New</span>
                      )}
                      {!product.is_flash_sale && !product.is_new_arrival && (
                        <span className="text-gray-300 text-xs">—</span>
                      )}
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      <button className="p-2.5 text-gray-400 hover:text-blue-500 transition-colors bg-white hover:bg-blue-50 border border-gray-100 rounded-xl shadow-sm hover:shadow">
                        <Edit size={18} />
                      </button>
                      <button className="p-2.5 text-gray-400 hover:text-red-500 transition-colors bg-white hover:bg-red-50 border border-gray-100 rounded-xl shadow-sm hover:shadow">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {(!products || products.length === 0) && (
                <tr>
                  <td colSpan={5} className="p-12">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                        <PackageSearch size={40} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">No products yet</h3>
                      <p className="text-gray-500 max-w-sm mb-6">Your store catalogue is currently empty. Add your first product to start selling.</p>
                      <Link
                        href="/adminola/products/new"
                        className="bg-gray-900 hover:bg-black text-white font-bold py-3 px-6 rounded-xl transition-all"
                      >
                        Add Your First Product
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
