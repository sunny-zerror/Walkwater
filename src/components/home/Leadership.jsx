"use client";
import { RiArrowRightLine, RiAddLine, RiCloseLine, RiLinkedinFill, RiFacebookFill } from "@remixicon/react";
import Image from "next/image";
import React, { useState, useRef } from "react";
import Button from "../common/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
gsap.registerPlugin(ScrollTrigger)

const teamData = [
  {
    id: 1,
    name: "Harold Dsouza",
    role: "Co-Founder & Director",
    desc: "Harold brings over two decades of leadership and executive search experience, partnering with organizations to identify exceptional talent for critical leadership roles. ",
    img: "/images/homepage/leadership/harold.png",
  },
  {
    id: 2,
    name: "Rahul Shah",
    role: "Co-Founder & Director",
    desc: "Rahul brings over two decades of leadership and executive search experience, partnering with organizations to identify exceptional talent for critical leadership roles. ",
    img: "/images/homepage/leadership/rahul.png",
  },
  {
    id: 3,
    name: "Kunal Girap",
    role: "Co-Founder & Director",
    desc: "Kunal has extensive experience in leadership hiring and has successfully built teams for various fast-growing organizations.",
    img: "/images/homepage/leadership/kunal.png",
  },
  {
    id: 4,
    name: "Ashutosh Khanna",
    role: "Co-Founder & Director",
    desc: "Ashutosh specializes in building leadership teams for emerging businesses and has a deep understanding of the talent landscape.",
    img: "/images/homepage/leadership/ashutosh.png",
  },
];

const Leadership = () => {
  const [expanded, setExpanded] = useState(null);
  const containerRef = useRef(null);
  const tl = useRef(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const toggleExpand = contextSafe((id) => {
    const nextExpanded = expanded === id ? null : id;

    if (tl.current) tl.current.kill();
    tl.current = gsap.timeline();

    const shiftContainer = nextExpanded === 4 || nextExpanded === 3;
    tl.current.to('.slider-container', {
      x: shiftContainer ? '-25%' : '0%',
      duration: 0.7,
      ease: "power2.inOut"
    }, 0);

    teamData.forEach((member) => {
      const isExpanded = nextExpanded === member.id;
      const isInactive = nextExpanded !== null && !isExpanded;

      tl.current.to(`.card-${member.id}`, {
        delay: isExpanded ? 0.1 : 0,
        width: isExpanded ? '50%' : '25%',
        padding: isExpanded ? '1.25rem' : '0.625rem',
        backgroundColor: isExpanded ? '#ffffff30' : 'rgba(255,255,255,0)',
        opacity: isInactive ? 0.5 : 1,
        filter: isInactive ? 'blur(2px)' : 'blur(0px)',
        duration: 0.6,
        ease: "power2.inOut"
      }, 0);

      tl.current.to(`.img-container-${member.id}`, {
        delay: isExpanded ? 0 : 0.1,
        width: isExpanded ? '25%' : '100%',
        backgroundColor: isExpanded ? '#ffffff50' : '#ffffff30',
        duration: 0.6,
        ease: "power2.inOut"
      }, 0);

      tl.current.to(`.desc-${member.id}`, {
        opacity: isExpanded ? 1 : 0,
        pointerEvents: isExpanded ? 'auto' : 'none',
        duration: 0.3,
        ease: "power2.inOut"
      }, isExpanded ? 0.5 : 0);

      tl.current.to(`.icon-${member.id}`, {
        rotation: isExpanded ? 45 : 0,
        duration: 0.3,
        ease: "power2.inOut"
      }, 0);
    });

    setExpanded(nextExpanded);
  });

  useGSAP(() => {
    gsap.to(".spin-ellipse-left", {
      rotation: "+=360",
      duration: 25,
      repeat: -1,
      ease: "none"
    });

    gsap.to(".spin-ellipse-right", {
      rotation: "-=360",
      duration: 25,
      repeat: -1,
      ease: "none"
    });

    let mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.from(".mem_card", {
        xPercent: 100,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".mem_card",
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });
    });
    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <div className="w-full bg-[#00689F] py-12 md:py-24 overflow-hidden  relative" ref={containerRef}>

      <div className="spin-ellipse-left w-[40vw] z-10 absolute left-[-15%] top-[-35%] rotate-45 aspect-square border opacity-20 border-white rounded-full center">
        <div className="size-5 rounded-full bg-[#00689F] border border-white absolute right-0 translate-x-2.5 ">
        </div>
        <div className="size-5 rounded-full bg-[#00689F] border border-white absolute left-0 -translate-x-2.5 ">
        </div>
      </div>
      <div className="spin-ellipse-right w-[40vw] z-10 absolute right-[-15%] bottom-[-35%] -rotate-45 aspect-square opacity-50 border border-white rounded-full center">
        <div className="size-5 rounded-full bg-white border border-white/40 absolute left-0 -translate-x-2.5 shadow-[0_0_15px_#ffffff,0_0_30px_#ffffff,0_0_45px_rgba(255,255,255,0.8)]">
          <div className="absolute -inset-2 rounded-full bg-white/50 blur-md pointer-events-none"></div>
        </div>
        <div className="size-5 rounded-full bg-white border border-white/40 absolute right-0 translate-x-2.5 shadow-[0_0_15px_#ffffff,0_0_30px_#ffffff,0_0_45px_rgba(255,255,255,0.8)]">
          <div className="absolute -inset-2 rounded-full bg-white/50 blur-md pointer-events-none"></div>
        </div>
      </div>

      <div className="container z-50 mx-auto px-4  space-y-16">

        <div className="grid grid-cols-1 md:grid-cols-6 relative z-10">
          <div className="md:col-span-4">
            <h2 data-para-effect className="text-4xl md:text-5xl   leading-none text-white">
              Our Leadership
            </h2>
          </div>
          <div className="md:col-span-2 max-sm:mt-2 space-y-5">
            <p data-para-effect className="text-lg md:text-xl text-white leading-tight">
              Led by industry veterans, our founding team combines deep expertise, strategic insight, and a shared vision to redefine leadership hiring.
            </p>
            <Button label={"Meet the Team"} theme="light" />
          </div>
        </div>
        {/* DESKTOP */}
        <div className="hidden md:block w-full overflow-hidden z-50 relative">
          <div className="slider-container w-full flex">
            {teamData.map((member) => {
              return (
                <div
                  key={member.id}
                  className={` mem_card card-${member.id} relative rounded-xl p-2.5 w-[25%] shrink-0 flex flex-col justify-between overflow-hidden`}
                >
                  <div className=" w-full flex items-start">
                    <div
                      onClick={() => toggleExpand(member.id)}
                      className={`img-container-${member.id} cursor-pointer relative rounded-xl w-full bg-[#ffffff30] shrink-0 overflow-hidden aspect-3/3.5`}
                    >
                      <Image
                        src={member.img}
                        alt={member.name}
                        fill
                        className="cover hover:scale-105 transition-all duration-300"
                      />
                    </div>
                    <div
                      className={`h-full flex pl-5 flex-col justify-center`}
                    >
                      <div className={`desc-${member.id} h-full flex flex-col justify-center opacity-0 pointer-events-none`}>
                        <p className="text-white text-base  mb-6">
                          {member.desc}
                        </p>
                        <div className="flex gap-3 mt-auto">
                          <button className="bg-white/10 flex items-center gap-x-1 hover:bg-white/30 text-white px-4 py-2 rounded-md text-sm   transition-colors">
                            <RiLinkedinFill size={16} /> LinkedIn
                          </button>
                          <button className="bg-white/10 flex items-center gap-x-1 hover:bg-white/30 text-white px-4 py-2 rounded-md text-sm   transition-colors">
                            <RiFacebookFill size={16} /> Facebook
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="mt-2 w-full flex justify-between text-white items-center">
                    <div className="flex flex-col">
                      <h5 className="text-white  whitespace-nowrap">
                        {member.name}
                      </h5>
                      <p className="text-white/80 text-sm whitespace-nowrap">{member.role}</p>
                    </div>
                    <button
                      onClick={() => toggleExpand(member.id)}
                      className={`w-8 h-8 rounded-md group bg-white text-[#00689F] shrink-0 flex items-center justify-center transition-all duration-300 z-10`}
                    >
                      <div className="group-hover:rotate-90 transition-all duration-300">
                        <RiAddLine size={20} className={`icon-${member.id}`} />
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* MOBILE SWIPER */}
        <div className="md:hidden w-full relative z-50">
          <Swiper
            slidesPerView={1.1}
            spaceBetween={16}
            className="w-full"
          >
            {teamData.map((member) => (
              <SwiperSlide key={member.id} className="h-auto!">
                <div className="bg-[#ffffff20] rounded-2xl w-full flex flex-col p-5 overflow-hidden h-full">
                  <div className="">
                    <div className="w-full bg-[#ffffff50] aspect-square relative rounded-xl overflow-hidden shrink-0">
                      <Image fill src={member.img} className='object-cover' alt={member.name} />
                    </div>
                    <div className="mt-4">
                      <h4 className="text-white leading-none">{member.name}</h4>
                      <p className="text-white/80 text-sm mb-4">{member.role}</p>
                      <p className="text-white leading-tight mb-6 flex-1">
                        {member.desc}
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex-1 flex items-end gap-x-2">
                    <button className="bg-white/10 flex h-fit items-center justify-center w-[48%] gap-x-1 hover:bg-white/30 text-white py-2.5 rounded-md text-sm transition-colors">
                      <RiLinkedinFill size={16} /> LinkedIn
                    </button>
                    <button className="bg-white/10 flex h-fit items-center justify-center w-[48%] gap-x-1 hover:bg-white/30 text-white py-2.5 rounded-md text-sm transition-colors">
                      <RiFacebookFill size={16} /> Facebook
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Leadership;
