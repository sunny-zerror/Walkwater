"use client";
import { RiArrowRightLine, RiShareLine } from "@remixicon/react";
import Image from "next/image";
import React from "react";
import Button from "../common/Button";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
gsap.registerPlugin(ScrollTrigger)

const insightsData = [
  {
    id: 1,
    title: "Leadership in ESG Excellence",
    desc: "In recent times, Environmental, Social, and Governance (ESG) principles have evolved from a specialized focus to a fundamental business....",
    img: "/images/homepage/insights/img1.png", // Empty for now
  },
  {
    id: 2,
    title: "Purpose-Driven Leadership",
    desc: "In the current values-oriented business environment, leadership transcends merely achieving financial targets; it focuses on creating...",
    img: "/images/homepage/insights/img2.png", // Empty for now
  },
  {
    id: 3,
    title: "The Definitive Look at India’s Consumer CEO Journeys",
    desc: "Introduction: Charting the Course of India’s Consumer Sector CEOs The Indian consumer landscape has undergone transformational changes over the last…",
    img: "/images/homepage/insights/img3.jpg", // Empty for now
  },
  {
    id: 4,
    title: "Navigating Executive Search in Indian Family-Owned Businesses",
    desc: "India’s vibrant economic narrative is inextricably linked to the profound influence of its family-owned businesses (FOBs). These aren’t merely enterprises;...",
    img: "/images/homepage/insights/img4.jpg", // Empty for now
  },
];

const Insights = () => {

  useGSAP(() => {

    gsap.to(".spin-ellipse-left", {
      rotation: "+=360",
      duration: 25,
      repeat: -1,
      ease: "none"
    });

    gsap.to(".spin-ellipse-right", {
      rotation: "-=360",
      duration: 25,
      repeat: -1,
      ease: "none"
    });
    
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
    <div className="w-full bg-[#00689F] pt-12 md:pt-24  relative overflow-hidden">

       <div className="spin-ellipse-left w-[40vw] z-10 absolute left-[-15%] top-[-35%] rotate-45 aspect-square border opacity-20 border-white rounded-full center">
        <div className="size-5 rounded-full bg-[#00689F] border border-white absolute right-0 translate-x-2.5 ">
        </div>
        <div className="size-5 rounded-full bg-[#00689F] border border-white absolute left-0 -translate-x-2.5 ">
        </div>
      </div>
      <div className="spin-ellipse-right w-[40vw] z-10 absolute right-[-15%] bottom-[-35%] -rotate-45 aspect-square opacity-50 border border-white rounded-full center">
        <div className="size-5 rounded-full bg-white border border-white/40 absolute left-0 -translate-x-2.5 shadow-[0_0_15px_#ffffff,0_0_30px_#ffffff,0_0_45px_rgba(255,255,255,0.8)]">
          <div className="absolute -inset-2 rounded-full bg-white/50 blur-md pointer-events-none"></div>
        </div>
        <div className="size-5 rounded-full bg-white border border-white/40 absolute right-0 translate-x-2.5 shadow-[0_0_15px_#ffffff,0_0_30px_#ffffff,0_0_45px_rgba(255,255,255,0.8)]">
          <div className="absolute -inset-2 rounded-full bg-white/50 blur-md pointer-events-none"></div>
        </div>
      </div>

      {/* Background decoration can go here later */}

      <div className="container mx-auto px-4 relative z-10 space-y-16">

        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-6 relative z-10">
          <div className="md:col-span-4">
            <h2 data-heading-effect className="text-4xl md:text-5xl   leading-none text-white">
              Insights
            </h2>
          </div>
          <div className="md:col-span-2 max-sm:mt-2 space-y-5">
            <p data-para-effect className="text-lg md:text-xl text-[#ededed] leading-tight">
              Articles and perspectives on leadership trends, talent strategy, and market developments.
            </p>
            <Button label={"Explore Insights"} theme="light" />

          </div>
        </div>

        {/* Cards Section — Desktop */}
        <div className="hidden md:grid grid-cols-4 gap-5">
          {insightsData.map((insight) => (
            <div
              key={insight.id}
              className=" insight_card bg-white rounded-xl p-3  border border-gray-100 flex flex-col group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/9] md:aspect-[4/3] rounded-lg overflow-hidden mb-5 bg-[#e2e8f0]">
                {insight.img ? (
                  <Image
                    src={insight.img}
                    fill
                    alt={insight.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-[#e2e8f0] flex items-center justify-center">
                    {/* Dummy image placeholder */}
                  </div>
                )}

                {/* Share Icon */}
                <div className="absolute top-2 right-2 w-8 h-8 hover:bg-[#00689F]! hover:text-white! bg-white rounded-md flex items-center justify-center text-[#00689F] transition-colors z-10">
                  <RiShareLine size={16} />
                </div>
              </div>

              {/* Text Content */}
              <div className="md:px-2 ">
                <h6 className="text-[#00689F] leading-none   mb-2 md:mb-4">
                  {insight.title}
                </h6>
                <p className="text-[#657882]  leading-tight line-clamp-2">
                  {insight.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Cards Section — Mobile Swiper */}
        <div className="md:hidden w-full relative z-50">
          <Swiper
            slidesPerView={1.1}
            spaceBetween={16}
            className="w-full"
          >
            {insightsData.map((insight) => (
              <SwiperSlide key={insight.id} className="h-auto!" >
                <div className=" h-full bg-white rounded-3xl p-3 border border-gray-100 flex flex-col group cursor-pointer">
                  {/* Image Container */}
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-5 bg-[#e2e8f0]">
                    {insight.img ? (
                      <Image
                        src={insight.img}
                        fill
                        alt={insight.title}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#e2e8f0] flex items-center justify-center" />
                    )}

                    {/* Share Icon */}
                    <div className="absolute top-2 right-2 w-8 h-8 hover:bg-[#00689F]! hover:text-white! bg-white rounded-xl flex items-center justify-center text-[#00689F] transition-colors z-10">
                      <RiShareLine size={16} />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col flex-1">
                    <h6 className="text-[#00689F] max-sm:text-lg! leading-none mb-2">
                      {insight.title}
                    </h6>
                    <p className="text-[#657882] leading-tight line-clamp-2">
                      {insight.desc}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </div>
  );
};

export default Insights;
