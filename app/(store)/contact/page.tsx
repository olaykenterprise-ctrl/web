"use client";

import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="container-custom py-16 min-h-[60vh]">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">Contact Us</h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Have a question about an order, a product, or our warranty policies? We're here to help! Reach out to us using the form below or through our contact information.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Call Us</h3>
                <p className="text-gray-600 text-sm mb-1">07012367611</p>
                <p className="text-gray-500 text-xs">Mon-Sat, 9am - 6pm</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
                <p className="text-gray-600 text-sm mb-1">support@olaykenterprise.com</p>
                <p className="text-gray-500 text-xs">We reply within 24 hours</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Head Office</h3>
                <p className="text-gray-600 text-sm mb-1">Ikeja, Lagos</p>
                <p className="text-gray-500 text-xs">Nigeria</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            {submitted ? (
              <div className="bg-green-50 p-6 rounded-2xl border border-green-200 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-6">We've received your message and will get back to you within 24 hours.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-primary font-semibold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const firstName = formData.get("firstName") as string || "";
                  const lastName = formData.get("lastName") as string || "";
                  const email = formData.get("email") as string || "";
                  const subject = formData.get("subject") as string || "General Inquiry";
                  const message = formData.get("message") as string || "";

                  try {
                    await fetch("/api/messages", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        name: `${firstName} ${lastName}`.trim() || "Customer",
                        email,
                        subject,
                        message
                      })
                    });
                  } catch (err) {
                    console.error("Message send error:", err);
                  }

                  setSubmitted(true);
                }}
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</label>
                    <input type="text" id="firstName" name="firstName" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="John" />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</label>
                    <input type="text" id="lastName" name="lastName" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="john@example.com" />
                </div>

                <div className="space-y-1">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</label>
                  <select id="subject" name="subject" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-white">
                    <option>Order Inquiry</option>
                    <option>Product Question</option>
                    <option>Returns & Refunds</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                  <textarea id="message" name="message" required rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none" placeholder="How can we help you?"></textarea>
                </div>

                <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-1 shadow-lg shadow-primary/20">
                  <Send size={18} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
