import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";

export default function CheckoutSuccessPage() {
  const orderId = `OYK-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="container-custom py-20 min-h-[70vh] flex flex-col items-center justify-center text-center">
      <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-8 mx-auto shadow-lg shadow-green-100">
        <CheckCircle size={48} />
      </div>
      
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Order Confirmed!</h1>
      <p className="text-lg text-gray-600 mb-2 max-w-lg mx-auto">
        Thank you for your purchase. We've received your order and will begin processing it right away.
      </p>
      
      <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 my-8 inline-block">
        <p className="text-sm text-gray-500 mb-1">Your Order ID is</p>
        <p className="text-2xl font-bold text-gray-900 font-mono tracking-wider">{orderId}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/" className="bg-white border-2 border-gray-200 text-gray-700 font-bold py-3 px-8 rounded-xl hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2">
          <Package size={20} /> Track Order
        </Link>
        <Link href="/" className="bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
          Continue Shopping <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
