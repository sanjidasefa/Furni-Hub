import CTASection from "../components/home/CTASection";
import { FeaturesSection } from "../components/home/FeaturesSection";
import HeroSection from "../components/home/HeroSection";
import HowItWorks from "../components/home/HowItWorks";
import ProductListingPage from "./product/page";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
     <ProductListingPage></ProductListingPage>
      <HowItWorks />
      <CTASection />
    </>
  );
}
