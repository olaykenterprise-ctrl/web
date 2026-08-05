"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
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
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/adminola/products" className="p-2 bg-white rounded-full border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <form action={async (formData) => {
          setLoading(true);
          try {
            // Remove the default image and gallery_images from standard form submission
            formData.delete("gallery_images");
            
            const validImages = gallery.filter(Boolean);
            if (validImages.length === 0) {
              alert("Please add at least one image.");
              setLoading(false);
              return;
            }

            // Append each valid image to gallery_images
            validImages.forEach(img => formData.append("gallery_images", img));
            // Set the first image as the primary image
            formData.append("image", validImages[0]);

            await createProduct(formData);
          } catch (error) {
            console.error(error);
            setLoading(false);
          }
        }} className="space-y-8">
          
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">Basic Info</h2>
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
              <label className="text-sm font-bold text-gray-700">Description</label>
              <textarea name="description" required rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none" placeholder="Product description..."></textarea>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Product Gallery</h2>
                <p className="text-xs text-gray-500 mt-1">The first link will be the main image. You can also paste a YouTube link here to add a video to the gallery!</p>
              </div>
              <button type="button" onClick={addGalleryImage} className="flex items-center gap-1 text-sm font-bold text-primary hover:text-primary-dark shrink-0">
                <Plus size={16} /> Add Image/Video
              </button>
            </div>
            
            {gallery.map((img, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex flex-col flex-1 gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 w-4">{index + 1}.</span>
                    <input 
                      type="url" 
                      value={img}
                      onChange={(e) => updateGalleryImage(index, e.target.value)}
                      required
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" 
                      placeholder="https://example.com/image.jpg OR https://youtube.com/watch?v=..." 
                    />
                  </div>
                </div>
                <button type="button" onClick={() => removeGalleryImage(index)} className="p-3 mt-5 md:mt-0 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-xl transition-colors self-start">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
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
            <button disabled={loading} type="submit" className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-primary/20 hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0">
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <Save size={20} />
                  Save Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
