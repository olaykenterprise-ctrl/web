export const dynamic = "force-dynamic";

import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Plus, Edit, Trash2, PackageSearch, ExternalLink, Package } from "lucide-react";
import Image from "next/image";

export default async function AdminProducts() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  const productList = products || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Products Management</h1>
          <p className="text-xs font-medium text-gray-500 mt-1">
            Manage your store inventory, pricing, images, and live product listings.
          </p>
        </div>

        <Link
          href="/adminola/products/new"
          className="flex items-center gap-2 bg-[#00875A] hover:bg-emerald-700 text-white font-bold py-2.5 px-5 rounded-xl transition-all shadow-sm shadow-[#00875A]/20 text-xs"
        >
          <Plus size={16} />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden">
        {/* Table Controls */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="text-xs font-bold text-gray-700 flex items-center gap-2">
            <span>All Products</span>
            <span className="bg-emerald-50 text-[#00875A] py-0.5 px-2 rounded-full font-extrabold text-[11px]">
              {productList.length}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-bold text-[11px] uppercase tracking-wider bg-gray-50/50">
                <th className="py-3.5 px-6 font-semibold">Product Details</th>
                <th className="py-3.5 px-6 font-semibold">Category</th>
                <th className="py-3.5 px-6 font-semibold">Price (₦)</th>
                <th className="py-3.5 px-6 font-semibold">Units Sold</th>
                <th className="py-3.5 px-6 font-semibold">Badges</th>
                <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs">
              {productList.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/70 transition-colors group">
                  <td className="py-4 px-6 flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                      <Image
                        src={product.image || "/placeholder.png"}
                        alt={product.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{product.name}</p>
                      <Link
                        href={`/product/${product.slug}`}
                        target="_blank"
                        className="text-[11px] text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center gap-1 mt-0.5"
                      >
                        /{product.slug} <ExternalLink size={10} />
                      </Link>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-gray-100 text-gray-700 font-semibold px-2.5 py-1 rounded-lg capitalize text-[11px]">
                      {product.category?.replace("-", " ") || "General"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-gray-900 text-sm">
                      ₦{product.price?.toLocaleString()}
                    </div>
                    {product.original_price && (
                      <div className="text-[11px] text-gray-400 line-through">
                        ₦{product.original_price.toLocaleString()}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-600">
                    {product.sold_count || Math.max(12, (product.reviews || 5) * 3)} sold
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1.5">
                      {product.is_flash_sale && (
                        <span className="inline-block bg-red-50 text-red-600 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-red-200">
                          Flash Sale
                        </span>
                      )}
                      {product.is_new_arrival && (
                        <span className="inline-block bg-blue-50 text-blue-600 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-blue-200">
                          New
                        </span>
                      )}
                      {!product.is_flash_sale && !product.is_new_arrival && (
                        <span className="text-gray-300 text-xs">—</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        title="Edit product"
                        className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        title="Delete product"
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {productList.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    <Package size={32} className="mx-auto text-gray-300 mb-2" />
                    <p className="font-bold text-gray-700 text-sm">No products in catalogue</p>
                    <p className="text-xs text-gray-400 mt-1 mb-4">Add your first product to begin selling.</p>
                    <Link
                      href="/adminola/products/new"
                      className="inline-flex items-center gap-2 bg-[#00875A] text-white font-bold text-xs px-4 py-2 rounded-xl"
                    >
                      <Plus size={14} /> Add Product
                    </Link>
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
