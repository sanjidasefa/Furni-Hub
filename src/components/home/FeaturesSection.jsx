import { ShieldCheck, Truck, Clock, Woodic } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="size-8 text-orange-600" />,
    title: "Lifetime Warranty",
    description: "Our solid wood furniture is built to last for generations with premium durability."
  },
  {
    icon: <Truck className="size-8 text-orange-600" />,
    title: "Fast Delivery",
    description: "Safe and secure shipping to your doorstep within 3-5 business days."
  },
  {
    icon: <Clock className="size-8 text-orange-600" />,
    title: "24/7 Support",
    description: "Our dedicated furniture experts are always here to help you with your interior."
  },
  {
    icon: <Armchair className="size-8 text-orange-600" />, // Using Armchair as a wood/craft icon
    title: "Eco-Friendly",
    description: "We use 100% sustainable and ethically sourced timber for all our products."
  }
];

import { Armchair } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="mb-6 p-5 rounded-3xl bg-orange-50 transition-all group-hover:bg-orange-600 group-hover:scale-110">
                <div className="group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-black text-[#5D4037] mb-3">
                {feature.title}
              </h3>
              <p className="text-stone-500 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}