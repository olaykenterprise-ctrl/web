import { createClient } from "@/utils/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();
  
  // Fetch some quick stats
  const { count: productCount } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  const { data: userResponse } = await supabase.auth.getUser();
  const user = userResponse.user;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
      <p className="text-gray-500 mb-8">Logged in as {user?.email}</p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start">
          <h3 className="text-gray-500 font-medium mb-1">Total Products</h3>
          <p className="text-4xl font-black text-primary">{productCount || 0}</p>
        </div>
        
        {/* Placeholder for future features */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start opacity-50">
          <h3 className="text-gray-500 font-medium mb-1">Total Orders</h3>
          <p className="text-4xl font-black text-gray-400">0</p>
          <span className="text-xs text-accent font-bold mt-2 bg-accent/10 px-2 py-1 rounded">Coming Soon</span>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start opacity-50">
          <h3 className="text-gray-500 font-medium mb-1">Revenue</h3>
          <p className="text-4xl font-black text-gray-400">₦0</p>
          <span className="text-xs text-accent font-bold mt-2 bg-accent/10 px-2 py-1 rounded">Coming Soon</span>
        </div>
      </div>
    </div>
  );
}
