"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Button from "../common/Button";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { title: "Client Relationships", value: 500, suffix: "+" },
  { title: "Leaders Placed", value: 1200, suffix: "+" },
  { title: "Talent Advisory Studies", value: 55, suffix: "+" },
  { title: "Countries Searched In", value: 10, suffix: "+" },
];

const AboutUs = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".stat-card");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
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
              number.textContent = `${Math.round(obj.value).toLocaleString("en-US")}${suffix}`;
            },
          },
          "<0.2"
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="about" className="py-section scroll-mt-header">
      <div className="container">
        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
          <h2 data-heading-effect className="text-[#00689F]">
            “Leadership is the capacity to translate vision into reality.”
          </h2>
          <p data-para-effect className="mt-title text-base md:text-lg text-[#657882] leading-snug">
            In 2011, a team of executive search leaders set out to rethink leadership hiring for an era of rapid change. Today, WalkWater Talent Advisors is one of India&apos;s fastest-growing and most innovative leadership search and talent advisory firms, built on intensive client partnering, deep domain knowledge and global coverage.
          </p>
          <Button label={"Read More"} href={"/about"} className="mt-8 rounded-full! pl-4!" />
        </div>
      </div>

      <div ref={sectionRef} className="relative mt-stack overflow-x-clip">
        <img
          src="/images/homepage/wave_img.svg"
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 opacity-30 -translate-x-1/2 -translate-y-1/2 w-full min-w-225 h-auto pointer-events-none select-none"
        />
        <div className="container relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-3">
            {stats.map((item, index) => (
              <div key={index} className="stat-card flex flex-col items-center text-center">
                <p
                  data-value={item.value}
                  data-suffix={item.suffix}
                  className="stat-number text-5xl md:text-6xl font-semibold text-[#00689F]"
                >
                  0{item.suffix}
                </p>
                <h6 className="mt-3 md:mt-5 font-normal! text-[#657882]">
                  {item.title}
                </h6>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
