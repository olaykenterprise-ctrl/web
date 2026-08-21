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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-emerald-50 text-[#00875A] flex items-center justify-center text-xs font-bold">1</span>
            Header Information
          </h2>
          
          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Campaign Title</label>
              <input type="text" name="title" required className="w-full bg-[#F4F7FB] px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all text-gray-900 font-medium text-base" placeholder="e.g., Summer Mega Sale 2026" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Subheading / Hook</label>
              <textarea name="subheading" required rows={3} className="w-full bg-[#F4F7FB] px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all text-gray-900 text-xs font-medium resize-none" placeholder="e.g., Get up to 50% off on all premium powerbanks and accessories this summer..."></textarea>
            </div>
            
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">YouTube Video Link <span className="font-normal normal-case text-gray-400">(Optional)</span></label>
                <input type="url" name="video_link" className="w-full bg-[#F4F7FB] px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all text-gray-900 text-xs font-medium" placeholder="https://www.youtube.com/watch?v=..." />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Call to Action Link</label>
                <input type="text" name="cta_link" required defaultValue="/" className="w-full bg-[#F4F7FB] px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all text-gray-900 text-xs font-medium" placeholder="e.g., / or /product/my-product" />
                <p className="text-[11px] text-gray-400 font-medium">Where should the "Shop Now" button go?</p>
              </div>
            </div>
          </div>
        </div>

        {/* Value Proposition List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-1">
                <span className="w-7 h-7 rounded-full bg-emerald-50 text-[#00875A] flex items-center justify-center text-xs font-bold">2</span>
                Value Proposition
              </h2>
              <p className="text-xs text-gray-500 ml-9">List the key benefits or features of this offer.</p>
            </div>
            <button type="button" onClick={addBodyItem} className="flex items-center gap-1.5 text-xs font-bold bg-gray-900 text-white hover:bg-black px-3.5 py-2 rounded-xl transition-all">
              <Plus size={15} /> Add Benefit
            </button>
          </div>
          
          <div className="space-y-3 ml-9">
            {bodyItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 text-[#00875A]">
                  <ListChecks size={18} />
                </div>
                <input 
                  type="text" 
                  value={item}
                  onChange={(e) => updateBodyItem(index, e.target.value)}
                  className="flex-1 bg-[#F4F7FB] px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all text-gray-900 text-xs font-medium" 
                  placeholder={`Selling point ${index + 1}...`} 
                />
                <button type="button" onClick={() => removeBodyItem(index)} className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-xl transition-colors shrink-0">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-1">
                <span className="w-7 h-7 rounded-full bg-emerald-50 text-[#00875A] flex items-center justify-center text-xs font-bold">3</span>
                Image Grid
              </h2>
              <p className="text-xs text-gray-500 ml-9">Add photos to display in the masonry grid at the bottom of the page.</p>
            </div>
            <button type="button" onClick={addPhoto} className="flex items-center gap-1.5 text-xs font-bold bg-gray-900 text-white hover:bg-black px-3.5 py-2 rounded-xl transition-all">
              <Plus size={15} /> Add Photo
            </button>
          </div>
          
          <div className="space-y-3 ml-9">
            {photos.map((photo, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0 text-gray-400">
                  <ImageIcon size={18} />
                </div>
                <input 
                  type="url" 
                  value={photo}
                  onChange={(e) => updatePhoto(index, e.target.value)}
                  className="flex-1 bg-[#F4F7FB] px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all text-gray-900 text-xs font-medium" 
                  placeholder={`https://example.com/photo-${index + 1}.jpg`} 
                />
                <button type="button" onClick={() => removePhoto(index)} className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-xl transition-colors shrink-0">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
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
