"use client";

import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";

const WHATSAPP_NUMBER = "2347012367611";

const TOPICS = [
  { id: "order", label: "Order Inquiry", text: "Hi, I have a question about my order." },
  { id: "product", label: "Product Question", text: "Hi, I would like to know more about a product." },
  { id: "returns", label: "Returns & Refunds", text: "Hi, I need help with a return or refund." },
  { id: "other", label: "Other", text: "Hi, I have a general inquiry." },
];

export default function ContactPage() {
  const [selectedTopic, setSelectedTopic] = useState(TOPICS[0]);

  const handleWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(selectedTopic.text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="container-custom py-16 min-h-[60vh]">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">Contact Us</h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Have a question about an order, a product, or our warranty policies? We're here to help! Reach out to us directly via WhatsApp or through our contact information.
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

          {/* WhatsApp Contact Selection */}
          <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-center">
            <div className="mb-8 text-center">
              <div className="w-16 h-16 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Message us on WhatsApp</h2>
              <p className="text-gray-600">Get a faster response by messaging us directly.</p>
            </div>
            
            <div className="space-y-4 max-w-md mx-auto w-full">
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 block text-center">What is your inquiry about?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TOPICS.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic)}
                      className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                        selectedTopic.id === topic.id
                          ? "border-[#25D366] bg-[#25D366]/5 text-[#25D366]"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {topic.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <button 
                  onClick={handleWhatsApp}
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-1 shadow-lg shadow-[#25D366]/20"
                >
                  <MessageCircle size={20} /> Contact via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

