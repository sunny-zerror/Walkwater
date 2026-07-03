"use client";
import React from 'react';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { RiArrowRightUpLine } from '@remixicon/react';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {

  useGSAP(() => {

    if (window.innerWidth < 750) return
    gsap.to([".hero_bg_video"], {
      y: 200,
      filter: "brightness(0.2)",
      ease: "none",
      scrollTrigger: {
        trigger: ".hero_section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    })
  })

  return (
    <section className="  hero_section relative w-full h-screen pb-20 overflow-hidden">
      <div className=" hero_bg_video absolute inset-0 brightness-100 overflow-hidden z-0">
        <video loop muted playsInline autoPlay className='brightness-75 cover' src="/videos/hero_vid.mp4"></video>
      </div>

      <div className="relative z-10 text-white  w-full container flex items-end">
        <div className="space-y-5">
          <h1 className=" leading-none ">
            India’s Fastest Growing Leadership <br /> Search and Talent Advisory Firm
          </h1>
          <p className="text-xl leading-tight">
            Building future-ready leadership teams for global enterprises,  <br />high-growth businesses, and transformative organizations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Link
              href="/contact"
              className="inline-flex items-center text-[#00689F] justify-center px-4 py-2 border border-transparent text-sm   rounded  bg-white hover:bg-gray-100 transition-colors shadow-lg"
            >
              Get in Touch
              <RiArrowRightUpLine className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/expertise"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm   rounded text-white hover:text-gray-200 transition-colors group"
            >
              Explore Our Expertise
              <RiArrowRightUpLine className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;