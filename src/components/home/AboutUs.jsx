"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

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
        Countries Where Searches
        <br />
        were Completed
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
        <div className="grid grid-cols-1 md:grid-cols-6 mb-12 md:mb-24">
          <div className="md:col-span-2">
            <h2 data-heading-effect className="leading-none w-fit text-[#00689F]">About Us</h2>
          </div>

          <div className="md:col-span-4 max-sm:mt-2">
            <p data-para-effect className=" text-xl md:text-3xl text-[#00689F] leading-tight">
              Founded in 2011, WalkWater Talent Advisors reimagines executive search
              for a rapidly evolving world shaped by globalization, technology, and
              startups. With deep domain expertise, global reach, and strong client
              partnerships, the firm delivers innovative leadership hiring solutions.
              Driven by a startup mindset and strong values, WalkWater creates
              meaningful, future-ready talent experiences.
            </p>
          </div>
        </div>

        <div ref={sectionRef} className="grid grid-cols-1 max-sm:gap-y-2 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {stats.map((item, index) => (
            <div key={index} className="stat-card  md:aspect-square hover:bg-[#86B039] group transition-all duration-300 hover:py-24 ">
              <div className={`h-full w-full flex flex-col justify-between max-sm:gap-y-20  p-5 border-t border-b border-black/20 group-hover:border-transparent transition-all duration-300 ${index === 0 ? "border-l" : ""} ${index !== 0 ? "border-l" : ""} ${index === stats.length - 1 ? "border-r" : ""}`}>
                <h6 data-para-effect className=" capitalize font-medium! text-[#657882] leading-tight group-hover:text-white transition-all duration-300">
                  {item.title}
                </h6>

                <p data-value={item.value} data-suffix={item.suffix} className="stat-number text-5xl md:text-6xl font-semibold text-[#00689F] group-hover:text-white transition-all duration-300">
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