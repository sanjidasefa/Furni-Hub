import { UserCheck, Armchair, Truck } from "lucide-react";

const steps = [
  {
    title: "Create Account",
    description: "Sign up securely to save your favorite designs and track your orders.",
    icon: <UserCheck className="h-8 w-8 text-orange-600" />,
  },
  {
    title: "Choose Furniture",
    description: "Browse our premium hand-crafted collections and customize your pieces.",
    icon: <Armchair className="h-8 w-8 text-orange-600" />,
  },
  {
    title: "Expert Delivery",
    description: "Our team will deliver and assemble your furniture with expert care.",
    icon: <Truck className="h-8 w-8 text-orange-600" />,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-[#FDFBF9]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#5D4037]">
            Simple <span className="text-orange-600">3 Steps</span> to Your Dream Home
          </h2>
          <p className="mt-4 text-stone-500 max-w-xl mx-auto">
            Experience a seamless journey from selecting premium wood furniture to expert assembly in your living room.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid gap-10 md:grid-cols-3 relative">
          {/* Subtle connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-orange-100 -z-10" />

          {steps.map((step, i) => (
            <div 
              key={i} 
              className="group relative rounded-[2.5rem] border border-orange-50 bg-white p-10 hover:shadow-2xl hover:shadow-orange-900/5 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Step Number Badge */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#5D4037] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                0{i + 1}
              </div>

              {/* Icon Holder */}
              <div className="mb-6 inline-flex p-4 rounded-2xl bg-orange-50 group-hover:bg-orange-100 transition-colors">
                {step.icon}
              </div>

              <h3 className="text-xl font-bold text-[#5D4037] mb-3">{step.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}