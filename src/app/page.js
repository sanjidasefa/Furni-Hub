import Link from "next/link";
import CTASection from "../components/home/CTASection";
import { FeaturesSection } from "../components/home/FeaturesSection";
import HeroSection from "../components/home/HeroSection";
import HowItWorks from "../components/home/HowItWorks";
import ProductListingPage from "./product/page";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
   <>
  <HeroSection />
  <FeaturesSection />
  <section className="py-20 bg-white">
    <div className="container mx-auto px-6">
      <div className="mb-12 text-center md:text-left">
        <h2 className="text-3xl font-bold text-[#5D4037]">Our Collection</h2>
        <p className="text-stone-400 mt-2">Carefully curated pieces for your home.</p>
      </div>
      <ProductListingPage limit={6} />
      <div className="mt-16 flex justify-center">
        <Link href="/product">
          <Button
            variant="outline" 
            className="border-[#5D4037] text-[#5D4037] hover:bg-[#5D4037] hover:text-white px-10 py-6 rounded-full font-bold transition-all tracking-wide"
          >
            View All Collection .. 
          </Button>
        </Link>
      </div>
    </div>
  </section>

  <HowItWorks />
  <CTASection />
</>
  );
}
