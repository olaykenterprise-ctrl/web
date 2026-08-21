import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Plus, Edit, Trash2, ExternalLink, FileX } from "lucide-react";

export default async function AdminLandingPages() {
  const supabase = await createClient();
  const { data: pages } = await supabase
    .from("landing_pages")
    .select("*")
    .order("created_at", { ascending: false });

  const pageList = pages || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Promotional Landing Pages</h1>
          <p className="text-xs font-medium text-gray-500 mt-1">Create and manage your high-converting marketing funnels.</p>
        </div>
        <Link
          href="/adminola/landing-pages/new"
          className="flex items-center gap-2 bg-[#00875A] hover:bg-emerald-700 text-white font-bold py-2.5 px-5 rounded-xl transition-all shadow-sm shadow-[#00875A]/20 text-xs"
        >
          <Plus size={16} />
          <span>Create Landing Page</span>
        </Link>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden">
        {/* Table Controls */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="text-xs font-bold text-gray-700 flex items-center gap-2">
            <span>All Pages</span>
            <span className="bg-emerald-50 text-[#00875A] py-0.5 px-2 rounded-full font-extrabold text-[11px]">
              {pageList.length}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-bold text-[11px] uppercase tracking-wider bg-gray-50/50">
                <th className="py-3.5 px-6 font-semibold">Page Title & Slug</th>
                <th className="py-3.5 px-6 font-semibold">Status</th>
                <th className="py-3.5 px-6 font-semibold">Created Date</th>
                <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs">
              {pageList.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50/70 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="font-bold text-gray-900 text-sm mb-0.5">{page.title}</div>
                    <Link 
                      href={`/${page.slug}`} 
                      target="_blank"
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 hover:text-emerald-700"
                    >
                      /{page.slug} <ExternalLink size={10} />
                    </Link>
                  </td>
                  <td className="py-4 px-6">
                     <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-emerald-200">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Live
                     </span>
                  </td>
                  <td className="py-4 px-6 text-gray-500 font-medium">
                    {new Date(page.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <Link 
                        href={`/${page.slug}`} 
                        target="_blank"
                        className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="View Live Page"
                      >
                        <ExternalLink size={16} />
                      </Link>
                      <button className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {pageList.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-gray-400">
                    <FileX size={32} className="mx-auto text-gray-300 mb-2" />
                    <p className="font-bold text-gray-700 text-sm">No Landing Pages Yet</p>
                    <p className="text-xs text-gray-400 mt-1 mb-4">Create promotional pages to run ads and drive specific product sales.</p>
                    <Link
                      href="/adminola/landing-pages/new"
                      className="inline-flex items-center gap-2 bg-[#00875A] text-white font-bold text-xs px-4 py-2 rounded-xl"
                    >
                      <Plus size={14} /> Create Your First Page
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
