import { NextResponse } from "next/server";
import { addStoreOrder } from "@/lib/admin-data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, customerPhone, amount, items, shippingAddress } = body;

    const order = addStoreOrder({
      customerName: customerName || "Guest Customer",
      customerEmail: customerEmail || "customer@example.com",
      customerPhone: customerPhone || "+234 800 000 0000",
      amount: amount || 15000,
      status: "Processing",
      itemsCount: items?.length || 1,
      items: items || [],
      shippingAddress: shippingAddress || "Lagos, Nigeria"
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Failed to record order:", error);
    return NextResponse.json({ error: "Failed to record order" }, { status: 500 });
  }
}
