"use client";
import React, { useRef } from 'react';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { RiArrowRightUpLine } from '@remixicon/react';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react';
import Button from '../common/Button';
import CustomLink from '../common/CustomLink';
import SplitText from 'gsap/dist/SplitText';
gsap.registerPlugin(ScrollTrigger, SplitText)

const Hero = () => {

  const curtainRef = useRef()
  useGSAP(() => {

    const heading_split = SplitText.create(".heading_split", {
      type: "lines",
      linesClass: "split-line"
    });

    [...heading_split.lines].forEach((line) => {
      const wrapper = document.createElement("div");

      wrapper.classList.add("line-wrapper");

      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    gsap.set([heading_split.lines], { yPercent: 100 });

    const tl = gsap.timeline({
      delay: 0.5
    })
    tl.to(".anim_tt", {
      opacity: 1
    })
    tl.to(".anim_tt", {
      opacity: 0,
      delay: 0.5
    })
    tl.to(curtainRef.current, {
      y: "-250lvh",
    })

    tl.to(heading_split.lines, {
      yPercent: 0,
      duration: 0.8,
      ease: "expo.out",
      stagger: 0.05,
    });
    tl.to([".blink_btn",], {
      opacity: 1,
      stagger: 0.15
    }, "<");


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
    <>

      <div className='PageTransition fixed inset-0 w-full h-screen z-[1000] pointer-events-none overflow-hidden'>
        <div className="w-full absolute inset-0 h-full flex items-center justify-center z-20">
          <Image
            src="/logo.svg"
            alt="WalkWater Talent Advisors"
            width={400}
            height={100}
            className="h-16  anim_tt opacity-0 w-auto object-contain"
            priority
          />

        </div>
        <div
          ref={curtainRef}
          className="PageTransition-curtainWrapper w-full absolute flex flex-col inset-0"
          style={{ height: '250lvh', transform: 'translateY(-75lvh)' }}
        >
          <div className="PageTransition-curtainGradientTop shrink-0"></div>
          <div className="PageTransition-curtainCentre shrink-0 relative flex items-center justify-center"></div>
          <div className="PageTransition-curtainGradientBottom shrink-0"></div>
        </div>
      </div>

      <section className="  hero_section relative w-full h-screen pb-20 overflow-hidden">
        <div className=" hero_bg_video absolute inset-0 brightness-100 overflow-hidden z-0">
          <video loop muted playsInline autoPlay className='brightness-75 cover' src="/videos/hero_vid.mp4"></video>
        </div>

        <div className="relative z-10 text-white  w-full container flex items-end">
          <div className="space-y-5">
            <h1 className=" leading-none heading_split  max-sm:hidden ">
              India’s Fastest Growing Leadership <br /> Search and Talent Advisory Firm
            </h1>
            <h1 className=" leading-none heading_split  md:hidden ">
              India’s Fastest Growing Leadership Search and Talent Advisory Firm
            </h1>
            <p className="text-lg md:text-xl   heading_split  leading-tight max-sm:hidden">
              Building future-ready leadership teams for global enterprises,  <br />high-growth businesses, and transformative organizations.
            </p>
            <p className="text-lg md:text-xl   heading_split  leading-tight md:hidden">
              Building future-ready leadership teams for global enterprises, high-growth businesses, and transformative organizations.
            </p>
            <div className="flex gap-4 items-center">
              <Button label={"Get in Touch"} href={"/contact"} theme='light' className='blink_btn opacity-0' />
              <CustomLink
                href="/expertise"
                label="Expertise"
                className=" blink_btn opacity-0 inline-flex group relative items-center justify-center px-4 py-2 border border-transparent text-sm   rounded text-white hover:text-gray-200 transition-colors group"
              >
                <div className="relative">
                  Explore Our Expertise
                  <span className='absolute left-0 w-0 group-hover:w-full transition-all duration-300 bottom-0 bg-white h-px'></span>
                </div>
                <RiArrowRightUpLine size={18} className=" scale-0 group-hover:scale-100 origin-bottom-left transition-all duration-300 " />
              </CustomLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;