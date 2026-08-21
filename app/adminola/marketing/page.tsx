export const dynamic = "force-dynamic";

import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Megaphone, Plus, FileText, ExternalLink, Sparkles, TrendingUp } from "lucide-react";

export default async function AdminMarketingPage() {
  const supabase = await createClient();
  const { data: landingPages } = await supabase
    .from("landing_pages")
    .select("*")
    .order("created_at", { ascending: false });

  const pages = landingPages || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Marketing & Promotional Pages</h1>
          <p className="text-xs font-medium text-gray-500 mt-1">
            Build high-converting sales landing pages for ad campaigns and promotions.
          </p>
        </div>

        <Link
          href="/adminola/landing-pages/new"
          className="flex items-center gap-2 bg-[#00875A] hover:bg-emerald-700 text-white font-bold py-2.5 px-5 rounded-xl transition-all shadow-sm shadow-[#00875A]/30 text-xs"
        >
          <Plus size={16} />
          <span>Create Landing Page</span>
        </Link>
      </div>



      {/* Landing Pages Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            Custom Landing Pages ({pages.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-bold text-[11px] uppercase tracking-wider bg-gray-50/50">
                <th className="py-3.5 px-6 font-semibold">Title & Page URL</th>
                <th className="py-3.5 px-6 font-semibold">Subheading</th>
                <th className="py-3.5 px-6 font-semibold">Created Date</th>
                <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs">
              {pages.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-4 px-6">
                    <p className="font-bold text-gray-900">{p.title}</p>
                    <Link
                      href={`/${p.slug}`}
                      target="_blank"
                      className="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center gap-1 mt-0.5 text-[11px]"
                    >
                      /{p.slug} <ExternalLink size={10} />
                    </Link>
                  </td>
                  <td className="py-4 px-6 text-gray-500 font-medium max-w-xs truncate">
                    {p.subheading}
                  </td>
                  <td className="py-4 px-6 text-gray-400">
                    {new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href={`/${p.slug}`}
                      target="_blank"
                      className="text-xs font-bold text-[#00875A] hover:bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors"
                    >
                      View Live
                    </Link>
                  </td>
                </tr>
              ))}

              {pages.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-gray-400">
                    <FileText size={32} className="mx-auto text-gray-300 mb-2" />
                    <p className="font-bold text-gray-700 text-sm">No landing pages built yet</p>
                    <p className="text-xs text-gray-400 mt-1 mb-4">Create your first landing page to boost promo campaigns.</p>
                    <Link
                      href="/adminola/landing-pages/new"
                      className="inline-flex items-center gap-2 bg-[#00875A] text-white font-bold text-xs px-4 py-2 rounded-xl"
                    >
                      <Plus size={14} /> Create Page
                    </Link>
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
