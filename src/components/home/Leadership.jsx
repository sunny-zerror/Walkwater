"use client";
import { RiArrowRightLine, RiAddLine, RiCloseLine, RiLinkedinFill, RiFacebookFill } from "@remixicon/react";
import Image from "next/image";
import React, { useState } from "react";
import Button from "../common/Button";

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
    desc: "Rahul brings over two decades of leadership and executive search experience, partnering with organizations to identify exceptional talent for critical leadership roles. As Co-Founder of WalkWater Talent Advisors, he leads strategic search mandates across industries and geographies.",
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

  const toggleExpand = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full bg-[#00689F] py-24 relative">

      <div className="w-[30vw] z-10 absolute left-0 top-0 aspect-square center">
        <Image fill className="cover" src={"/images/homepage/leadership/left_ellipse.png"} alt="left ellipse img" />
      </div>
      <div className="w-[30vw] z-10 absolute right-0 top-0 aspect-square center">
        <Image fill className="cover" src={"/images/homepage/leadership/right_ellipse.png"} alt="right ellipse img" />
      </div>

      <div className="container z-50 mx-auto px-4  space-y-16">

        <div className="grid grid-cols-1 md:grid-cols-6 relative z-10">
          <div className="md:col-span-4">
            <h2 data-para-effect className="text-4xl md:text-5xl   leading-none text-white">
              Our Leadership
            </h2>
          </div>
          <div className="md:col-span-2 space-y-5">
            <p data-para-effect className="text-lg md:text-xl text-white leading-tight">
              Led by industry veterans, our founding team combines deep expertise, strategic insight, and a shared vision to redefine leadership hiring
            </p>
                       <Button label={"Meet the Team"} theme="light" />
          </div>
        </div>
        <div className="w-full overflow-hidden z-50 relative">
          <div
            className={`w-full flex  transition-transform duration-700 ${expanded === 4 || expanded === 3 ? "-translate-x-[25%]" : "translate-x-0"
              }`}
          >
            {teamData.map((member) => {
              const isExpanded = expanded === member.id;
              return (
                <div
                  key={member.id}
                  className={`relative rounded-xl ${isExpanded ? "w-[50%] p-5 bg-[#ffffff30]" : " px-2.5 w-[25%]"}  transition-all duration-600 shrink-0 flex flex-col justify-between overflow-hidden`}
                >
                  <div className=" w-full flex items-start">
                    <div
                      className={`relative rounded-xl ${isExpanded ? "w-[25%] bg-[#ffffff50]" : "w-full bg-[#ffffff30]"}  transition-all duration-600 shrink-0 overflow-hidden aspect-3/3.5`}
                    >
                      <Image
                        src={member.img}
                        alt={member.name}
                        fill
                        className="cover"
                      />
                    </div>
                    <div
                      className={`h-full flex pl-5 flex-col justify-center`}
                    >
                      <div className={`h-full flex flex-col justify-center transition-opacity duration-300  opacity-0 ${isExpanded ? "opacity-100 delay-500 " : "opacity-0 "} `}>
                        <p className="text-white text-base  mb-6">
                          {member.desc}
                        </p>
                        <div className="flex gap-3 mt-auto">
                          <button className="bg-white/20 flex items-center gap-x-1 hover:bg-white/30 text-white px-4 py-2 rounded-md text-sm   transition-colors">
                            <RiLinkedinFill size={16} /> LinkedIn
                          </button>
                          <button className="bg-white/20 flex items-center gap-x-1 hover:bg-white/30 text-white px-4 py-2 rounded-md text-sm   transition-colors">
                            <RiFacebookFill size={16} /> Facebook
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="mt-2 w-full flex justify-between text-white items-center">
                    <div className="flex flex-col">
                      <h3 className="text-white text-xl   whitespace-nowrap">
                        {member.name}
                      </h3>
                      <p className="text-white/80 text-sm whitespace-nowrap">{member.role}</p>
                    </div>
                    <button
                      onClick={() => toggleExpand(member.id)}
                      className={`w-8 h-8 rounded-md bg-white text-[#00689F] shrink-0 flex items-center justify-center transition-all duration-300 z-10`}
                    >
                      <RiAddLine size={20} className={` transition-all duration-300 ${isExpanded ? " rotate-45" : "rotate-0"}`} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Leadership;
