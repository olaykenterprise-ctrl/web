import { ShoppingCart, Users, Package, BarChart3 } from "lucide-react";
import { getAdminDashboardData } from "@/lib/admin-data";
import { StatCard } from "@/components/admin/StatCard";
import { SalesAnalyticsChart } from "@/components/admin/SalesAnalyticsChart";
import { RecentActivityFeed } from "@/components/admin/RecentActivityFeed";
import { RecentOrdersTable } from "@/components/admin/RecentOrdersTable";
import { TopProductsWidget } from "@/components/admin/TopProductsWidget";
import { DateRangePicker } from "@/components/admin/DateRangePicker";

export default async function AdminDashboard() {
  const data = await getAdminDashboardData();
  const { metrics, recentOrders, topProducts, activities } = data;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-xs font-medium text-gray-500 mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        {/* Date Range Selector Dropdown */}
        <DateRangePicker />
      </div>

      {/* Row 1: 4 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Sales"
          value={`₦${metrics.totalSales.toLocaleString()}`}
          growthText={`${metrics.totalSalesGrowth} vs last week`}
          icon={ShoppingCart}
          variant="emerald"
        />

        <StatCard
          title="Total Customers"
          value={metrics.totalCustomers.toLocaleString()}
          growthText={`${metrics.totalCustomersGrowth} vs last week`}
          icon={Users}
          variant="blue"
        />

        <StatCard
          title="Total Orders"
          value={metrics.totalOrders.toLocaleString()}
          growthText={`${metrics.totalOrdersGrowth} vs last week`}
          icon={Package}
          variant="purple"
        />

        <StatCard
          title="Conversion Rate"
          value={metrics.conversionRate}
          growthText={`${metrics.conversionGrowth} vs last week`}
          icon={BarChart3}
          variant="orange"
        />
      </div>

      {/* Row 2: Sales Analytics Chart (Left 2/3) & Recent Activity Feed (Right 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8">
          <SalesAnalyticsChart />
        </div>
        <div className="lg:col-span-4">
          <RecentActivityFeed activities={activities} />
        </div>
      </div>

      {/* Row 3: Recent Orders Table (Left 2/3) & Top Products Widget (Right 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8">
          <RecentOrdersTable orders={recentOrders} />
        </div>
        <div className="lg:col-span-4">
          <TopProductsWidget products={topProducts} />
        </div>
      </div>
    </div>
  );
}
