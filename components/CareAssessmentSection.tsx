"use client";
import { useRouter } from "next/navigation";
import { Shield } from "lucide-react";


export default function CareAssessmentSection() {
  const router = useRouter();
  return (
    <section className="py-20 flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm px-6 sm:px-8 md:px-10 py-10 sm:py-12 flex flex-col lg:flex-row justify-between items-center gap-6 sm:gap-8">
          {/* Left Text Section */}
          <div className="max-w-md text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-snug">
              Ready to <br className="hidden sm:block" /> Experience <br className="hidden sm:block" /> Compassionate <br className="hidden sm:block" /> Care?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-5 sm:mb-7 leading-relaxed">
              Contact us today to discuss your unique needs <br className="hidden sm:block" /> and discover how we can make a difference. <br className="hidden sm:block" /> Our team is here to support
              you every step of the way.
            </p>
            <button
          onClick={() => router.push("/contact")}
          className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Request a Care Assessment
        </button>
          </div>

          {/* Right BRN Section */}
          <div className="bg-blue-50 rounded-xl px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-2 sm:gap-3 mt-6 lg:mt-0">
            <div className="flex items-center justify-center bg-blue-100 p-1 rounded-full">
              <Shield className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="text-gray-800 font-medium text-xs sm:text-sm md:text-base text-center sm:text-left">
              <p>BRN: <span className="font-semibold">14651663</span></p>
              <p>CQC: <span className="font-semibold">CRT1-24768607163</span></p>
              <p>Provider ID: <span className="font-semibold">1-20631585417</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
