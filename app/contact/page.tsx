"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
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
                <p className="text-gray-600 text-sm mb-1">+234 (0) 800 123 4567</p>
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
                <h3 className="font-bold text-gray-900 mb-1">Visit Us</h3>
                <p className="text-gray-600 text-sm mb-1">123 Tech Avenue, Ikeja</p>
                <p className="text-gray-500 text-xs">Lagos, Nigeria</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</label>
                  <input type="text" id="firstName" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="John" />
                </div>
                <div className="space-y-1">
                  <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</label>
                  <input type="text" id="lastName" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="Doe" />
                </div>
              </div>
              
              <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="john@example.com" />
              </div>

              <div className="space-y-1">
                <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</label>
                <select id="subject" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-white">
                  <option>Order Inquiry</option>
                  <option>Product Question</option>
                  <option>Returns & Refunds</option>
                  <option>Partnership</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                <textarea id="message" rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none" placeholder="How can we help you?"></textarea>
              </div>

              <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-1 shadow-lg shadow-primary/20">
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
