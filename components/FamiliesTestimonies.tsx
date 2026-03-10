"use client";

import Image from "next/image";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      text: "Jide Bankole is an exceptional nurse and educator who demonstrated outstanding professionalism and dedication during our time working together in Botswana during the COVID-19 pandemic. His expertise, compassion, and ability to educate others made a significant impact on our team.",
      name: "Rejoice Gbologah",
      position: "Critical Care Nurse, Ghana",
      image: "/Client-1.jpg",
    },
    {
      id: 2,
      text: "I would like to acknowledge my colleague Jide for his consistent professionalism, teamwork, and dedication. He always communicate clearly, support the team when needed and is an outstanding nurse. His reliability and positive attitude makes a meaningful contribution to work environment. I have always enjoyed working with him.",
      name: "Agnes Stansfeld",
      position: "RN, ITU Nurse, London, UK",
      image: "/Client-2.jpg",
    },
    {
      id: 3,
      text: "I had the privilege of working with Olutoyin when she served as a deputy manager in a domiciliary care service in Leeds, working closely alongside the registered manager. She consistently demonstrated exceptional leadership and a deep commitment to high-quality, person-centred care. I witnessed her bring tender, thoughtful support to our care-at-home services, always striving to ensure that people receiving care felt safe, valued, and happy in the comfort of their own homes. She is hands-on, compassionate, and leads by example, whether supporting clients and their families or managing the wider team. Her humility, dedication, and genuine heart for service make her a standout leader and an asset to any organisation.",
      name: "Christy A.",
      position: "Colleague",
      image: "/Client-3.jpg",
    },
    {
      id: 4,
      text: "All through the time I worked with Olutoyin as a deputy manager in residential support care, she proved to be an outstanding leader and support worker. She brought a level of tenderness, empathy, and professionalism that deeply impacted both residents and staff. Her leadership style is grounded in compassion and active involvement, always prioritising the needs of those in her care. Olutoyin’s dedication, humility, and ability to inspire others truly set her apart.",
      name: "Leslie S.",
      position: "Colleague",
      image: "/Client-4.jpg",
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
