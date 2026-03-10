import Navbar from "@/components/Navigation";
import ModernBookingForm from "@/components/ModernBookingForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with DAS Healthcare. We are here to answer your questions and provide the best care solutions for you or your loved ones.",
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <main className="relative">
        <Navbar />
        <div className="pt-20">
          <ModernBookingForm />
        </div>
      </main>
    </div>
  );
}
