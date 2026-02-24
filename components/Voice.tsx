"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Voice() {
	 const router = useRouter();
	
	return (
			<section className="w-full bg-white py-16 px-8">
				<div className="max-w-[980px] mx-auto">
				<h2 className="text-center text-2xl md:text-3xl font-semibold text-[#111827] mb-8">Voices of Our Colleagues</h2>

				{/* Testimonials row */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
					{[
						{
							img: "/Client-1.jpg",
							quote:
								'"Olajide\'s exceptional clinical expertise and transformative leadership have consistently elevated care standards. His compassionate approach and strategic vision make him an outstanding healthcare professional."',
							name: "Eleanor V., RN",
							role: "Senior Clinical Nurse",
						},
						{
							img: "/Client-2.jpg",
							quote:
								'"Having worked alongside Olajide for many years, I\'ve witnessed his problem-solving skills and regulatory knowledge firsthand. His dedication to professional development and clinical excellence is remarkable."',
							name: "David S., RN",
							role: "Nurse Manager",
						},
						{
							img: "/Client-3.jpg",
							quote:
								'"Olajide\'s role as an educator and trainer has significantly contributed to improving nursing practice. His emotional intelligence, excellent communication skills, and kind professional approach are exemplary."',
							name: "Sophia L., RN",
							role: "Clinical Educator",
						},
					].map((t, i) => (
									<figure
										key={i}
										className="bg-white rounded-xl p-6 shadow-sm border border-transparent hover:border-gray-100"
									>
							<div className="flex items-start gap-3">
								<div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-gray-100">
									<Image src={t.img} alt={t.name} width={40} height={40} className="object-cover" />
								</div>
								<blockquote className="text-[14px] text-gray-700 italic">{t.quote}</blockquote>
							</div>
							<figcaption className="mt-4 text-[13px] text-gray-500">{t.name} · <span className="text-gray-400">{t.role}</span></figcaption>
						</figure>
					))}
				</div>

				{/* CTA card */}
				<div className="bg-[#EAF6FF] rounded-2xl py-12 md:py-16 px-7 md:px-10 relative max-w-[680px] mx-auto">
					<div className="max-w-[580px] mx-auto text-center">
						<h3 className="text-3xl md:text-3xl font-semibold text-[#111827] mb-4">Ready to Join Our Family?</h3>
						<p className="text-[18px] md:text-[14px] text-gray-700 opacity-90 leading-relaxed max-w-[520px] mx-auto">
							Discover how our compassionate, family-centered approach can <br/>
							 make a difference in your life or the life of your loved one. <br/>
							 Contact us today for a personal consultation.
						</p>
					</div>

					<div className="mt-8 flex justify-center">
						<div className="flex items-center gap-4 flex-wrap md:flex-nowrap justify-center">
							<div className="relative pulse-wrapper">
								<button 
								onClick={() => router.push("/contact")}
								className="relative z-10 px-4 md:px-6 py-3 rounded-full bg-[#0091FF] text-white text-sm md:text-sm font-medium">
									Request a Care Assessment
								</button>

								{/* pulsing rings behind/right of the button */}
								<div className="pointer-events-none absolute -right-3 -top-3">
									<span className="pulse-ring pulse-delay-0" />
									<span className="pulse-ring pulse-delay-200" />
									<span className="pulse-ring pulse-delay-400" />
								</div>
							</div>

							<div className="text-[15px] text-gray-700 font-bold flex flex-col items-center gap-1">
								<div>BRN: 14651663</div>
								<div>CQC: CRT1-24768607163</div>
								<div>Provider ID: 1-20631585417</div>
							</div>
						</div>
					</div>
				</div>
				</div>

			<style jsx>{`
				.pulse-ring {
					display: block;
					width: 20px;
					height: 20px;
					border-radius: 9999px;
					background: rgba(0, 145, 255, 0.18);
					box-shadow: 0 0 0 6px rgba(7, 136, 235, 0.06);
					transform: scale(0.6);
					animation: pulse 1500ms ease-out infinite;
					position: absolute;
					right: 0;
					top: 0;
				}

				.pulse-delay-200 { animation-delay: 200ms; }
				.pulse-delay-400 { animation-delay: 400ms; }

				@keyframes pulse {
					0% { opacity: 1; transform: scale(0.6); }
					60% { opacity: 0.35; transform: scale(1.4); }
					100% { opacity: 0; transform: scale(1.8); }
				}

				/* pause the rings when hovering the button or its wrapper */
				.pulse-wrapper:hover .pulse-ring,
				.pulse-wrapper:focus-within .pulse-ring { animation-play-state: paused; opacity: 0; }
			`}</style>
		</section>
	);
}
