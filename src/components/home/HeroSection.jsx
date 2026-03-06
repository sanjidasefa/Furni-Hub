import { ArrowRight, Armchair, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 bg-[#FDFBF9] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-5%] w-72 h-72 bg-orange-100/50 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-stone-200/40 rounded-full blur-3xl opacity-60" />

      <div className="text-center max-w-4xl relative z-10">
        {/* Animated Badge */}
        <Badge
          variant="outline"
          className="rounded-full py-1.5 px-4 border-orange-200 bg-orange-50 text-orange-700 font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000"
          asChild
        >
          {/* Linked to /product instead of /new-arrivals */}
          <Link href="/product" className="flex items-center gap-2 group">
            ✨ New Spring Collection 2026 
            <ArrowRight className="ml-1 size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Badge>

        {/* Hero Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#5D4037] leading-[1.1]">
          Elevate Your <span className="text-orange-600">Living</span> Space
        </h1>

        {/* Hero Description */}
        <p className="mt-8 text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Discover hand-crafted solid wood furniture designed for comfort and built for generations. 
          Experience the perfect blend of modern aesthetics and timeless craftsmanship.
        </p>

        {/* Action Buttons */}
       <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
  <Button 
    className="w-full sm:w-auto h-16 rounded-full bg-orange-600 hover:bg-orange-700 text-white text-lg px-10 shadow-xl shadow-orange-200 transition-all hover:scale-105 active:scale-95 border-none"
    asChild
  >
    <Link href="/product" className="flex items-center gap-2 font-bold">
      <ShoppingBag className="size-5" /> 
      <span>Shop Now</span>
    </Link>
  </Button>
  <Button
    variant="outline"
    className="w-full sm:w-auto h-16 rounded-full border-2 border-orange-200 text-[#5D4037] hover:bg-orange-50 hover:border-orange-300 text-lg px-10 shadow-none transition-all hover:scale-105 active:scale-95 bg-transparent"
    asChild
  >
    <Link href="/product" className="flex items-center gap-2 font-bold">
      <Armchair className="size-5" /> 
      <span>View Lookbook</span>
    </Link>
  </Button>
</div>
        <div className="mt-16 flex items-center justify-center gap-8 border-t border-orange-100 pt-8">
            <div className="text-center">
                <p className="text-2xl font-bold text-[#5D4037]">15k+</p>
                <p className="text-sm text-stone-500 font-medium">Happy Homes</p>
            </div>
            <div className="w-px h-10 bg-orange-100 hidden sm:block" />
            <div className="text-center">
                <p className="text-2xl font-bold text-[#5D4037]">20+</p>
                <p className="text-sm text-stone-500 font-medium">Years Experience</p>
            </div>
            <div className="w-px h-10 bg-orange-100 hidden sm:block" />
            <div className="text-center">
                <p className="text-2xl font-bold text-[#5D4037]">100%</p>
                <p className="text-sm text-stone-500 font-medium">Solid Wood</p>
            </div>
        </div>
      </div>
    </section>
  );
}