import { createClient } from "@/utils/supabase/server";
import { Package, FileText, TrendingUp, Users } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();
  
  // Fetch stats
  const { count: productCount } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  const { count: landingPageCount } = await supabase
    .from("landing_pages")
    .select("*", { count: "exact", head: true });

  const { data: userResponse } = await supabase.auth.getUser();
  const user = userResponse.user;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Welcome Back!</h1>
          <p className="text-gray-500 mt-2 font-medium">Logged in securely as <span className="text-gray-900 font-bold">{user?.email}</span></p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm font-bold text-gray-700">System Online</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric 1 */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-lg transition-all">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#FFC107]/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-3 bg-[#FFC107]/20 rounded-2xl text-yellow-600">
              <Package size={24} />
            </div>
          </div>
          <div className="relative z-10">
            <h3 className="text-gray-500 font-bold text-sm mb-1 uppercase tracking-wider">Active Products</h3>
            <p className="text-4xl font-black text-gray-900">{productCount || 0}</p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-lg transition-all">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-3 bg-blue-500/20 rounded-2xl text-blue-600">
              <FileText size={24} />
            </div>
          </div>
          <div className="relative z-10">
            <h3 className="text-gray-500 font-bold text-sm mb-1 uppercase tracking-wider">Landing Pages</h3>
            <p className="text-4xl font-black text-gray-900">{landingPageCount || 0}</p>
          </div>
        </div>
        
        {/* Metric 3 (Placeholder) */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group opacity-60">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-gray-100 rounded-2xl text-gray-500">
              <TrendingUp size={24} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider bg-gray-100 text-gray-500 px-2 py-1 rounded-md">Coming Soon</span>
          </div>
          <div>
            <h3 className="text-gray-500 font-bold text-sm mb-1 uppercase tracking-wider">Total Revenue</h3>
            <p className="text-4xl font-black text-gray-900">₦0</p>
          </div>
        </div>

        {/* Metric 4 (Placeholder) */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group opacity-60">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-gray-100 rounded-2xl text-gray-500">
              <Users size={24} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider bg-gray-100 text-gray-500 px-2 py-1 rounded-md">Coming Soon</span>
          </div>
          <div>
            <h3 className="text-gray-500 font-bold text-sm mb-1 uppercase tracking-wider">Total Orders</h3>
            <p className="text-4xl font-black text-gray-900">0</p>
          </div>
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFC107] blur-[120px] opacity-30 rounded-full"></div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-black mb-4">You are in control.</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            This is your secure command center. From here, you can manage your entire product catalogue, generate high-converting promotional landing pages, and oversee your empire.
          </p>
          <div className="flex gap-4">
             <a href="/adminola/products/new" className="bg-[#FFC107] hover:bg-yellow-400 text-gray-950 font-black px-6 py-3 rounded-xl transition-all hover:-translate-y-1">
               Add Product
             </a>
             <a href="/adminola/landing-pages/new" className="bg-white/10 hover:bg-white/20 text-white font-black px-6 py-3 rounded-xl backdrop-blur-md transition-all hover:-translate-y-1">
               Create Landing Page
             </a>
          </div>
        </div>
      </div>

    </div>
  );
}
