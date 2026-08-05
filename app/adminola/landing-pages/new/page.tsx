"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { createLandingPage } from "./actions";

export default function NewLandingPage() {
  const [bodyItems, setBodyItems] = useState([""]);
  const [photos, setPhotos] = useState([""]);
  const [loading, setLoading] = useState(false);

  const addBodyItem = () => setBodyItems([...bodyItems, ""]);
  const updateBodyItem = (index: number, value: string) => {
    const newItems = [...bodyItems];
    newItems[index] = value;
    setBodyItems(newItems);
  };
  const removeBodyItem = (index: number) => {
    setBodyItems(bodyItems.filter((_, i) => i !== index));
  };

  const addPhoto = () => setPhotos([...photos, ""]);
  const updatePhoto = (index: number, value: string) => {
    const newPhotos = [...photos];
    newPhotos[index] = value;
    setPhotos(newPhotos);
  };
  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/adminola/landing-pages" className="p-2 bg-white rounded-full border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Create Landing Page</h1>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <form action={async (formData) => {
            setLoading(true);
            try {
              // add our dynamic arrays to the form data
              formData.delete("body_list");
              formData.delete("photos");
              bodyItems.filter(Boolean).forEach(item => formData.append("body_list", item));
              photos.filter(Boolean).forEach(photo => formData.append("photos", photo));
              await createLandingPage(formData);
            } catch (error) {
              console.error(error);
              setLoading(false);
            }
          }} 
          className="space-y-8"
        >
          {/* Basic Info */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">Header Information</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Title</label>
              <input type="text" name="title" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="e.g., Summer Mega Sale 2026" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Subheading</label>
              <textarea name="subheading" required rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none" placeholder="e.g., Get up to 50% off on all premium powerbanks and accessories this summer..."></textarea>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">YouTube Video Link <span className="font-normal text-gray-400">(Optional)</span></label>
              <input type="url" name="video_link" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="https://www.youtube.com/watch?v=..." />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Call to Action Link</label>
              <input type="text" name="cta_link" required defaultValue="/" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="e.g., / or /product/my-product" />
              <p className="text-xs text-gray-400">Where should the "Shop Now" button go?</p>
            </div>
          </div>

          {/* Body List */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <h2 className="text-xl font-bold text-gray-900">Body Points (List)</h2>
              <button type="button" onClick={addBodyItem} className="flex items-center gap-1 text-sm font-bold text-primary hover:text-primary-dark">
                <Plus size={16} /> Add Point
              </button>
            </div>
            
            {bodyItems.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input 
                  type="text" 
                  value={item}
                  onChange={(e) => updateBodyItem(index, e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" 
                  placeholder={`Point ${index + 1}...`} 
                />
                <button type="button" onClick={() => removeBodyItem(index)} className="p-3 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-xl transition-colors">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Photos */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <h2 className="text-xl font-bold text-gray-900">Photos</h2>
              <button type="button" onClick={addPhoto} className="flex items-center gap-1 text-sm font-bold text-primary hover:text-primary-dark">
                <Plus size={16} /> Add Photo
              </button>
            </div>
            
            {photos.map((photo, index) => (
              <div key={index} className="flex gap-2">
                <input 
                  type="url" 
                  value={photo}
                  onChange={(e) => updatePhoto(index, e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" 
                  placeholder={`Image URL ${index + 1}...`} 
                />
                <button type="button" onClick={() => removePhoto(index)} className="p-3 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-xl transition-colors">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-end">
            <button disabled={loading} type="submit" className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-primary/20 hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0">
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <Save size={20} />
                  Save Landing Page
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
