import { getAdminDashboardData, getStoreOrders, getCustomerMessages } from "@/lib/admin-data";
import { ClientAdminLayout } from "@/components/admin/ClientAdminLayout";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getAdminDashboardData();
  const orders = await getStoreOrders();
  const messages = getCustomerMessages();
  
  const pendingOrdersCount = orders.filter(o => o.status === "Processing").length;
  const unreadMessagesCount = messages.filter(m => m.status === "New").length;

  return (
    <ClientAdminLayout 
      pendingOrdersCount={pendingOrdersCount}
      unreadMessagesCount={unreadMessagesCount}
      activities={data.activities}
    >
      {children}
    </ClientAdminLayout>
  );
}
