import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";

export default async function AdminLandingPages() {
  const supabase = await createClient();
  const { data: pages } = await supabase
    .from("landing_pages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Landing Pages</h1>
        <Link
          href="/adminola/landing-pages/new"
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-xl transition-all"
        >
          <Plus size={20} />
          Create Landing Page
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-medium text-sm">
                <th className="p-4">Title</th>
                <th className="p-4">URL Slug</th>
                <th className="p-4">Created</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages?.map((page) => (
                <tr key={page.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-bold text-gray-900">
                    {page.title}
                  </td>
                  <td className="p-4 text-gray-500 font-mono text-sm">
                    /{page.slug}
                  </td>
                  <td className="p-4 text-gray-500 text-sm">
                    {new Date(page.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link 
                        href={`/${page.slug}`} 
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-blue-500 transition-colors bg-gray-100 hover:bg-blue-50 rounded-lg"
                      >
                        <ExternalLink size={18} />
                      </Link>
                      <button className="p-2 text-gray-400 hover:text-primary transition-colors bg-gray-100 hover:bg-primary/10 rounded-lg">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-gray-100 hover:bg-red-50 rounded-lg">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {(!pages || pages.length === 0) && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    No landing pages found. Click "Create Landing Page" to make one.
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
