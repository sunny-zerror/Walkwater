"use client";
import { useGSAP } from '@gsap/react'
import { RiArrowRightLine } from '@remixicon/react'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Button from '../common/Button'
import CustomLink from '../common/CustomLink'
import AutoplayVideo from '../common/AutoplayVideo'
import React, { useRef } from 'react'
gsap.registerPlugin(ScrollTrigger)

const verticalLinks = [
  { label: "Case Studies", href: "/" },
  { label: "Industry & Talent Insights", href: "/" },
  { label: "Sub Sectors of Expertise", href: "/" },
]

const data = [
  {
    id: 1,
    title: "Industrial, Energy & Process",
    desc: "Leaders for manufacturing, automotive, aerospace and defense, energy, process and infrastructure businesses, where operations are complex and the stakes are high.",
    video: "/videos/verticals/industry.mp4",
    poster: "/videos/verticals/posters/industry.jpg",
    links: verticalLinks,
    href: "/",
  },
  {
    id: 2,
    title: "Technology & Digital",
    desc: "Leaders for technology companies and digital businesses, and for the transformation roles that established organizations now depend on.",
    video: "/videos/verticals/technology.mp4",
    poster: "/videos/verticals/posters/technology.jpg",
    links: verticalLinks,
    href: "/",
  },
  {
    id: 3,
    title: "Consumer, Retail, Media & Services",
    desc: "Leaders who understand the Indian consumer and can build brands, channels and businesses across consumer goods, retail, media and services.",
    video: "/videos/verticals/retail.mp4",
    poster: "/videos/verticals/posters/retail.jpg",
    links: verticalLinks,
    href: "/",
  },
  {
    id: 4,
    title: "Pharma, Healthcare & Life Sciences",
    desc: "Leaders for pharmaceutical, healthcare and life sciences companies entering a decade of global integration, regulation and growth.",
    video: "/videos/verticals/pharma.mp4",
    poster: "/videos/verticals/posters/pharma.jpg",
    links: verticalLinks,
    href: "/",
  },
  {
    id: 5,
    title: "Banking, Financial Services & Consulting",
    desc: "Leaders for banks, financial institutions and consulting firms who can balance growth, risk and regulation.",
    video: "/videos/verticals/business.mp4",
    poster: "/videos/verticals/posters/business.jpg",
    links: verticalLinks,
    href: "/",
  },
]

// Dot marker that swaps for an arrow while its row is hovered; the link keeps its own hover
const LinkItem = ({ link, linkClassName }) => (
  <li className="group/item flex items-center w-fit block gap-x-3">
    <span className="relative size-3.5 shrink-0 center">
      <span className="size-1.5 rounded-full bg-[#86B039] transition-all duration-200 group-hover/item:opacity-0 group-hover/item:scale-0"></span>
      <RiArrowRightLine className="absolute inset-0 size-3.5 text-[#86B039] opacity-0 -translate-x-1 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-x-0" />
    </span>
    <CustomLink href={link.href} label={link.label} className={linkClassName} />
  </li>
)

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
      {/* Desktop: one sticky screen. Top padding clears the fixed header, the bottom matches the side gutter,
          and the stack takes whatever height is left */}
      <div className=" container max-sm:px-0! relative w-full md:h-screen! flex flex-col gap-y-stack py-section  md:sticky! md:top-0">
        <div className="max-sm:px-4 text-center space-y-title shrink-0">
          <h2 data-heading-effect data-heading-start="top bottom" className="w-fit mx-auto leading-none text-[#00689F]">Industry Verticals</h2>
          <p data-para-effect className="section-desc text-[#657882]">
            Deep domain knowledge across five sectors, from industrials to financial services.
          </p>
        </div>

        {/* DESKTOP STACK */}
        <div className="flex-1 min-h-0 hidden md:block w-full relative overflow-hidden rounded-3xl">
          {data.map((item, i) => (
            <div key={i} style={i === 0 ? undefined : { zIndex: i }} className={` slide ${i === 0 ? "relative" : "absolute inset-x-0 top-full"} h-full p-8 lg:p-10 grid grid-cols-2 gap-x-10 lg:gap-x-16 bg-[#F7F8FF] border border-[#00689F20] rounded-3xl`}>
              <div className={`min-h-0 flex flex-col gap-y-8 justify-between ${i % 2 === 0 ? "" : "order-2"}`}>
                <div className="flex flex-col gap-y-5">
                  <h4 className='  text-[#00689F]  '>{item.title}</h4>
                  <p className='text-[#657882] leading-tight'>{item.desc}</p>
                  <ul className="space-y-2">
                    {item.links.map((link, j) => (
                      <LinkItem key={j} link={link} linkClassName="text-[#00689F] font-medium hover:underline underline-offset-4" />
                    ))}
                  </ul>
                </div>
                <Button label="Explore More" href={item.href} />
              </div>
              <div className="h-full min-h-0 relative overflow-hidden rounded-xl bg-[#E8EDF1]">
                <AutoplayVideo poster={item.poster} className="w-full h-full object-cover">
                  <source src={item.video} type="video/mp4" />
                </AutoplayVideo>
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
                  <div className="w-full aspect-4/3 relative shrink-0 overflow-hidden bg-[#E8EDF1]">
                    <AutoplayVideo poster={item.poster} className="w-full h-full object-cover">
                      <source src={item.video} type="video/mp4" />
                    </AutoplayVideo>
                  </div>
                  <div className="p-5 flex flex-col gap-y-3 flex-1">
                    <h4 className="text-[#00689F]   ">{item.title}</h4>
                    <p className="text-[#657882]  leading-tight">{item.desc}</p>
                    <ul className="space-y-2">
                      {item.links.map((link, j) => (
                        <LinkItem key={j} link={link} linkClassName="text-[#00689F] text-sm font-medium" />
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
