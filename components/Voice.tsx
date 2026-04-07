"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
export default function Voice() {
	 const router = useRouter();
	
	return (
			<section className="w-full bg-white py-16 px-8">
				<div className="max-w-[980px] mx-auto">
				<h2 className="text-center text-2xl md:text-3xl font-semibold text-[#111827] mb-8">Voices of Our Colleagues</h2>

				{/* Testimonials Auto-sliding Carousel */}
			<div className="mb-12">
					<Swiper
						modules={[Autoplay]}
						spaceBetween={24}
						slidesPerView={1}
						breakpoints={{
							640: { slidesPerView: 1 },
							768: { slidesPerView: 2 },
							1024: { slidesPerView: 3 },
						}}
						autoplay={{ delay: 6000, disableOnInteraction: false }}
						className="pb-4"
					>
					{[
						{
							img: "/Rejoice - T.jfif.jpeg",
							quote:
								'"Jide Bankole is an exceptional nurse and educator who demonstrated outstanding professionalism and dedication during our time working together in Botswana during the COVID-19 pandemic. His expertise, compassion, and ability to educate others made a significant impact on our team."',
							name: "Rejoice Gbologah",
							role: "Critical Care Nurse, Ghana",
						},
						{
							img: "/premium_profile_icon.png",
							quote:
								'"I would like to acknowledge my colleague Jide for his consistent professionalism, teamwork, and dedication. He always communicate clearly, support the team when needed and is an outstanding nurse. His reliability and positive attitude makes a meaningful contribution to work environment. I have always enjoyed working with him."',
							name: "Agnes Stansfeld",
							role: "RN, ITU Nurse, London, UK",
						},
						{
							img: "/premium_profile_icon.png",
							quote:
								'"I had the privilege of working with Olutoyin when she served as a deputy manager in a domiciliary care service in Leeds, working closely alongside the registered manager. She consistently demonstrated exceptional leadership and a deep commitment to high-quality, person-centred care. I witnessed her bring tender, thoughtful support to our care-at-home services, always striving to ensure that people receiving care felt safe, valued, and happy in the comfort of their own homes. She is hands-on, compassionate, and leads by example, whether supporting clients and their families or managing the wider team. Her humility, dedication, and genuine heart for service make her a standout leader and an asset to any organisation."',
							name: "Christy A.",
							role: "Colleague",
						},
						{
							img: "/premium_profile_icon.png",
							quote:
								'"All through the time I worked with Olutoyin as a deputy manager in residential support care, she proved to be an outstanding leader and support worker. She brought a level of tenderness, empathy, and professionalism that deeply impacted both residents and staff. Her leadership style is grounded in compassion and active involvement, always prioritising the needs of those in her care. Olutoyin’s dedication, humility, and ability to inspire others truly set her apart."',
							name: "Leslie S.",
							role: "Colleague",
						},
					].map((t, i) => (
									<SwiperSlide key={i} className="h-auto">
										<figure className="bg-white rounded-xl p-6 shadow-sm border border-transparent hover:border-gray-100 flex flex-col h-full cursor-grab active:cursor-grabbing">
											<div className="flex items-start gap-3 flex-1 mb-4">
												<div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-gray-100">
													<Image src={t.img} alt={t.name} width={40} height={40} className="object-cover" />
												</div>
												<blockquote className="text-[14px] text-gray-700 italic leading-relaxed">{t.quote}</blockquote>
											</div>
											<figcaption className="mt-auto text-[13px] text-gray-500 pl-13">{t.name} · <span className="text-gray-400">{t.role}</span></figcaption>
										</figure>
									</SwiperSlide>
					))}
					</Swiper>
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
