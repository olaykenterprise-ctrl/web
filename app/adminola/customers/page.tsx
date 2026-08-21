import { Users, Search, Mail, Phone, ShoppingBag } from "lucide-react";

const CUSTOMERS = [
  {
    id: "cust-1",
    name: "John Doe",
    email: "john.doe@gmail.com",
    phone: "+234 802 345 6789",
    city: "Lagos",
    ordersCount: 4,
    totalSpent: 62000,
    lastOrder: "Aug 26, 2026",
    status: "Active"
  },
  {
    id: "cust-2",
    name: "Jane Smith",
    email: "jane.smith@yahoo.com",
    phone: "+234 813 987 6543",
    city: "Abuja",
    ordersCount: 2,
    totalSpent: 45000,
    lastOrder: "Aug 26, 2026",
    status: "Active"
  },
  {
    id: "cust-3",
    name: "Michael Brown",
    email: "michael.b@hotmail.com",
    phone: "+234 705 112 2334",
    city: "Ikeja, Lagos",
    ordersCount: 3,
    totalSpent: 38500,
    lastOrder: "Aug 25, 2026",
    status: "Active"
  },
  {
    id: "cust-4",
    name: "Sarah Wilson",
    email: "sarah.wilson@gmail.com",
    phone: "+234 809 887 7665",
    city: "Port Harcourt",
    ordersCount: 5,
    totalSpent: 84000,
    lastOrder: "Aug 25, 2026",
    status: "VIP"
  },
  {
    id: "cust-5",
    name: "Chidi Okafor",
    email: "chidi.okafor@gmail.com",
    phone: "+234 803 445 5667",
    city: "Lekki, Lagos",
    ordersCount: 1,
    totalSpent: 32000,
    lastOrder: "Aug 24, 2026",
    status: "New"
  },
  {
    id: "cust-6",
    name: "Fatima Aliyu",
    email: "fatima.a@outlook.com",
    phone: "+234 818 223 3445",
    city: "Kaduna",
    ordersCount: 2,
    totalSpent: 19000,
    lastOrder: "Aug 24, 2026",
    status: "Active"
  }
];

export default function AdminCustomersPage() {
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
            Total: <strong>1,234 registered</strong>
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
            <span className="px-3 py-1.5 bg-gray-100 rounded-lg cursor-pointer">All (1,234)</span>
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
              {CUSTOMERS.map((customer) => (
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
                    {customer.ordersCount} orders
                  </td>
                  <td className="py-4 px-6 font-bold text-[#00875A]">
                    ₦{customer.totalSpent.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-gray-500 font-medium">
                    {customer.lastOrder}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
