"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiStarFill,
  RiStarLine,
  RiDoubleQuotesR,
} from "@remixicon/react";

const testimonialsData = [
  {
    id: 1,
    quote:
      "WalkWater doesn't just fill roles; they architect leadership teams. Their understanding of our complex organizational culture was unparalleled, delivering candidates who weren't just qualified, but transformative.",
    name: "Cheri Acevedo",
    role: "Digital Lab, founder",
    rating: 4,
  },
  {
    id: 2,
    quote:
      "The precision and speed at which they delivered top-tier talent was incredible. They truly understood our vision and found leaders who aligned perfectly with our long-term goals.",
    name: "Michael Chen",
    role: "Tech Innovations, CEO",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "A phenomenal partner in our growth journey. WalkWater brings a level of strategic insight to leadership hiring that is rare to find in the industry.",
    name: "Sarah Jenkins",
    role: "Global Retail, VP HR",
    rating: 5,
  },
];

const Testimonials = () => {
  const swiperRef = useRef(null);

  return (
    <div className="w-full bg-[#F7F8FF] py-12 md:py-24 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0  items-center">
          {/* Left Column: Heading & Navigation */}
          <div className="flex flex-col justify-between h-full md:pr-10">
            <div className="space-y-2">
              <h2 data-heading-effect className="w-fit leading-none text-[#00689F]">
                Client Testimonials
              </h2>
              <p data-para-effect className=" text-lg md:text-xl text-[#657882] leading-tight max-w-sm">
                Stories, feedback, and experiences from our clients.
              </p>
            </div>

            {/* Custom Navigation Buttons */}
            <div className="flex gap-4 mt-12">
              <button
                onClick={() => swiperRef.current?.swiper.slidePrev()}
                className="w-12 h-12 rounded-xl border border-gray-200 bg-transparent flex items-center justify-center text-[#00689F] hover:bg-[#00689F] hover:text-white transition-colors"
              >
                <RiArrowLeftLine size={20} />
              </button>
              <button
                onClick={() => swiperRef.current?.swiper.slideNext()}
                className="w-12 h-12 rounded-xl border border-gray-200 bg-transparent flex items-center justify-center text-[#00689F] hover:bg-[#00689F] hover:text-white transition-colors"
              >
                <RiArrowRightLine size={20} />
              </button>
            </div>
          </div>

          {/* Right Column: Swiper Slider */}
          <div className="w-full h-full rounded-3xl border border-[#00689F20] overflow-hidden">
            <Swiper
              ref={swiperRef}
              modules={[Navigation, Autoplay]}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              className="w-full h-full flex  "
            >
              {testimonialsData.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="bg-white h-full border-r border-[#00689F20] flex flex-col justify-between space-y-16 p-10 ">
                    {/* Star Rating */}
                    <div className="">
                      {/* Quote Text */}
                      <p className="text-[#00689F] text-xl leading-tight  font-medium md:text-3xl grow">
                        "{testimonial.quote}"
                      </p>
                    </div>

                    {/* Footer: Author & Quote Icon */}
                    <div className="flex border-t border-[#00689F20] pt-3 justify-between items-end mt-auto">
                      <div>
                        <h5 className="text-[#00689F] ">
                          {testimonial.name}
                        </h5>
                        <p className="text-[#657882] text-sm mt-1">
                          {testimonial.role}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-[#F7F8FF] border border-[#00689F20] flex items-center justify-center text-[#86B039]">
                        <RiDoubleQuotesR size={24} />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
