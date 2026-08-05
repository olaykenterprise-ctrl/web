import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default async function NewProductPage() {
  
  async function addProduct(formData: FormData) {
    "use server";
    
    const supabase = await createClient();
    
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const originalPrice = formData.get("original_price") ? Number(formData.get("original_price")) : null;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as string;
    const is_flash_sale = formData.get("is_flash_sale") === "on";
    const is_new_arrival = formData.get("is_new_arrival") === "on";
    const discount_badge = formData.get("discount_badge") as string;
    
    // Auto-generate slug from name
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const { error } = await supabase.from("products").insert({
      name,
      slug,
      description,
      price,
      original_price: originalPrice,
      category,
      image,
      is_flash_sale,
      is_new_arrival,
      discount_badge: discount_badge || null
    });

    if (error) {
      console.error("Failed to insert product", error);
      // Basic error handling for now (could use useFormState for better UI)
      throw new Error("Failed to add product: " + error.message);
    }

    revalidatePath("/adminola/products");
    revalidatePath("/");
    revalidatePath("/category/[slug]", "page");
    redirect("/adminola/products");
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/adminola/products" className="p-2 bg-white rounded-full border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <form action={addProduct} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Product Name</label>
              <input type="text" name="name" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="e.g., 20000mAh Powerbank" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Category</label>
              <select name="category" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-white">
                <option value="powerbanks">Powerbanks</option>
                <option value="cables">Cables</option>
                <option value="content-creation">Content Creation</option>
                <option value="phone-accessories">Phone Accessories</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Current Price (₦)</label>
              <input type="number" name="price" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="15000" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Original Price (₦) <span className="font-normal text-gray-400">(Optional)</span></label>
              <input type="number" name="original_price" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="18000" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Image URL</label>
            <input type="url" name="image" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="https://example.com/image.jpg" />
            <p className="text-xs text-gray-400">For now, paste a direct link to an image. Image uploading to Supabase Storage will come later.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Description</label>
            <textarea name="description" required rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none" placeholder="Product description..."></textarea>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-4">
            <h3 className="font-bold text-gray-900 mb-2">Marketing Badges</h3>
            <div className="flex gap-8">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="is_flash_sale" className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary" />
                <span className="text-sm font-medium text-gray-700">Flash Sale</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="is_new_arrival" className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary" />
                <span className="text-sm font-medium text-gray-700">New Arrival</span>
              </label>
            </div>
            
            <div className="pt-2">
              <label className="text-sm font-medium text-gray-700 block mb-1">Discount Badge Text <span className="font-normal text-gray-400">(Optional)</span></label>
              <input type="text" name="discount_badge" className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm" placeholder="e.g. -20%" />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-primary/20 hover:-translate-y-1">
              <Save size={20} />
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
