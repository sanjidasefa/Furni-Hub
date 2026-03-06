import CTASection from "../components/home/CTASection";
import EventsSection from "../components/home/productSection";
import { FeaturesSection } from "../components/home/FeaturesSection";
import HeroSection from "../components/home/HeroSection";
import HowItWorks from "../components/home/HowItWorks";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <EventsSection />
      <HowItWorks />
      <CTASection />
    </>
  );
}
