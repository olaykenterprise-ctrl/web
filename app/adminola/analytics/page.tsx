export const dynamic = "force-dynamic";

import { BarChart3, TrendingUp, DollarSign, Users, ShoppingBag } from "lucide-react";
import { SalesAnalyticsChart } from "@/components/admin/SalesAnalyticsChart";
import { DateRangePicker } from "@/components/admin/DateRangePicker";

export default function AdminAnalyticsPage() {
  const categories = [
    { name: "Powerbanks", sales: 580000, share: "46.4%", orders: 48 },
    { name: "Content Creation", sales: 340000, share: "27.2%", orders: 24 },
    { name: "Cables & Adapters", sales: 180000, share: "14.4%", orders: 42 },
    { name: "Phone Accessories", sales: 150000, share: "12.0%", orders: 20 },
  ];

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
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+12.5%</span>
          </div>
          <p className="text-2xl font-black text-gray-900 mt-2">₦1,250,000</p>
          <p className="text-[11px] text-gray-400 mt-1">Total revenue collected this week</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Average Order Value (AOV)</span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+4.8%</span>
          </div>
          <p className="text-2xl font-black text-gray-900 mt-2">₦14,045</p>
          <p className="text-[11px] text-gray-400 mt-1">Average spent per checkout</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Checkout Conversion</span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+1.2%</span>
          </div>
          <p className="text-2xl font-black text-gray-900 mt-2">3.6%</p>
          <p className="text-[11px] text-gray-400 mt-1">Visitors completing purchases</p>
        </div>
      </div>

      {/* Main Chart */}
      <div>
        <SalesAnalyticsChart />
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
