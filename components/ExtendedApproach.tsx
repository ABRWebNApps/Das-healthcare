"use client";
import { useRouter } from "next/navigation";

export default function ExtendedFamilyHero() {
  const router = useRouter();
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] px-6 py-16 bg-[#E9F4FB] text-center">
      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 mb-6 leading-tight">
          Our Extended Family <br className="hidden sm:block" />
          Approach to Care
        </h1>

        <p className="text-gray-700 text-base sm:text-lg mb-8 leading-relaxed">
          At{" "}
          <span className="font-semibold text-gray-800">
            DAS HEALTHCARE PROVIDERS
          </span>
          , we believe in creating a supportive, <br />
          nurturing environment that extends beyond traditional care. We treat
          every <br /> individual as part of our extended family, fostering deep
          connections and <br /> personalised support tailored to their unique
          needs.
        </p>

        <button 
        onClick={() => router.push("/contact")}
        className="bg-[#0098DB] text-white font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300">
          Request a Care Assessment
        </button>
      </div>
    </section>
  );
}
