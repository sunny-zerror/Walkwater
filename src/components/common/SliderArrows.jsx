"use client";
import React from "react";
import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";

// Prev/next arrows centred on a Swiper's edges. Place inside a `relative` wrapper around the Swiper.
// The blue fill keeps them readable where they overlap the white cards.
const SliderArrows = ({ swiper, atStart, atEnd }) => (
  <div className="pointer-events-none absolute inset-y-0 -inset-x-3 md:-inset-x-6 z-20 flex items-center justify-between">
    {[
      { label: "Previous", Icon: RiArrowLeftLine, onClick: () => swiper?.slidePrev(), disabled: atStart },
      { label: "Next", Icon: RiArrowRightLine, onClick: () => swiper?.slideNext(), disabled: atEnd },
    ].map(({ label, Icon, onClick, disabled }) => (
      <button
        key={label}
        type="button"
        aria-label={label}
        onClick={onClick}
        disabled={disabled}
        className="pointer-events-auto size-11 md:size-12 rounded-full border border-white bg-[#00689F] text-white center transition-all duration-300 hover:bg-[#86B039] hover:border-[#86B039] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#00689F] disabled:hover:border-white"
      >
        <Icon size={20} />
      </button>
    ))}
  </div>
);

export default SliderArrows;
