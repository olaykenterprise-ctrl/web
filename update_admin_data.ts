import fs from 'fs';

let content = fs.readFileSync('lib/admin-data.ts', 'utf8');

const getStoreOrdersReplacement = `export async function getStoreOrders(): Promise<Order[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
  if (error || !data) return [];
  
  return data.map(dbOrder => ({
    id: dbOrder.id,
    orderNumber: dbOrder.order_number,
    customerName: dbOrder.customer_name,
    customerEmail: dbOrder.customer_email,
    customerPhone: dbOrder.customer_phone,
    amount: dbOrder.amount,
    status: dbOrder.status,
    date: new Date(dbOrder.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    itemsCount: dbOrder.items_count,
    items: dbOrder.items,
    shippingAddress: dbOrder.shipping_address
  }));
}`;

content = content.replace(/export function getStoreOrders\(\): Order\[\] \{[\s\S]*?\n\}/, getStoreOrdersReplacement);
content = content.replace(/const orders = getStoreOrders\(\);/g, 'const orders = await getStoreOrders();');

fs.writeFileSync('lib/admin-data.ts', content, 'utf8');
