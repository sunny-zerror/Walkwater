"use client";
import { RiArrowRightLine, RiAddLine, RiCloseLine, RiLinkedinFill, RiFacebookFill } from "@remixicon/react";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
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
    name: "Harold D'Souza",
    role: "Co-Founder & Director",
    desc: [
      "Harold has worked in the Executive Search industry since 1998 , when the industry was still developing into an important part of the corporate world. He has been part of the evolution of the search industry and over the last two decades has contributed to its current stature and positioning.",
      "Before co-founding WalkWater, he was responsible for building the Technology Industry Practice in India for Accord Group India and DHR International. Earlier experiences has been with E&Y and PSS. His key expertise is building revenue and profit generating search businesses from scratch; and developing long standing relationships with leaders, across industry sectors.",
      "A special area of focus is Indian Business Houses and entrepreneur driven companies. Harold also leads CEO and leadership searches, especially in Technology and related sectors. He also works closely with many start-ups and founders.",
      "Harold is a firm believer in the power of instinct in personal and professional life. He is also an avid foodie, loves to cook and travel; and a keen squash player. He is also a non-fiction book lover and owns a huge collection of books at his home in Bangalore."
    ],
    img: "/images/homepage/leadership/harold.png",
  },
  {
    id: 2,
    name: "Rahul Shah",
    role: "Co-Founder & Director",
    desc: [
      "Rahul brings more than 20 years of industry experience, out of which, he has spent more than 17 years in the Executive Search industry. After his MBA, he worked for close to 3 years in the Steel Industry with Usha Martin and then moved to the Executive Search industry with ABC Consultants. He spent more than 9 years with ABC Consultants and was last designated as an Executive Director responsible for running the Bangalore office, the 3rd largest office by revenues.",
      "As Co-Founder of WalkWater, he personally leads Senior Searches across sectors, with a sectoral specialisation in the Consumer, Pharma and Industrial sectors. In this exciting career, he has had the opportunity of working as a Trusted Talent Advisor with senior candidates and with a variety of clients across sectors – large Indian Conglomerates, Blue Chip MNCs, Emerging Companies and Mid-sized firms.",
      "He is an Instrumentation Engineer from Bangalore University and has completed his MBA from XIM, Bhubaneswar. He is certified in Personal Profile Analysis from Thomas International.",
      "Outside work, he is a biker and loves to travel and watch movies."
    ],
    img: "/images/homepage/leadership/rahul.png",
  },
  {
    id: 3,
    name: "Kunal Girap",
    role: "Co-Founder & Director",
    desc: [
      "With over two decades of experience, Kunal leads senior searches across multiple sectors and is a trusted advisor to global business leaders in the Industry. He leads the Automotive, Aerospace & Defense, Process & Infrastructure practices for the firm with teams spread across India & US. Kunal is also architecting WalkWater’s digital journey and is passionate about technology and its impact on the executive search process.",
      "He has multifaceted background in Project Management, Industrial Sales & Marketing, Manufacturing and Consulting that enables him to relate with candidates and clients across diverse sectors. Kunal worked with Tyco International, Hindalco and ABC Consultants before Co-founding WalkWater.",
      "A graduate in Mechanical Engineering and Executive Management Program from IIM Bangalore, Kunal is a sports & fitness enthusiast and plays active club cricket in Mumbai. Kunal is a Rotarian and quite passionate about giving it back to the society through the Rotary platform."
    ],
    img: "/images/homepage/leadership/kunal.png",
  },
  {
    id: 4,
    name: "Ashutosh Khanna",
    role: "Co-Founder & Director",
    desc: [
      "Ashu has more than 20 years of experience out of which he has spent 18+ years in the Executive Search industry. Before co-founding WalkWater, Ashu led the Technology Practice at Korn/Ferry FutureStep. During his career in the industry, he has successfully partnered with numerous organisations on building their leadership team across India, US, Europe and South East Asia. He has had the privilege to work with well-known Leaders of large firms (MNC/ Indian) as well as Founders of Startup organizations across Technology and Consumer sectors.",
      "With PGD in International Business from Symbiosis, Mechanical Engineering from Bangalore University and Diploma in Consumer Protection Laws, Ashu is also certified in Competency based interviewing from SHL and Right Management, Personality Profiling from Thomas International and Coaching Skills by Results Coaching, Australia.",
      "Besides work, he loves to read, play, travel and do long distance running."
    ],
    img: "/images/homepage/leadership/ashutosh.png",
  },
];

const ModalWrapper = ({ isOpen, onClose, children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cachedChildren, setCachedChildren] = useState(children);

  useEffect(() => {
    if (isOpen) {
      setCachedChildren(children);
    }
  }, [isOpen, children]);

  useEffect(() => {
    let timeoutId;
    if (isOpen) {
      setIsMounted(true);
      timeoutId = setTimeout(() => setIsVisible(true), 50); // 50ms ensures browser paints initial state
    } else {
      setIsVisible(false);
      timeoutId = setTimeout(() => setIsMounted(false), 300);
    }
    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  if (!isMounted) return null;

  return (
    <div className={`fixed inset-0 z-[100000] flex items-center justify-center p-4 transition-all duration-300 ${isVisible ? "bg-[#ffffff]/30 backdrop-blur-sm opacity-100 visible" : "bg-[#ffffff]/0 backdrop-blur-none opacity-0 invisible"}`}>
      <div className="absolute inset-0 cursor-pointer" onClick={onClose}></div>
      <div className={`bg-[#00689F] border border-white/20 relative z-10 w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 md:p-10 flex flex-col md:flex-row gap-8 shadow-2xl transition-all duration-300 transform ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
        {cachedChildren}
      </div>
    </div>
  );
};

const Leadership = () => {
  const containerRef = useRef(null);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const activeLeader = teamData.find(m => m.id === selectedLeader);

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
      gsap.to(".mem_card", {
        transform: "translateX(0)",
        opacity: 1,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".mem_card",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });
    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <div className="w-full bg-[#00689F] py-12 md:py-24 overflow-hidden relative" ref={containerRef}>
      <div className="spin-ellipse-left w-[40vw] z-10 absolute left-[-15%] top-[-35%] rotate-45 aspect-square border opacity-20 border-white rounded-full center">
        <div className="size-5 rounded-full bg-[#00689F] border border-white absolute right-0 translate-x-2.5 "></div>
        <div className="size-5 rounded-full bg-[#00689F] border border-white absolute left-0 -translate-x-2.5 "></div>
      </div>
      <div className="spin-ellipse-right w-[40vw] z-10 absolute right-[-15%] bottom-[-35%] -rotate-45 aspect-square opacity-50 border border-white rounded-full center">
        <div className="size-5 rounded-full bg-white border border-white/40 absolute left-0 -translate-x-2.5 shadow-[0_0_15px_#ffffff,0_0_30px_#ffffff,0_0_45px_rgba(255,255,255,0.8)]">
          <div className="absolute -inset-2 rounded-full bg-white/50 blur-md pointer-events-none"></div>
        </div>
        <div className="size-5 rounded-full bg-white border border-white/40 absolute right-0 translate-x-2.5 shadow-[0_0_15px_#ffffff,0_0_30px_#ffffff,0_0_45px_rgba(255,255,255,0.8)]">
          <div className="absolute -inset-2 rounded-full bg-white/50 blur-md pointer-events-none"></div>
        </div>
      </div>

      <div className=" px-0! z-50 space-y-16 relative">
        <div className=" container h-fit! grid grid-cols-1  md:grid-cols-2 relative z-10">
          <div className=" ">
            <h2 data-heading-effect className="w-fit leading-none text-white">
              Our Leadership
            </h2>
          </div>
          <div className="  max-sm:mt-2 space-y-5">
            <p data-para-effect className="text-lg md:text-xl text-white leading-tight">
              Led by industry veterans, our founding team combines deep expertise, strategic insight, and a shared vision to redefine leadership hiring.
            </p>
            <Button label={"Meet the Team"} theme="light" />
          </div>
        </div>

        {/* DESKTOP GRID */}
        <div className=" container  h-fit! hidden md:grid grid-cols-4 gap-6 w-full z-50 relative">
          {teamData.map((member) => (
            <div
              key={member.id}
              onClick={() => setSelectedLeader(member.id)}
              className="mem_card translate-x-full opacity-0 group cursor-pointer  rounded-xl  flex flex-col justify-between"
            >
              <div className="w-full aspect-[3/3.5] relative  bg-[#3084B1] rounded-xl overflow-hidden mb-4">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <h5 className="text-white whitespace-nowrap">{member.name}</h5>
                  <p className="text-white/80 text-sm">{member.role}</p>
                </div>
                <div className="w-8 h-8 rounded-md bg-[#ffffff] text-[#00689F] shrink-0 flex items-center justify-center transition-all duration-300 group-hover:bg-transparent border border-transparent group-hover:border-white group-hover:text-white">
                  <RiAddLine className="size-4 group-hover:rotate-180 transition-all duration-300 leading-none origin-center" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE SWIPER */}
        <div className="md:hidden w-full relative z-50">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {teamData.map((member) => (
              <div 
                key={member.id} 
                className="snap-center shrink-0 w-[80vw] h-auto"
              >
                <div
                  onClick={() => setSelectedLeader(member.id)}
                  className=" bg-[#ffffff15] rounded-2xl w-full flex flex-col p-4 h-full cursor-pointer"
                >
                  <div className="w-full aspect-square relative rounded-xl overflow-hidden mb-4">
                    <Image fill src={member.img} className="object-cover" alt={member.name} />
                  </div>
                  <div className="flex justify-between items-end mt-auto">
                    <div>
                      <h4 className="text-white leading-tight">{member.name}</h4>
                      <p className="text-white/80 text-sm">{member.role}</p>
                    </div>
                    <div className="w-8 h-8 rounded-md bg-white text-[#00689F] shrink-0 flex items-center justify-center">
                      <RiAddLine  className="size-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OVERLAY MODAL */}
      <ModalWrapper isOpen={!!selectedLeader} onClose={() => setSelectedLeader(null)}>
        {activeLeader && (
          <>
            <button
              onClick={() => setSelectedLeader(null)}
              className="absolute top-4 right-4  w-10 h-10 bg-white/10 hover:bg-white hover:text-[#3084B1] text-white rounded-full flex items-center justify-center transition-colors duration-300"
            >
              <RiCloseLine size={24} />
            </button>

            <div className="w-full md:w-[30%] shrink-0 ">
              <div className="w-full max-sm:hidden aspect-[3/3.5] relative rounded-2xl overflow-hidden bg-[#3084B1]">
                <Image fill src={activeLeader.img} className="object-cover" alt={activeLeader.name} />
              </div>
              <h4 className="text-white mt-4">{activeLeader.name}</h4>
              <p className="text-white/80">{activeLeader.role}</p>

            </div>

            <div className="w-full md:w-[70%] pr-5 flex flex-col">

              <div className="text-white/90 text-sm md:text-base space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {activeLeader.desc.map((para, i) => (
                  <p key={i} className="">{para}</p>
                ))}
              </div>

              {/* <div className="flex flex-wrap gap-4 mt-8 shrink-0">
                <button className="bg-white/10 flex items-center gap-x-2 hover:bg-white/30 text-white px-5 py-2.5 rounded-lg text-sm transition-colors">
                  <RiLinkedinFill size={18} /> LinkedIn
                </button>
                <button className="bg-white/10 flex items-center gap-x-2 hover:bg-white/30 text-white px-5 py-2.5 rounded-lg text-sm transition-colors">
                  <RiFacebookFill size={18} /> Facebook
                </button>
              </div> */}
            </div>
          </>
        )}
      </ModalWrapper>
    </div>
  );
};

export default Leadership;
