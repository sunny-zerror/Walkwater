"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { RiArrowDownSLine, RiArrowRightUpLine } from '@remixicon/react';

// ─── Recent Insights (shared across all dropdowns) ─────────────────────────
const recentInsights = [
  {
    title: "Post Budget 2023 Quotes across various sectors",
    date: "03 Jul, 2026",
    image: "/images/homepage/insights/insight1.png",
    href: "/insights/post-budget-2023",
  },
  {
    title: "Microsoft job cuts likely to hit India too",
    date: "03 Jul, 2026",
    image: "/images/homepage/insights/insight2.png",
    href: "/insights/microsoft-job-cuts",
  },
  {
    title: "No change in salary structure post-budget",
    date: "03 Jul, 2026",
    image: "/images/homepage/insights/insight3.png",
    href: "/insights/salary-structure",
  },
];

// ─── Navigation Data ────────────────────────────────────────────────────────
const navItems = [
  {
    label: "About Us",
    type: "numbered", // Type 2: numbered list
    items: [
      { label: "Company", href: "/about/company" },
      { label: "CSR & Impact", href: "/about/csr-impact" },
      { label: "Events & Media", href: "/about/events-media" },
      { label: "Careers", href: "/about/careers" },
    ],
  },
{
  label: "Expertise",
  type: "grid",
  items: [
    {
      label: "CEO and Board Search",
      desc: "The future belongs to leaders who can navigate constant change.",
      href: "/expertise/ceo-board-search",
      icon: "",
    },
    {
      label: "Talent Core",
      desc: "Matching exceptional talent with ambitious organizations.",
      href: "/expertise/talent-core",
      icon: "",
    },
    {
      label: "Talent Advisory",
      desc: "Turning talent data into strategic business advantage.",
      href: "/expertise/talent-advisory",
      icon: "",
    },
    {
      label: "Entrepreneurial Services",
      desc: "The right leaders for businesses shaping the future.",
      href: "/expertise/entrepreneurial-services",
      icon: "",
    },
    {
      label: "Diversity",
      desc: "Insight-led research for a diverse and dynamic India.",
      href: "/expertise/diversity",
      icon: "",
    },
    {
      label: "PE & VC",
      desc: "Strategic talent partnerships for investment-driven growth.",
      href: "/expertise/pe-vc",
      icon: "",
    },
  ],
},
{
  label: "Industry Verticals",
  type: "grid",
  items: [
    {
      label: "Industrial, Energy & Process",
      desc: "Building future-ready leaders for industrial and energy growth.",
      href: "/industry/industrial-energy-process",
      icon: "",
    },
    {
      label: "Technology & Digital",
      desc: "Finding exceptional talent to accelerate business transformation.",
      href: "/industry/technology-digital",
      icon: "",
    },
    {
      label: "Consumer, Retail & Media",
      desc: "Helping brands find leaders who inspire growth and customer loyalty.",
      href: "/industry/consumer-retail-media",
      icon: "",
    },
    {
      label: "Pharma & Healthcare",
      desc: "Helping healthcare businesses build stronger leadership teams.",
      href: "/industry/pharma-healthcare",
      icon: "",
    },
    {
      label: "Banking & Financial Services",
      desc: "Connecting financial organizations with leaders who drive growth and innovation.",
      href: "/industry/banking-financial-services",
      icon: "",
    },
  ],
},
  {
    label: "Insights",
    href: "/insights",
  },
];

// ─── Recent Insights Sidebar ────────────────────────────────────────────────
const RecentInsightsSidebar = () => (
  <div className="w-full md:w-[30rem] shrink-0 bg-[#F7F8FF] p-8 -my-8 rounded-r-2xl border-l border-[#E8EDF1]">
    <h5 className="font-semibold text-[#00689F] mb-4">
      Recent Insights
    </h5>
    <div className="w-full h-[1px] bg-[#E8EDF1] mb-6" />
    <div className="space-y-5">
      {recentInsights.map((insight, i) => (
        <Link
          key={i}
          href={insight.href}
          className="flex gap-4 group items-stretch"
        >
          <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100 relative ">
            <Image
              src={insight.image}
              alt={insight.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-between min-w-0 pt-1">
            <p className=" leading-tight font-semibold text-[#00689F] group-hover:text-[#86B039] transition-colors line-clamp-2">
              {insight.title}
            </p>
            <p className=" text-sm text-[#657882] mt-2">{insight.date}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

// ─── Type 1: Grid Dropdown (Expertise / Industry Verticals) ─────────────────
const GridDropdown = ({ navItem }) => (
  <div className="flex gap-8">
    <div className="flex-1">
      <h5 className="text-lg font-semibold text-[#00689F] tracking-wide mb-6">
        {navItem.label}
      </h5>
      <div className="grid grid-cols-2 gap-x-12 gap-y-8">
        {navItem.items.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="flex gap-4 group items-start"
          >
            {item.icon ? (
              <div className="w-10 h-10 rounded-xl bg-[#F7F8FF] flex items-center justify-center shrink-0">
                <Image src={item.icon} width={20} height={20} alt={item.label} />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-[#F7F8FF] border border-[#00689F15] flex items-center justify-center shrink-0" />
            )}
            <div>
              <p className="text-base font-semibold text-[#00689F] group-hover:text-[#004d75] transition-colors mb-1">
                {item.label}
              </p>
              <p className="text-sm  text-[#657882] leading-tight">
                {item.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
    <RecentInsightsSidebar />
  </div>
);

// ─── Type 2: Numbered List Dropdown (Company / About Us) ────────────────────
const NumberedDropdown = ({ navItem }) => (
  <div className="flex gap-8">
    <div className="flex-1">
      <h5 className="text-lg font-semibold text-[#00689F] tracking-wide mb-6">
        {navItem.label}
      </h5>
      <div className="space-y-2">
        {navItem.items.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="flex items-center gap-6 group p-4 hover:pl-8 rounded-2xl hover:bg-[#F7F8FF] transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-white border border-[#E8EDF1] flex items-center justify-center shrink-0">
              <span className="text-sm text-[#657882] tabular-nums font-medium">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h5 className=" font-semibold text-[#00689F]  group-hover:text-[#86B039] transition-colors">
              {item.label}
            </h5>
          </Link>
        ))}
      </div>
    </div>
    <RecentInsightsSidebar />
  </div>
);

// ─── Main Header ────────────────────────────────────────────────────────────
const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
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

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeNav = activeDropdown !== null ? navItems[activeDropdown] : null;
  const hasDropdown = activeNav && activeNav.items;

  return (
    <>
      <header ref={headerRef} className="fixed top-0 left-0 w-full bg-white z-200">
        <div className="container">
          <div className="grid grid-cols-12 items-center h-20">
            {/* Logo */}
            <div className="col-span-3 flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="WalkWater Talent Advisors"
                  width={200}
                  height={50}
                  className="h-10 w-auto object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Navigation */}
            <nav className="col-span-6 hidden md:flex space-x-8 justify-center items-center">
              {navItems.map((navItem, index) => {
                const isActive = activeDropdown === index;

                // Simple link (no dropdown)
                if (!navItem.items) {
                  return (
                    <Link
                      key={index}
                      href={navItem.href}
                      className="text-[#7A7A7A] hover:text-black transition-colors text-sm"
                      onMouseEnter={() => {
                        clearTimeout(timeoutRef.current);
                        setActiveDropdown(null);
                      }}
                    >
                      {navItem.label}
                    </Link>
                  );
                }

                // Dropdown trigger
                return (
                  <div
                    key={index}
                    className={`relative flex items-center text-sm cursor-pointer transition-colors ${isActive ? "text-[#00689F]" : "text-[#7A7A7A] hover:text-black"
                      }`}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {navItem.label}
                    <RiArrowDownSLine
                      className={`w-4 h-4 ml-1 opacity-70 transition-transform duration-200 ${isActive ? "rotate-180" : ""
                        }`}
                    />
                  </div>
                );
              })}
            </nav>

            {/* Contact Button */}
            <div className="col-span-3 hidden md:flex items-center justify-end">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm rounded-md text-white bg-[#00689F] hover:bg-[#00557A] transition-colors shadow-sm"
              >
                Contact
                <RiArrowRightUpLine className=" group-hover:w-4 group-hover:h-4 group-hover:ml-1.5 w-0 h-0 ml-0 transition-all duration-300" />
              </Link>
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

          <div className="bg-white border-b border-[#E8EDF1] rounded-2xl shadow-xl shadow-black/5">
            <div className="pl-8 py-8">
              {activeNav?.type === "grid" && <GridDropdown navItem={activeNav} />}
              {activeNav?.type === "numbered" && <NumberedDropdown navItem={activeNav} />}
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