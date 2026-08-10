"use client";

import { Gift, CheckCircle } from "lucide-react";
import { useState } from "react";

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="container-custom mb-16">
      <div className="bg-purple-50 rounded-2xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-purple-100">
        
        <div className="z-10 mb-6 md:mb-0 md:w-1/2">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Get <span className="text-primary">₦1,000 OFF</span> Your First Order!
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Join our newsletter for exclusive deals and new arrivals.
          </p>
          
          {submitted ? (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg border border-green-200">
              <CheckCircle size={20} />
              <span className="font-medium">Thanks for subscribing! Check your email.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex w-full max-w-md bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                required
                className="flex-grow px-4 py-3 outline-none text-sm text-gray-700"
              />
              <button 
                type="submit" 
                className="bg-primary text-white font-semibold px-6 py-3 hover:bg-primary-dark transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

        {/* Gift Graphic */}
        <div className="relative z-10 hidden md:flex items-center justify-center">
          <div className="w-32 h-32 bg-purple-200 rounded-full flex items-center justify-center absolute opacity-50 -z-10"></div>
          <Gift size={80} className="text-primary" strokeWidth={1.5} />
        </div>
        
        {/* Background decorations */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary rounded-full blur-3xl opacity-10"></div>
      </div>
    </div>
  );
}
