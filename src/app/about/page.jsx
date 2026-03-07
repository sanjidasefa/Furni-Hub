import { Card, CardContent } from "@/components/ui/card";
import { Hammer, Trees, Award } from "lucide-react";

const features = [
  {
    title: "Master Craftsmanship",
    description:
      "Every piece is hand-finished by expert artisans with decades of experience in traditional woodworking.",
    icon: Hammer,
  },
  {
    title: "Sustainable Sourcing",
    description:
      "We use 100% ethically sourced solid wood, ensuring our forests stay healthy for future generations.",
    icon: Trees,
  },
  {
    title: "Lifetime Quality",
    description:
      "Built to last. Our furniture combines timeless aesthetics with structural integrity that withstands years of use.",
    icon: Award,
  },
];

export default function AboutPage() {
  return (
    <section className="container mx-auto px-6 py-20 bg-[#FDFBF9]">
      <div className="max-w-4xl">
        <span className="text-orange-600 font-bold uppercase tracking-widest text-sm">
          Our Story
        </span>
        <h1 className="mt-3 text-4xl md:text-6xl font-black tracking-tight text-[#5D4037]">
          FurniHub: Where Art <br /> meets Wood.
        </h1>
        <p className="mt-6 text-lg text-stone-600 leading-relaxed">
          Founded in 2006, FurniHub started with a simple vision: to bring the warmth of 
          natural wood into every home. We believe that furniture isn't just a utility—it's 
          an inheritance. From small coffee tables to grand dining sets, we ensure 
          quality, soul, and elegance in every grain.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="rounded-[2.5rem] border-orange-50 bg-white shadow-xl shadow-orange-900/5 hover:border-orange-200 transition-all duration-300">
            <CardContent className="p-8">
              <div className="bg-orange-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="h-7 w-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-[#5D4037]">{feature.title}</h3>
              <p className="mt-3 text-stone-500 leading-relaxed text-sm">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="rounded-[3rem] overflow-hidden bg-stone-200 aspect-video relative shadow-2xl">

           <div className="absolute inset-0 flex items-center justify-center text-stone-400 font-medium italic">
             
           </div>
        </div>
        
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold text-[#5D4037]">Our Mission</h2>
          <p className="mt-6 text-stone-600 leading-relaxed">
            Our mission is to replace the "fast-furniture" culture with mindful, 
            long-lasting craftsmanship. By leveraging modern design techniques and 
            traditional joinery, we deliver products that prioritize the environment, 
            security, and an exceptional aesthetic experience for your living space.
          </p>
        </div>
      </div>
    </section>
  );
}