"use client";
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel } from 'swiper/modules'
import 'swiper/css'
import Button from '../common/Button'
import SliderArrows from '../common/SliderArrows'
import { spacingToPx } from '@/utils/spacing'
gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    title: "CEO and Board Search",
    desc: "As new sectors emerge and the CEO's role grows less predictable, we find the CEOs and board members organizations need for what comes next.",
    icon: "/images/homepage/what_we_do/ceo.svg",
    img: "/images/homepage/what_we_do/ceo.jpg",
    href: "/",
  },
  {
    title: "Talent Core",
    desc: "Our specialized executive search for the core talent of an organization: the senior and functional leaders every business depends on.",
    icon: "/images/homepage/what_we_do/talent.svg",
    img: "/images/homepage/what_we_do/talent.jpg",
    href: "/",
  },
  {
    title: "Talent Advisory",
    desc: "Talent trends, market compensation and sector-specific data for organizations at every stage, so leadership decisions rest on facts.",
    icon: "/images/homepage/what_we_do/talent_advisory.svg",
    img: "/images/homepage/what_we_do/talent_advisory.jpg",
    href: "/",
  },
  {
    title: "Entrepreneurial Services",
    desc: "Start-ups are rewriting the rules of business. We find leaders who can drive growth in fast-moving, founder-led organizations.",
    icon: "/images/homepage/what_we_do/enterpreneurial_service.svg",
    img: "/images/homepage/what_we_do/enterpreneurial_service.jpg",
    href: "/",
  },
  {
    title: "Diversity",
    desc: "India's many languages and cultures make a complex, compelling talent landscape. We help organizations build leadership teams that reflect it.",
    icon: "/images/homepage/what_we_do/diversity.svg",
    img: "/images/homepage/what_we_do/diversity.jpg",
    href: "/",
  },
  {
    title: "PE & VC",
    desc: "Private equity and venture capital have backed Indian business since the 1990s. We find leaders who build value across their portfolios.",
    icon: "/images/homepage/what_we_do/pe_vc.svg",
    img: "/images/homepage/what_we_do/pe_vc.jpg",
    href: "/",
  },
]

const WhatWeDo = () => {
  // Card gap follows the --spacing-grid token; the root font size scales with the viewport
  const [gap, setGap] = useState(16)
  const sectionRef = useRef(null)
  const [swiper, setSwiper] = useState(null)
  // Arrows dim at either end of the track
  const [edges, setEdges] = useState({ start: true, end: false })
  const updateEdges = (s) => setEdges({ start: s.isBeginning, end: s.isEnd })

  useEffect(() => {
    const updateGap = () => setGap(spacingToPx("--spacing-grid"))
    updateGap()
    window.addEventListener("resize", updateGap)
    return () => window.removeEventListener("resize", updateGap)
  }, [])

  // Cards slide in from the right on scroll, same as the Insights cards (tablet and up)
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add("(min-width: 768px)", () => {
      gsap.from(".wwd_card", {
        xPercent: 100,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".wwd_card",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      })
    })
    return () => mm.revert()
  }, { scope: sectionRef })

  return (
    <div ref={sectionRef} className="w-full relative overflow-hidden py-section">
      <Image
        src="/images/homepage/what_we_do_bg.svg"
        alt=""
        fill
        className="object-cover"
      />

      <div className="container relative z-10 space-y-stack">
        <div className="text-center space-y-title">
          <h2 data-heading-effect className="text-white leading-none mx-auto w-fit">
            What We Do
          </h2>
          <p data-para-effect className="section-desc text-white/90">
            Leadership search and talent advisory for every stage of an organization.
          </p>
        </div>

        <div className="relative">
        <Swiper
          onSwiper={(s) => { setSwiper(s); updateEdges(s) }}
          onProgress={updateEdges}
          onResize={updateEdges}
          modules={[Mousewheel]}
          mousewheel={{ forceToAxis: true, thresholdDelta: 20 }}
          grabCursor
          // Cards stay put while dragging; on release they step to the next/previous card
          followFinger={false}
          speed={700}
          spaceBetween={gap}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2.3 },
            1024: { slidesPerView: 3.5 },
          }}
          className="overflow-visible!"
        >
          {services.map((item, i) => (
            <SwiperSlide key={i}>
              {/* Same build as the Insights cards: padded white card, image on top, copy below.
                  The card height is fixed, so when the button row opens the image gives up the space. */}
              <div className="wwd_card group aspect-3/4 flex flex-col bg-[#ffffff] hover:bg-[#86B039] rounded-xl p-card transition-colors duration-300">
                <div className="relative flex-1 min-h-0 rounded-lg overflow-hidden bg-[#e2e8f0]">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 28vw, (min-width: 640px) 43vw, 83vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="shrink-0 px-1.5 pt-4 pb-2">
                  <h6 className="text-[#00689F] group-hover:text-white leading-tight mb-3 transition-colors duration-300">
                    {item.title}
                  </h6>
                  <p className="text-[#657882] group-hover:text-white/90 text-sm leading-relaxed line-clamp-3 transition-colors duration-300">
                    {item.desc}
                  </p>

                  {/* On desktop the row opens on hover, pushing the copy up while the button rises in.
                        Touch screens can't hover, so below lg it stays open. */}
                  <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] lg:group-focus-within:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                    <div className="overflow-hidden">
                      <div className="pt-5 transition-all duration-500 ease-out lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100">
                        <Button label="Learn More" href={item.href} theme="outline" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <SliderArrows swiper={swiper} atStart={edges.start} atEnd={edges.end} />
        </div>
      </div>
    </div>
  )
}

export default WhatWeDo
