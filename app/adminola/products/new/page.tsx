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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-emerald-50 text-[#00875A] flex items-center justify-center text-xs font-bold">1</span>
            Basic Information
          </h2>
          
          <div className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Product Name</label>
                <input type="text" name="name" required className="w-full bg-[#F4F7FB] px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all text-gray-900 text-xs font-medium" placeholder="e.g., 20000mAh Powerbank" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Category</label>
                <select name="category" required className="w-full bg-[#F4F7FB] px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all text-gray-900 text-xs font-medium">
                  <option value="powerbanks">Powerbanks</option>
                  <option value="cables">Cables</option>
                  <option value="content-creation">Content Creation</option>
                  <option value="phone-accessories">Phone Accessories</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Current Price (₦)</label>
                <input type="number" name="price" required className="w-full bg-[#F4F7FB] px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all text-gray-900 text-xs font-medium" placeholder="15000" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Original Price (₦) <span className="font-normal normal-case text-gray-400">(Optional)</span></label>
                <input type="number" name="original_price" className="w-full bg-[#F4F7FB] px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all text-gray-900 text-xs font-medium" placeholder="18000" />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Description</label>
              <textarea name="description" required rows={4} className="w-full bg-[#F4F7FB] px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all text-gray-900 text-xs font-medium resize-none" placeholder="Write a compelling product description..."></textarea>
            </div>
          </div>
        </div>

        {/* Gallery Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-1">
                <span className="w-7 h-7 rounded-full bg-emerald-50 text-[#00875A] flex items-center justify-center text-xs font-bold">2</span>
                Product Gallery
              </h2>
              <p className="text-xs text-gray-500 ml-9">Paste image URLs. The first one will be the main cover image.</p>
            </div>
            <button type="button" onClick={addGalleryImage} className="flex items-center gap-1.5 text-xs font-bold bg-gray-900 text-white hover:bg-black px-3.5 py-2 rounded-xl transition-all">
              <Plus size={15} /> Add Media
            </button>
          </div>
          
          <div className="space-y-3 ml-9">
            {gallery.map((img, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0 text-gray-400">
                  {index === 0 ? <ImageIcon size={18} className="text-[#00875A]" /> : <ImageIcon size={18} />}
                </div>
                <div className="flex-1">
                  <input 
                    type="url" 
                    value={img}
                    onChange={(e) => updateGalleryImage(index, e.target.value)}
                    required
                    className="w-full bg-[#F4F7FB] px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all text-gray-900 text-xs font-medium" 
                    placeholder="https://example.com/image.jpg" 
                  />
                  {index === 0 && <p className="text-[11px] text-[#00875A] font-bold mt-1">Primary Cover Image</p>}
                </div>
                <button type="button" onClick={() => removeGalleryImage(index)} className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-xl transition-colors shrink-0">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Marketing Badges */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-emerald-50 text-[#00875A] flex items-center justify-center text-xs font-bold">3</span>
            Marketing Badges
          </h2>
          
          <div className="ml-9 space-y-4">
            <div className="flex gap-8">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input type="checkbox" name="is_flash_sale" className="w-4 h-4 rounded border-gray-300 text-[#00875A] focus:ring-emerald-500 cursor-pointer accent-[#00875A]" />
                <span className="text-xs font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Flash Sale</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input type="checkbox" name="is_new_arrival" className="w-4 h-4 rounded border-gray-300 text-[#00875A] focus:ring-emerald-500 cursor-pointer accent-[#00875A]" />
                <span className="text-xs font-bold text-gray-700 group-hover:text-gray-900 transition-colors">New Arrival</span>
              </label>
            </div>
            
            <div className="max-w-xs">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Discount Badge Text <span className="font-normal normal-case text-gray-400">(Optional)</span></label>
              <input type="text" name="discount_badge" className="w-full bg-[#F4F7FB] px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all text-gray-900 text-xs font-medium" placeholder="e.g. -20%" />
            </div>
          </div>
        </div>

        {/* Floating Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 lg:left-[240px] p-4 bg-white/90 backdrop-blur-xl border-t border-gray-200/80 z-40 flex justify-end">
          <div className="max-w-4xl w-full mx-auto flex justify-end">
            <button disabled={loading} type="submit" className="flex items-center gap-2 bg-[#00875A] hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-sm shadow-[#00875A]/20 disabled:opacity-50 text-xs">
              {loading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <Save size={16} />
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
