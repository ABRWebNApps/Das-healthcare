import Navbar from "@/components/Navigation";
import JoinOurFamilySection from "@/components/Join";
import WhyJoinSection from "@/components/WhyJion";
import ApplicationProcess from "@/components/Application";
import Team from "@/components/Team";
import Trusted from "@/components/Trusted";
import Ready from "@/components/Ready";
import JobListings from "@/components/JobListings";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers & Jobs",
  description:
    "Join the DAS Healthcare team. Browse our current job openings and start a rewarding career in domiciliary care and supported living.",
};

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
