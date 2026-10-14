"use client";
import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { RiArrowDownSLine, RiPhoneFill, RiMailFill, RiFacebookCircleFill, RiLinkedinBoxFill } from '@remixicon/react';
import CustomLink from './CustomLink';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { navItems, recentInsights } from '@/data/navData';
import Button from './Button';
import { Link } from 'next-view-transitions';

// ─── Recent Insights Sidebar ────────────────────────────────────────────────
const RecentInsightsSidebar = () => (
  <div data-panel-item className="p-5 w-full md:w-120 shrink-0 bg-[#F7F8FF]  rounded-2xl">
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
    <div className="flex-1 pt-5 pb-0">
      <h6 data-panel-item className="pb-2 border-b border-[#E8EDF1] font-semibold text-[#00689F] tracking-wide mb-6">
        {navItem.label}
      </h6>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {navItem.items.map((item, i) => (
          <CustomLink
            key={i}
            href={item.href}
            data-panel-item
            className="flex gap-4 hover:pl-6 hover:bg-[#F7F8FF] border border-transparent rounded-xl hover:border-[#00689F15] transition-[padding,background-color,border-color] duration-300 p-4 group items-start"
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
  // Last opened panel, kept so the sheet still has its content while it slides away
  const [panelIndex, setPanelIndex] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileNav, setExpandedMobileNav] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const timeoutRef = useRef(null);
  const headerRef = useRef(null);
  const sheetRef = useRef(null);
  const sheetOpenRef = useRef(false);
  const pathname = usePathname();

  const activeNav = activeDropdown !== null ? navItems[activeDropdown] : null;
  const hasDropdown = Boolean(activeNav && activeNav.items);
  const panelNav = panelIndex !== null ? navItems[panelIndex] : null;

  // A white sheet (desktop dropdown or mobile menu) sits behind the nav, so the bar itself stays clear
  const isSheetOpen = hasDropdown || isMobileMenuOpen;

  // Transparent over the home hero video; solid once scrolled, on other pages, or with a sheet open
  const isSolid = pathname !== "/" || isScrolled || isSheetOpen;

  // The sheets start at the top of the viewport, so their content clears the green bar and the nav
  const sheetOffset = isScrolled ? "h-header" : "h-[calc(var(--spacing-topbar)+var(--spacing-header))]";

  const openDropdown = (index) => {
    clearTimeout(timeoutRef.current);
    setActiveDropdown(index);
    setPanelIndex(index);
  };

  const closeDropdown = () => {
    clearTimeout(timeoutRef.current);
    setActiveDropdown(null);
  };

  const handleHeaderEnter = () => {
    clearTimeout(timeoutRef.current);
  };

  const handleHeaderLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
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

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutRef.current);
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

  useGSAP(() => {
    // Slides in as the home text loader clears (2.6s after navigation start, however long hydration took)
    gsap.to(headerRef.current, {
      transform: "translateY(0)",
      delay: Math.max(0, 2.6 - performance.now() / 1000)
    })
  })

  // Dropdown sheet: slides down with an expo ease and its items stagger in; closing plays it back
  // (items out, then the sheet back up). Switching menus while open only re-staggers the items.
  useGSAP(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    const items = sheet.querySelectorAll("[data-panel-item]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const d = (s) => (reduce ? 0 : s);
    const wasOpen = sheetOpenRef.current;
    sheetOpenRef.current = hasDropdown;

    // Hand the CSS starting position over to GSAP once
    if (!sheet.dataset.gsapReady) {
      gsap.set(sheet, { y: 0, yPercent: -100 });
      sheet.dataset.gsapReady = "true";
    }

    gsap.killTweensOf([sheet, items]);

    if (hasDropdown) {
      if (!wasOpen) {
        gsap.to(sheet, { yPercent: 0, duration: d(0.7), ease: "expo.out" });
      }
      gsap.fromTo(items,
        { opacity: 0, y: "0.75rem" },
        { opacity: 1, y: 0, duration: d(0.6), ease: "power3.out", stagger: d(0.05), delay: wasOpen ? 0 : d(0.15) }
      );
    } else if (wasOpen) {
      gsap.to(items, { opacity: 0, y: "-0.5rem", duration: d(0.2), ease: "power2.in", stagger: { each: d(0.02), from: "end" } });
      gsap.to(sheet, { yPercent: -100, duration: d(0.55), ease: "power3.inOut", delay: d(0.12) });
    }
  }, { dependencies: [hasDropdown, panelIndex] })

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 -translate-y-full w-full z-200 flex flex-col"
        onMouseEnter={handleHeaderEnter}
        onMouseLeave={handleHeaderLeave}
      >
        {/* ─── Top Bar ─────────────────────────────────────────────────── */}
        <div className={`relative z-10 bg-[#86B039] text-white transition-all duration-300 origin-top overflow-hidden ${isScrolled ? 'h-0 opacity-0' : 'h-topbar opacity-100'}`}>
          <div className="container h-full py-2 max-sm:px-3!">
            {/* One row on every width: contacts on the left, socials and flags on the right */}
            <div className="flex items-center justify-between gap-2 h-full text-[9px] min-[390px]:text-[10px] sm:text-xs font-medium whitespace-nowrap">
              <div className="flex items-center gap-2 md:gap-4 min-w-0">
                <Link href="tel:+919972094034" className="flex hover:underline items-center hover:opacity-80 transition-opacity">
                  <RiPhoneFill className="w-2.5 h-2.5 md:w-3 md:h-3 mr-1 md:mr-2 shrink-0" />
                  +91 99720 94034
                </Link>
                <span className="w-px h-3 md:h-4 bg-white/30 block shrink-0"></span>
                <Link href="mailto:client@walkwatertalent.com" className="flex min-w-0 hover:underline items-center hover:opacity-80 transition-opacity">
                  <RiMailFill className="w-2.5 h-2.5 md:w-3 md:h-3 mr-1 md:mr-2 shrink-0" />
                  <span className="truncate">client@walkwatertalent.com</span>
                </Link>
              </div>
              <div className="flex items-center gap-1.5 md:gap-4 shrink-0">
                <div className="flex items-center gap-1 md:gap-3">
                  <Link href="https://www.facebook.com/WalkwaterTalentAdvisors" target='_blank' className="hover:opacity-80 transition-opacity" aria-label="Facebook">
                    <RiFacebookCircleFill className="w-3.5 h-3.5 md:w-5 md:h-5" />
                  </Link>
                  <Link href="https://in.linkedin.com/company/walkwater-talent-advisors" target='_blank' className="hover:opacity-80 transition-opacity" aria-label="LinkedIn">
                    <RiLinkedinBoxFill className="w-3.5 h-3.5 md:w-5 md:h-5" />
                  </Link>
                </div>
                <span className="w-px h-3 md:h-4 bg-white/30 block"></span>
                <div className="flex items-center gap-0.5 md:gap-2">
                  <Image src="/icons/india_flag.svg" alt="India" width={20} height={14} className="h-3 md:h-5 w-auto object-cover" />
                  <Image src="/icons/canada_flag.svg" alt="Canada" width={20} height={14} className="h-3 md:h-5 w-auto object-cover" />
                  <Image src="/icons/america_flag.svg" alt="USA" width={20} height={14} className="h-3 md:h-5 w-auto object-cover" />
                  <Image src="/icons/european_flag.svg" alt="Europe" width={20} height={14} className="h-3 md:h-5 w-auto object-cover" />
                  <Image src="/icons/singapore_flag.svg" alt="Singapore" width={20} height={14} className="h-3 md:h-5 w-auto object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Main Navbar ──────────────────────────────────────────────── */}
        <div className={`w-full relative z-210 transition-all duration-300 ${isSheetOpen ? "bg-transparent" : isSolid ? "bg-white shadow-sm" : "bg-transparent"}`}>
          <div className="container">
            <div className="grid grid-cols-12 items-center h-header">
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
                        className={`relative flex items-center p-1 px-2 rounded-md  cursor-pointer border border-transparent transition-colors hover:text-[#00689F] hover:bg-[#F7F8FF] hover:border-[#00689F20]! ${isSolid ? "text-[#7A7A7A]" : "text-white"}`}
                        onMouseEnter={closeDropdown}
                      >
                        {navItem.label}
                      </CustomLink>
                    );
                  }

                  return (
                    <div
                      key={index}
                      className={`relative flex items-center p-1 px-2 rounded-md  cursor-pointer border border-transparent transition-colors ${isActive ? "text-[#00689F] bg-[#F7F8FF] border-[#00689F20]!" : isSolid ? "text-[#7A7A7A] hover:text-black" : "text-white"
                        }`}
                      onMouseEnter={() => openDropdown(index)}
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

              {/* Contact Button: solid white over the video, solid blue once the header is white */}
              <div className="col-span-3 hidden md:flex items-center justify-end">
                <Button theme={isSolid ? "solid" : "light"} label="Get In Touch" href="/contact" />
              </div>

              {/* Mobile Menu Toggle */}
              <div className="col-span-3 flex md:hidden items-center justify-end">
                {/* Ringed burger: two lines that fold into a brand-blue cross when the menu is open */}
                <button
                  className={`relative w-11 h-11 rounded-full border-2 focus:outline-none transition-colors duration-300 ${isMobileMenuOpen
                    ? "border-[#00689F]/30 text-[#00689F]"
                    : isSolid ? "border-[#00689F]/25 text-[#00689F]" : "border-white/60 text-white"
                    }`}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
                  aria-expanded={isMobileMenuOpen}
                >
                  <span
                    className={`absolute left-1/2 top-1/2 w-5 h-0.5 -ml-2.5 -mt-px rounded-full bg-current transition-transform duration-300 ease-out ${isMobileMenuOpen ? "translate-y-0 rotate-45" : "-translate-y-1 rotate-0"
                      }`}
                  />
                  <span
                    className={`absolute left-1/2 top-1/2 w-5 h-0.5 -ml-2.5 -mt-px rounded-full bg-current transition-transform duration-300 ease-out ${isMobileMenuOpen ? "translate-y-0 -rotate-45" : "translate-y-1 rotate-0"
                      }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Mobile Menu: white full-screen sheet from the top ────────── */}
        <div
          className={`md:hidden absolute inset-x-0 top-0 h-svh bg-[#ffffff] z-0 flex flex-col transition-transform duration-300 ease-out ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full pointer-events-none"
            }`}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className={`shrink-0 transition-all duration-300 ${sheetOffset}`} />
          <div data-lenis-prevent className="flex-1 overflow-y-auto p-5 border-t border-[#E8EDF1]">
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

        {/* ─── Dropdown Sheet: one white panel from the top of the viewport, behind logo, nav and submenu ─── */}
        <div
          ref={sheetRef}
          style={{ transform: "translateY(-100%)" }}
          className={`hidden md:block absolute inset-x-0 top-0 z-0 bg-[#ffffff] transition-shadow duration-500 ${hasDropdown ? "shadow-lg" : "pointer-events-none"}`}
          aria-hidden={!hasDropdown}
        >
          <div className={`transition-all duration-300 ${sheetOffset}`} />
          <div className="border-t border-[#E8EDF1]">
            <div className="container pt-3 pb-8">
              {panelNav && panelNav.items && <DropdownPanel key={panelIndex} navItem={panelNav} />}
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
