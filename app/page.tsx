import Navbar from "@/components/Navigation";
import Hero from "@/components/Hero";
import WhyChooseSection from "@/components/WhyChooseSection";
import FamiliesSection from "@/components/FamiliesSection";
import Services from "@/components/Services";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <WhyChooseSection />
      <FamiliesSection />
      <Services />
    </div>
  );
}
