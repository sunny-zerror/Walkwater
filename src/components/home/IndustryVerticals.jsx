"use client";
import { useGSAP } from '@gsap/react'
import { RiArrowRightLine } from '@remixicon/react'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Button from '../common/Button'
import CustomLink from '../common/CustomLink'
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
gsap.registerPlugin(ScrollTrigger)

const data = [
  {
    id: 1,
    title: "Industrial, Energy & Process",
    desc: "Deep sector expertise helps us identify leaders who drive transformation, strengthen performance, and deliver sustainable growth across industrial, energy, and process businesses.",
    video: "/videos/verticals/industry.mp4",
    links: [
      { label: "Case Studies", href: "/" },
      { label: "Industry & Talent Insights", href: "/" },
      { label: "Sub Sectors of Expertise", href: "/" },
    ],
    href: "/",
  },
  {
    id: 2,
    title: "Technology & Digital",
    desc: "Our technology and digital expertise connects organizations with leaders who drive innovation, accelerate transformation, build digital capabilities, and navigate markets confidently.",
    video: "/videos/verticals/technology.mp4",
    links: [
      { label: "Case Studies", href: "/" },
      { label: "Industry & Talent Insights", href: "/" },
      { label: "Sub Sectors of Expertise", href: "/" },
    ],
    href: "/",
  },
  {
    id: 3,
    title: "Consumer, Retail, Media & Services",
    desc: "Our expertise connects organizations with leaders who understand consumer needs, drive innovation, strengthen brands, and accelerate growth across competitive markets.",
    video: "/videos/verticals/retail.mp4",
    links: [
      { label: "Case Studies", href: "/" },
      { label: "Industry & Talent Insights", href: "/" },
      { label: "Sub Sectors of Expertise", href: "/" },
    ],
    href: "/",
  },
  {
    id: 4,
    title: "Pharma, Healthcare & Life Sciences",
    desc: "Our expertise connects organizations with leaders who drive innovation, navigate complexity, and deliver sustainable growth across healthcare and life sciences.",
    video: "/videos/verticals/pharma.mp4",
    links: [
      { label: "Case Studies", href: "/" },
      { label: "Industry & Talent Insights", href: "/" },
      { label: "Sub Sectors of Expertise", href: "/" },
    ],
    href: "/",
  },
  {
    id: 5,
    title: "Banking, Financial Services & Consulting",
    desc: "Our expertise connects organizations with leaders who navigate complexity, drive transformation, and create sustainable growth across financial services and consulting.",
    video: "/videos/verticals/business.mp4",
    links: [
      { label: "Sub Sectors of Expertise", href: "/" },
    ],
    href: "/",
  },
]

const IndustryVerticals = () => {

  const containerRef = useRef()

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const slides = gsap.utils.toArray(".slide");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      slides.forEach((slide, i) => {
        if (i !== 0) {
          tl.to(slide, {
            top: 0,
            ease: "none",
          });
        }

        if (i > 0) {
          tl.to(
            slides[i - 1],
            {
              scale: 0.8,
              ease: "none",
            },
            "<"
          );
        }
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });


  return (
    <div ref={containerRef} className='relative md:h-[400vh] w-full'>
      <div className=" container max-sm:px-0! relative w-full md:h-screen! flex flex-col py-16 md:py-0 md:justify-center md:pt-20 space-y-10 md:space-y-14 md:sticky! md:top-0">
        <div className="max-sm:px-4 text-center space-y-4">
          <h2 data-heading-effect className="w-fit mx-auto leading-none text-[#00689F]">Industry Verticals</h2>
          <p data-para-effect className="text-base md:text-lg text-[#657882] leading-tight">
            Deep sector expertise helps us deliver relevant leadership talent.
          </p>
        </div>

        {/* DESKTOP STACK */}
        <div className="  hidden md:block w-full relative overflow-hidden rounded-3xl">
          {data.map((item, i) => (
            <div key={i} className={` slide ${i === 0 ? "relative p-10" : `  left-0 top-full p-10 absolute z-[${i}]`}  bg-[#F7F8FF] border border-[#00689F20] rounded-3xl w-full  grid   grid-cols-2  `}>
              <div className={`flex flex-col gap-y-8 justify-between ${i % 2 === 0 ? " pr-20" : "order-2 pl-10"}`}>
                <div className="flex flex-col gap-y-5">
                  <h4 className='  text-[#00689F]  '>{item.title}</h4>
                  <p className='text-[#657882] leading-tight'>{item.desc}</p>
                  <ul className="space-y-2">
                    {item.links.map((link, j) => (
                      <li key={j} className="flex items-center gap-x-3">
                        <span className="size-1.5 shrink-0 rounded-full bg-[#86B039]"></span>
                        <CustomLink href={link.href} label={link.label} className="text-[#00689F] font-medium hover:underline underline-offset-4" />
                      </li>
                    ))}
                  </ul>
                </div>
                <Button label="Explore More" href={item.href} />
              </div>
              <div className="aspect-video relative overflow-hidden rounded-xl">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                  <source src={item.video} type="video/mp4" />
                </video>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE SWIPER */}
        <div className="md:hidden w-full relative">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {data.map((item, i) => (
              <div 
                key={i} 
                className="snap-center shrink-0 w-[80vw] h-auto"
              >
                <div className="bg-[#F7F8FF] border border-[#00689F20] rounded-2xl w-full h-full flex flex-col overflow-hidden">
                  <div className="w-full aspect-4/3 relative shrink-0 overflow-hidden">
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                      <source src={item.video} type="video/mp4" />
                    </video>
                  </div>
                  <div className="p-5 flex flex-col gap-y-3 flex-1">
                    <h4 className="text-[#00689F]   ">{item.title}</h4>
                    <p className="text-[#657882]  leading-tight">{item.desc}</p>
                    <ul className="space-y-2">
                      {item.links.map((link, j) => (
                        <li key={j} className="flex items-center gap-x-3">
                          <span className="size-1.5 shrink-0 rounded-full bg-[#86B039]"></span>
                          <CustomLink href={link.href} label={link.label} className="text-[#00689F] text-sm font-medium" />
                        </li>
                      ))}
                    </ul>
                    <Button label="Explore More" href={item.href} className="mt-auto" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndustryVerticals