"use client";
import Image from "next/image";
import { PageBlock } from "@/lib/db";
import { CheckCircle2, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";

export function BlockRenderer({ blocks }: { blocks: PageBlock[] | undefined | null }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="w-full bg-white">
      {blocks.map((block, index) => {
        
        if (block.type === 'headline') {
          return (
            <section key={block.id} className="relative w-full py-16 md:py-24 flex items-center overflow-hidden bg-primary/10 border-b border-primary/20">
              {block.data.backgroundImage && (
                <div className="absolute inset-0 z-0">
                  <Image 
                    src={block.data.backgroundImage} 
                    alt="Hero Background" 
                    fill 
                    className="object-cover opacity-90 mix-blend-multiply"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent w-full"></div>
                </div>
              )}
              <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight drop-shadow-sm max-w-4xl mx-auto">
                  {block.data.text}
                </h1>
              </div>
            </section>
          );
        }

        if (block.type === 'subheadline') {
          return (
            <section key={block.id} className="w-full py-6 bg-white">
              <div className="max-w-4xl mx-auto px-6 text-center">
                <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed">
                  {block.data.text}
                </p>
              </div>
            </section>
          );
        }

        if (block.type === 'button') {
          return (
            <section key={block.id} className="w-full py-8 bg-white text-center">
              <a 
                href={block.data.link || "#checkout-form"}
                className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-white font-black text-lg py-4 px-10 rounded-full transition-all shadow-xl shadow-primary/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30"
              >
                <ShoppingCart size={24} />
                {block.data.label || "BUY NOW"}
              </a>
            </section>
          );
        }

        if (block.type === 'image' || block.type === 'carousel') {
           if (block.data.urls && block.data.urls.length === 1) {
             return (
               <section key={block.id} className="w-full py-12 bg-gray-50">
                 <div className="max-w-5xl mx-auto px-6">
                   <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden shadow-sm border border-gray-100">
                     <Image src={block.data.urls[0]} alt="Image" fill className="object-cover" />
                   </div>
                 </div>
               </section>
             )
           } else if (block.data.urls && block.data.urls.length > 1) {
             return <CarouselBlock key={block.id} urls={block.data.urls} />;
           }
        }

        if (block.type === 'body') {
          return (
            <section key={block.id} className="w-full py-12 bg-white">
              <div className="max-w-4xl mx-auto px-6">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
                  {block.data.text}
                </p>
              </div>
            </section>
          );
        }

        if (block.type === 'list') {
          return (
            <section key={block.id} className="w-full py-12 bg-white">
              <div className="max-w-4xl mx-auto px-6">
                <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100">
                  <ul className="space-y-6">
                    {(block.data.items || []).map((item: string, i: number) => (
                      <li key={i} className="flex gap-5 items-start">
                        <CheckCircle2 size={28} className="text-primary shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-xl font-bold leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          );
        }

        if (block.type === 'form') {
          return (
            <section key={block.id} className="w-full py-16 bg-gray-50">
              <div className="max-w-3xl mx-auto px-6">
                <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden border border-gray-100">
                  <CheckoutFormBlock block={block} />
                </div>
              </div>
            </section>
          );
        }

        return null;
      })}
    </div>
  );
}

function CarouselBlock({ urls }: { urls: string[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-12 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 group relative">
        <button onClick={() => scroll('left')} className="absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-white/90 text-primary p-3 rounded-full shadow-lg border border-gray-100 hover:bg-primary hover:text-white transition-all">
          <ChevronLeft size={24} />
        </button>
        <button onClick={() => scroll('right')} className="absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-white/90 text-primary p-3 rounded-full shadow-lg border border-gray-100 hover:bg-primary hover:text-white transition-all">
          <ChevronRight size={24} />
        </button>
        
        <div ref={scrollRef} className="flex gap-4 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar justify-start">
          {urls.map((img: string, i: number) => (
            <div key={i} className="relative shrink-0 w-[240px] h-[180px] md:w-[280px] md:h-[200px] snap-center rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 shadow-sm hover:scale-105 transition-transform duration-500">
              <Image src={img} alt={`Gallery ${i}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CheckoutFormBlock({ block }: { block: PageBlock }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const price = block.data.price || 25000;

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
          amount: price * quantity,
          items: [{ name: block.data.productName || 'Product', quantity, price: price }]
        }),
      });
      if (response.ok) {
        setSuccess(true);
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Lead', {
            content_name: block.data.productName || 'Product',
            value: price * quantity,
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
      <div className="p-12 text-center h-full flex flex-col items-center justify-center bg-emerald-50">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="text-primary" size={40} />
        </div>
        <h3 className="text-3xl font-black text-gray-900 mb-4">Order Confirmed!</h3>
        <p className="text-gray-600 text-lg">Thank you for your order. We will contact you shortly.</p>
      </div>
    );
  }

  return (
    <div id="checkout-form" className="p-8 md:p-12">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-black text-gray-900 mb-3">Order Now</h3>
        <p className="text-gray-600">{block.data.productName}</p>
      </div>
      
      <div className="bg-primary/10 text-primary font-bold text-center py-4 rounded-xl mb-8 flex justify-center items-center gap-2 text-xl">
        <span>🔒</span> ₦{price.toLocaleString()} <span className="text-sm font-medium opacity-80">(Price Locked)</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-600 uppercase">Name</label>
            <input required name="name" type="text" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50" placeholder="Enter your full name" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-600 uppercase">Email</label>
            <input required name="email" type="email" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50" placeholder="Enter your email" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-600 uppercase">Phone Number</label>
            <input required name="phone" type="tel" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50" placeholder="Enter your phone number" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-600 uppercase">Location</label>
            <input required name="location" type="text" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50" placeholder="Enter your location" />
          </div>
        </div>
        
        <div className="space-y-1.5 w-full">
          <label className="text-xs font-bold text-gray-600 uppercase">Quantity</label>
          <div className="relative">
            <select required name="quantity" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 appearance-none font-bold text-center">
              <option value="1">1 piece</option>
              <option value="2">2 pieces</option>
              <option value="3">3 pieces</option>
              <option value="4">4 pieces</option>
              <option value="5">5 pieces</option>
            </select>
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full mt-4 bg-primary hover:bg-primary-dark text-white font-black text-xl py-5 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
        >
          {loading ? "Processing..." : (
            <>
              🔒 Place Order – ₦{price.toLocaleString()}
            </>
          )}
        </button>
        <p className="text-center text-xs text-gray-500 font-medium pt-3">
          <CheckCircle2 size={14} className="inline mr-1 text-primary" /> Your information is safe and secure.
        </p>
      </form>
    </div>
  );
}
