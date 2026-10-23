import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, customerPhone, amount, items, shippingAddress } = body;

    if (
      typeof customerName !== "string" ||
      typeof customerEmail !== "string" ||
      typeof customerPhone !== "string" ||
      typeof shippingAddress !== "string" ||
      typeof amount !== "number" ||
      !Number.isFinite(amount) ||
      amount <= 0 ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json({ error: "Invalid order details" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Order creation is missing Supabase server configuration");
      return NextResponse.json({ error: "Order service is unavailable" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Generate a simple 4 digit order number for display purposes
    const nextNum = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `#${nextNum}`;

    const { data, error } = await supabase.from("orders").insert({
      order_number: orderNumber,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      amount,
      status: "Processing",
      items_count: items.length,
      items,
      shipping_address: shippingAddress
    });

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
