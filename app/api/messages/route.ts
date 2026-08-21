import { NextResponse } from "next/server";
import { addCustomerMessage } from "@/lib/admin-data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!email || !message) {
      return NextResponse.json({ error: "Email and message are required" }, { status: 400 });
    }

    const newMessage = addCustomerMessage({
      name: name || "Customer",
      email: email,
      subject: subject || "General Inquiry",
      message: message
    });

    return NextResponse.json({ success: true, message: newMessage }, { status: 201 });
  } catch (error) {
    console.error("Error saving contact message:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
