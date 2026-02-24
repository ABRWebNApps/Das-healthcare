import Navbar from "@/components/Navigation";
import FamiliesHero from "@/components/FamiliesHero";
import Commitment from "@/components/Commitment";
import RegisteredAndTrusted from "@/components/Registered";

export default function FamiliesPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#E3EFFF_50%,#F5F5F5_30%,#FFF5E6_100%)]">
      <main className="relative">
        <Navbar />
        <FamiliesHero />
        <Commitment />  
        <RegisteredAndTrusted />
      </main>
    </div>
  );
}
