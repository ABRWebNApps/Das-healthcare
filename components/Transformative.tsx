"use client";

import Image from "next/image";

export default function ExtendedFamilyImpact() {
  return (
    <section className="flex justify-center items-center bg-white py-16 px-6">
      {/* Card Container */}
  <div className="bg-gray-100 rounded-3xl shadow-sm py-10 px-10 w-full max-w-[870px] min-h-[480px] flex flex-col md:flex-row items-center gap-10">
        {/* Left Text Section */}
        <div className="flex-1 space-y-5">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            The <br/> Transformative <br/>
            Impact of Our <br/>
            Extended Family <br/>
            Approach
          </h2>

          <p className="text-gray-800 leading-relaxed">
            Our unique "Extended Family" approach goes <br/>
            beyond standard care. It fosters genuine <br/>
            connections, promoting emotional well-being, <br/>
            social engagement, and personal development <br/>
            for every individual. We consistently see <br/> 
            improved outcomes, increased confidence, and a <br/>
            profound sense of belonging.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Families consistently report peace of mind, <br/>
            knowing their loved ones are thriving in an <br/>
            environment built on trust, respect, and <br/>
            unconditional support. This holistic model not <br/>
            only enhances daily life but also builds lasting <br/>
            memories and a resilient community for all.
          </p>
        </div>

        {/* Right Image Section */}
        <div className="group relative w-[320px] md:w-[380px] flex-shrink-0 overflow-hidden rounded-2xl aspect-[16/10] hover:scale-105 transition-transform duration-300">
          <Image
            src="/Transformative.jpg"
            alt="Extended Family"
            fill
            className="object-cover object-center filter brightness-75 group-hover:brightness-100 transition-all duration-300"
            style={{ objectPosition: 'center' }}
            priority
          />
        </div>
      </div>
    </section>
  );
}
