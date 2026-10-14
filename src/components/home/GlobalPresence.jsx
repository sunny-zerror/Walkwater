"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)

const locations = [
  {
    id: 1,
    city: "Bangalore",
    phone: ["+91 99720 94034", "+91 98450 93409"],
    address: "3rd Floor, Central Quay, 35/1, Yellappa Chetty Layout, Ulsoor Road, Bangalore – 560 042.",
    map: "https://www.google.com/maps?ll=12.975527,77.616141&z=13&t=m&hl=en&gl=IN&mapclient=embed&cid=8917403594044300598",
    img: "/images/homepage/global_presence/bangalore.png"
  },
  {
    id: 2,
    city: "Gurgaon",
    phone: ["+91 88006 55008"],
    address: "Suite #515, Whizdom Club by MQDC, 5th Floor, Tapasya One, Golf Course Road, Sector 53, Gurgaon – 122 022.",
    map: "https://www.google.com/maps?ll=28.436792,77.103118&z=13&t=m&hl=en&gl=IN&mapclient=embed&cid=5043732642565981673",
    img: "/images/homepage/global_presence/gurgaon.png"
  },
  {
    id: 3,
    city: "Mumbai",
    phone: ["+91 98676 63268"],
    address: "Regus, Unit No. B-501, 5th Floor, Wing ‘B’, Supreme Business Park, Supreme City, Powai, Mumbai – 400 076.",
    map: "https://www.google.com/maps?ll=19.111139,72.908617&z=13&t=m&hl=en&gl=IN&mapclient=embed&cid=2540358889807036414",
    img: "/images/homepage/global_presence/mumbai.png"
  },
  {
    id: 4,
    city: "USA",
    phone: ["+91 98452 12997"],
    address: "Pacific Workplaces, 10080 N Wolfe Rd STE SW3200, Cupertino, CA 95014-2594.",
    map: "https://www.google.com/maps/place/Pacific+Workplaces+-+Office+Space+Cupertino/@37.325611,-122.015468,2770m/data=!3m1!1e3!4m6!3m5!1s0x808fb5a6aa1ebae9:0xe9eb6f074bf1d1d1!8m2!3d37.3239277!4d-122.0130262!16s%2Fg%2F1tj73v8f?hl=en&entry=ttu&g_ep=EgoyMDI2MDgyNC4wIKXMDSoASAFQAw%3D%3D",
    img: "/images/homepage/global_presence/usa.png"
  },
  {
    id: 5,
    city: "Pune",
    phone: ["+91 98192 86785"],
    address: "Regus Magarpatta, Level-6, Pentagon Tower P-2, Magarpatta City, Hadapsar, Pune – 411 013.",
    map: "https://www.google.com/maps?ll=18.511749,73.925632&z=14&t=m&hl=en&gl=IN&mapclient=embed&cid=6447511236994343969",
    img: "/images/homepage/global_presence/pune.png"
  },
];

const GlobalPresence = () => {

  const conainerRef = useRef()

  useGSAP(() => {
    const cards = gsap.utils.toArray(".c_city_card")
    const scrollTrigger = {
      trigger: ".c_city_card_paren",
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
    const mm = gsap.matchMedia()

    // Two columns: left-column cards enter from the left, right-column cards from the right
    mm.add("(min-width: 1024px)", () => {
      gsap.from(cards, {
        x: (i) => (i % 2 === 0 ? "-3rem" : "3rem"),
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger,
      });
    })

    mm.add("(max-width: 1023px)", () => {
      gsap.from(cards, {
        y: "2.5rem",
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger,
      });
    })

    return () => mm.revert()
  }, { scope: conainerRef })

  return (
    <div ref={conainerRef} className="w-full bg-white py-section">
      <div className="container h-fit! space-y-stack">

        <div className="text-center space-y-title">
          <h2 data-heading-effect className="w-fit mx-auto leading-none text-[#00689F]">
            Global Presence
          </h2>
          <p data-para-effect className="section-desc text-[#657882]">
            Five offices across India and the US, with leadership searches completed in 10+ countries.
          </p>
        </div>

        <div className="c_city_card_paren grid grid-cols-1 lg:grid-cols-2 gap-grid">
          {locations.map((loc) => (
            <a
              key={loc.id}
              href={loc.map}
              target="_blank"
              rel="noopener noreferrer"
              className="c_city_card bg-[#F7F8FF] border border-[#00689F20] hover:bg-[#86B039] rounded-2xl p-card flex gap-4 md:gap-5 relative overflow-hidden group transition-colors duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="relative size-24 md:size-32 shrink-0 rounded-lg overflow-hidden bg-[#e2e8f0]">
                <Image
                  src={loc.img}
                  fill
                  sizes="128px"
                  alt={loc.city}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between pr-10 min-w-0">
                <div className="">
                <h5 className="text-[#00689F] transition-colors duration-300 group-hover:text-white mb-1">
                  {loc.city}
                </h5>
                <p className="text-[#00689F] text-sm transition-colors duration-300 group-hover:text-white mb-3 flex flex-wrap gap-x-4">
                  {loc.phone.map((num) => (
                    <span
                      key={num}
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = `tel:${num.replace(/\s/g, "")}`; }}
                      className="hover:underline cursor-pointer"
                    >
                      {num}
                    </span>
                  ))}
                </p>
                </div>
                <p className="text-[#657882] text-xs md:text-sm leading-relaxed transition-colors duration-300 group-hover:text-[#EDEDED]">
                  {loc.address}
                </p>
              </div>

              {/* Map Icon */}
              <div className="absolute top-3 right-3 md:top-4 md:right-4 size-7 rounded-md overflow-hidden center transition-transform duration-300 group-hover:scale-110">
                <img src="/icons/map_bg.svg" className="absolute inset-0 size-full object-cover" alt="" />
                <img src="/icons/location_target.svg" className="relative w-3.5" alt="" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalPresence;
