"use client";
import { useGSAP } from '@gsap/react'
import { RiArrowRightLine } from '@remixicon/react'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Button from '../common/Button'
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
gsap.registerPlugin(ScrollTrigger)

const data = [
  {
    id: 1,
    title: "Industrial, Energy & Process",
    desc: "Driving industrial progress through exceptional leadership and strategic talent solutions.",
    video: "/videos/verticals/industry.mp4"
  },
  {
    id: 2,
    title: "Technology & Digital",
    desc: "Identifying transformative leaders for organizations driving the next generation of technology and digital innovation.",
    video: "/videos/verticals/technology.mp4"
  },
  {
    id: 3,
    title: "Consumer, Retail, Media & Services",
    desc: "Empowering consumer-focused organizations through exceptional leadership and strategic talent.",
    video: "/videos/verticals/retail.mp4"
  },
  {
    id: 4,
    title: "Pharma, Healthcare & Lifesciences",
    desc: "Building future-ready leadership teams that shape the future of healthcare, science, and human well-being.",
    video: "/videos/verticals/pharma.mp4"
  },
  {
    id: 5,
    title: "Banking, Financial Services and Consulting",
    desc: "Empowering financial and consulting organizations through exceptional leadership talent.",
    video: "/videos/verticals/business.mp4"
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
      <div className="container w-full md:h-screen! flex flex-col py-16 md:py-0 md:justify-center md:pt-20 space-y-10 md:space-y-[5vh] md:sticky! md:top-0">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-2 md:gap-0">
          <div className="md:col-span-4">
            <h2 data-heading-effect className="w-fit  leading-none text-[#00689F]">Industry Verticals</h2>
          </div>
          <div className="md:col-span-2 space-y-5">
            <p data-para-effect className="text-lg md:text-xl   text-[#657882]  leading-tight">
              Deep sector understanding enables us to deliver leadership talent relevant to complex and evolving business environments.
            </p>
            <Button label={"Explore Industries Verticals"} />
          </div>
        </div>

        {/* DESKTOP STACK */}
        <div className="hidden md:block w-full relative overflow-hidden rounded-3xl">
          {data.map((item, i) => (
            <div key={i} className={` slide ${i === 0 ? "relative p-10" : `  left-0 top-full p-10 absolute z-[${i}]`}  bg-[#F7F8FF] border border-[#00689F20] rounded-3xl w-full  grid   grid-cols-2  `}>
              <div className={`flex flex-col gap-y-5  justify-center ${i % 2 === 0 ? " pr-44" : "order-2 pl-10"}`}>
                <h4 className='  text-[#00689F] leading-none'>{item.title}</h4>
                <p className='text-[#657882] leading-tight'>{item.desc}</p>
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
          <Swiper
            slidesPerView={1.1}
            spaceBetween={16}
            className="w-full"
          >
            {data.map((item, i) => (
              <SwiperSlide key={i} className="h-auto!">
                <div className="bg-[#F7F8FF] border border-[#00689F20] rounded-2xl w-full h-full flex flex-col overflow-hidden">
                  <div className="w-full aspect-4/3 relative shrink-0 overflow-hidden">
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                      <source src={item.video} type="video/mp4" />
                    </video>
                  </div>
                  <div className="p-5 flex flex-col gap-y-3 flex-1">
                    <h4 className="text-[#00689F]  leading-none">{item.title}</h4>
                    <p className="text-[#657882]  leading-tight">{item.desc}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default IndustryVerticals