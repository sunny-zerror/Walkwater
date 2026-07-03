"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { RiMapPinLine, RiDirectionLine } from "@remixicon/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)

const locations = [
  {
    id: 1,
    city: "Bangalore",
    phone: "+91 99720 94034",
    address: "3rd Floor, Central Quay 35/1, Yellappa Chetty Layout Ulsoor Road. Bangalore – 560 042.",
    img: "/images/homepage/global_presence/bangalore.png" // placeholder
  },
  {
    id: 2,
    city: "Mumbai",
    phone: "+91 98676 63268",
    address: "Regus, Unit No. B-501, 5th floor Wing 'B' Supreme Business Park Supreme City, Powai. Mumbai – 400 076.",
    img: "/images/homepage/global_presence/mumbai.png"
  },
  {
    id: 3,
    city: "Pune",
    phone: "+91 97654 08907",
    address: "Regus Magarpatta, Level-6 Pentagon Tower P-2 Magarpatta City, Hadapsar. Pune – 411 013.",
    img: "/images/homepage/global_presence/pune.png"
  },
  {
    id: 4,
    city: "Gurgaon",
    phone: "+91 88006 55008",
    address: "Suite #515, Whizdom Club by MQDC 5th Floor, Tapasya One Golf Course Road, Sector 53 Gurgaon – 122022.",
    img: "/images/homepage/global_presence/gurgaon.png"
  },
  {
    id: 5,
    city: "USA",
    phone: "+91 98452 12997",
    address: "Pacific Workplaces 10080 N Wolfe Rd STE SW3200 Cupertino. CA 95014-2594.",
    img: "/images/homepage/global_presence/usa.png"
  }
];

const GlobalPresence = () => {

  const conainerRef = useRef()

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".c_city_card_paren",
        start: "5% bottom",
        end: "bottom bottom",
        scrub: true,
      }
    })

    tl.from(".c_city_card", {
      x: 400,
      y: 200,
      rotate: 15,
      stagger: 0.5,
    });

  }, { scope: conainerRef })

  return (
    <div ref={conainerRef} className="w-full bg-white pt-24">
      <div className=" c_city_card_paren container h-[74rem]!   grid grid-cols-2">

        <div className="sticky h-fit top-24 pb-20 space-y-5 pr-20">
          <div className="md:col-span-4">
            <h2 data-para-effect className="text-4xl md:text-5xl   leading-none text-[#00689F]">
              Global Presence
            </h2>
          </div>
          <div className="md:col-span-2 space-y-5">
            <p data-para-effect className="text-xl text-[#657882] leading-tight">
              Led by industry veterans, our founding team combines deep expertise, strategic insight, and a shared vision to redefine leadership hiring
            </p>
          </div>
        </div>

        <div className="space-y-4 overflow-hidden">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="c_city_card bg-[#F7F8FF] border border-[#00689F20] hover:bg-[#86B039] rounded-2xl p-4 flex  gap-4 md:gap-6 relative overflow-hidden group transition-all duration-300 "
            >
              {/* Image */}
              <div className="relative w-32 h-32 md:w-44 md:h-44 shrink-0 rounded-xl overflow-hidden bg-gray-200">
                <Image
                  src={loc.img}
                  fill
                  alt={loc.city}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Fallback dummy background just in case image doesn't load */}
                <div className="absolute inset-0 bg-[#e2e8f0] -z-10"></div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between pr-10">
                <div className="">

                  <h3 className="text-xl md:text-2xl   text-[#00689F]  transition-all duration-300 group-hover:text-white mb-1">
                    {loc.city}
                  </h3>
                  <p className="text-[#00689F] text-sm  transition-all duration-300 group-hover:text-white   mb-3">
                    {loc.phone}
                  </p>
                </div>
                <p className="text-[#657882]  transition-all duration-300 group-hover:text-[#EDEDED]">
                  {loc.address}
                </p>
              </div>

              {/* Map Icon */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[#00689F] group-hover:bg-white group-hover:text-[#86B039] flex items-center justify-center text-white transition-all duration-300">
                <RiDirectionLine size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalPresence;
