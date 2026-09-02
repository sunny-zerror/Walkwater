"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { RiMapPinLine, RiDirectionLine } from "@remixicon/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
gsap.registerPlugin(ScrollTrigger)

const locations = [
  {
    id: 1,
    city: "Bangalore",
    phone: "+91 99720 94034, +91 98450 93409",
    address: "3rd Floor, Central Quay 35/1, Yellappa Chetty Layout Ulsoor Road. Bangalore – 560 042.",
    map: "https://www.google.com/maps?ll=12.975527,77.616141&z=13&t=m&hl=en&gl=IN&mapclient=embed&cid=8917403594044300598",
    img: "/images/homepage/global_presence/bangalore.png" // placeholder
  },
  {
    id: 2,
    city: "Mumbai",
    phone: "+91 98676 63268",
    address: "Regus, Unit No. B-501, 5th floor Wing 'B' Supreme Business Park Supreme City, Powai. Mumbai – 400 076.",
    map: "https://www.google.com/maps?ll=19.111139,72.908617&z=13&t=m&hl=en&gl=IN&mapclient=embed&cid=2540358889807036414",
    img: "/images/homepage/global_presence/mumbai.png"
  },
  {
    id: 3,
    city: "Pune",
    phone: "91 98192 86785",
    address: "Regus Magarpatta, Level-6 Pentagon Tower P-2 Magarpatta City, Hadapsar. Pune – 411 013.",
    map: "https://www.google.com/maps?ll=18.511749,73.925632&z=14&t=m&hl=en&gl=IN&mapclient=embed&cid=6447511236994343969",
    img: "/images/homepage/global_presence/pune.png"
  },
  {
    id: 4,
    city: "Gurgaon",
    phone: "+91 88006 55008",
    address: "Suite #515, Whizdom Club by MQDC 5th Floor, Tapasya One Golf Course Road, Sector 53 Gurgaon – 122022.",
    map: "https://www.google.com/maps?ll=28.436792,77.103118&z=13&t=m&hl=en&gl=IN&mapclient=embed&cid=5043732642565981673",
    img: "/images/homepage/global_presence/gurgaon.png"
  },
  {
    id: 5,
    city: "USA",
    phone: "+91 98452 12997",
    address: "Pacific Workplaces 10080 N Wolfe Rd STE SW3200 Cupertino. CA 95014-2594.",
    map: "https://www.google.com/maps/place/Pacific+Workplaces+-+Office+Space+Cupertino/@37.325611,-122.015468,2770m/data=!3m1!1e3!4m6!3m5!1s0x808fb5a6aa1ebae9:0xe9eb6f074bf1d1d1!8m2!3d37.3239277!4d-122.0130262!16s%2Fg%2F1tj73v8f?hl=en&entry=ttu&g_ep=EgoyMDI2MDgyNC4wIKXMDSoASAFQAw%3D%3D",
    img: "/images/homepage/global_presence/usa.png"
  }
];

const GlobalPresence = () => {

  const conainerRef = useRef()

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.set(".c_city_card", {
        x: 400,
        y: 200,
        rotate: 15,
        stagger: 0.5,
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".c_city_card_paren",
          start: "10% bottom",
          end: "bottom bottom",
          scrub: true,
        }
      });

      tl.to(".c_city_card", {
        x: 0,
        y: 0,
        rotate: 0,
        stagger: 0.5,
      });
    });

    return () => mm.revert();
  }, { scope: conainerRef })

  return (
    <div ref={conainerRef} className="w-full bg-white pt-12 md:pt-24  pb-10 md:pb-0">
      <div className=" c_city_card_paren container flex flex-col md:grid md:grid-cols-2 md:h-[74rem]! gap-10 md:gap-0">

        <div className="md:sticky h-fit md:top-24 md:pb-20 space-y-2 md:pr-20">
          <div className=" ">
            <h2 data-heading-effect className="w-fit     text-[#00689F]">
              Global Presence
            </h2>
          </div>
          <div className="  space-y-5">
            <p data-para-effect className="text-lg md:text-xl  text-[#657882] leading-tight">
              Led by industry veterans, our founding team combines deep expertise, strategic insight, and a shared vision to redefine leadership hiring.
            </p>
          </div>
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden md:block space-y-4 overflow-hidden">
          {locations.map((loc) => (
            <a
              key={loc.id}
              href={loc.map}
              target="_blank"
              rel="noopener noreferrer"
              className="c_city_card bg-[#F7F8FF] border border-[#00689F20] hover:bg-[#86B039] rounded-2xl p-4 flex gap-4 md:gap-6 relative overflow-hidden group transition-colors duration-300 cursor-pointer block"
            >
              {/* Image */}
              <div className="relative w-32 h-32 md:w-44 md:h-44 shrink-0 rounded-xl overflow-hidden bg-gray-200">
                <Image
                  src={loc.img}
                  fill
                  alt={loc.city}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#e2e8f0] -z-10"></div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between pr-10">
                <div className="">
                  <h5 className=" text-[#00689F]  transition-all duration-300 group-hover:text-white mb-1">
                    {loc.city}
                  </h5>
                  <p className="text-[#00689F] text-sm  transition-all duration-300 group-hover:text-white   mb-3">
                    {loc.phone}
                  </p>
                </div>
                <p className="text-[#657882]  transition-all duration-300 group-hover:text-[#EDEDED]">
                  {loc.address}
                </p>
              </div>

              {/* Map Icon */}
              <div className="absolute top-4 border-2 border-white right-4 w-8 h-8 rounded-lg center text-white transition-all duration-300 group-hover:scale-125">
                <img src="/icons/map_bg.svg" className="absolute inset-0 z-[-1]" alt="" />
                <img src="/icons/location_target.svg" className="" alt="" />
              </div>
            </a>
          ))}
        </div>

        {/* MOBILE SWIPER */}
      </div>
      <div className="md:hidden max-sm:mt-10 w-full overflow-hidden">
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="snap-center shrink-0 w-[80vw] h-auto"
            >
              <a
                href={loc.map}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F7F8FF] border border-[#00689F20] rounded-2xl flex flex-col overflow-hidden relative group h-full cursor-pointer block transition-all duration-300"
              >
                <div className="w-full aspect-video relative shrink-0">
                  <Image
                    src={loc.img}
                    fill
                    alt={loc.city}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[#e2e8f0] -z-10"></div>
                </div>
                <div className="p-6 flex w-full flex-col gap-2 flex-1">
                  <div className="flex justify-between items-start w-full">
                    <div  className="w-full">
                      <div className="flex w-full  justify-between">
                      <h4 className=" text-[#00689F] ">{loc.city}</h4>
                    <div className=" bg-[#00689F] w-8 h-8 rounded-lg center text-white transition-all duration-300 group-hover:scale-125">
                      <img src="/icons/map_bg.svg" className="absolute inset-0 z-[-1]" alt="" />
                      <img src="/icons/location_target.svg" className="w-4" alt="" />
                    </div>

                      </div>
                      <p className="text-[#00689F] text-base font-semibold">{loc.phone}</p>
                    </div>
                  </div>
                  <p className="text-[#657882] leading-relaxed mt-2">{loc.address}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalPresence;
