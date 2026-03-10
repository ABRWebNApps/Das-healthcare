import Navbar from "@/components/Navigation";
import ExtendedFamilyHero from "@/components/ExtendedApproach";
import GuildingPrinciples from "@/components/GuldingPrinciples";
import Transformative from "@/components/Transformative";
import Voice from "@/components/Voice";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Approach | Person-Centered Care",
  description:
    "Learn about our person-centered approach to healthcare. We tailor our services to respect individual choices, privacy, and dignity at all times.",
};

export default function ApproachPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-grey-50 to-blue-50">
      <Navbar />
      <ExtendedFamilyHero />
      <GuildingPrinciples />
      <Transformative />
      <Voice />
    </div>
  );
}
