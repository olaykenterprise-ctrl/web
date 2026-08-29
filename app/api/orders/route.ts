import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, customerPhone, amount, items, shippingAddress } = body;
    const supabase = await createClient();

    // Generate a simple 4 digit order number for display purposes
    const nextNum = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `#${nextNum}`;

    const { data, error } = await supabase.from("orders").insert({
      order_number: orderNumber,
      customer_name: customerName || "Guest Customer",
      customer_email: customerEmail || "customer@example.com",
      customer_phone: customerPhone || "+234 800 000 0000",
      amount: amount || 15000,
      status: "Processing",
      items_count: items?.length || 1,
      items: items || [],
      shipping_address: shippingAddress || "Lagos, Nigeria"
    }).select().single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to record order in database" }, { status: 500 });
    }

    return NextResponse.json({ success: true, order: data });
  } catch (error) {
    console.error("Failed to record order:", error);
    return NextResponse.json({ error: "Failed to record order" }, { status: 500 });
  }
}
