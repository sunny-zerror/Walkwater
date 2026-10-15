"use client";
import Image from 'next/image'
import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { RiArrowRightLine } from '@remixicon/react'
import CustomLink from '../common/CustomLink'
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
]

const WhatWeDo = () => {
  const sectionRef = useRef(null)

  // Cards rise in one after another on scroll (tablet and up)
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add("(min-width: 768px)", () => {
      gsap.from(".wwd_card", {
        xPercent: 100,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".wwd_card",
          start: "top 75%",
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-grid">
          {services.map((item, i) => (
            <CustomLink key={i} href={item.href} label={item.title} className="wwd_card group flex flex-col bg-[#ffffff] hover:bg-[#86B039] rounded-xl p-card transition-colors duration-300">
              {/* Image keeps its size; on hover a dark wash fades in and the button rises over its bottom edge.
                  Touch screens can't hover, so below lg the button is always shown. */}
              <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-[#e2e8f0]">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 30vw, 92vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/0 to-black/0 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="absolute left-3 bottom-3 transition-all duration-500 ease-out lg:translate-y-6 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100">
                  {/* Not a link itself (the whole card is one); fills blue when the pointer is on it */}
                  <span className="group/btn border w-fit p-2 pl-3 rounded-full text-sm flex items-center gap-x-2 transition-all duration-300 bg-[#ffffff] text-[#00689F] border-[#ffffff] hover:bg-[#00689F] hover:text-[#ffffff] hover:border-[#00689F]">
                    <span className="font-medium">Learn More</span>
                    <span className="relative p-1 center rounded-full overflow-hidden transition-all duration-300 bg-[#00689F] text-[#ffffff] group-hover/btn:bg-[#ffffff] group-hover/btn:text-[#00689F]">
                      <RiArrowRightLine size={14} className="group-hover/btn:translate-x-[120%] transition-all duration-300" />
                      <RiArrowRightLine size={14} className="absolute -translate-x-[120%] group-hover/btn:translate-x-0 transition-all duration-300" />
                    </span>
                  </span>
                </div>
              </div>

              <div className="px-1.5 pt-4 pb-2">
                <h6 className="text-[#00689F] group-hover:text-white leading-tight mb-3 transition-colors duration-300">
                  {item.title}
                </h6>
                <p className="text-[#657882] group-hover:text-white/90  transition-colors duration-300">
                  {item.desc}
                </p>
              </div>
            </CustomLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WhatWeDo
