import React from "react";
import WorldImpactSection from "./Components/WorldImpactSection";
import TrustedSection from "./Components/TrustedSelection";
import HeroSection from "./Components/HeroSection";
import FeaturesSection from "./Components/FeaturesSection";
import HowItWorksSection from "./Components/HowitsWorkSection";

export default function page() {
  return (
    <div>
      <HeroSection />
      <TrustedSection />
      <WorldImpactSection />
      <FeaturesSection /> 
      <HowItWorksSection />
    </div>
  );
}
