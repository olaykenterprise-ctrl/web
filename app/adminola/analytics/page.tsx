export const dynamic = "force-dynamic";

import { getAdminDashboardData } from "@/lib/admin-data";
import { BarChart3, TrendingUp, DollarSign, Users, ShoppingBag } from "lucide-react";
import { SalesAnalyticsChart } from "@/components/admin/SalesAnalyticsChart";
import { DateRangePicker } from "@/components/admin/DateRangePicker";

import { createClient } from "@/utils/supabase/server";

export default async function AdminAnalyticsPage() {
  const { metrics } = await getAdminDashboardData();
  const supabase = await createClient();
  const { data: products } = await supabase.from("products").select("category, price, sold_count");
  
  // AOV Calculation
  const aov = metrics.totalOrders > 0 ? metrics.totalSales / metrics.totalOrders : 0;

  // Category computation
  const categoryMap: Record<string, { sales: number; orders: number }> = {};
  (products || []).forEach(p => {
    const cat = p.category || "Uncategorized";
    if (!categoryMap[cat]) categoryMap[cat] = { sales: 0, orders: 0 };
    categoryMap[cat].sales += (p.price * (p.sold_count || 0));
    categoryMap[cat].orders += (p.sold_count || 0);
  });

  const categories = Object.keys(categoryMap).map(name => {
    const data = categoryMap[name];
    const share = metrics.totalSales > 0 ? ((data.sales / metrics.totalSales) * 100).toFixed(1) + "%" : "0%";
    return { name, sales: data.sales, share, orders: data.orders };
  }).sort((a, b) => b.sales - a.sales);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Store Analytics & Performance</h1>
          <p className="text-xs font-medium text-gray-500 mt-1">
            Real-time financial indicators, conversion metrics, and category performance.
          </p>
        </div>

        <DateRangePicker />
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Gross Sales</span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+0%</span>
          </div>
          <p className="text-2xl font-black text-gray-900 mt-2">₦{metrics.totalSales.toLocaleString()}</p>
          <p className="text-[11px] text-gray-400 mt-1">Total revenue collected this week</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Average Order Value (AOV)</span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+0%</span>
          </div>
          <p className="text-2xl font-black text-gray-900 mt-2">₦{Math.round(aov).toLocaleString()}</p>
          <p className="text-[11px] text-gray-400 mt-1">Average spent per checkout</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Checkout Conversion</span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+0%</span>
          </div>
          <p className="text-2xl font-black text-gray-900 mt-2">{metrics.conversionRate}</p>
          <p className="text-[11px] text-gray-400 mt-1">Visitors completing purchases</p>
        </div>
      </div>

      {/* Main Chart */}
      <div>
        <SalesAnalyticsChart totalSales={metrics.totalSales} />
      </div>

      {/* Category Performance Breakdown */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Category Performance Breakdown</h3>
        <div className="space-y-4">
          {categories.map((cat) => (
            <div key={cat.name} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-gray-900">{cat.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 font-normal">{cat.orders} orders</span>
                  <span className="text-emerald-700">₦{cat.sales.toLocaleString()} ({cat.share})</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#00875A] h-full rounded-full transition-all duration-500"
                  style={{ width: cat.share }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
