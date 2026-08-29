"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Eye, Sliders, Monitor, Smartphone } from "lucide-react";
import { createLandingPage } from "./actions";
import { BlockBuilder } from "@/components/admin/BlockBuilder";
import { BlockRenderer } from "@/components/ui/BlockRenderer";
import { PageBlock } from "@/lib/db";

export default function NewLandingPage() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [currentBlocks, setCurrentBlocks] = useState<PageBlock[]>([]);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
      {/* Header with Title and Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link href="/adminola/landing-pages" className="p-3 bg-white rounded-2xl border border-gray-100 hover:bg-gray-50 text-gray-500 transition-colors shadow-sm">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Create Landing Page</h1>
            <p className="text-gray-500 font-medium mt-0.5 text-xs sm:text-sm">Design a high-converting luxury promotional funnel.</p>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="bg-gray-100 p-1 rounded-xl flex items-center gap-1 border border-gray-200/80 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('edit')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'edit' 
                ? 'bg-white text-gray-900 shadow-xs' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Sliders size={13} />
            <span>Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'preview' 
                ? 'bg-[#00875A] text-white shadow-xs' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Eye size={13} />
            <span>Live Preview</span>
            {currentBlocks.length > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${activeTab === 'preview' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'}`}>
                {currentBlocks.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Form (Always kept in DOM so data is preserved across tabs) */}
      <form action={async (formData) => {
          setLoading(true);
          try {
            await createLandingPage(formData);
          } catch (error) {
            console.error(error);
            setLoading(false);
          }
        }} 
        className={activeTab === 'edit' ? "space-y-8" : "hidden"}
      >
        {/* Header Information Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-emerald-50 text-[#00875A] flex items-center justify-center text-xs font-bold">1</span>
            Header Information
          </h2>
          
          <div className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Campaign Title</label>
                <input type="text" name="title" required className="w-full bg-[#F4F7FB] px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all text-gray-900 font-medium text-base" placeholder="e.g., Self-Cleaning Flat Mop System" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Category <span className="font-normal normal-case text-gray-400">(Optional)</span></label>
                <select name="category" className="w-full bg-[#F4F7FB] px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all text-gray-900 text-xs font-medium">
                  <option value="">None</option>
                  <option value="powerbanks">Powerbanks</option>
                  <option value="cables">Cables & Chargers</option>
                  <option value="content-creation">Content Creation Tools</option>
                  <option value="phone-accessories">Phone Accessories</option>
                  <option value="home-appliances">Home Appliances & Equipment</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Subheading / Hook</label>
              <textarea name="subheading" required rows={3} className="w-full bg-[#F4F7FB] px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all text-gray-900 text-xs font-medium resize-none" placeholder="e.g., Say goodbye to dirty hands and wet floors with double scraper action..."></textarea>
            </div>
          </div>
        </div>

        {/* Page Builder */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-1">
              <span className="w-7 h-7 rounded-full bg-emerald-50 text-[#00875A] flex items-center justify-center text-xs font-bold">2</span>
              Page Builder
            </h2>
            <p className="text-xs text-gray-500 ml-9">Design your landing page by adding and arranging content blocks.</p>
          </div>
          
          <div className="ml-9">
            <BlockBuilder fieldName="blocks" onBlocksChange={setCurrentBlocks} />
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

      {/* Live Preview Viewport */}
      {activeTab === 'preview' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          {/* Viewport bar */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-gray-700">Interactive Storefront Preview</span>
              <span className="text-gray-400 text-xs">• Real-Time Template Rendering</span>
            </div>

            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setPreviewDevice('desktop')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                  previewDevice === 'desktop' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-400 hover:text-gray-700'
                }`}
                title="Desktop View"
              >
                <Monitor size={15} />
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('mobile')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                  previewDevice === 'mobile' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-400 hover:text-gray-700'
                }`}
                title="Mobile View"
              >
                <Smartphone size={15} />
              </button>
            </div>
          </div>

          {/* Rendered Container */}
          <div className={`mx-auto bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200 transition-all ${
            previewDevice === 'mobile' ? 'max-w-[420px] ring-8 ring-gray-100' : 'w-full'
          }`}>
            {currentBlocks.length === 0 ? (
              <div className="text-center py-24 px-6">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-3 text-gray-400">
                  <Eye size={20} />
                </div>
                <p className="text-sm font-bold text-gray-700 mb-1">No blocks added yet</p>
                <p className="text-xs text-gray-400 mb-4">Switch to the Editor tab and click &quot;Load High-Converting Template&quot; to see a complete preview.</p>
                <button
                  type="button"
                  onClick={() => setActiveTab('edit')}
                  className="inline-flex items-center gap-2 bg-[#00875A] text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  Go to Editor
                </button>
              </div>
            ) : (
              <div className="pointer-events-auto">
                <BlockRenderer blocks={currentBlocks} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
