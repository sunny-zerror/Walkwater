"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { RiArrowDownSLine, RiArrowRightUpLine, RiMenuLine, RiCloseLine } from '@remixicon/react';
import CustomLink from './CustomLink';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { navItems, recentInsights } from '@/data/navData';

// ─── Recent Insights Sidebar ────────────────────────────────────────────────
const RecentInsightsSidebar = () => (
  <div className=" p-5 w-full md:w-120 shrink-0 bg-[#F7F8FF]  rounded-2xl">
    <h6 className="font-semibold pb-2  border-b border-[#E8EDF1] text-[#00689F] mb-4">
      Recent Insights
    </h6>
    <div className="space-y-4">
      {recentInsights.map((insight, i) => (
        <CustomLink
          key={i}
          href={insight.href}
          className="flex gap-4 group border-b pb-4 border-[#00689F15] last:border-none last:pb-0 group items-stretch"
        >
          <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100 relative ">
            <Image
              src={insight.image}
              alt={insight.title}
              fill
              className="object-cover group-hover:scale-110 transition-all duration-300"
            />
          </div>
          <div className="flex flex-col justify-between min-w-0 pt-1">
            <p className=" leading-tight font-semibold text-[#00689F] group-hover:text-[#86B039] transition-colors line-clamp-2">
              {insight.title}
            </p>
            <p className=" text-sm text-[#657882] mt-2">{insight.date}</p>
          </div>
        </CustomLink>
      ))}
    </div>
  </div>
);

// ─── Dropdown Panel ─────────────────────────────────────────────────────────
const DropdownPanel = ({ navItem }) => (
  <div className="flex gap-8 ">
    <div className="flex-1 p-5 pb-0">
      <h6 className="pb-2 border-b border-[#E8EDF1] font-semibold text-[#00689F] tracking-wide mb-6">
        {navItem.label}
      </h6>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {navItem.items.map((item, i) => (
          <CustomLink
            key={i}
            href={item.href}
            className="flex gap-4 hover:pl-6 hover:bg-[#F7F8FF] border border-transparent rounded-xl hover:border-[#00689F15] transition-all duration-300 p-4 group items-start"
          >
            {item.icon ? (
              <div className="w-10 h-10 rounded-xl bg-[#F7F8FF] border border-[#00689F20] flex items-center justify-center shrink-0">
                <Image src={item.icon} width={20} height={20} alt={item.label} />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-[#F7F8FF] border border-[#00689F15] flex items-center justify-center shrink-0" />
            )}
            <div>
              <p className="text-base font-semibold text-[#00689F] group-hover:text-[#004d75] transition-colors mb-1">
                {item.label}
              </p>
              <p className="text-sm text-[#657882] w-[85%] leading-tight">
                {item.desc}
              </p>
            </div>
          </CustomLink>
        ))}
      </div>
    </div>
    <RecentInsightsSidebar />
  </div>
);


// ─── Main Header ────────────────────────────────────────────────────────────
const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileNav, setExpandedMobileNav] = useState(null);
  const timeoutRef = useRef(null);
  const headerRef = useRef(null);

  const handleMouseEnter = (index) => {
    clearTimeout(timeoutRef.current);
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const handleDropdownEnter = () => {
    clearTimeout(timeoutRef.current);
  };

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const activeNav = activeDropdown !== null ? navItems[activeDropdown] : null;
  const hasDropdown = activeNav && activeNav.items;

  useGSAP(() => {
    gsap.to(headerRef.current, {
      transform: "translateY(0)",
      delay: 3
    })
  })

  return (
    <>
      <header ref={headerRef} className="fixed top-0 left-0 -translate-y-full w-full bg-white z-200">
        <div className="container">
          <div className="grid grid-cols-12 items-center h-20 relative z-[210] bg-white">
            {/* Logo */}
            <div className="col-span-9 md:col-span-3 flex items-center">
              <CustomLink label={"Home"} href="/" className="flex items-center">
                <Image
                  src="/logo.svg"
                  alt="WalkWater Talent Advisors"
                  width={200}
                  height={50}
                  className="h-10 w-auto object-contain"
                  priority
                />
              </CustomLink>
            </div>

            {/* Navigation */}
            <nav className="col-span-6 hidden md:flex space-x-5 justify-center items-center">
              {navItems.map((navItem, index) => {
                const isActive = activeDropdown === index;

                // Simple link (no dropdown)
                if (!navItem.items) {
                  return (
                    <CustomLink
                      key={index}
                      href={navItem.href}
                      className={`relative flex items-center p-1 px-2 rounded-md  cursor-pointer border border-transparent transition-colors hover:text-[#00689F] hover:bg-[#F7F8FF] hover:border-[#00689F20]!  text-[#7A7A7A] hover:text-black"
                        }`}
                      onMouseEnter={() => {
                        clearTimeout(timeoutRef.current);
                        setActiveDropdown(null);
                      }}
                    >
                      {navItem.label}
                    </CustomLink>
                  );
                }

                return (
                  <div
                    key={index}
                    className={`relative flex items-center p-1 px-2 rounded-md  cursor-pointer border border-transparent transition-colors ${isActive ? "text-[#00689F] bg-[#F7F8FF] border-[#00689F20]!" : "text-[#7A7A7A] hover:text-black"
                      }`}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {navItem.label}
                    <RiArrowDownSLine
                      className={`w-4 h-4 opacity-70 transition-transform duration-200 ${isActive ? "rotate-180" : ""
                        }`}
                    />
                  </div>
                );
              })}
            </nav>

            {/* Contact Button */}
            <div className="col-span-3 hidden md:flex items-center justify-end">
              <CustomLink
                label={"contact"}
                href="/contact"
                className="group inline-flex gap-x-1 items-center justify-center px-4 py-2 border border-transparent  rounded-md text-white bg-[#00689F]  hover:border-[#00557A] hover:bg-transparent transition-colors hover:text-[#00557A]"
              >
                Contact
                <RiArrowRightUpLine size={18} />
              </CustomLink>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="col-span-3 flex md:hidden items-center justify-end">
              <button
                className="text-[#00689F] p-2 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <RiCloseLine size={28} /> : <RiMenuLine size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* ─── Mobile Menu ────────────────────────────────────────── */}
        <div
          className={`md:hidden fixed inset-0 top-20 bg-white z-[200] transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div data-lenis-prevent className="h-[calc(100svh-5rem)] overflow-y-auto p-5">
            <div className="flex flex-col space-y-2">
              {navItems.map((navItem, index) => (
                <div key={index} className="border-b border-[#E8EDF1] pb-2">
                  {!navItem.items ? (
                    <CustomLink
                      href={navItem.href}
                      className="text-[#00689F] font-semibold text-lg py-3 block"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {navItem.label}
                    </CustomLink>
                  ) : (
                    <div>
                      <div
                        className="flex justify-between items-center py-3 cursor-pointer"
                        onClick={() => setExpandedMobileNav(expandedMobileNav === index ? null : index)}
                      >
                        <span className="text-[#00689F] font-semibold text-lg">{navItem.label}</span>
                        <RiArrowDownSLine
                          className={`w-5 h-5 text-[#00689F] transition-transform ${expandedMobileNav === index ? "rotate-180" : ""
                            }`}
                        />
                      </div>
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${expandedMobileNav === index
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                          }`}
                      >
                        <div className="overflow-hidden">
                          <div className="flex flex-col space-y-1 pb-3 pt-1">
                            {navItem.items.map((item, i) => (
                              <CustomLink
                                key={i}
                                href={item.href}
                                className="flex items-center gap-3 text-[#657882] hover:text-[#00689F] text-base py-2 transition-colors group"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {item.icon && (
                                  <div className="w-9 h-9 rounded-xl bg-[#F7F8FF] border border-[#00689F20] flex items-center justify-center shrink-0 transition-colors">
                                    <Image src={item.icon} width={18} height={18} alt={item.label} />
                                  </div>
                                )}
                                <span className="font-medium">{item.label}</span>
                              </CustomLink>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-6 pb-10">
                <CustomLink
                  href="/contact"
                  className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent text-base rounded-md text-white bg-[#00689F]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </CustomLink>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Dropdown Panel ─────────────────────────────────────── */}
        <div
          className={`absolute! container top-[105%] left-0 w-full transition-all duration-300 ease-in-out ${hasDropdown
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2 pointer-events-none"
            }`}
          onMouseEnter={handleDropdownEnter}
          onMouseLeave={handleDropdownLeave}
        >

          <div className="bg-white border-b border-[#E8EDF1] rounded-2xl">
            <div className="p-3">
              {hasDropdown && <DropdownPanel navItem={activeNav} />}
            </div>
          </div>
        </div>
      </header>

      {/* ─── Backdrop Overlay ────────────────────────────────────── */}
      <div
        className={`fixed backdrop-blur-xs inset-0 bg-black/40 z-199 transition-opacity top-0 duration-300 ${hasDropdown ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
        onClick={() => setActiveDropdown(null)}
      />
    </>
  );
};

export default Header;