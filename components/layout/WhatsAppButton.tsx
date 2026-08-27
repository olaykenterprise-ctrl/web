"use client";

import { useState } from "react";
import { X, ShoppingBag, Package, AlertCircle } from "lucide-react";

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Format the number to international format: 07012367611 -> 2347012367611
  const waNumber = "2347012367611"; 

  const options = [
    {
      label: "Product Inquiry",
      message: "Hello, I want to make inquiries about a product.",
      icon: <ShoppingBag size={16} />
    },
    {
      label: "Order Support",
      message: "Hello, I need help with my order.",
      icon: <Package size={16} />
    },
    {
      label: "Report an Issue",
      message: "Hello, I want to report an issue.",
      icon: <AlertCircle size={16} />
    }
  ];

  const handleOptionClick = (message: string) => {
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end">
      
      {/* Popup Menu */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 mb-4 w-72 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="bg-[#25D366] p-4 text-white">
            <h3 className="font-bold text-lg leading-tight">Chat with us!</h3>
            <p className="text-xs opacity-90 mt-1">Usually replies in a few minutes.</p>
          </div>
          
          <div className="p-2 space-y-1">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              How can we help?
            </div>
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleOptionClick(opt.message)}
                className="w-full flex items-center gap-3 px-3 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#25D366] rounded-xl transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  {opt.icon}
                </div>
                <span className="font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#1ebe57] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
        aria-label="Chat on WhatsApp"
      >
        {isOpen ? (
          <X size={26} />
        ) : (
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        )}
      </button>
    </div>
  );
}
