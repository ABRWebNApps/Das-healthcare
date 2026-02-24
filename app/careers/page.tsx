import Navbar from "@/components/Navigation";
import JoinOurFamilySection from "@/components/Join";
import WhyJoinSection from "@/components/WhyJion";
import ApplicationProcess from "@/components/Application";
import Team from "@/components/Team";
import Trusted from "@/components/Trusted";
import Ready from "@/components/Ready";
import JobListings from "@/components/JobListings";

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#E3EFFF_30%,#F5F5F5_50%,#FFF5E6_100%)]">
      <main className="relative">
        <Navbar />
        <JoinOurFamilySection />
        <WhyJoinSection/>
        <ApplicationProcess />
        <JobListings />
        <Team />
        <Trusted  />
        <Ready />
      </main>
    </div>
  );
}
