"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { createProduct } from "./actions";

export default function NewProductPage() {
  const [gallery, setGallery] = useState([""]);
  const [loading, setLoading] = useState(false);

  const addGalleryImage = () => setGallery([...gallery, ""]);
  const updateGalleryImage = (index: number, value: string) => {
    const newGallery = [...gallery];
    newGallery[index] = value;
    setGallery(newGallery);
  };
  const removeGalleryImage = (index: number) => {
    setGallery(gallery.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/adminola/products" className="p-3 bg-white rounded-2xl border border-gray-100 hover:bg-gray-50 text-gray-500 transition-colors shadow-sm">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Add New Product</h1>
          <p className="text-gray-500 font-medium mt-1">Fill in the details to list a new product on your store.</p>
        </div>
      </div>

      <form action={async (formData) => {
        setLoading(true);
        try {
          formData.delete("gallery_images");
          
          const validImages = gallery.filter(Boolean);
          if (validImages.length === 0) {
            alert("Please add at least one image.");
            setLoading(false);
            return;
          }

          validImages.forEach(img => formData.append("gallery_images", img));
          formData.append("image", validImages[0]);

          await createProduct(formData);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      }} className="space-y-8">
        
        {/* Basic Info Card */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-sm">1</span>
            Basic Information
          </h2>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Product Name</label>
                <input type="text" name="name" required className="w-full bg-gray-50 px-5 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:bg-white transition-all text-gray-900 font-medium" placeholder="e.g., 20000mAh Powerbank" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Category</label>
                <select name="category" required className="w-full bg-gray-50 px-5 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:bg-white transition-all text-gray-900 font-medium appearance-none">
                  <option value="powerbanks">Powerbanks</option>
                  <option value="cables">Cables</option>
                  <option value="content-creation">Content Creation</option>
                  <option value="phone-accessories">Phone Accessories</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Current Price (₦)</label>
                <input type="number" name="price" required className="w-full bg-gray-50 px-5 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:bg-white transition-all text-gray-900 font-medium" placeholder="15000" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Original Price (₦) <span className="font-normal normal-case text-gray-400">(Optional)</span></label>
                <input type="number" name="original_price" className="w-full bg-gray-50 px-5 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:bg-white transition-all text-gray-900 font-medium" placeholder="18000" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Description</label>
              <textarea name="description" required rows={5} className="w-full bg-gray-50 px-5 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:bg-white transition-all text-gray-900 font-medium resize-none" placeholder="Write a compelling product description..."></textarea>
            </div>
          </div>
        </div>

        {/* Gallery Card */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-1">
                <span className="w-8 h-8 rounded-full bg-[#FFC107]/20 text-yellow-600 flex items-center justify-center text-sm">2</span>
                Product Gallery
              </h2>
              <p className="text-sm text-gray-500 ml-10">Paste image URLs. The first one will be the main cover image. You can also paste a YouTube link!</p>
            </div>
            <button type="button" onClick={addGalleryImage} className="flex items-center gap-2 text-sm font-bold bg-gray-900 text-white hover:bg-black px-4 py-2 rounded-xl transition-all">
              <Plus size={16} /> Add Media
            </button>
          </div>
          
          <div className="space-y-4 ml-10">
            {gallery.map((img, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0 text-gray-400">
                  {index === 0 ? <ImageIcon size={20} className="text-[#FFC107]" /> : <ImageIcon size={20} />}
                </div>
                <div className="flex-1">
                  <input 
                    type="url" 
                    value={img}
                    onChange={(e) => updateGalleryImage(index, e.target.value)}
                    required
                    className="w-full bg-gray-50 px-5 py-3 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:bg-white transition-all text-gray-900 font-medium" 
                    placeholder="https://example.com/image.jpg OR https://youtube.com/watch?v=..." 
                  />
                  {index === 0 && <p className="text-xs text-[#FFC107] font-bold mt-2">Primary Cover Image</p>}
                </div>
                <button type="button" onClick={() => removeGalleryImage(index)} className="p-3 mt-1 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-xl transition-colors shrink-0">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Marketing Badges */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-sm">3</span>
            Marketing Badges
          </h2>
          
          <div className="ml-10 space-y-6">
            <div className="flex gap-8">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" name="is_flash_sale" className="w-6 h-6 rounded-lg border-gray-300 text-[#FFC107] focus:ring-[#FFC107] cursor-pointer" />
                <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Flash Sale</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" name="is_new_arrival" className="w-6 h-6 rounded-lg border-gray-300 text-[#FFC107] focus:ring-[#FFC107] cursor-pointer" />
                <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">New Arrival</span>
              </label>
            </div>
            
            <div className="max-w-xs">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Discount Badge Text <span className="font-normal normal-case text-gray-400">(Optional)</span></label>
              <input type="text" name="discount_badge" className="w-full bg-gray-50 px-5 py-3 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:bg-white transition-all text-gray-900 font-medium" placeholder="e.g. -20%" />
            </div>
          </div>
        </div>

        {/* Floating Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 lg:left-[280px] p-4 bg-white/80 backdrop-blur-xl border-t border-gray-200/50 z-40 flex justify-end">
          <div className="max-w-6xl w-full mx-auto flex justify-end">
            <button disabled={loading} type="submit" className="flex items-center gap-2 bg-gradient-to-r from-[#FFC107] to-orange-400 hover:from-yellow-400 hover:to-orange-500 text-gray-950 font-black py-4 px-10 rounded-2xl transition-all shadow-[0_0_30px_-5px_rgba(255,193,7,0.5)] hover:shadow-[0_0_40px_-5px_rgba(255,193,7,0.6)] hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0">
              {loading ? (
                <span className="w-5 h-5 border-2 border-gray-950 border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <Save size={20} />
                  Publish Product
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
