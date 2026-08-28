"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { createLandingPage } from "./actions";
import { BlockBuilder } from "@/components/admin/BlockBuilder";

export default function NewLandingPage() {
  const [loading, setLoading] = useState(false);

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
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Campaign Title</label>
                <input type="text" name="title" required className="w-full bg-[#F4F7FB] px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all text-gray-900 font-medium text-base" placeholder="e.g., Summer Mega Sale 2026" />
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
              <textarea name="subheading" required rows={3} className="w-full bg-[#F4F7FB] px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all text-gray-900 text-xs font-medium resize-none" placeholder="e.g., Get up to 50% off on all premium powerbanks and accessories this summer..."></textarea>
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
            <BlockBuilder fieldName="blocks" />
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
