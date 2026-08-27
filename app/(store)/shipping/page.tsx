import { Truck, MapPin, Clock, ShieldCheck } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="container-custom py-16 max-w-4xl min-h-[60vh]">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Shipping & Delivery</h1>
      
      <div className="prose prose-lg prose-purple max-w-none">
        <p className="text-xl text-gray-600 mb-12 leading-relaxed">
          We know you need your tech accessories fast. That's why we've partnered with reliable logistics providers to ensure your orders get to you safely and on time, no matter where you are in Nigeria.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full flex items-start justify-end p-4">
              <MapPin size={24} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Lagos Deliveries</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex gap-2"><Clock size={20} className="text-accent flex-shrink-0" /> <strong>Standard Delivery:</strong> 1-2 Business Days</li>
              <li className="flex gap-2"><Truck size={20} className="text-accent flex-shrink-0" /> <strong>Same Day Delivery:</strong> Available for orders placed before 10 AM (Island & Mainland)</li>
              <li className="flex gap-2"><ShieldCheck size={20} className="text-accent flex-shrink-0" /> <strong>Fee:</strong> Calculated at checkout based on exact location</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full flex items-start justify-end p-4">
              <Truck size={24} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Nationwide Deliveries</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex gap-2"><Clock size={20} className="text-accent flex-shrink-0" /> <strong>Standard Delivery:</strong> 3-5 Business Days</li>
              <li className="flex gap-2"><MapPin size={20} className="text-accent flex-shrink-0" /> <strong>Coverage:</strong> All 36 States including FCT</li>
              <li className="flex gap-2"><ShieldCheck size={20} className="text-accent flex-shrink-0" /> <strong>Logistics Partners:</strong> GIG Logistics, DHL, and local dispatch</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Order Tracking</h2>
        <p className="text-gray-700 mb-6">
          Once your order has been dispatched, you will receive an email and SMS with your tracking number. You can use this number on our partner logistics website to track the exact location of your package in real-time.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Missing or Damaged Packages</h2>
        <p className="text-gray-700 mb-6">
          In the rare event that your package is missing or arrives damaged, please contact our support team within 24 hours of the expected delivery date. Make sure to take clear photos of any damaged packaging before opening.
        </p>
      </div>
    </div>
  );
}
