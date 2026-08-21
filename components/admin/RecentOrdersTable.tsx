import Link from "next/link";
import { Order } from "@/lib/admin-data";

interface RecentOrdersTableProps {
  orders: Order[];
}

const STATUS_STYLES: Record<string, string> = {
  Processing: "bg-[#FEF3C7] text-[#D97706]",
  Shipped: "bg-[#DBEAFE] text-[#2563EB]",
  Delivered: "bg-[#D1FAE5] text-[#059669]",
  Cancelled: "bg-[#FEE2E2] text-[#DC2626]"
};

export function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 tracking-tight">Recent Orders</h3>
        <Link
          href="/adminola/orders"
          className="text-xs font-bold text-[#00875A] hover:text-emerald-700 transition-colors"
        >
          View All
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 font-bold text-[11px] uppercase tracking-wider">
              <th className="pb-3 font-semibold">Order ID</th>
              <th className="pb-3 font-semibold">Customer</th>
              <th className="pb-3 font-semibold">Amount</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-xs">
            {orders.map((order) => {
              const statusStyle = STATUS_STYLES[order.status] || "bg-gray-100 text-gray-700";

              return (
                <tr key={order.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-3.5 font-bold text-gray-900">{order.orderNumber}</td>
                  <td className="py-3.5 font-medium text-gray-700">{order.customerName}</td>
                  <td className="py-3.5 font-bold text-gray-900">₦{order.amount.toLocaleString()}</td>
                  <td className="py-3.5">
                    <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold ${statusStyle}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-gray-500 font-medium">{order.date}</td>
                </tr>
              );
            })}

            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-400 text-xs">
                  No recent orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
