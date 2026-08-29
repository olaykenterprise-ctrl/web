"use client";
import Image from "next/image";
import { PageBlock } from "@/lib/db";
import { CheckCircle2, ShoppingCart, ChevronLeft, ChevronRight, ArrowRight, ShieldCheck } from "lucide-react";
import { useState, useRef } from "react";

export function BlockRenderer({ blocks }: { blocks: PageBlock[] | undefined | null }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="w-full bg-white pb-20">
      {blocks.map((block, index) => {
        
        if (block.type === 'headline') {
          return (
            <div key={block.id} className="container-custom mt-3 sm:mt-6 mb-8 sm:mb-12">
              <div className="relative bg-[#FAF8F5] rounded-3xl overflow-hidden border border-gray-100/80 shadow-xs flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px]">
                {block.data.backgroundImage && (
                  <div className="absolute inset-0 z-0">
                    <Image 
                      src={block.data.backgroundImage} 
                      alt="Hero Background" 
                      fill 
                      className="object-cover opacity-80 mix-blend-multiply"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-transparent w-full"></div>
                  </div>
                )}
                <div className="relative z-10 max-w-4xl mx-auto px-6 w-full text-center py-16">
                  <h1 className="font-editorial text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight drop-shadow-sm">
                    {block.data.text}
                  </h1>
                </div>
              </div>
            </div>
          );
        }

        if (block.type === 'subheadline') {
          return (
            <section key={block.id} className="w-full py-4">
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
            <section key={block.id} className="w-full py-8 text-center">
              <a 
                href={block.data.link || "#checkout-form"}
                className="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-xl transition-all shadow-md shadow-primary/20 hover:-translate-y-0.5 inline-flex items-center gap-3 text-lg"
              >
                <span>{block.data.label || "BUY NOW"}</span>
                <ArrowRight size={20} />
              </a>
            </section>
          );
        }

        if (block.type === 'image' || block.type === 'carousel') {
           if (block.data.urls && block.data.urls.length === 1) {
             return (
               <div key={block.id} className="container-custom py-8">
                 <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-xs border border-gray-100/80 bg-[#FAF8F5]">
                   <Image src={block.data.urls[0]} alt="Image" fill className="object-cover" />
                 </div>
               </div>
             )
           } else if (block.data.urls && block.data.urls.length > 1) {
             return <CarouselBlock key={block.id} urls={block.data.urls} />;
           }
        }

        if (block.type === 'body') {
          return (
            <section key={block.id} className="w-full py-8">
              <div className="max-w-4xl mx-auto px-6 text-center md:text-left">
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
                  {block.data.text}
                </p>
              </div>
            </section>
          );
        }

        if (block.type === 'list') {
          return (
            <div key={block.id} className="container-custom py-8">
              <div className="max-w-4xl mx-auto bg-[#FAF8F5] rounded-3xl p-8 md:p-12 shadow-xs border border-gray-100/80">
                <ul className="space-y-6">
                  {(block.data.items || []).map((item: string, i: number) => (
                    <li key={i} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 size={20} />
                      </div>
                      <span className="text-gray-900 text-lg md:text-xl font-bold leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        }

        if (block.type === 'form') {
          return (
            <div key={block.id} className="container-custom py-12">
              <div className="max-w-3xl mx-auto bg-[#FAF8F5] rounded-3xl shadow-xs overflow-hidden border border-gray-100/80">
                <CheckoutFormBlock block={block} />
              </div>
            </div>
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
    <div className="container-custom py-8 relative group">
      <button onClick={() => scroll('left')} className="absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-900 p-3 rounded-full shadow-md border border-gray-100/80 hover:bg-gray-50 transition-all">
        <ChevronLeft size={24} />
      </button>
      <button onClick={() => scroll('right')} className="absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-900 p-3 rounded-full shadow-md border border-gray-100/80 hover:bg-gray-50 transition-all">
        <ChevronRight size={24} />
      </button>
      
      <div ref={scrollRef} className="flex gap-4 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar justify-start">
        {urls.map((img: string, i: number) => (
          <div key={i} className="relative shrink-0 w-[260px] h-[200px] md:w-[320px] md:h-[240px] snap-center rounded-3xl overflow-hidden bg-[#FAF8F5] border border-gray-100/80 shadow-xs hover:shadow-md transition-shadow">
            <Image src={img} alt={`Gallery ${i}`} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

function CheckoutFormBlock({ block }: { block: PageBlock }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const options = block.data.options || [{ label: "1 piece", quantity: 1, price: block.data.price || 25000 }];
  const originalPrice = block.data.originalPrice || null;
  const productName = block.data.productName || 'Product';

  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedOption = options[selectedIndex] || options[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.get("name"),
          customerEmail: formData.get("email"),
          customerPhone: formData.get("phone"),
          shippingAddress: formData.get("location"),
          amount: selectedOption.price,
          items: [{ name: productName, quantity: selectedOption.quantity, price: selectedOption.price }]
        }),
      });
      if (response.ok) {
        setSuccess(true);
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Lead', {
            content_name: productName,
            value: selectedOption.price,
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
      <div className="p-12 text-center h-full flex flex-col items-center justify-center bg-[#FAF8F5]">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="text-green-600" size={48} />
        </div>
        <h3 className="font-editorial text-3xl font-black text-gray-900 mb-4">Order Confirmed!</h3>
        <p className="text-gray-600 text-lg">Thank you for your order. We will contact you shortly.</p>
      </div>
    );
  }

  return (
    <div id="checkout-form" className="p-8 md:p-12">
      <div className="text-center mb-8">
        <div className="inline-block bg-green-100 text-green-700 font-bold px-4 py-1 rounded-full text-xs tracking-widest uppercase mb-4 shadow-sm border border-green-200">
          🚚 Free Delivery Nationwide
        </div>
        <h3 className="font-editorial text-4xl font-black text-gray-900 mb-2">Order Now</h3>
        <p className="text-gray-500 font-medium text-lg">{productName}</p>
      </div>
      
      <div className="bg-white border border-gray-100/80 text-gray-900 font-bold text-center py-5 rounded-2xl mb-8 flex flex-col justify-center items-center gap-1 shadow-sm">
        <span className="text-sm text-gray-500 uppercase tracking-widest font-bold">Total Price</span>
        <div className="flex items-center gap-3">
          {originalPrice && (
            <span className="text-gray-400 line-through text-xl">₦{originalPrice.toLocaleString()}</span>
          )}
          <span className="text-3xl text-primary font-black">₦{selectedOption.price.toLocaleString()}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5 w-full">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Select Package</label>
          <div className="relative">
            <select 
              value={selectedIndex}
              onChange={(e) => setSelectedIndex(Number(e.target.value))}
              className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white appearance-none font-bold text-gray-900 shadow-sm"
            >
              {options.map((opt: any, idx: number) => (
                <option key={idx} value={idx}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Name</label>
            <input required name="name" type="text" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white shadow-sm" placeholder="Enter your full name" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Email</label>
            <input required name="email" type="email" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white shadow-sm" placeholder="Enter your email" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Phone Number</label>
            <input required name="phone" type="tel" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white shadow-sm" placeholder="Enter your phone number" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Location</label>
            <input required name="location" type="text" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white shadow-sm" placeholder="Enter your location" />
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full mt-6 bg-primary hover:bg-primary-dark text-white font-bold text-lg py-5 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-primary/20 flex items-center justify-center gap-2"
        >
          {loading ? "Processing..." : (
            <>
              Complete Order – ₦{selectedOption.price.toLocaleString()}
            </>
          )}
        </button>
        <p className="text-center text-xs text-gray-400 font-medium pt-3 flex items-center justify-center gap-1.5">
          <ShieldCheck size={14} className="text-green-500" /> Secure Checkout
        </p>
      </form>
    </div>
  );
}
