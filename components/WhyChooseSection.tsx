import {
  Heart,
  Users,
  Lightbulb,
  BookOpen,
  ShieldCheck,
  Award,
} from "lucide-react";

const features = [
  {
    icon: <Heart className="w-10 h-10 text-blue-500 mx-auto mb-4" />,
    title: "Compassionate Approach",
    text: "We believe in fostering an environment of warmth and understanding, treating every individual with kindness and respect.",
  },
  {
    icon: <Users className="w-10 h-10 text-blue-500 mx-auto mb-4" />,
    title: "Extended Group Ethos",
    text: "Our care model extends beyond traditional services, creating a supportive family-like atmosphere for clients and their families.",
  },
  {
    icon: <Lightbulb className="w-10 h-10 text-blue-500 mx-auto mb-4" />,
    title: "Personalised Care Plans",
    text: "Each care plan is uniquely tailored to the individual's needs, preferences, and goals, promoting independence and well-being.",
  },
  {
    icon: <BookOpen className="w-10 h-10 text-blue-500 mx-auto mb-4" />,
    title: "Expert & Dedicated Staff",
    text: "Our team comprises highly trained and passionate professionals committed to delivering exceptional and specialised care.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-blue-500 mx-auto mb-4" />,
    title: "Quality & Safety Assured",
    text: "Adhering to the highest industry standards, we ensure a safe, nurturing, and quality-driven care environment.",
  },
  {
    icon: <Award className="w-10 h-10 text-blue-500 mx-auto mb-4" />,
    title: "Holistic Well-being",
    text: "Focusing on physical, emotional, and social health to enhance the overall quality of life for those we support.",
  },
];

export default function WhyChooseSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-12">
          Why Choose DAS Healthcare Providers?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm p-8 text-center hover:shadow-lg transition-shadow duration-300"
            >
              {feature.icon}
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
