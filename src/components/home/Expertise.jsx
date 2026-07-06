"use client";
import { useGSAP } from '@gsap/react'
import { RiArrowRightLine } from '@remixicon/react'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import React, { useRef } from 'react'
import { useRive } from '@rive-app/react-canvas';
import Button from '../common/Button';

gsap.registerPlugin(ScrollTrigger)

const Expertise = () => {

  const containerRef = useRef()

  const { rive, RiveComponent } = useRive({
    src: "/rive/expertise.riv",
    autoplay: false,
    animations: "main",
  });

  useGSAP(() => {
    if (!rive) return;

    const duration = 20;

    const sections = [
      [".left_0", ".right_0"],
      [".left_1", ".right_1"],
      [".left_2", ".right_2"],
      [".left_3", ".right_3"],
    ];

    gsap.set(sections.flat(), {
      opacity: 0,
      y: 50,
    });

    let activeIndex = -1;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "10% bottom",
      end: "bottom bottom",
      scrub: true,

      onUpdate: (self) => {
        rive.scrub("main", self.progress * duration);

        const index = Math.min(
          Math.floor(self.progress * sections.length),
          sections.length - 1
        );

        if (index === activeIndex) return;

        // Hide previous
        if (activeIndex !== -1) {
          gsap.to(sections[activeIndex], {
            opacity: 0,
            y: self.direction === 1 ? -50 : 50,
            duration: 0.5,
            stagger: 0.15,
          });
        }

        // Show current
        gsap.fromTo(
          sections[index],
          {
            opacity: 0,
            y: self.direction === 1 ? 50 : -50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.15,
          }
        );

        activeIndex = index;
      },
    });
  }, [rive]);

  return (
    <>
      <div className=" container pt-12 md:pt-24  grid grid-cols-1 bg-[#FAFBF8] md:grid-cols-6">
        <div className="md:col-span-4">
          <h2 data-para-effect className="  leading-none text-[#00689F]">Our Expertise</h2>
        </div>
        <div className="md:col-span-2 max-sm:mt-2 space-y-5 ">
          <p data-para-effect className="text-lg md:text-xl  text-[#657882]  leading-tight">
            Connecting organizations with exceptional leaders who strengthen teams, accelerate growth, and create lasting value.
          </p>
          <Button label={"Explore Our Expertise"} />
        </div>
      </div>
      <div ref={containerRef} className=' relative h-[400vh] bg-[#FAFBF8] w-full ' >
        <div className="container sticky! top-0 w-full h-screen!  overflow-hidden">
          <RiveComponent className="w-full h-full max-sm:scale-150" />

          <div className="left_1 absolute md:w-[35rem] z-10 top-[15%] md:top-[25%] left-0 padding">
            <h4 className="text-[#00689F]">CEO and Board Search</h4>
            <p className="text-[#657882] leading-tight text-lg">
              Identifying CEOs and board leaders who drive growth, lead transformation, and strengthen governance. Our search focuses on leadership capability, cultural fit, strategic vision, and proven experience.
            </p>
          </div>

          <div className="left_2 absolute md:w-[35rem] z-10 top-[15%] md:top-[25%] left-0 padding">
            <h4 className="text-[#00689F]">Talent Advisory</h4>
            <p className="text-[#657882] leading-tight text-lg">
              Providing data-driven insights to support smarter talent decisions. From compensation benchmarking to leadership assessment and workforce planning, we help organizations build future-ready teams.
            </p>
          </div>

          <div className="left_3 absolute md:w-[35rem] z-10 top-[15%] md:top-[25%] left-0 padding">
            <h4 className="text-[#00689F]">Diversity</h4>
            <p className="text-[#657882] leading-tight text-lg">
              Building diverse and inclusive leadership teams that foster innovation and stronger decision-making. We connect organizations with exceptional talent from varied backgrounds.
            </p>
          </div>

          <div className="right_1 absolute md:w-[35rem] z-10 bottom-[15%] md:bottom-[25%] max-sm:left-0 md:right-0 padding">
            <h4 className="text-[#00689F]">Talent Core</h4>
            <p className="text-[#657882] leading-tight text-lg">
              Our Talent Core practice identifies professionals who form the backbone of successful organizations. We help businesses hire leaders who deliver operational excellence and sustainable growth.
            </p>
          </div>

          <div className="right_2 absolute md:w-[35rem] z-10 bottom-[15%] md:bottom-[25%] max-sm:left-0 md:right-0 padding">
            <h4 className="text-[#00689F]">Entrepreneurial Services</h4>
            <p className="text-[#657882] leading-tight text-lg">
              Supporting startups and growth-stage businesses in building leadership teams that scale innovation. We identify entrepreneurial leaders who thrive in fast-changing environments.
            </p>
          </div>

          <div className="right_3 absolute md:w-[35rem] z-10 bottom-[15%] md:bottom-[25%] max-sm:left-0 md:right-0 padding">
            <h4 className="text-[#00689F]">PE & VC</h4>
            <p className="text-[#657882] leading-tight text-lg">
              Partnering with Private Equity and Venture Capital firms to identify leaders who maximize value. We build executive teams that drive performance and long-term growth.
            </p>
          </div>    
              </div>
      </div>
    </>
  )
}

export default Expertise