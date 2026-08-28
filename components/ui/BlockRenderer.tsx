"use client";
import Image from "next/image";
import { PageBlock } from "@/lib/db";
import { CheckCircle2, ShoppingCart, Droplets, RotateCw, Hand, Zap, Leaf } from "lucide-react";
import { useState, useEffect } from "react";

export function BlockRenderer({ blocks }: { blocks: PageBlock[] | undefined | null }) {
  if (!blocks || blocks.length === 0) return null;

  // Separate blocks into logical sections based on the requested template
  const headlineBlock = blocks.find(b => b.type === 'headline');
  const subheadlineBlock = blocks.find(b => b.type === 'subheadline');
  const buttonBlock = blocks.find(b => b.type === 'button');
  const imageBlock = blocks.find(b => b.type === 'image' || b.type === 'carousel');
  const bodyBlock = blocks.find(b => b.type === 'body');
  const listBlock = blocks.find(b => b.type === 'list');
  const formBlock = blocks.find(b => b.type === 'form');

  return (
    <div className="w-full bg-white font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[60vh] md:min-h-[80vh] flex items-center overflow-hidden bg-[#e6f0fa]">
        {/* Hero Background Image (using the provided hero image) */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/uploads/mop-hero.jpg" 
            alt="Hero Background" 
            fill 
            className="object-cover object-right md:object-center opacity-90 mix-blend-multiply"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent w-full md:w-2/3"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-12 md:py-24">
          <div className="max-w-xl md:max-w-2xl">
            {headlineBlock && (
              <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-black text-[#001D4A] leading-[1.05] tracking-tight mb-6 drop-shadow-sm">
                {headlineBlock.data.text}
              </h1>
            )}
            {subheadlineBlock && (
              <p className="text-xl md:text-2xl text-gray-800 font-medium mb-10 leading-snug max-w-lg">
                {subheadlineBlock.data.text}
              </p>
            )}
            {buttonBlock && (
              <a 
                href={buttonBlock.data.link || "#checkout-form"}
                className="inline-flex items-center justify-center gap-2 bg-[#003399] hover:bg-[#002266] text-white font-black text-xl py-5 px-12 rounded-full transition-all shadow-2xl hover:scale-105"
              >
                {buttonBlock.data.label || "BUY NOW"}
                <span className="text-2xl ml-2 leading-none">&rsaquo;</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 2. CAROUSEL SECTION */}
      {imageBlock && imageBlock.data.urls && (
        <section className="py-10 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar justify-start md:justify-center">
              {imageBlock.data.urls.map((img: string, i: number) => (
                <div key={i} className="relative shrink-0 w-[240px] h-[180px] md:w-[280px] md:h-[200px] snap-center rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 shadow-sm group">
                  <Image 
                    src={img} 
                    alt={`Gallery ${i}`} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. INFO SECTION (A Smarter Way to Clean) */}
      {(bodyBlock || listBlock) && (
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#f0f7ff]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-[#001D4A] mb-8">A Smarter Way to Clean</h2>
                {bodyBlock && (
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium mb-8">
                    {bodyBlock.data.text}
                  </p>
                )}
                {listBlock && (
                  <div className="bg-white rounded-3xl p-8 shadow-xl shadow-blue-900/5 border border-blue-50">
                    <ul className="space-y-4">
                      {(listBlock.data.items || []).map((item: string, i: number) => (
                        <li key={i} className="flex gap-4 items-start">
                          <CheckCircle2 size={24} className="text-[#003399] shrink-0 mt-0.5" />
                          <span className="text-gray-800 text-lg font-bold leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* If we have a lot of images, let's just pick one to show big on the right, or use the hero image again */}
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                 <Image 
                    src="/uploads/mop3.jpg" 
                    alt="Product Demonstration" 
                    fill 
                    className="object-cover" 
                  />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. KEY BENEFITS ROW */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
             <div className="bg-[#003399] text-white px-6 py-2 rounded-r-full -ml-6 font-bold text-lg shadow-md">
               Key Benefits
             </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <BenefitIcon icon={<RotateCw />} title="Self-Cleaning" subtitle="Scrapes & rinses pads automatically" />
            <BenefitIcon icon={<Droplets />} title="Multiple Uses" subtitle="Reusable microfiber pads" />
            <BenefitIcon icon={<Hand />} title="Touch-Less" subtitle="No dirty hands" />
            <BenefitIcon icon={<Zap />} title="Faster Drying" subtitle="Leaves floors clean & dry" />
            <BenefitIcon icon={<Leaf />} title="Eco-Friendly" subtitle="Less waste, longer use" />
          </div>
        </div>
      </section>

      {/* 5. FOOTER / CHECKOUT SECTION */}
      {formBlock && (
        <section className="py-16 bg-[#e6f0fa]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              {/* Left Dark Card */}
              <div className="bg-[#001D4A] rounded-[2rem] p-10 md:p-14 text-white relative overflow-hidden flex flex-col justify-center shadow-2xl">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
                 
                 <div className="relative z-10">
                   <p className="text-blue-300 font-bold text-xl mb-2">Get Your</p>
                   <h2 className="text-4xl md:text-5xl font-black mb-10 leading-tight">
                     {formBlock.data.productName} <br/><span className="text-white">Today!</span>
                   </h2>
                   
                   <ul className="space-y-4">
                     <li className="flex items-center gap-3 text-xl font-medium"><CheckCircle2 className="text-[#00E676]" /> Cleaner Floors</li>
                     <li className="flex items-center gap-3 text-xl font-medium"><CheckCircle2 className="text-[#00E676]" /> Healthier Home</li>
                     <li className="flex items-center gap-3 text-xl font-medium"><CheckCircle2 className="text-[#00E676]" /> Hassle-Free Cleaning</li>
                     <li className="flex items-center gap-3 text-xl font-medium"><CheckCircle2 className="text-[#00E676]" /> Long-Lasting Value</li>
                   </ul>
                 </div>
              </div>

              {/* Right Form Card */}
              <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100">
                <CheckoutFormBlock block={formBlock} />
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}

function BenefitIcon({ icon, title, subtitle }: { icon: React.ReactNode, title: string, subtitle: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-[#003399] mb-4">
        {icon}
      </div>
      <h4 className="font-black text-gray-900 mb-1">{title}</h4>
      <p className="text-sm text-gray-500 leading-snug">{subtitle}</p>
    </div>
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
      <div className="p-12 text-center h-full flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="text-green-600" size={40} />
        </div>
        <h3 className="text-3xl font-black text-gray-900 mb-4">Order Confirmed!</h3>
        <p className="text-gray-600 text-lg">Thank you for your order. We will contact you shortly.</p>
      </div>
    );
  }

  return (
    <div id="checkout-form" className="p-8 md:p-10">
      <div className="flex items-center gap-3 mb-8">
        <ShoppingCart className="text-[#003399]" size={28} />
        <h3 className="text-2xl font-black text-[#001D4A]">Order Now</h3>
      </div>
      
      <div className="bg-[#e6f0fa] text-[#003399] font-bold text-center py-3 rounded-xl mb-8 flex justify-center items-center gap-2">
        <span>🔒</span> ₦{price.toLocaleString()} <span className="text-sm font-medium opacity-80">(Price Locked)</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-600 uppercase">Name</label>
            <input required name="name" type="text" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#003399]/20 focus:border-[#003399] transition-all bg-gray-50" placeholder="Enter your full name" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-600 uppercase">Email</label>
            <input required name="email" type="email" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#003399]/20 focus:border-[#003399] transition-all bg-gray-50" placeholder="Enter your email" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-600 uppercase">Phone Number</label>
            <input required name="phone" type="tel" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#003399]/20 focus:border-[#003399] transition-all bg-gray-50" placeholder="Enter your phone number" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-600 uppercase">Location</label>
            <input required name="location" type="text" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#003399]/20 focus:border-[#003399] transition-all bg-gray-50" placeholder="Enter your location" />
          </div>
        </div>
        
        <div className="space-y-1.5 w-32">
          <label className="text-xs font-bold text-gray-600 uppercase">Quantity</label>
          <div className="relative">
            <select required name="quantity" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#003399]/20 focus:border-[#003399] transition-all bg-gray-50 appearance-none font-bold text-center">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full mt-4 bg-[#001D4A] hover:bg-[#001133] text-white font-black text-lg py-5 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2"
        >
          {loading ? "Processing..." : (
            <>
              🔒 Place Order – ₦{price.toLocaleString()}
            </>
          )}
        </button>
        <p className="text-center text-xs text-gray-500 font-medium pt-2">
          <CheckCircle2 size={12} className="inline mr-1 text-green-500" /> Your information is safe and secure.
        </p>
      </form>
    </div>
  );
}
