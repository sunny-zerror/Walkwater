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
            <div className=" container pt-24 grid grid-cols-1 bg-[#FAFBF8] md:grid-cols-6">
                <div className="md:col-span-4">
                    <h2 data-para-effect className="  leading-none text-[#00689F]">Our Expertise</h2>
                </div>
                <div className="md:col-span-2 space-y-5 ">
                    <p data-para-effect className="text-xl text-[#657882]  leading-tight">
                        Connecting organizations with exceptional leaders who strengthen teams, accelerate growth, and create lasting value.
                    </p>
                 <Button label={"Explore Our Expertise"}/>

                </div>
            </div>
            <div ref={containerRef} className=' relative h-[400vh] bg-[#FAFBF8] w-full ' >
                <div className="container sticky! top-0 w-full h-screen!  overflow-hidden">
                    <RiveComponent className="w-full h-full" />

                    <div className=" left_1 absolute w-[35rem] z-10 top-[25%] left-0 padding">
                        <h4 className='text-[#00689F]'>CEO and Board Search</h4>
                        <p className='text-[#657882] leading-tight text-lg'>The rise of newer sectors and areas which never existed a few years ago, has made the nature of CEO’s role much more unpredictable....</p>
                    </div>

                    <div className=" left_2 absolute w-[35rem] z-10 top-[25%] left-0 padding">
                        <h4 className='text-[#00689F]'>Talent Advisory</h4>
                        <p className='text-[#657882] leading-tight text-lg'>Organizations at different stages are seeking information about talent trends, market compensation, talent related sector specific data....</p>
                    </div>

                    <div className="left_3 absolute w-[35rem] z-10 top-[25%] left-0 padding">
                        <h4 className='text-[#00689F]'>Diversity</h4>
                        <p className='text-[#657882] leading-tight text-lg'>India being a country of many languages and ethnicities makes for a very complex yet a very compelling landscape, for understanding the....</p>
                    </div>

                    <div className="right_1 absolute w-[35rem] z-10 bottom-[25%] right-0 padding">
                        <h4 className='text-[#00689F]'>Talent Core</h4>
                        <p className='text-[#657882] leading-tight text-lg'>Talent Core is WalkWater’s specialized Executive Search offering for Core Talent of the organization. Every single organization needs right....</p>
                    </div>

                    <div className="right_2 absolute w-[35rem] z-10 bottom-[25%] right-0 padding">
                        <h4 className='text-[#00689F]'>Entrepreneurial Services</h4>
                        <p className='text-[#657882] leading-tight text-lg'>Start-ups are rewriting the rules of business, finding new ways to solve old problems. Driving growth in such a set-up requires leaders who are....</p>
                    </div>

                    <div className="right_3 absolute w-[35rem] z-10 bottom-[25%] right-0 padding">
                        <h4 className='text-[#00689F]'>PE & VC</h4>
                        <p className='text-[#657882] leading-tight text-lg'>The Private Equity and Venture Capital industry has been active in India since the 1990s. With the high growth rate of India economy, the PE and VC....</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Expertise