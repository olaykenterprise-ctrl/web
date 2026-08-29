"use client";
import Image from "next/image";
import { PageBlock } from "@/lib/db";
import { CheckCircle2, ShoppingCart, ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Truck, RotateCcw, Sparkles } from "lucide-react";
import { useState, useRef } from "react";

export function BlockRenderer({ blocks }: { blocks: PageBlock[] | undefined | null }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="w-full bg-white pb-20">
      {blocks.map((block, index) => {
        
        if (block.type === 'headline') {
          const badgeText = block.data.badge || "Special Promotion";
          return (
            <div key={block.id} className="container-custom mt-3 sm:mt-6 mb-8 sm:mb-12">
              <div className="relative bg-[#FAF8F5] rounded-3xl overflow-hidden border border-gray-100/80 shadow-xs flex flex-col items-center justify-center min-h-[380px] md:min-h-[460px]">
                {block.data.backgroundImage && (
                  <div className="absolute inset-0 z-0">
                    <Image 
                      src={block.data.backgroundImage} 
                      alt="Hero Background" 
                      fill 
                      className="object-cover opacity-80 mix-blend-multiply"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/40 to-transparent w-full"></div>
                  </div>
                )}
                <div className="relative z-10 max-w-4xl mx-auto px-6 w-full text-center py-12 sm:py-16">
                  {badgeText && (
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent/15 text-accent-dark text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-2xs border border-accent/20">
                      <Sparkles size={12} className="text-accent" />
                      <span>{badgeText}</span>
                    </div>
                  )}
                  <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.15] tracking-tight drop-shadow-sm">
                    {block.data.text}
                  </h1>
                </div>
              </div>
            </div>
          );
        }

        if (block.type === 'subheadline') {
          return (
            <section key={block.id} className="w-full py-2 sm:py-3 mb-2">
              <div className="max-w-2xl mx-auto px-6 text-center">
                <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed">
                  {block.data.text}
                </p>
              </div>
            </section>
          );
        }

        if (block.type === 'button') {
          return (
            <section key={block.id} className="w-full py-6 sm:py-8 text-center">
              <a 
                href={block.data.link || "#checkout-form"}
                className="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-xl transition-all shadow-md shadow-primary/25 hover:-translate-y-0.5 inline-flex items-center gap-2.5 text-sm sm:text-base uppercase tracking-wider group"
              >
                <span>{block.data.label || "BUY NOW"}</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </section>
          );
        }

        if (block.type === 'image' || block.type === 'carousel') {
           if (block.data.urls && block.data.urls.length === 1) {
             return (
               <div key={block.id} className="container-custom py-6 sm:py-8">
                 <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-xs border border-gray-100/80 bg-[#FAF8F5]">
                   <Image src={block.data.urls[0]} alt="Product Visual" fill className="object-cover" />
                 </div>
               </div>
             )
           } else if (block.data.urls && block.data.urls.length > 1) {
             return <CarouselBlock key={block.id} urls={block.data.urls} />;
           }
        }

        if (block.type === 'video') {
          const getEmbedUrl = (url: string) => {
            if (!url) return null;
            const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
            return match ? `https://www.youtube.com/embed/${match[1]}` : null;
          };
          const embedUrl = getEmbedUrl(block.data.url || "");

          if (!embedUrl) return null;

          return (
            <div key={block.id} className="container-custom py-6 sm:py-8">
              <div className="max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-xl bg-black aspect-video border-4 border-white relative">
                <iframe 
                  src={embedUrl} 
                  title="Product Video" 
                  allowFullScreen 
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          );
        }

        if (block.type === 'body') {
          return (
            <section key={block.id} className="container-custom py-4 sm:py-6">
              <div className="max-w-3xl mx-auto bg-[#FAF8F5]/80 rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-200/60 shadow-xs relative overflow-hidden">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Product Overview</span>
                </div>
                <p className="text-sm sm:text-base md:text-[16px] text-gray-700 leading-relaxed font-normal">
                  {block.data.text}
                </p>
              </div>
            </section>
          );
        }

        if (block.type === 'list') {
          return (
            <div key={block.id} className="container-custom py-6 sm:py-8">
              <div className="max-w-4xl mx-auto bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 border border-gray-200/70 shadow-xs">
                <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
                  <span className="text-accent text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                    Why You Will Love This
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
                    Key Features & Benefits
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                  {(block.data.items || []).map((item: string, i: number) => {
                    const colonIndex = item.indexOf(':');
                    const hasSplit = colonIndex !== -1 && colonIndex < item.length - 1;
                    const title = hasSplit ? item.slice(0, colonIndex).trim() : null;
                    const desc = hasSplit ? item.slice(colonIndex + 1).trim() : item;

                    return (
                      <div 
                        key={i} 
                        className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100/90 shadow-xs flex items-start gap-3.5 text-left hover:border-gray-200 hover:shadow-sm transition-all"
                      >
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 size={18} className="text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          {title ? (
                            <>
                              <h4 className="font-bold text-xs sm:text-sm text-gray-900 leading-tight">
                                {title}
                              </h4>
                              <p className="text-[11px] sm:text-xs text-gray-500 font-normal mt-1 leading-snug">
                                {desc}
                              </p>
                            </>
                          ) : (
                            <p className="font-bold text-xs sm:text-sm text-gray-800 leading-tight">
                              {desc}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        }

        if (block.type === 'form') {
          return (
            <div key={block.id} className="container-custom py-8 sm:py-12">
              <div className="max-w-3xl mx-auto bg-[#FAF8F5] rounded-3xl shadow-xs overflow-hidden border border-gray-200/70">
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
    <div className="container-custom py-6 sm:py-8 relative group">
      <button 
        onClick={() => scroll('left')} 
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-900 p-3 rounded-full shadow-md border border-gray-100/80 hover:bg-gray-50 transition-all opacity-90 hover:opacity-100"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button 
        onClick={() => scroll('right')} 
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-900 p-3 rounded-full shadow-md border border-gray-100/80 hover:bg-gray-50 transition-all opacity-90 hover:opacity-100"
        aria-label="Next Slide"
      >
        <ChevronRight size={20} />
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
          shippingAddress: `${formData.get("address")}, ${formData.get("city")}`,
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
      <div className="p-10 sm:p-14 text-center h-full flex flex-col items-center justify-center bg-[#FAF8F5]">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-green-200/60">
          <CheckCircle2 className="text-green-600" size={40} />
        </div>
        <h3 className="font-editorial text-3xl font-black text-gray-900 mb-2">Order Confirmed!</h3>
        <p className="text-gray-600 text-sm sm:text-base max-w-sm">Thank you for your order. Our representative will contact you shortly to confirm your delivery.</p>
      </div>
    );
  }

  return (
    <div id="checkout-form" className="p-6 sm:p-10 md:p-12">
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-block bg-green-100 text-green-800 font-bold px-3.5 py-1 rounded-full text-[11px] tracking-wider uppercase mb-3 shadow-2xs border border-green-200">
          🚚 Free Delivery Nationwide
        </div>
        <h3 className="font-editorial text-3xl sm:text-4xl font-black text-gray-900 mb-1 tracking-tight">Order Now</h3>
        <p className="text-gray-500 font-medium text-sm sm:text-base">{productName}</p>
      </div>
      
      <div className="bg-white border border-gray-200/80 text-gray-900 font-bold text-center py-4 sm:py-5 rounded-2xl mb-6 flex flex-col justify-center items-center gap-1 shadow-xs">
        <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Total Payable</span>
        <div className="flex items-center gap-3">
          {originalPrice && (
            <span className="text-gray-400 line-through text-lg sm:text-xl">₦{originalPrice.toLocaleString()}</span>
          )}
          <span className="text-2xl sm:text-3xl text-primary font-black">₦{selectedOption.price.toLocaleString()}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <div className="space-y-1.5 w-full">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Select Package</label>
          <div className="relative">
            <select 
              value={selectedIndex}
              onChange={(e) => setSelectedIndex(Number(e.target.value))}
              className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white appearance-none font-bold text-gray-900 text-sm shadow-2xs"
            >
              {options.map((opt: any, idx: number) => (
                <option key={idx} value={idx}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Name</label>
            <input required name="name" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm shadow-2xs" placeholder="Full name" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Email</label>
            <input required name="email" type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm shadow-2xs" placeholder="Email address" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Phone Number</label>
            <input required name="phone" type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm shadow-2xs" placeholder="Active phone number" />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Street Address</label>
            <input required name="address" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm shadow-2xs" placeholder="Detailed delivery address" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">City / State</label>
            <input required name="city" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm shadow-2xs" placeholder="e.g. Ikeja, Lagos" />
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full mt-4 sm:mt-6 bg-primary hover:bg-primary-dark text-white font-bold text-sm sm:text-base py-4 sm:py-4.5 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-primary/25 flex items-center justify-center gap-2 hover:-translate-y-0.5"
        >
          {loading ? "Processing Order..." : (
            <>
              Complete Order – ₦{selectedOption.price.toLocaleString()}
            </>
          )}
        </button>

        {/* Conversion Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-gray-200/60">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-green-50 text-green-700 flex items-center justify-center shrink-0">
              <ShieldCheck size={14} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-900 leading-tight">100% Authentic</p>
              <p className="text-[10px] text-gray-500">Quality Guaranteed</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-accent/15 text-accent-dark flex items-center justify-center shrink-0">
              <Truck size={14} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-900 leading-tight">Fast Delivery</p>
              <p className="text-[10px] text-gray-500">Nationwide Delivery</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <RotateCcw size={14} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-900 leading-tight">Easy Returns</p>
              <p className="text-[10px] text-gray-500">Shop with Confidence</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
