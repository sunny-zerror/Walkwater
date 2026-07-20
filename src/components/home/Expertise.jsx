"use client";
import { useGSAP } from '@gsap/react'
import { RiArrowRightLine } from '@remixicon/react'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import React, { useRef } from 'react'
import Button from '../common/Button';

gsap.registerPlugin(ScrollTrigger)

const Expertise = () => {

  const containerRef = useRef()

  useGSAP(() => {
    // Set initial states
    gsap.set(".outer_circ", { rotate: -90, scale: 0 });
    gsap.set(".inner_circ", { scale: 0 });
    gsap.set(".last_circ_paren", { opacity: 0 });


    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom bottom",
        scrub: 1.5, // Smooth lag/interpolation
      }
    });

    // 1. Scale up the outer circles
    tl.to(".outer_circ", {
      scale: 1,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
    });

    // 2. Scale up inner circles and rotate outer circles back to 0
    tl.to(".inner_circ", {
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    }, "<+=0.3");

    tl.call(() => {
      gsap.fromTo(".pulse_ring",
        { scale: 1, opacity: 0.8 },
        { scale: 2.2, opacity: 0, duration: 1.2, ease: "power2.out" }
      );
    }, null, "<+=0.1");

    tl.to(".outer_circ", {
      rotate: 0,
      duration: 0.6,
      ease: "power2.inOut",
    }, "<");

    // 3. Highlight the grad circles
    tl.to([".grad_circle", ".pulse_ring"], {
      backgroundColor: "#86B039",
      duration: 0.4,
      ease: "power2.out",
    });

    // 4. Rotate circles to 90 and shrink inner circles
    tl.to(".outer_circ", {
      rotate: 90,
      duration: 0.6,
      ease: "power2.inOut",
    }, "+=0.2");

    tl.to(".inner_circ", {
      scale: 0,
      duration: 0.5,
      ease: "power2.inOut",
    }, "<");

    // 5. Expand outer_center circle step-by-step
    tl.to(".outer_center", {
      backgroundColor: "#86B039",
      duration: 0.3,
      ease: "power2.out",
    }, "<+=0.3");

    tl.to(".outer_center", {
      width: "35vw",
      height: "35vw",
      ease: "power2.inOut",
    }, "+=0.2");

    // 6. Transition to the final state
    tl.to(".outer_circ", {
      opacity: 0,
      duration: 0.2,
      ease: "power2.out",
    });

    tl.to(".last_circ_paren", {
      opacity: 1,
      duration: 0.2,
      ease: "power2.out",
    }, "<");

    tl.call(() => {
      gsap.fromTo(".pulse_ring_2",
        { scale: 1, opacity: 0.8 },
        { scale: 1.3, opacity: 0, duration: 1.2, ease: "power2.out" }
      );
    }, null, "<");

    // 7. Scale up the final concentric circles
    tl.to(".last_1", {
      opacity: 1,
      width: "29vw",
      height: "29vw",
      duration: 0.6,
      ease: "power2.out",
    });

    tl.to(".last_2", {
      opacity: 1,
      width: "21vw",
      height: "21vw",
      duration: 0.6,
      ease: "power2.out",
    }, "<");

    tl.to(".last_3", {
      opacity: 1,
      width: "13vw",
      height: "13vw",
      duration: 0.6,
      ease: "power2.out",
    }, "<");
  });

  useGSAP(() => {
    const sections = [
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
      start: "top top",
      end: "bottom bottom",
      scrub: 1.5,

      onUpdate: (self) => {
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
            ease: "power2.out",
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
            ease: "power2.out",
            stagger: 0.15,
          }
        );

        activeIndex = index;
      },
    });
  }, []);

  return (
    <>
      <div className=" container pt-12 md:pt-24  grid grid-cols-1 bg-white md:grid-cols-6">
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
      <div ref={containerRef} className=' relative h-[300vh] bg-white  w-full ' >
        <div className="container sticky! top-0 w-full h-screen!  overflow-hidden">

          <div className="w-full h-full max-sm:scale-150 center">
            <div className=" last_circ_paren opacity-0 size-[35vw] aspect-square border border-[#00000030] absolute flex items-end justify-center bg-[#86B039] rounded-full">
              <div className="pulse_ring_2 absolute w-full h-full rounded-full bg-[#86B039] opacity-80"></div>
              <div className=" last_1 opacity-0 size-[35vw] aspect-square border border-[#00000030] absolute bg-white/28 rounded-full"></div>
              <div className="last_2 opacity-0 size-[35vw] aspect-square border border-[#00000030] absolute rounded-full bg-white/40 "></div>
              <div className="last_3 opacity-0 size-[35vw] aspect-square border border-[#00000030] absolute rounded-full bg-white/70 "></div>
            </div>
            <div className=" outer_circ  scale-0 size-[35vw] aspect-square border border-[#00000030] absolute center rounded-full">
              <div className=" inner_circ scale-0 absolute size-[1vw] aspect-square border border-[#00000030] bg-[#ffffff] rounded-full -translate-x-[4vw] translate-y-[-17vw]"></div>
              <div className="inner_circ scale-0 absolute size-[4vw] aspect-square border border-[#00000030]  rounded-full bg-[#ffffff] grad_circle center -translate-x-[17.5vw]">
                <div className="pulse_ring absolute w-full h-full rounded-full bg-[#ffffff] opacity-80"></div>
              </div>
              <div className="inner_circ scale-0 absolute size-[4vw] aspect-square border border-[#00000030]  rounded-full bg-[#ffffff] grad_circle center translate-x-[8vw] translate-y-[15.5vw]">
                <div className="pulse_ring absolute w-full h-full rounded-full bg-[#ffffff] opacity-80"></div>
              </div>
            </div>
            <div className=" outer_circ  scale-0 size-[28vw] aspect-square border border-[#00000030] absolute center rounded-full">
              <div className="inner_circ scale-0 absolute size-[2vw] aspect-square border border-[#00000030] bg-[#ffffff] rounded-full -translate-x-[10vw] translate-y-[10vw]"></div>
              <div className="inner_circ scale-0 absolute size-[1.5vw] aspect-square border border-[#00000030] bg-[#ffffff] rounded-full translate-x-[5vw] translate-y-[-13vw]"></div>
            </div>
            <div className=" outer_circ  scale-0 size-[21vw] aspect-square border border-[#00000030] absolute center rounded-full">
              <div className=" inner_circ scale-0 absolute size-[2vw] aspect-square border border-[#00000030] rounded-full center translate-x-[9.5vw] bg-[#ffffff] grad_circle translate-y-[-4.5vw]">
                <div className="pulse_ring absolute w-full h-full rounded-full bg-[#ffffff] opacity-80"></div>
              </div>
              <div className=" inner_circ scale-0 absolute size-[1vw] aspect-square border border-[#00000030] bg-[#ffffff] rounded-full translate-x-[1.5vw] translate-y-[10.3vw]"></div>
            </div>
            <div className=" outer_circ  scale-0 size-[14vw] aspect-square border border-[#00000030] absolute center rounded-full">
              <div className="inner_circ scale-0 absolute size-[2vw] aspect-square border border-[#00000030] bg-[#ffffff] rounded-full -translate-x-[5vw] translate-y-[-4.9vw]"></div>
            </div>
            <div className=" outer_circ outer_center scale-0 size-[7vw] aspect-square border border-[#00000030] absolute center rounded-full">
              <div className="inner_circ scale-0 absolute size-[1vw] aspect-square border border-[#00000030] rounded-full center translate-y-[3.35vw] bg-[#ffffff] grad_circle translate-x-[0.5vw]">
                <div className="pulse_ring absolute w-full h-full rounded-full bg-[#ffffff] opacity-80"></div>
              </div>
            </div>
          </div>

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