import { Truck, Wallet, RotateCcw, ShieldCheck, HeadphonesIcon } from "lucide-react";

export function FeaturesBanner() {
  const features = [
    {
      icon: <Truck size={24} className="text-primary" />,
      title: "Nationwide Delivery",
      subtitle: "1-3 Days in Major Cities"
    },
    {
      icon: <Wallet size={24} className="text-primary" />,
      title: "Pay on Delivery",
      subtitle: "Available"
    },
    {
      icon: <RotateCcw size={24} className="text-primary" />,
      title: "7 Days Return Policy",
      subtitle: "Easy & Hassle Free"
    },
    {
      icon: <ShieldCheck size={24} className="text-primary" />,
      title: "Secure Payments",
      subtitle: "100% Safe Transactions"
    },
    {
      icon: <HeadphonesIcon size={24} className="text-primary" />,
      title: "24/7 Customer Support",
      subtitle: "We're Here For You"
    }
  ];

  return (
    <div className="container-custom mb-8">
      <div className="flex overflow-x-auto hide-scrollbar gap-4 md:gap-0 md:justify-between items-center py-6 border-y border-gray-100">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-4 min-w-[200px] flex-shrink-0">
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
              {feature.icon}
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-900">{feature.title}</h4>
              <p className="text-[11px] text-gray-500">{feature.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
