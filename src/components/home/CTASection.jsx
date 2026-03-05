import { Button } from "@/components/ui/button";
import { Armchair, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-24 bg-[#FDFBF9]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#5D4037] p-12 md:p-20 text-center shadow-2xl shadow-orange-900/20">
          <Armchair className="absolute -bottom-10 -left-10 h-64 w-64 text-white/5 -rotate-12 pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Ready to Upgrade Your <span className="text-orange-400">Dream Home?</span>
            </h2>
            
            <p className="mt-6 text-orange-50/80 text-lg md:text-xl font-light">
              Discover our exclusive collection of hand-crafted solid wood furniture. 
              Get <span className="font-semibold text-orange-300 underline decoration-2 underline-offset-4">15% OFF</span> on your first order.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="xl" 
                className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-10 py-7 text-lg shadow-lg shadow-orange-950/20 transition-all hover:scale-105"
                asChild
              >
                <Link href="/shop" className="flex items-center gap-2">
                  Shop the Collection <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="xl" 
                className="border-white/20 text-white hover:bg-white/10 rounded-full px-10 py-7 text-lg backdrop-blur-sm"
                asChild
              >
                <Link href="/contact">View Showrooms</Link>
              </Button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-transparent rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
}