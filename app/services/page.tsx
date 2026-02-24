import Navbar from "@/components/Navigation";
import OurServices from "@/components/Ourservices";
import ServicesSection from "@/components/ServicesSection";
import FamiliesTestimonies from "@/components/FamiliesTestimonies";
import CareAssessmentSection from "@/components/CareAssessmentSection";
import CardApproach from "@/components/CardApproach";
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
