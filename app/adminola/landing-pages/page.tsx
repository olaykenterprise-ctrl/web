import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Plus, Edit, Trash2, ExternalLink, FileX } from "lucide-react";

export default async function AdminLandingPages() {
  const supabase = await createClient();
  const { data: pages } = await supabase
    .from("landing_pages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Promotional Landing Pages</h1>
          <p className="text-gray-500 mt-1 font-medium">Create and manage your high-converting marketing funnels.</p>
        </div>
        <Link
          href="/adminola/landing-pages/new"
          className="flex items-center gap-2 bg-gradient-to-r from-[#FFC107] to-orange-400 hover:from-yellow-400 hover:to-orange-500 text-gray-950 font-black py-3 px-6 rounded-2xl transition-all shadow-[0_0_20px_-5px_rgba(255,193,7,0.4)] hover:shadow-[0_0_30px_-5px_rgba(255,193,7,0.6)] hover:-translate-y-1"
        >
          <Plus size={20} />
          Create Landing Page
        </Link>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden relative">
        
        {/* Table Controls */}
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">
            All Pages <span className="bg-gray-200 text-gray-700 py-1 px-2 rounded-lg ml-2">{pages?.length || 0}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white border-b border-gray-100 text-gray-400 font-bold text-xs uppercase tracking-wider">
                <th className="p-6 py-4">Page Title & Slug</th>
                <th className="p-6 py-4">Status</th>
                <th className="p-6 py-4">Created Date</th>
                <th className="p-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {pages?.map((page) => (
                <tr key={page.id} className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors group">
                  <td className="p-6">
                    <div className="font-bold text-gray-900 text-base mb-1">{page.title}</div>
                    <Link 
                      href={`/${page.slug}`} 
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs font-mono text-blue-500 hover:text-blue-600 bg-blue-50 px-2 py-1 rounded-md"
                    >
                      /{page.slug} <ExternalLink size={12} />
                    </Link>
                  </td>
                  <td className="p-6">
                     <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-600 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded-lg border border-green-200">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Live
                     </span>
                  </td>
                  <td className="p-6 text-gray-500 font-medium">
                    {new Date(page.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      <Link 
                        href={`/${page.slug}`} 
                        target="_blank"
                        className="p-2.5 text-gray-400 hover:text-blue-500 transition-colors bg-white hover:bg-blue-50 border border-gray-100 rounded-xl shadow-sm hover:shadow"
                        title="View Live Page"
                      >
                        <ExternalLink size={18} />
                      </Link>
                      <button className="p-2.5 text-gray-400 hover:text-[#FFC107] transition-colors bg-white hover:bg-yellow-50 border border-gray-100 rounded-xl shadow-sm hover:shadow">
                        <Edit size={18} />
                      </button>
                      <button className="p-2.5 text-gray-400 hover:text-red-500 transition-colors bg-white hover:bg-red-50 border border-gray-100 rounded-xl shadow-sm hover:shadow">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {(!pages || pages.length === 0) && (
                <tr>
                  <td colSpan={4} className="p-12">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                        <FileX size={40} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">No Landing Pages Yet</h3>
                      <p className="text-gray-500 max-w-sm mb-6">Create promotional pages to run ads and drive specific product sales.</p>
                      <Link
                        href="/adminola/landing-pages/new"
                        className="bg-gray-900 hover:bg-black text-white font-bold py-3 px-6 rounded-xl transition-all"
                      >
                        Create Your First Page
                      </Link>
                    </div>
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
