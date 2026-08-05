"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/db";
import { 
  Star, Truck, ShieldCheck, RefreshCw, CheckCircle2, 
  Minus, Plus, ShoppingCart, Zap, BatteryCharging, 
  Magnet, Monitor, ChevronDown, Check
} from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";

export function ProductClient({ product, relatedProducts }: { product: Product, relatedProducts: Product[] }) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedCapacity, setSelectedCapacity] = useState(
    product.variants?.find(v => v.name === "Capacity")?.options[1]?.value || "20000mAh"
  );
  const [selectedColor, setSelectedColor] = useState("Black");

  // Determine current price based on capacity selection (if variant exists)
  const capacityVariant = product.variants?.find(v => v.name === "Capacity");
  const currentPrice = capacityVariant 
    ? (capacityVariant.options.find((o: any) => o.value === selectedCapacity)?.price || product.price)
    : product.price;

  // Render Star Rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex text-[#FFC107]">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} className={i < Math.floor(rating) ? "fill-[#FFC107]" : "fill-gray-200 text-gray-200"} />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen pb-32 md:pb-12">
      {/* Mobile Sticky Tabs (Approximation for scroll functionality) */}
      <div className="md:hidden sticky top-0 bg-white z-40 border-b border-gray-100 flex justify-around text-sm font-bold">
        <a href="#overview" className="py-4 border-b-2 border-primary text-gray-900">Overview</a>
        <a href="#reviews" className="py-4 text-gray-400">Reviews ({product.reviews})</a>
        <a href="#qa" className="py-4 text-gray-400">Q&A</a>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-12" id="overview">
        
        {/* Top Buy Box Section */}
        <div className="flex flex-col md:flex-row gap-12 mb-16">
          
          {/* LEFT: Image Gallery */}
          <div className="w-full md:w-1/2 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails (Vertical on desktop, horizontal on mobile) */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:w-20 shrink-0 hide-scrollbar">
              {product.galleryImages?.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImage(i)}
                  className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${activeImage === i ? 'border-[#FFC107]' : 'border-transparent hover:border-gray-200'} bg-gray-50`}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${i+1}`} fill className="object-contain p-2" />
                </button>
              ))}
            </div>
            {/* Main Image */}
            <div className="relative flex-1 aspect-[4/5] bg-gray-50 rounded-3xl border border-gray-100 overflow-hidden flex items-center justify-center group">
              <Image 
                src={product.galleryImages?.[activeImage] || product.image} 
                alt={product.name} 
                fill 
                className="object-contain p-8 md:p-12 transition-transform duration-500"
              />
            </div>
          </div>

          {/* RIGHT: Product Details & Actions */}
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="mb-4">
              <span className="inline-block bg-[#FFC107] text-black text-xs font-black px-2 py-1 rounded">Best Seller</span>
            </div>
            
            <h1 className="text-2xl md:text-4xl font-black text-gray-900 leading-tight mb-4 tracking-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-3 mb-6 text-sm">
              {renderStars(product.rating)}
              <span className="font-bold text-gray-900">{product.rating} <span className="font-normal text-gray-500">({product.reviews} Reviews)</span></span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">Sold {product.soldCount}+</span>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-black text-gray-900">
                ₦{currentPrice.toLocaleString()}
              </span>
              {product.discountBadge && (
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  {product.discountBadge}
                </span>
              )}
            </div>
            {product.originalPrice && (
              <div className="text-gray-400 line-through text-lg mb-4">
                ₦{product.originalPrice.toLocaleString()}
              </div>
            )}

            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-bold">
                <div className="w-2 h-2 rounded-full bg-green-500"></div> In Stock
              </div>
              <span className="text-sm text-gray-500">Ships today</span>
            </div>

            <hr className="border-gray-100 mb-6" />

            {/* Variants */}
            {capacityVariant && (
              <div className="mb-6">
                <div className="text-sm font-bold text-gray-900 mb-3">Capacity: <span className="font-normal">{selectedCapacity}</span></div>
                <div className="flex flex-wrap gap-3">
                  {capacityVariant.options.map((opt: any) => (
                    <button
                      key={opt.value}
                      onClick={() => setSelectedCapacity(opt.value)}
                      className={`px-4 py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                        selectedCapacity === opt.value 
                          ? 'border-[#FFC107] text-gray-900 bg-[#FFC107]/5' 
                          : 'border-gray-200 text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      <div>{opt.value}</div>
                      <div className={`text-xs ${selectedCapacity === opt.value ? 'text-gray-900' : 'text-gray-400'}`}>
                        ₦{opt.price.toLocaleString()}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8">
              <div className="text-sm font-bold text-gray-900 mb-3">Color: <span className="font-normal">{selectedColor}</span></div>
              <div className="flex gap-3">
                {product.variants?.find(v => v.name === "Color")?.options.map((opt: any) => (
                  <button
                    key={opt.value}
                    onClick={() => setSelectedColor(opt.value)}
                    className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor === opt.value ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: opt.hex }}
                  >
                    {selectedColor === opt.value && opt.hex === '#000000' && <Check size={16} className="text-white" />}
                    {selectedColor === opt.value && opt.hex !== '#000000' && <Check size={16} className="text-black" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-6 mb-8">
              <span className="text-sm font-bold text-gray-900">Quantity</span>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors">
                  <Minus size={16} />
                </button>
                <div className="w-12 text-center font-bold text-gray-900">{quantity}</div>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors">
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex gap-4 mb-8">
              <button className="flex-1 bg-[#FFC107] hover:bg-[#F59E0B] text-black font-black text-lg py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-yellow-500/20 hover:-translate-y-1">
                <ShoppingCart size={20} /> Add to Cart
              </button>
              <button className="flex-1 bg-black hover:bg-gray-900 text-white font-black text-lg py-4 rounded-2xl flex items-center justify-center gap-2 transition-all hover:-translate-y-1">
                <Zap size={20} className="fill-white" /> Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-6 border-y border-gray-100">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck size={24} strokeWidth={1.5} className="text-gray-700" />
                <span className="text-xs font-medium text-gray-600">Nationwide<br/>Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck size={24} strokeWidth={1.5} className="text-gray-700" />
                <span className="text-xs font-medium text-gray-600">Secure<br/>Payment</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RefreshCw size={24} strokeWidth={1.5} className="text-gray-700" />
                <span className="text-xs font-medium text-gray-600">7 Days<br/>Returns</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <CheckCircle2 size={24} strokeWidth={1.5} className="text-gray-700" />
                <span className="text-xs font-medium text-gray-600">Genuine<br/>Product</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Features & Details */}
        <div className="space-y-12">
          
          {/* Key Features Banner */}
          {product.keyFeatures && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 md:p-8 bg-gray-50 rounded-3xl border border-gray-100">
              {product.keyFeatures.map((feat: any, i: number) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm shrink-0">
                    {feat.icon === 'Zap' && <Zap size={24} className="text-gray-700" />}
                    {feat.icon === 'Magnet' && <Magnet size={24} className="text-gray-700" />}
                    {feat.icon === 'BatteryCharging' && <BatteryCharging size={24} className="text-gray-700" />}
                    {feat.icon === 'Monitor' && <Monitor size={24} className="text-gray-700" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{feat.title}</h4>
                    <p className="text-xs text-gray-500">{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Rich Content Banner */}
          {product.richContent && (
            <div className="bg-gray-100 rounded-3xl overflow-hidden relative min-h-[400px] flex items-center">
              <Image src={product.richContent.image} alt={product.richContent.heading} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50/90 to-transparent"></div>
              <div className="relative z-10 p-8 md:p-16 max-w-xl">
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight tracking-tight">
                  {product.richContent.heading}
                </h2>
                <p className="text-lg text-gray-700 mb-8 font-medium">
                  {product.richContent.subheading}
                </p>
                <div className="flex gap-6">
                  {product.richContent.audiences.map((aud: any, i: number) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full border border-gray-200 bg-white/50 backdrop-blur flex items-center justify-center">
                        <CheckCircle2 size={20} className="text-gray-700" />
                      </div>
                      <span className="text-xs font-bold text-gray-800">{aud.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Specs & What's in the Box */}
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-black text-gray-900 mb-6">Product Specifications</h3>
              <div className="border border-gray-100 rounded-2xl overflow-hidden">
                {product.specifications && Object.entries(product.specifications).map(([key, value], i) => (
                  <div key={key} className={`flex py-3 px-4 ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <div className="w-1/3 text-sm font-bold text-gray-600">{key}</div>
                    <div className="w-2/3 text-sm text-gray-900">{value as string}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-black text-gray-900 mb-6">What's in the Box</h3>
              <div className="bg-gray-50 rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-8 border border-gray-100 h-[calc(100%-3rem)]">
                <ul className="space-y-4 flex-1">
                  {product.whatsInTheBox?.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm font-bold text-gray-700">
                      <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="w-40 h-40 relative shrink-0">
                  <Image src={product.image} alt="In the box" fill className="object-contain drop-shadow-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews (Mocked based on image) */}
        <div className="mt-20 pt-16 border-t border-gray-100" id="reviews">
          <h2 className="text-2xl font-black text-gray-900 mb-10">Customer Reviews</h2>
          <div className="grid md:grid-cols-[300px_1fr] gap-12">
            {/* Rating Summary */}
            <div>
              <div className="text-6xl font-black text-gray-900 mb-2">{product.rating}</div>
              <div className="mb-4">{renderStars(product.rating)}</div>
              <p className="text-sm text-gray-500 mb-8">Based on {product.reviews} reviews</p>
              
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map(stars => {
                  const percent = stars === 5 ? 82 : stars === 4 ? 13 : stars === 3 ? 4 : stars === 2 ? 1 : 0;
                  return (
                    <div key={stars} className="flex items-center gap-3">
                      <span className="text-sm font-bold text-gray-500 w-3">{stars}</span>
                      <Star size={12} className="fill-[#FFC107] text-[#FFC107]" />
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#FFC107] rounded-full" style={{ width: `${percent}%` }}></div>
                      </div>
                      <span className="text-xs text-gray-400 w-8 text-right">{percent}%</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Review Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { name: "Chinedu O.", text: "This powerbank is a beast! Charges my phone almost 3 times. The magnetic hold is very strong.", days: "2 days ago", img: product.image },
                { name: "Ameka E.", text: "Sleek design, fast charge and very portable. Perfect for my daily content creation.", days: "5 days ago", img: product.image },
              ].map((rev, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">{rev.name[0]}</div>
                      <div>
                        <div className="font-bold text-gray-900 text-sm">{rev.name}</div>
                        <div className="text-xs text-green-600 flex items-center gap-1"><CheckCircle2 size={10} /> Verified Buyer</div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{rev.days}</span>
                  </div>
                  <div className="mb-3">{renderStars(5)}</div>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">{rev.text}</p>
                  <div className="w-20 h-20 relative rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                    <Image src={rev.img} alt="Review photo" fill className="object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cross Sell Section */}
        <div className="mt-20">
          <h2 className="text-xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map(rp => (
              <ProductCard key={rp.id} {...rp} />
            ))}
          </div>
        </div>

      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 flex items-center gap-3 shadow-2xl">
        <button className="flex flex-col items-center justify-center text-gray-500 px-2">
          <ShoppingCart size={20} />
          <span className="text-[10px] font-bold mt-1">Store</span>
        </button>
        <button className="flex-1 bg-[#FFC107] text-black font-black py-3 rounded-xl flex items-center justify-center gap-2">
           Add to Cart
        </button>
        <button className="flex-1 bg-black text-white font-black py-3 rounded-xl flex items-center justify-center gap-2">
           <Zap size={16} className="fill-white" /> Buy Now
        </button>
      </div>
    </div>
  );
}
