import Navbar from "@/components/Navigation";
import About from "@/components/AboutHero";
import AboutUs from "@/components/AboutUs";
import AboutSection from "@/components/AboutSections";
import WhoWeServe from "@/components/Serve";
import MeetOurTeam from "@/components/Management";
import JoinOurTeamCard from "@/components/JoinCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about DAS Healthcare, our mission, vision, and the dedicated team providing compassionate domiciliary care.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-#E3EFFF">
      <main className="relative">
        <Navbar />
        <About/>
        <AboutUs/>
        <AboutSection/>
        <WhoWeServe />
        <MeetOurTeam />
        <JoinOurTeamCard />
      </main>
    </div>
  );
}
