export const dynamic = "force-dynamic";

import { getAdminDashboardData } from "@/lib/admin-data";
import { ShoppingCart } from "lucide-react";
import OrdersTableClient from "./OrdersTableClient";

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

      <OrdersTableClient orders={orders} />
    </div>
  );
}
