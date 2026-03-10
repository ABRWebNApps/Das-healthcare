import Navbar from "@/components/Navigation";
import OurServices from "@/components/Ourservices";
import ServicesSection from "@/components/ServicesSection";
import FamiliesTestimonies from "@/components/FamiliesTestimonies";
import CareAssessmentSection from "@/components/CareAssessmentSection";
import CardApproach from "@/components/CardApproach";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Our Services | Domiciliary & Supported Living",
  description:
    "Explore our comprehensive healthcare services including Supported Living, Domiciliary Care, Learning Disabilities Support, and Live-in Care.",
};

export default function ServicesPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is domiciliary care?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Domiciliary care refers to a range of services put in place to support an individual in their own home. DAS Healthcare provides personal care, household tasks, and companionship to help you maintain your independence.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer supported living arrangements?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we specialize in Supported Living. We empower individuals with learning disabilities, mental health conditions, and complex needs to live as independently as possible in a home environment with tailored daily assistance.",
        },
      },
      {
        "@type": "Question",
        name: "Can I receive live-in care?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. DAS Healthcare offers 24/7 dedicated live-in care, providing continuous support and companionship for round-the-clock peace of mind.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-gray-50 to-blue-50">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
