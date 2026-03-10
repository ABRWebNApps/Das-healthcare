import Navbar from "@/components/Navigation";
import Hero from "@/components/Hero";
import WhyChooseSection from "@/components/WhyChooseSection";
import FamiliesSection from "@/components/FamiliesSection";
import Services from "@/components/Services";
import Script from "next/script";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "DAS Healthcare Providers",
    image: "https://dascareproviders.com/newlogo.png",
    "@id": "https://dascareproviders.com",
    url: "https://dascareproviders.com",
    telephone: "02036216242",
    email: "admin@dascareproviders.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "9, Arcus Road",
      addressLocality: "Bromley",
      addressRegion: "Kent",
      postalCode: "BR1 4NN",
      addressCountry: "UK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.3965,
      longitude: 0.0163,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    priceRange: "$$",
    description: "Expert domiciliary care and supported living services in Kent and surrounding areas.",
  };

  return (
    <div>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <Hero />
      <WhyChooseSection />
      <FamiliesSection />
      <Services />
    </div>
  );
}
