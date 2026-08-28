"use client";
import Image from "next/image";
import { PageBlock } from "@/lib/db";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

export function BlockRenderer({ blocks }: { blocks: PageBlock[] | undefined | null }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="space-y-8 md:space-y-12">
      {blocks.map((block) => (
        <div key={block.id} className="w-full">
          {block.type === "headline" && (
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">
              {block.data.text}
            </h2>
          )}

          {block.type === "subheadline" && (
            <h3 className="text-2xl font-bold text-gray-800 tracking-tight">
              {block.data.text}
            </h3>
          )}

          {block.type === "body" && (
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-4xl">
              {block.data.text}
            </p>
          )}

          {block.type === "image" && (
            (() => {
              const urls = block.data.urls || block.data.images || (block.data.url ? [block.data.url] : []);
              if (urls.length === 0) return null;
              if (urls.length === 1) {
                return (
                  <div className="relative w-full overflow-hidden rounded-3xl bg-gray-50 border border-gray-100 shadow-sm" style={{ minHeight: '300px', aspectRatio: '16/9' }}>
                    <Image 
                      src={urls[0]} 
                      alt={block.data.alt || "Image"} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                );
              }
              return (
                <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar">
                  {urls.map((img: string, i: number) => (
                    <div key={i} className="relative shrink-0 w-[280px] h-[320px] md:w-[320px] md:h-[400px] snap-center rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
                      <Image 
                        src={img || "/placeholder.jpg"} 
                        alt={block.data.alt || `Gallery ${i}`} 
                        fill 
                        className="object-cover hover:scale-105 transition-transform duration-700" 
                      />
                    </div>
                  ))}
                </div>
              );
            })()
          )}

          {block.type === "list" && (
            <ul className="space-y-4 max-w-4xl">
              {(block.data.items || []).map((item: string, i: number) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={16} className="text-[#00875A]" />
                  </div>
                  <span className="text-gray-700 text-lg font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          )}

          {block.type === "carousel" && (
            <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar">
              {(block.data.images || []).map((img: string, i: number) => (
                <div key={i} className="relative shrink-0 w-[280px] h-[320px] md:w-[320px] md:h-[400px] snap-center rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
                  <Image 
                    src={img || "/placeholder.jpg"} 
                    alt={`Gallery ${i}`} 
                    fill 
                    className="object-cover hover:scale-105 transition-transform duration-700" 
                  />
                </div>
              ))}
            </div>
          )}

          {block.type === "video" && block.data.url && (
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black aspect-video max-w-4xl border-4 border-white">
              <iframe
                src={block.data.url.replace(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/, "https://www.youtube.com/embed/$1")}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
          )}

          {block.type === "button" && (
            <div className="pt-4">
              <a 
                href={block.data.link || "#checkout-form"}
                className="inline-flex items-center justify-center gap-3 bg-[#00875A] hover:bg-emerald-700 text-white font-black text-lg py-4 px-10 rounded-full transition-all shadow-xl shadow-[#00875A]/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#00875A]/30"
              >
                {block.data.label || "Click Here"}
              </a>
            </div>
          )}

          {block.type === "form" && (
            <CheckoutFormBlock block={block} />
          )}
        </div>
      ))}
    </div>
  );
}

function CheckoutFormBlock({ block }: { block: PageBlock }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const quantity = Number(formData.get("quantity") || 1);
    
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.get("name"),
          customerEmail: formData.get("email"),
          customerPhone: formData.get("phone"),
          shippingAddress: formData.get("location"),
          amount: (block.data.price || 0) * quantity,
          items: [{ name: block.data.productName || 'Product', quantity, price: block.data.price || 0 }]
        }),
      });
      if (response.ok) {
        setSuccess(true);
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Lead', {
            content_name: block.data.productName || 'Product',
            value: (block.data.price || 0) * quantity,
            currency: 'NGN'
          });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="text-emerald-600" size={32} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h3>
        <p className="text-gray-600">Thank you for your order. We will contact you shortly.</p>
      </div>
    );
  }

  return (
    <div id="checkout-form" className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
      <h3 className="text-2xl font-black text-gray-900 mb-6">Complete Your Order</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input required name="name" type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="John Doe" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <input required name="email" type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="john@example.com" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <input required name="phone" type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="+234..." />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Delivery Location / Address</label>
          <input required name="location" type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="123 Main St, Lagos" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">How many do you want to buy?</label>
          <select required name="quantity" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white">
            <option value="1">1 piece</option>
            <option value="2">2 pieces</option>
            <option value="3">3 pieces</option>
            <option value="4">4 pieces</option>
            <option value="5">5 pieces</option>
          </select>
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full mt-6 bg-[#00875A] text-white font-bold text-lg py-4 rounded-xl hover:bg-emerald-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#00875A]/20"
        >
          {loading ? "Processing..." : "Confirm Order"}
        </button>
      </form>
    </div>
  );
}
