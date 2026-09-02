"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Button from "../common/Button";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    title: "Clients Globally",
    value: 450,
    suffix: "+",
  },
  {
    title: (
      <>
        Leadership Searches
        <br />
        completed
      </>
    ),
    value: 1100,
    suffix: "+",
  },
  {
    title: (
      <>
        Bespoke Talent Advisory
        <br />
        studies completed
      </>
    ),
    value: 55,
    suffix: "+",
  },
  {
    title: (
      <>
        Countries Searches 
        <br />
        completed in
      </>
    ),
    value: 8,
    suffix: "",
  },
];

const AboutUs = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".stat-card");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      cards.forEach((card) => {
        const number = card.querySelector(".stat-number");

        if (!number) return;

        const target = Number(number.dataset.value);
        const suffix = number.dataset.suffix || "";

        const obj = { value: 0 };

        tl.to(
          obj,
          {
            value: target,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              number.textContent = `${Math.round(obj.value)}${suffix}`;
            },
          },
          "<0.2"
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section className=" pt-12 md:pt-24 ">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 mb-12 md:mb-24">
          <div className="">
            <h2 data-heading-effect className="  w-fit text-[#00689F]">About Us</h2>
          </div>

          <div className=" max-sm:mt-2">
            <p data-para-effect className=" text-lg md:text-xl text-[#00689F] leading-tight">
              Leadership is the capacity to translate vision into reality.</p> <br />
            <p data-para-effect className=" text-lg md:text-xl text-[#00689F] leading-tight">
              In 2011, a team of Executive Search industry leaders realized their collective vision – to rethink hiring practices for an era of unprecedented change. Globalisation, growing impact of technology and the rise of start-ups are now changing traditional notions of jobs, career stability, growth and opportunity; and most importantly changing the notions of leadership and expectations from corporate leaders. </p> <br />
            <p data-para-effect className=" text-lg md:text-xl text-[#00689F] leading-tight">
               In this new era of leadership, WalkWater Talent Advisors has emerged as one of India’s fastest growing and innovative leadership search and talent advisory firms. The WalkWater team brings a unique mix of strengths – Intensive Client Partnering, Deep Domain Knowledge and Global Coverage; this coupled with a start-up drive to excel, and a constant focus on values, provides an unparalleled experience to our clients.</p>
               <br />
              <Button label={"Know Us"} href={"/about"} />
          </div>
        </div>

        <div ref={sectionRef} className="grid grid-cols-1 max-sm:gap-y-2 md:grid-cols-4 gap-3 items-stretch">
          {stats.map((item, index) => (
            <div key={index} className="stat-card  md:aspect-square hover:bg-[#86B039] border border-black/20 rounded-lg group transition-all duration-300 overflow-hidden ">
              <div className={`h-full w-full flex flex-col justify-between max-sm:gap-y-20  p-5  group-hover:border-transparent transition-all duration-300 `}>
                <h6 data-para-effect className=" capitalize font-medium! text-[#657882] leading-tight group-hover:text-white transition-all duration-300">
                  {item.title}
                </h6>

                <p data-value={item.value} data-suffix={item.suffix} className="stat-number text-8xl md:text-6xl group-hover:text-[7.5vw] font-semibold text-[#00689F] group-hover:text-white transition-all duration-300">
                  0{item.suffix}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;