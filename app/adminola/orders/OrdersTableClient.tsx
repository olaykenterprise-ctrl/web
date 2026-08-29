"use client";

import { useState } from "react";
import { Search, Eye, CheckCircle2, Clock, Truck, XCircle, X, User, MapPin, Package } from "lucide-react";
import type { Order } from "@/lib/admin-data";

const STATUS_CONFIG: Record<string, { bg: string; text: string; icon: any }> = {
  Processing: { bg: "bg-[#FEF3C7]", text: "text-[#D97706]", icon: Clock },
  Shipped: { bg: "bg-[#DBEAFE]", text: "text-[#2563EB]", icon: Truck },
  Delivered: { bg: "bg-[#D1FAE5]", text: "text-[#059669]", icon: CheckCircle2 },
  Cancelled: { bg: "bg-[#FEE2E2]", text: "text-[#DC2626]", icon: XCircle }
};

export default function OrdersTableClient({ orders }: { orders: Order[] }) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-80">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full bg-[#F4F7FB] border border-gray-200 text-xs pl-9 pr-4 py-2 rounded-xl outline-none focus:bg-white focus:border-emerald-500 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-bold text-[11px] uppercase tracking-wider bg-gray-50/50">
                <th className="py-3.5 px-6 font-semibold">Order ID</th>
                <th className="py-3.5 px-6 font-semibold">Customer</th>
                <th className="py-3.5 px-6 font-semibold">Items</th>
                <th className="py-3.5 px-6 font-semibold">Amount</th>
                <th className="py-3.5 px-6 font-semibold">Status</th>
                <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs">
              {orders.map((order) => {
                const config = STATUS_CONFIG[order.status] || STATUS_CONFIG.Processing;
                const StatusIcon = config.icon;

                return (
                  <tr key={order.id} className="hover:bg-gray-50/70 transition-colors group">
                    <td className="py-4 px-6 font-bold text-gray-900">{order.orderNumber}</td>
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
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        title="View details"
                        className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors inline-flex items-center gap-1 font-semibold text-xs"
                      >
                        <Eye size={15} />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pop Card (Modal) */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h2 className="font-extrabold text-lg text-gray-900">Order {selectedOrder.orderNumber}</h2>
              <button onClick={() => setSelectedOrder(null)} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5 overflow-y-auto space-y-6 flex-1">
              {/* Customer */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">
                  <User size={16} className="text-primary" /> Customer Info
                </div>
                <div className="text-sm space-y-1.5">
                  <p><span className="text-gray-500">Name:</span> <span className="font-semibold">{selectedOrder.customerName}</span></p>
                  <p><span className="text-gray-500">Phone:</span> <span className="font-medium">{selectedOrder.customerPhone || "N/A"}</span></p>
                  <p><span className="text-gray-500">Email:</span> <span className="font-medium">{selectedOrder.customerEmail}</span></p>
                </div>
              </div>

              {/* Shipping */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">
                  <MapPin size={16} className="text-primary" /> Delivery Address
                </div>
                <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                  {selectedOrder.shippingAddress || "No address provided."}
                </p>
              </div>

              {/* Items */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">
                  <Package size={16} className="text-primary" /> Ordered Items
                </div>
                <div className="divide-y divide-gray-50">
                  {(selectedOrder.items || []).map((item, idx) => (
                    <div key={idx} className="py-2.5 flex justify-between items-center text-sm">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-primary/10 text-primary flex items-center justify-center rounded font-bold text-xs">
                          {item.quantity}x
                        </span>
                        <span className="font-medium text-gray-900">{item.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <span className="font-bold text-gray-500 text-sm">Total Amount</span>
              <span className="text-xl font-black text-primary">₦{selectedOrder.amount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
