export const dynamic = "force-dynamic";

import { getAdminDashboardData } from "@/lib/admin-data";
import { ShoppingCart, Search, Filter, Eye, CheckCircle2, Clock, Truck, XCircle } from "lucide-react";
import Link from "next/link";

const STATUS_CONFIG: Record<string, { bg: string; text: string; icon: any }> = {
  Processing: { bg: "bg-[#FEF3C7]", text: "text-[#D97706]", icon: Clock },
  Shipped: { bg: "bg-[#DBEAFE]", text: "text-[#2563EB]", icon: Truck },
  Delivered: { bg: "bg-[#D1FAE5]", text: "text-[#059669]", icon: CheckCircle2 },
  Cancelled: { bg: "bg-[#FEE2E2]", text: "text-[#DC2626]", icon: XCircle }
};

export default async function AdminOrdersPage() {
  const data = await getAdminDashboardData();
  const orders = data.allOrders || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Orders Management</h1>
          <p className="text-xs font-medium text-gray-500 mt-1">
            Track, fulfill, and manage all store customer purchases.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-gray-700 bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-sm flex items-center gap-2">
            <ShoppingCart size={15} className="text-[#00875A]" />
            Total: <strong>{orders.length} orders</strong>
          </span>
        </div>
      </div>

      {/* Orders Table Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden">
        {/* Table Top Controls */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-80">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search orders, customers, IDs..."
                className="w-full bg-[#F4F7FB] border border-gray-200 text-xs pl-9 pr-4 py-2 rounded-xl outline-none focus:bg-white focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
            <span className="px-3 py-1.5 bg-gray-100 rounded-lg cursor-pointer">All</span>
            <span className="px-3 py-1.5 hover:bg-gray-100 rounded-lg cursor-pointer text-gray-500">Processing</span>
            <span className="px-3 py-1.5 hover:bg-gray-100 rounded-lg cursor-pointer text-gray-500">Shipped</span>
            <span className="px-3 py-1.5 hover:bg-gray-100 rounded-lg cursor-pointer text-gray-500">Delivered</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-bold text-[11px] uppercase tracking-wider bg-gray-50/50">
                <th className="py-3.5 px-6 font-semibold">Order ID</th>
                <th className="py-3.5 px-6 font-semibold">Customer</th>
                <th className="py-3.5 px-6 font-semibold">Items</th>
                <th className="py-3.5 px-6 font-semibold">Amount</th>
                <th className="py-3.5 px-6 font-semibold">Status</th>
                <th className="py-3.5 px-6 font-semibold">Date</th>
                <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs">
              {orders.map((order) => {
                const config = STATUS_CONFIG[order.status] || STATUS_CONFIG.Processing;
                const StatusIcon = config.icon;

                return (
                  <tr key={order.id} className="hover:bg-gray-50/70 transition-colors group">
                    <td className="py-4 px-6 font-bold text-gray-900">
                      {order.orderNumber}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-gray-900">{order.customerName}</div>
                      <div className="text-[11px] text-gray-400">{order.customerPhone}</div>
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-600">
                      {order.itemsCount || 1} {order.itemsCount === 1 ? "item" : "items"}
                    </td>
                    <td className="py-4 px-6 font-bold text-gray-900">
                      ₦{order.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${config.bg} ${config.text}`}>
                        <StatusIcon size={12} />
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-500 font-medium">
                      {order.date}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/adminola/orders/${order.id}`}
                        title="View details"
                        className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors inline-flex items-center gap-1 font-semibold text-xs"
                      >
                        <Eye size={15} />
                        <span>View</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
