const fs = require('fs');
let code = fs.readFileSync('app/adminola/orders/OrdersTableClient.tsx', 'utf8');

const groupingLogic = `  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Group orders by date
  const groupedOrders = orders.reduce((acc, order) => {
    const dateKey = order.date || 'Unknown Date';
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(order);
    return acc;
  }, {} as Record<string, Order[]>);
`;

code = code.replace(
  '  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);',
  groupingLogic
);

const originalTableBody = `{orders.map((order) => {
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
                      <span className={\`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold \${config.bg} \${config.text}\`}>
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
              })}`;

const groupedTableBody = `              {Object.entries(groupedOrders).map(([date, dateOrders]) => (
                <React.Fragment key={date}>
                  {/* Date Header Row */}
                  <tr className="bg-gray-50/80">
                    <td colSpan={6} className="py-2.5 px-6 font-bold text-gray-500 text-xs uppercase tracking-widest border-y border-gray-100">
                      {date} <span className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full text-[10px]">{dateOrders.length}</span>
                    </td>
                  </tr>
                  
                  {/* Orders for this date */}
                  {dateOrders.map((order) => {
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
                          <span className={\`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold \${config.bg} \${config.text}\`}>
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
                </React.Fragment>
              ))}`;

code = code.replace(originalTableBody, groupedTableBody);

// We need to import React if we use React.Fragment
if (!code.includes('import React')) {
  code = code.replace('import { useState } from "react";', 'import React, { useState } from "react";');
}

fs.writeFileSync('app/adminola/orders/OrdersTableClient.tsx', code);
