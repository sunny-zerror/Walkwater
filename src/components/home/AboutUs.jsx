import React from 'react';

const AboutUs = () => {
  return (
    <section className="bg-[#F7F8FF] py-24">
      <div className="container">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-6 mb-24">
          <div className="md:col-span-2">
            <h2 className="font-semibold leading-none text-[#00689F]">About Us</h2>
          </div>
          <div className="md:col-span-4">
            <p className="text-3xl  text-[#00689F] leading-tight">
              Founded in 2011, WalkWater Talent Advisors reimagines executive search
              for a rapidly evolving world shaped by globalization, technology, and
              startups. With deep domain expertise, global reach, and strong client
              partnerships, the firm delivers innovative leadership hiring solutions.
              Driven by a startup mindset and strong values, WalkWater creates
              meaningful, future-ready talent experiences.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 items-stretch">
          <div className=" p-6 hover:bg-white  hover:-translate-y-2 hover:drop-shadow-sm rounded-2xl group transition-all duration-300 pl-0 ">
            <div className="h-full w-full flex flex-col justify-between space-y-24 border-l border-black/20 group-hover:border-transparent transition-all duration-300 pl-6 ">
            <h3 className="text-lg text-[#657882] leading-tight font-medium">Clients Globally</h3>
            <p className="text-6xl font-semibold text-[#00689F]">450+</p>
            </div>
          </div>
          <div className=" p-6 hover:bg-white  hover:-translate-y-2 hover:drop-shadow-sm rounded-2xl group transition-all duration-300 pl-0">
            <div className="h-full w-full flex flex-col justify-between space-y-24 border-l border-black/20 group-hover:border-transparent transition-all duration-300 pl-6 ">
            <h3 className="text-lg text-[#657882] leading-tight font-medium">Leadership Searches<br/>completed</h3>
            <p className="text-6xl font-semibold text-[#00689F]">1100+</p>
          </div>
          </div>
          <div className=" p-6 hover:bg-white  hover:-translate-y-2 hover:drop-shadow-sm rounded-2xl group transition-all duration-300 pl-0">
            <div className="h-full w-full flex flex-col justify-between space-y-24 border-l border-black/20 group-hover:border-transparent transition-all duration-300 pl-6 ">
            <h3 className="text-lg text-[#657882] leading-tight font-medium">Bespoke Talent Advisory<br/>studies completed</h3>
            <p className="text-6xl font-semibold text-[#00689F]">55+</p>
          </div>
          </div>
          <div className=" p-6 hover:bg-white  hover:-translate-y-2 hover:drop-shadow-sm rounded-2xl group transition-all duration-300 pl-0">
            <div className="h-full w-full flex flex-col justify-between space-y-24 border-l border-black/20 group-hover:border-transparent transition-all duration-300 pl-6 ">
            <h3 className="text-lg text-[#657882] leading-tight font-medium">Countries Where Searches<br/>were Completed</h3>
            <p className="text-6xl font-semibold text-[#00689F]">8</p>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
