"use client";
import React from "react";
import Image from "next/image";
import {
  RiFacebookCircleFill,
  RiLinkedinBoxFill,
  RiInstagramLine,
  RiTwitterFill,
  RiArrowRightLine,
} from "@remixicon/react";

const Footer = () => {
  return (
    <div className="w-full bg-[#F7F8FF] pb-10">
      <div className="container ">
      <div className="  bg-white rounded-3xl flex flex-col md:flex-row overflow-hidden  relative">
        
        {/* Left Column (White Section) */}
        <div className="flex-1 p-8 md:p-14 lg:p-20 relative z-10 flex flex-col justify-between ">
          
          {/* Abstract background image placeholder */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none -z-10 bg-gradient-to-t from-blue-50/40 to-transparent">
             {/* You can add your abstract wave image here */}
          </div>

          {/* Top Row: Logo & Links */}
          <div className="flex flex-col md:flex-row justify-between mb-16 gap-10">
            {/* Logo */}
            <div className="w-64 shrink-0">
               {/* Replace with your actual logo path */}
              <Image 
                src="/logo.png" 
                width={200} 
                height={60} 
                alt="WalkWater Logo" 
                className="object-contain"
              />
            </div>
            
            {/* Links Columns */}
            <div className="flex flex-col sm:flex-row gap-10 sm:gap-24">
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-[#00689F] font-medium border-b border-[#00689F] pb-0.5">Home</a>
                </li>
                <li>
                  <a href="#" className="text-[#657882] hover:text-[#00689F] transition-colors text-sm md:text-base">About</a>
                </li>
                <li>
                  <a href="#" className="text-[#657882] hover:text-[#00689F] transition-colors text-sm md:text-base">Expertise</a>
                </li>
                <li>
                  <a href="#" className="text-[#657882] hover:text-[#00689F] transition-colors text-sm md:text-base">Industry Verticals</a>
                </li>
                <li>
                  <a href="#" className="text-[#657882] hover:text-[#00689F] transition-colors text-sm md:text-base">Insights</a>
                </li>
              </ul>
              
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-[#657882] hover:text-[#00689F] transition-colors text-sm md:text-base">Contact</a>
                </li>
                <li>
                  <a href="#" className="text-[#657882] hover:text-[#00689F] transition-colors text-sm md:text-base">Terms & Conditions</a>
                </li>
                <li>
                  <a href="#" className="text-[#657882] hover:text-[#00689F] transition-colors text-sm md:text-base">Privacy & Policy</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Row: Newsletter & Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mt-auto">
            {/* Newsletter */}
            <div className="w-full max-w-sm">
              <h4 className="text-2xl md:text-3xl text-[#00689F] font-semibold mb-6">
                Subscribe for Latest<br />Newsletter
              </h4>
              <div className="relative w-full">
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="w-full bg-[#00689F] text-white placeholder:text-white/80 rounded-xl py-3.5 px-5 pr-14 outline-none text-sm md:text-base" 
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-md flex items-center justify-center text-[#00689F] hover:bg-gray-100 transition-colors">
                  <RiArrowRightLine size={18} />
                </button>
              </div>
            </div>
            
            {/* Copyright */}
            <div className="text-sm text-[#00689F] flex flex-col md:text-right font-medium">
              <p>© 2026 WalkWater Talent Advisors.</p>
              <p>All rights reserved.</p>
            </div>
          </div>
        </div>

        {/* Right Column (Blue Section) */}
        <div className="w-full md:w-[35%] lg:w-[30%] bg-[#00689F] p-8 md:p-14 lg:p-20 flex flex-col justify-between text-white shrink-0">
          
          {/* Social Links */}
          <ul className="space-y-6">
            <li>
              <a href="#" className="flex items-center gap-4 hover:opacity-80 transition-opacity text-sm md:text-base">
                <RiFacebookCircleFill size={24} /> Facebook
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-4 hover:opacity-80 transition-opacity text-sm md:text-base">
                <RiLinkedinBoxFill size={24} /> Linkedin
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-4 hover:opacity-80 transition-opacity text-sm md:text-base">
                <RiInstagramLine size={24} /> Instagram
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-4 hover:opacity-80 transition-opacity text-sm md:text-base">
                <RiTwitterFill size={24} /> Twitter
              </a>
            </li>
          </ul>
          
          {/* Contact Info */}
          <div className="mt-16 md:mt-24">
            <p className="text-base md:text-lg mb-3 font-medium">+91 8049065000</p>
            <p className="text-base md:text-lg font-medium">client@walkwatertalent.com</p>
          </div>

        </div>
        
      </div>
      </div>
    </div>
  );
};

export default Footer;