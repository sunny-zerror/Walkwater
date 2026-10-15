"use client";
import { RiShareLine } from "@remixicon/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Button from "../common/Button";
import { spacingToPx } from "@/utils/spacing";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from "swiper/modules";
import 'swiper/css';
import SliderArrows from "../common/SliderArrows";
import { insightCategories, insightsData } from "@/data/insightsData";
gsap.registerPlugin(ScrollTrigger)

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

  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const isSwitching = useRef(false);
  const revealRef = useRef(null);
  const filteredInsights = activeCategory === "All"
    ? insightsData
    : insightsData.filter((insight) => insight.category === activeCategory);

  const { contextSafe } = useGSAP({ scope: sectionRef });

  // Current cards drop out, the list swaps, then the new cards rise in (see the effect below)
  const switchCategory = contextSafe((category) => {
    if (category === activeCategory || isSwitching.current) return;
    isSwitching.current = true;
    // The scroll reveal only knows the first set of cards, so settle it and hand over to the switch animation
    if (revealRef.current) {
      revealRef.current.scrollTrigger?.kill();
      revealRef.current.progress(1).kill();
      revealRef.current = null;
    }
    gsap.to(".insight_card", {
      y: -20,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      stagger: 0.03,
      overwrite: true,
      onComplete: () => setActiveCategory(category),
    });
  });

  useGSAP(() => {
    if (!isSwitching.current) return;
    swiper?.slideTo(0, 0);
    gsap.fromTo(".insight_card",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        overwrite: true,
        onComplete: () => { isSwitching.current = false; },
      }
    );
  }, { dependencies: [activeCategory], scope: sectionRef });

  useGSAP(() => {
    let ic = gsap.matchMedia();
    ic.add("(min-width: 768px)", () => {
      revealRef.current = gsap.from(".insight_card", {
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
  }, { scope: sectionRef })

  return (
    <div ref={sectionRef} className="w-full bg-[#00689F] py-section relative overflow-hidden">
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

          {/* Category filter: outlined pills, the active one filled white */}
          <div role="tablist" aria-label="Insight categories" className="flex flex-wrap justify-center gap-2 pt-6">
            {insightCategories.map((category) => {
              const isActive = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => switchCategory(category)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium cursor-pointer transition-colors duration-300 ${isActive
                    ? "bg-[#ffffff] border-[#ffffff] text-[#00689F]"
                    : "border-white/50 text-white hover:bg-[#ffffff]/10 hover:border-[#ffffff]"
                    }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
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
              1024: { slidesPerView: 3 },
            }}
            className="overflow-visible!"
          >
            {filteredInsights.map((insight) => (
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
                    <p className="text-[#657882] group-hover:text-white/90 line-clamp-2 transition-colors duration-300">
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
