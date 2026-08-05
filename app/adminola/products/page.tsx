import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import Image from "next/image";

export default async function AdminProducts() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <Link
          href="/adminola/products/new"
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-xl transition-all"
        >
          <Plus size={20} />
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-medium text-sm">
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price (₦)</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      <Image
                        src={product.image || "/placeholder.png"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-400">{product.slug}</p>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600 capitalize">
                    {product.category.replace("-", " ")}
                  </td>
                  <td className="p-4 font-bold text-primary">
                    ₦{product.price.toLocaleString()}
                  </td>
                  <td className="p-4">
                    {product.is_flash_sale && (
                      <span className="inline-block bg-accent/20 text-accent font-bold text-xs px-2 py-1 rounded mr-2">Flash Sale</span>
                    )}
                    {product.is_new_arrival && (
                      <span className="inline-block bg-primary/10 text-primary font-bold text-xs px-2 py-1 rounded">New</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-primary transition-colors bg-gray-100 hover:bg-primary/10 rounded-lg">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-gray-100 hover:bg-red-50 rounded-lg">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {(!products || products.length === 0) && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No products found. Click "Add Product" to create one.
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
