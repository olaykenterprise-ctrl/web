import { Tag, ShieldCheck, Truck, Lock, Users, RotateCcw } from "lucide-react";

export function WhyShopWithUs() {
  const reasons = [
    {
      icon: <Tag size={24} className="text-primary" />,
      title: "Affordable Prices",
      subtitle: "Best deals in Nigeria"
    },
    {
      icon: <ShieldCheck size={24} className="text-primary" />,
      title: "Genuine Quality Products",
      subtitle: "Tested & Trusted"
    },
    {
      icon: <Truck size={24} className="text-primary" />,
      title: "Fast & Reliable Delivery",
      subtitle: "To All States"
    },
    {
      icon: <Lock size={24} className="text-primary" />,
      title: "Secure Payments",
      subtitle: "100% Safe Transactions"
    },
    {
      icon: <Users size={24} className="text-primary" />,
      title: "Happy Customers",
      subtitle: "Join Thousands of Happy Buyers"
    },
    {
      icon: <RotateCcw size={24} className="text-primary" />,
      title: "7 Days Return Policy",
      subtitle: "Easy & Hassle Free"
    }
  ];

  return (
    <div className="bg-gray-50 py-12 mb-12">
      <div className="container-custom">
        <h2 className="text-xl font-bold uppercase tracking-tight text-gray-900 mb-8">Why Shop With Olaykenterprise?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <div key={index} className="flex items-center gap-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center flex-shrink-0 border border-purple-100">
                {reason.icon}
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">{reason.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{reason.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
