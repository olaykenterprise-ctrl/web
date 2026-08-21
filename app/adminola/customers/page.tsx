import { Users, Search } from "lucide-react";
import { getAdminCustomersData } from "@/lib/admin-data";

export default function AdminCustomersPage() {
  const customers = getAdminCustomersData();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Customers Directory</h1>
          <p className="text-xs font-medium text-gray-500 mt-1">
            Manage your store buyers, viewing their contact details and order histories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-gray-700 bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-sm flex items-center gap-2">
            <Users size={15} className="text-[#3B82F6]" />
            Total: <strong>{customers.length} registered</strong>
          </span>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              className="w-full bg-[#F4F7FB] border border-gray-200 text-xs pl-9 pr-4 py-2 rounded-xl outline-none focus:bg-white focus:border-emerald-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
            <span className="px-3 py-1.5 bg-gray-100 rounded-lg cursor-pointer">All ({customers.length})</span>
            <span className="px-3 py-1.5 hover:bg-gray-100 rounded-lg cursor-pointer text-gray-500">VIP</span>
            <span className="px-3 py-1.5 hover:bg-gray-100 rounded-lg cursor-pointer text-gray-500">Repeat Buyers</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-bold text-[11px] uppercase tracking-wider bg-gray-50/50">
                <th className="py-3.5 px-6 font-semibold">Customer</th>
                <th className="py-3.5 px-6 font-semibold">Contact Info</th>
                <th className="py-3.5 px-6 font-semibold">Location</th>
                <th className="py-3.5 px-6 font-semibold">Orders</th>
                <th className="py-3.5 px-6 font-semibold">Total Spent</th>
                <th className="py-3.5 px-6 font-semibold">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-4 px-6 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white font-bold flex items-center justify-center text-xs flex-shrink-0 shadow-sm">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 flex items-center gap-2">
                        <span>{customer.name}</span>
                        {customer.status === "VIP" && (
                          <span className="bg-amber-100 text-amber-700 text-[10px] font-extrabold px-1.5 py-0.5 rounded">VIP</span>
                        )}
                      </div>
                      <div className="text-[11px] text-gray-400">ID: {customer.id}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-900 font-medium">{customer.email}</div>
                    <div className="text-[11px] text-gray-400">{customer.phone}</div>
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-600">
                    {customer.city}
                  </td>
                  <td className="py-4 px-6 font-bold text-gray-900">
                    {customer.ordersCount} {customer.ordersCount === 1 ? "order" : "orders"}
                  </td>
                  <td className="py-4 px-6 font-bold text-[#00875A]">
                    ₦{customer.totalSpent.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-gray-500 font-medium">
                    {customer.lastOrder}
                  </td>
                </tr>
              ))}

              {customers.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-400 text-xs">
                    No registered customers yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
