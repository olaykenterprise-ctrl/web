"use client";

import { useShopStore } from "@/lib/store";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
  const cart = useShopStore((state) => state.cart);
  const clearCart = useShopStore((state) => state.clearCart);
  const router = useRouter();
  
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
    // If cart is empty, redirect back to cart
    if (cart.length === 0) {
      router.push('/cart');
    }
  }, [cart.length, router]);

  if (!mounted || cart.length === 0) return null;

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 2500;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      clearCart();
      router.push('/checkout/success');
    }, 1500);
  };

  return (
    <div className="container-custom py-12 min-h-screen">
      <div className="mb-8">
        <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-4 transition">
          <ArrowLeft size={16} /> Back to Cart
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Secure Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Contact Info */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">First Name</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="John" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Last Name</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Doe" />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <input required type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="john@example.com" />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <input required type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="+234 800 000 0000" />
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Street Address</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="123 Main Street" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">City</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Lagos" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">State</label>
                  <select required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white">
                    <option value="">Select State</option>
                    <option value="lagos">Lagos</option>
                    <option value="abuja">Abuja (FCT)</option>
                    <option value="rivers">Rivers</option>
                    {/* Additional states can go here */}
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
                Payment Method
              </h2>
              <div className="space-y-3">
                <label className="flex items-center gap-4 p-4 border border-primary bg-primary/5 rounded-xl cursor-pointer">
                  <input type="radio" name="payment" value="pod" defaultChecked className="w-5 h-5 accent-primary" />
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">Pay on Delivery</div>
                    <div className="text-sm text-gray-500">Pay with cash or transfer when your order arrives.</div>
                  </div>
                </label>
                <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl cursor-not-allowed opacity-50">
                  <input type="radio" name="payment" value="card" disabled className="w-5 h-5 accent-primary" />
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 flex justify-between">
                      Online Payment (Coming Soon)
                    </div>
                    <div className="text-sm text-gray-500">Pay securely via Paystack or Flutterwave.</div>
                  </div>
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-primary text-white font-bold text-lg py-5 rounded-xl hover:bg-primary-dark transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-lg shadow-primary/20"
            >
              {isSubmitting ? (
                <>Processing Order...</>
              ) : (
                <>
                  <ShieldCheck size={24} /> Place Order 
                </>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-16 h-16 bg-white rounded-lg border border-gray-200 overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                    <span className="absolute -top-1 -right-1 bg-gray-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full z-10">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 text-sm">
                    <h4 className="font-medium text-gray-900 line-clamp-2">{item.name}</h4>
                    <div className="text-primary font-bold mt-1">₦{(item.price * item.quantity).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-3 text-sm text-gray-600 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-gray-900">₦{shipping.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-end">
                <span className="font-bold text-gray-900 text-lg">Total</span>
                <span className="text-2xl font-bold text-primary">₦{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-blue-50 text-blue-800 p-4 rounded-xl flex gap-3 text-sm">
              <Truck size={24} className="flex-shrink-0" />
              <p>Your order will be processed immediately. Estimated delivery: <strong>1-3 business days</strong>.</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
