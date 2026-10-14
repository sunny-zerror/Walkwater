"use client";
import { RiShareLine } from "@remixicon/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import { spacingToPx } from "@/utils/spacing";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from "swiper/modules";
import 'swiper/css';
import SliderArrows from "../common/SliderArrows";
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
    desc: "In recent times, Environmental, Social, and Governance (ESG) principles have evolved from a specialized focus to a fundamental business necessity…",
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
    desc: "The Indian consumer landscape has undergone transformational changes over the last…",
    img: "/images/homepage/insights/img4.jpg",
  },
  {
    id: 5,
    title: "Navigating Executive Search in Indian Family-Owned Businesses",
    desc: "India’s vibrant economic narrative is inextricably linked to the profound influence of its family-owned businesses (FOBs). These aren’t merely enterprises;…",
    img: "/images/homepage/insights/img5.jpg",
  },
  {
    id: 6,
    title: "Recruitment for Startups vs. Corporations – Key Differences and Strategies",
    desc: "In the current dynamic business environment, recruitment cannot be approached with a one-size-fits-all methodology. The specific needs, objectives, and resources…",
    img: "/images/homepage/insights/img6.jpg",
  },
  {
    id: 7,
    title: "Talent Report – Renewable Energy: The Question of Human Capital 2024",
    desc: "“If an alien came to visit, I’d be embarrassed to tell them that we fight wars to pull fossil fuels…",
    img: "/images/homepage/insights/img7.jpg",
  },
  {
    id: 8,
    title: "Talent Report – Chief Digital and Information Officer 2024",
    desc: "Today, technology is playing a pivotal role in transforming organizations. The shift of the…",
    img: "/images/homepage/insights/img8.jpg",
  },
];

const Insights = () => {
  // Card gap follows the --spacing-grid token; the root font size scales with the viewport
  const [gap, setGap] = useState(16);
  const [swiper, setSwiper] = useState(null);
  // Arrows dim at either end of the track
  const [edges, setEdges] = useState({ start: true, end: false });
  const updateEdges = (s) => setEdges({ start: s.isBeginning, end: s.isEnd });

  useEffect(() => {
    const updateGap = () => setGap(spacingToPx("--spacing-grid"));
    updateGap();
    window.addEventListener("resize", updateGap);
    return () => window.removeEventListener("resize", updateGap);
  }, []);

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
    <div className="w-full bg-[#00689F] py-section relative overflow-hidden">
      <Image
        src="/images/homepage/insights/insights_bg.svg"
        alt=""
        fill
        className="object-cover"
      />

      <div className="relative z-10 space-y-stack">

        {/* Header Section */}
        <div className="container h-fit! text-center space-y-title">
          <h2 data-heading-effect className="w-fit mx-auto text-white">
            Latest Insights
          </h2>
          <p data-para-effect className="section-desc text-white/90">
            Leadership and talent perspectives for a changing business landscape.
          </p>
        </div>

        {/* Cards Slider */}
        <div className="container h-fit!">
          <div className="relative">
          <Swiper
            onSwiper={(s) => { setSwiper(s); updateEdges(s); }}
            onProgress={updateEdges}
            onResize={updateEdges}
            modules={[Mousewheel]}
            mousewheel={{ forceToAxis: true, thresholdDelta: 20 }}
            grabCursor
            // Cards stay put while dragging; on release they step to the next/previous card
            followFinger={false}
            speed={700}
            spaceBetween={gap}
            slidesPerView={1.15}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.3 },
            }}
            className="overflow-visible!"
          >
            {insightsData.map((insight) => (
              <SwiperSlide key={insight.id} className="h-auto!">
                <div className="insight_card h-full bg-[#ffffff] hover:bg-[#86B039] rounded-xl p-card flex flex-col group cursor-pointer transition-colors duration-300">
                  {/* Image Container */}
                  <div className="relative aspect-867/450 rounded-lg overflow-hidden bg-[#e2e8f0]">
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
                    <h6 className="text-[#00689F] h-12  group-hover:text-white line-clamp-2 leading-tight mb-3 transition-colors duration-300">
                      {insight.title}
                    </h6>
                    <p className="text-[#657882] group-hover:text-white/90 text-sm leading-relaxed line-clamp-2 transition-colors duration-300">
                      {insight.desc}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {/* Closing card: replaces the old "Explore Insights" button under the slider */}
            <SwiperSlide className="h-auto!">
              <div className="insight_card group relative h-full min-h-80 bg-[#ffffff] hover:bg-[#86B039] rounded-xl p-card flex flex-col transition-colors duration-300">
                <div className="px-1.5 pt-1.5">
                  <span className="inline-block rounded-full border border-[#00689F30] group-hover:border-white/50 px-3 py-1 text-xs font-medium tracking-wide text-[#00689F] group-hover:text-white transition-colors duration-300">
                    Insights Library
                  </span>
                </div>

                <div className="mt-auto px-1.5 pb-2 space-y-3">
                  <h5 className="text-[#00689F] group-hover:text-white leading-tight transition-colors duration-300">
                    View All Insights
                  </h5>
                  <p className="text-[#657882] group-hover:text-white/90 text-sm leading-relaxed transition-colors duration-300">
                    Talent reports, leadership research and perspectives from across our practice areas.
                  </p>
                </div>

                {/* The button's link is stretched over the card (after:inset-0), so the whole card is clickable */}
                <div className="px-1.5 pt-4 pb-2">
                  <Button label="View All Insights" href="/insights" theme="white" className="border-[#00689F50]! group-hover:border-[#ffffff]! after:absolute after:inset-0 after:rounded-xl" />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          <SliderArrows swiper={swiper} atStart={edges.start} atEnd={edges.end} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
