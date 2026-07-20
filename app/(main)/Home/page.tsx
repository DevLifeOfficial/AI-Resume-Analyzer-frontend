
import WorldImpactSection from "./Components/WorldImpactSection";
import TrustedSection from "./Components/TrustedSelection";
import HeroSection from "./Components/HeroSection";
import FeaturesSection from "./Components/FeaturesSection";
import HowItWorksSection from "./Components/HowitsWorkSection";
import LiveDemoSection from "./Components/LiveDemoSection";
import TestimonialsSection from "./Components/TestimonialsSection";
import PricingSection from "./Components/PricingSection";
import CtaSection from "./Components/CtaSection";

export default function page() {
  return (
    <div>
      <HeroSection />
      <TrustedSection />
      <WorldImpactSection />
      <FeaturesSection /> 
      <HowItWorksSection />
      <LiveDemoSection/>
      <TestimonialsSection/>
      <PricingSection/>
      <CtaSection/>
    </div>
  );
}
