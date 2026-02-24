import Navbar from "@/components/Navigation";
import ExtendedFamilyHero from "@/components/ExtendedApproach";
import GuildingPrinciples from "@/components/GuldingPrinciples";
import Transformative from "@/components/Transformative";
import Voice from "@/components/Voice";

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
