"use client";

import Image from "next/image";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      text: "Having collaborated with Olajide in various healthcare settings, I've consistently been impressed by his clinical expertise and transformative leadership. His commitment to delivering exceptional care while developing nursing teams is outstanding.",
      name: "Sarah Lewis, RN",
      position: "Nurse Manager, NHS Trust",
      image: "/Parent-client.jpg",
    },
    {
      id: 2,
      text: "Olajide's strategic vision and compassionate approach to healthcare leadership have made a significant impact. His ability to combine clinical excellence with emotional intelligence and regulatory knowledge is truly exceptional.",
      name: "Michael Roberts, RN",
      position: "Senior Clinical Nurse",
      image: "/Client2.jpg",
    },
    {
      id: 3,
      text: "Working alongside Olajide has been a privilege. His problem-solving skills, excellent communication, and dedication to professional development make him an exemplary healthcare leader and educator.",
      name: "Rosaline Thompson, RN",
      position: "Clinical Educator",
      image: "/Client-daughter.jpg",
    },
  ];

  return (
    <section className="py-12 g-gradient-to-br from-sky-50 via-gray-50 to-blue-50">
      <h2 className="text-center text-4xl font-semibold text-gray-900 mb-10">
        What Our Colleagues Say
      </h2>

      <div className="flex flex-wrap justify-center gap-6 px-6">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="w-full max-w-[250px] bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between"
          >
            <p className="text-gray-700 text-base leading-relaxed mb-6">
              “{item.text}”
            </p>

            <div className="flex items-center gap-3 mt-auto">
              <Image
                src={item.image}
                alt={item.name}
                width={50}
                height={50}
                className="rounded-full object-cover"
              />
              <div>
                <h3 className="text-gray-900 font-semibold">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.position}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
