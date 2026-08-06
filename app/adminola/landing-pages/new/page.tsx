"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2, ListChecks, Image as ImageIcon } from "lucide-react";
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
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/adminola/landing-pages" className="p-3 bg-white rounded-2xl border border-gray-100 hover:bg-gray-50 text-gray-500 transition-colors shadow-sm">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Create Landing Page</h1>
          <p className="text-gray-500 font-medium mt-1">Design a high-converting promotional funnel.</p>
        </div>
      </div>

      <form action={async (formData) => {
          setLoading(true);
          try {
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
        {/* Header Information Card */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-sm">1</span>
            Header Information
          </h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Campaign Title</label>
              <input type="text" name="title" required className="w-full bg-gray-50 px-5 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:bg-white transition-all text-gray-900 font-medium text-lg" placeholder="e.g., Summer Mega Sale 2026" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Subheading / Hook</label>
              <textarea name="subheading" required rows={3} className="w-full bg-gray-50 px-5 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:bg-white transition-all text-gray-900 font-medium resize-none" placeholder="e.g., Get up to 50% off on all premium powerbanks and accessories this summer..."></textarea>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">YouTube Video Link <span className="font-normal normal-case text-gray-400">(Optional)</span></label>
                <input type="url" name="video_link" className="w-full bg-gray-50 px-5 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:bg-white transition-all text-gray-900 font-medium" placeholder="https://www.youtube.com/watch?v=..." />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Call to Action Link</label>
                <input type="text" name="cta_link" required defaultValue="/" className="w-full bg-gray-50 px-5 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:bg-white transition-all text-gray-900 font-medium" placeholder="e.g., / or /product/my-product" />
                <p className="text-xs text-gray-400 font-medium">Where should the "Shop Now" button go?</p>
              </div>
            </div>
          </div>
        </div>

        {/* Value Proposition List */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-1">
                <span className="w-8 h-8 rounded-full bg-green-50 text-green-500 flex items-center justify-center text-sm">2</span>
                Value Proposition
              </h2>
              <p className="text-sm text-gray-500 ml-10">List the key benefits or features of this offer.</p>
            </div>
            <button type="button" onClick={addBodyItem} className="flex items-center gap-2 text-sm font-bold bg-gray-900 text-white hover:bg-black px-4 py-2 rounded-xl transition-all">
              <Plus size={16} /> Add Benefit
            </button>
          </div>
          
          <div className="space-y-4 ml-10">
            {bodyItems.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center shrink-0 text-green-500">
                  <ListChecks size={20} />
                </div>
                <input 
                  type="text" 
                  value={item}
                  onChange={(e) => updateBodyItem(index, e.target.value)}
                  className="flex-1 bg-gray-50 px-5 py-3.5 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:bg-white transition-all text-gray-900 font-medium" 
                  placeholder={`Selling point ${index + 1}...`} 
                />
                <button type="button" onClick={() => removeBodyItem(index)} className="p-3 mt-0.5 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-xl transition-colors shrink-0">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-1">
                <span className="w-8 h-8 rounded-full bg-[#FFC107]/20 text-yellow-600 flex items-center justify-center text-sm">3</span>
                Image Grid
              </h2>
              <p className="text-sm text-gray-500 ml-10">Add photos to display in the masonry grid at the bottom of the page.</p>
            </div>
            <button type="button" onClick={addPhoto} className="flex items-center gap-2 text-sm font-bold bg-gray-900 text-white hover:bg-black px-4 py-2 rounded-xl transition-all">
              <Plus size={16} /> Add Photo
            </button>
          </div>
          
          <div className="space-y-4 ml-10">
            {photos.map((photo, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0 text-gray-400">
                  <ImageIcon size={20} />
                </div>
                <input 
                  type="url" 
                  value={photo}
                  onChange={(e) => updatePhoto(index, e.target.value)}
                  className="flex-1 bg-gray-50 px-5 py-3.5 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:bg-white transition-all text-gray-900 font-medium" 
                  placeholder={`https://example.com/photo-${index + 1}.jpg`} 
                />
                <button type="button" onClick={() => removePhoto(index)} className="p-3 mt-0.5 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-xl transition-colors shrink-0">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
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
                  Launch Campaign
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
