"use client";

import { useShopStore } from "@/lib/store";
import Link from "next/link";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CartPage() {
  const cart = useShopStore((state) => state.cart);
  const removeFromCart = useShopStore((state) => state.removeFromCart);
  const updateQuantity = useShopStore((state) => state.updateQuantity);
  
  // Prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = cart.length > 0 ? 2500 : 0; // Flat mock shipping rate
  const total = subtotal + shipping;

  return (
    <div className="container-custom py-12 min-h-[60vh]">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-2xl border border-gray-100 text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
            <ShoppingBag size={32} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8 max-w-sm">Looks like you haven't added anything to your cart yet. Let's change that!</p>
          <Link href="/" className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-dark transition-colors">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm gap-4">
                <div className="relative w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="object-contain p-2"
                  />
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <Link href={`/product/${item.slug}`} className="font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2">
                    {item.name}
                  </Link>
                  <div className="text-primary font-bold mt-1">₦{item.price.toLocaleString()}</div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-2 text-gray-500 hover:bg-gray-100 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-4 py-2 text-sm font-semibold border-x border-gray-200 min-w-[3rem] text-center">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-2 text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-sm text-gray-600 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="font-semibold text-gray-900">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Estimate</span>
                  <span className="font-semibold text-gray-900">₦{shipping.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-gray-900">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary">₦{total.toLocaleString()}</span>
                    <p className="text-[10px] text-gray-500 mt-1">VAT included where applicable</p>
                  </div>
                </div>
              </div>
              
              <Link href="/checkout" className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 group">
                Proceed to Checkout <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}
