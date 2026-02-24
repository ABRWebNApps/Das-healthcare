"use client";

import { useRouter } from "next/navigation";
export default function RegisteredAndTrusted() {
  const router = useRouter();
  return (
    <section className="flex justify-center items-start py-16 px-4">
      <div className="w-full max-w-3xl">
        {/* Heading outside/top of the card */}
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
          Registered and Trusted
        </h2>

        {/* Card */}
        <div className="bg-sky-50 w-full rounded-2xl shadow-sm p-8 md:p-10 text-center">
          {/* Registration Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            <span className="inline-block bg-sky-600 text-white font-semibold text-sm md:text-sm px-4 py-2 rounded-full">
              BRN: 14651663
            </span>
            <span className="inline-block bg-sky-600 text-white font-semibold text-sm md:text-sm px-4 py-2 rounded-full">
              CQC: CRT1-24768607163
            </span>
            <span className="inline-block bg-sky-600 text-white font-semibold text-sm md:text-sm px-4 py-2 rounded-full">
              Provider ID: 1-20631585417
            </span>
          </div>

          {/* Paragraph */}
          <p className="text-gray-700 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-6">
            DAS Healthcare Providers is fully registered and compliant with all
            regulatory standards, ensuring the highest level of professional care
            and accountability for your peace of mind.
          </p>

          {/* Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => router.push("/contact")}
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm md:text-base py-2.5 px-6 md:px-8 rounded-full transition-transform duration-150"
            >
              Get Started with an Assessment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
