import Navbar from "@/components/Navigation";
import OurServices from "@/components/Ourservices";
import ServicesSection from "@/components/ServicesSection";
import FamiliesTestimonies from "@/components/FamiliesTestimonies";
import CareAssessmentSection from "@/components/CareAssessmentSection";
import CardApproach from "@/components/CardApproach";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Domiciliary & Supported Living",
  description:
    "Explore our comprehensive healthcare services including Supported Living, Domiciliary Care, Learning Disabilities Support, and Live-in Care.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-gray-50 to-blue-50">
      <Navbar />
      <main className="relative">
        <OurServices />
        <ServicesSection />
       <CardApproach/>
        <FamiliesTestimonies />
        <CareAssessmentSection />
      </main>
    </div>
  );
}
