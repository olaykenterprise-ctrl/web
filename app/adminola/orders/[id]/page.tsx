import { getStoreOrders } from "@/lib/admin-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, User, MapPin, Package, CreditCard, Clock } from "lucide-react";

export default async function OrderDetailsPage({ params }: { params: { id: string } }) {
  const orders = await getStoreOrders();
  const order = orders.find(o => o.id === params.id);

  if (!order) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center gap-4">
        <Link href="/adminola/orders" className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Order {order.orderNumber}</h1>
        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">{order.status}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-gray-900 font-bold border-b border-gray-100 pb-3">
            <User size={18} className="text-primary" /> Customer Details
          </div>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-500 font-medium">Name:</span> <span className="font-semibold text-gray-900">{order.customerName}</span></p>
            <p><span className="text-gray-500 font-medium">Email:</span> <span className="text-gray-900">{order.customerEmail}</span></p>
            <p><span className="text-gray-500 font-medium">Phone:</span> <span className="text-gray-900">{order.customerPhone || "N/A"}</span></p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-gray-900 font-bold border-b border-gray-100 pb-3">
            <MapPin size={18} className="text-primary" /> Shipping Info
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-gray-900 leading-relaxed">{order.shippingAddress || "No address provided."}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-gray-900 font-bold border-b border-gray-100 pb-3">
          <Package size={18} className="text-primary" /> Order Items
        </div>
        <div className="divide-y divide-gray-50">
          {(order.items || []).map((item, idx) => (
            <div key={idx} className="py-3 flex justify-between items-center text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-500">
                  {item.quantity}x
                </div>
                <span className="font-medium text-gray-900">{item.name}</span>
              </div>
              <span className="font-bold text-gray-900">₦{(item.price || 0).toLocaleString()}</span>
            </div>
          ))}
          {(!order.items || order.items.length === 0) && (
            <p className="text-sm text-gray-500 py-2">No item details available.</p>
          )}
        </div>
        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
          <span className="font-bold text-gray-900">Total Paid</span>
          <span className="text-xl font-black text-primary">₦{order.amount.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
