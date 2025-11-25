import { Suspense } from "react";
import Navbar from "@/components/Navigation";
import ContactHero from "@/components/Contact Hero";
import ContactForm from "@/components/FormContact";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#E3EFFF_30%,#F5F5F5_50%,#FFF5E6_100%)]">
      <main className="relative">
        <Navbar />
        <ContactHero />
        <Suspense
          fallback={
            <div className="w-full py-20 px-6 md:px-14">
              <div className="text-center">
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-10"></div>
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <div className="h-10 bg-gray-200 rounded"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-32 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        >
          <ContactForm />
        </Suspense>
      </main>
    </div>
  );
}
