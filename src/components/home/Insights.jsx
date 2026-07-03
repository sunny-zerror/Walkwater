"use client";
import { RiArrowRightLine, RiShareLine } from "@remixicon/react";
import Image from "next/image";
import React from "react";
import Button from "../common/Button";

const insightsData = [
  {
    id: 1,
    title: "Leadership in ESG Excellence",
    desc: "In recent times, Environmental, Social, and Governance (ESG) principles have evolved from a specialized focus to a fundamental business....",
    img: "/images/homepage/insights/img1.png", // Empty for now
  },
  {
    id: 2,
    title: "Purpose-Driven Leadership",
    desc: "In the current values-oriented business environment, leadership transcends merely achieving financial targets; it focuses on creating...",
    img: "/images/homepage/insights/img2.png", // Empty for now
  },
];

const Insights = () => {
  return (
    <div className="w-full bg-[#00689F] py-24 relative overflow-hidden">
      {/* Background decoration can go here later */}

      <div className="container mx-auto px-4 relative z-10 space-y-16">

        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-6 relative z-10">
          <div className="md:col-span-4">
            <h2 data-para-effect className="text-4xl md:text-5xl   leading-none text-white">
              Insights
            </h2>
          </div>
          <div className="md:col-span-2 space-y-5">
            <p data-para-effect className="text-lg md:text-xl text-[#ededed] leading-tight">
              Articles and perspectives on leadership trends, talent strategy, and market developments.
            </p>
            <Button label={"Explore Insights"} theme="light" />

          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {insightsData.map((insight) => (
            <div
              key={insight.id}
              className="bg-white rounded-3xl p-5  border border-gray-100 flex flex-col group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/9] md:aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-[#e2e8f0]">
                {insight.img ? (
                  <Image
                    src={insight.img}
                    fill
                    alt={insight.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-[#e2e8f0] flex items-center justify-center">
                    {/* Dummy image placeholder */}
                  </div>
                )}

                {/* Share Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#00689F]  hover:bg-gray-50 transition-colors z-10">
                  <RiShareLine size={20} />
                </div>
              </div>

              {/* Text Content */}
              <div className="px-2 pb-2">
                <h3 className="text-[#00689F] text-2xl   mb-4">
                  {insight.title}
                </h3>
                <p className="text-[#657882] text-lg leading-relaxed line-clamp-2">
                  {insight.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Insights;
