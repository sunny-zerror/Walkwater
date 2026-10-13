"use client";
import { RiShareLine } from "@remixicon/react";
import Image from "next/image";
import React from "react";
import Button from "../common/Button";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/free-mode';
gsap.registerPlugin(ScrollTrigger)

const insightsData = [
  {
    id: 1,
    title: "The Strategic Evolution of India’s Pharma and Healthcare Companies in the Next Decade",
    desc: "India’s pharmaceutical and healthcare sectors are entering a crucial growth decade from a strong position of global integration and…",
    img: "/images/homepage/insights/img1.jpg",
  },
  {
    id: 2,
    title: "ESG Leadership",
    desc: "In recent times, Environmental, Social, and Governance (ESG) principles have evolved from a specialized focus to a fundamental business necessity….",
    img: "/images/homepage/insights/img2.jpg",
  },
  {
    id: 3,
    title: "Purpose-Driven Leadership",
    desc: "In the current values-oriented business environment, leadership transcends merely achieving financial targets; it focuses on creating significant impact. Companies are…",
    img: "/images/homepage/insights/img3.jpg",
  },
  {
    id: 4,
    title: "Inside the Corner Office: The Definitive Look at India’s Consumer CEO Journeys",
    desc: "Introduction: Charting the Course of India’s Consumer Sector CEOs The Indian consumer landscape has undergone transformational changes over the last…",
    img: "/images/homepage/insights/img4.jpg",
  },
];

const Insights = () => {

  useGSAP(() => {
    let ic = gsap.matchMedia();
    ic.add("(min-width: 768px)", () => {
      gsap.from(".insight_card", {
        xPercent: 100,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".insight_card",
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });
    });
    return () => ic.revert();
  })

  return (
    <div className="w-full bg-[#00689F] py-16 md:py-24 relative overflow-hidden">
      <Image
        src="/images/homepage/insights/insights_bg.svg"
        alt=""
        fill
        className="object-cover"
      />

      <div className="relative z-10 space-y-10 md:space-y-14">

        {/* Header Section */}
        <div className="container h-fit! text-center space-y-4">
          <h2 data-heading-effect className="w-fit mx-auto text-white">
            Latest Insights
          </h2>
          <p data-para-effect className="text-base md:text-lg text-white/90 leading-tight">
            Leadership and talent perspectives for a changing business landscape.
          </p>
        </div>

        {/* Cards Slider */}
        <div className="container h-fit!">
          <Swiper
            modules={[FreeMode, Mousewheel]}
            freeMode={{ enabled: true, sticky: false }}
            mousewheel={{ forceToAxis: true }}
            grabCursor
            spaceBetween={16}
            slidesPerView={1.15}
            breakpoints={{
              640: { slidesPerView: 2.2, spaceBetween: 16 },
              1024: { slidesPerView: 3.3, spaceBetween: 16 },
            }}
            className="overflow-visible!"
          >
            {insightsData.map((insight) => (
              <SwiperSlide key={insight.id} className="h-auto!">
                <div className="insight_card h-full bg-[#ffffff] hover:bg-[#86B039] rounded-xl p-2.5 flex flex-col group cursor-pointer transition-colors duration-300">
                  {/* Image Container */}
                  <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-[#e2e8f0]">
                    <Image
                      src={insight.img}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 85vw"
                      alt={insight.title}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Share Icon */}
                    <div className="absolute top-2 right-2 size-7 bg-[#ffffff] hover:bg-[#00689F] hover:text-[#ffffff] rounded-md flex items-center justify-center text-[#00689F] transition-colors z-10">
                      <RiShareLine size={14} />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="px-1.5 pt-4 pb-2">
                    <h6 className="text-[#00689F] group-hover:text-white line-clamp-2 leading-tight mb-3 transition-colors duration-300">
                      {insight.title}
                    </h6>
                    <p className="text-[#657882] group-hover:text-white/90 text-sm leading-relaxed line-clamp-2 transition-colors duration-300">
                      {insight.desc}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="center">
          <Button label={"Explore Insights"} theme="transparent" />
        </div>
      </div>
    </div>
  );
};

export default Insights;
