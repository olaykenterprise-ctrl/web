"use client";

import Link from "next/link";
import { useState } from "react";
import { Package, Search } from "lucide-react";

export default function Page() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "found" | "not_found">("idle");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber) return;
    
    setStatus("loading");
    // Simulate network request
    setTimeout(() => {
      // For demonstration, any tracking number starting with "YK" is found
      if (trackingNumber.toUpperCase().startsWith("YK")) {
        setStatus("found");
      } else {
        setStatus("not_found");
      }
    }, 1500);
  };

  return (
    <div className="container-custom py-16 min-h-[60vh]">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
            <Package size={32} />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-gray-900">Track Your Order</h1>
          <p className="text-gray-600">
            Enter your order number or tracking ID below to see the current status of your shipment.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm mb-8">
          <form onSubmit={handleTrack} className="flex gap-4">
            <input 
              type="text" 
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="e.g. YK-12345678" 
              required
              className="flex-grow px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all uppercase" 
            />
            <button 
              type="submit" 
              disabled={status === "loading"}
              className="bg-primary hover:bg-primary-dark disabled:bg-primary/70 disabled:cursor-not-allowed text-white font-bold px-8 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20"
            >
              {status === "loading" ? "Searching..." : <><Search size={18} /> Track</>}
            </button>
          </form>

          {/* Results Area */}
          <div className="mt-8">
            {status === "not_found" && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 text-center">
                We couldn't find any active shipments for this tracking number. Please check the number and try again.
              </div>
            )}
            
            {status === "found" && (
              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-green-200">
                  <div>
                    <p className="text-sm text-green-800 font-medium mb-1">Order Number</p>
                    <p className="font-bold text-gray-900">{trackingNumber.toUpperCase()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-800 font-medium mb-1">Status</p>
                    <span className="inline-block px-3 py-1 bg-green-200 text-green-800 rounded-full text-xs font-bold uppercase tracking-wider">
                      In Transit
                    </span>
                  </div>
                </div>
                
                <div className="relative pl-6 border-l-2 border-green-300 space-y-6">
                  <div className="relative">
                    <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-green-500 ring-4 ring-green-100"></div>
                    <p className="font-semibold text-gray-900">Arrived at Local Facility</p>
                    <p className="text-sm text-gray-600">Ikeja, Lagos - Today, 08:30 AM</p>
                  </div>
                  <div className="relative opacity-50">
                    <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-gray-300 ring-4 ring-white"></div>
                    <p className="font-semibold text-gray-500">Out for Delivery</p>
                    <p className="text-sm text-gray-400">Pending</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          Having trouble? <Link href="/contact" className="text-primary font-medium hover:underline">Contact Customer Support</Link>
        </div>
      </div>
    </div>
  );
}
