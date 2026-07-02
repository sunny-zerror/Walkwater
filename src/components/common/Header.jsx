import React from 'react';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { RiArrowDownSLine, RiArrowRightUpLine } from '@remixicon/react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50 ">
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
          <nav className=" col-span-6 hidden md:flex space-x-8 justify-center items-center">
            <div className="relative group flex items-center text-[#7A7A7A] hover:text-black transition-colors cursor-pointer text-sm font-medium">
              Expertise <RiArrowDownSLine className="w-4 h-4 ml-1 opacity-70" />
            </div>
            <div className="relative group flex items-center text-[#7A7A7A] hover:text-black transition-colors cursor-pointer text-sm font-medium">
              Industry Verticals <RiArrowDownSLine className="w-4 h-4 ml-1 opacity-70" />
            </div>
            <div className="relative group flex items-center text-[#7A7A7A] hover:text-black transition-colors cursor-pointer text-sm font-medium">
              Company <RiArrowDownSLine className="w-4 h-4 ml-1 opacity-70" />
            </div>
            <Link href="/insights" className="text-[#7A7A7A] hover:text-black transition-colors text-sm font-medium">
              Insights
            </Link>
          </nav>

          {/* Contact Button */}
          <div className=" col-span-3 hidden md:flex items-center justify-end">
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#006E9A] hover:bg-[#00557A] transition-colors shadow-sm"
            >
              Contact
              <RiArrowRightUpLine className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;