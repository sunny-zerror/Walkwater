import Image from 'next/image'
import React from 'react'
import Button from '../common/Button'

const services = [
  {
    title: "CEO and Board Search",
    desc: "Connecting organizations with accomplished CEOs and board leaders equipped to navigate complexity, transformation, and sustainable growth.",
    icon: "/images/homepage/what_we_do/ceo.svg",
    img: "/images/homepage/what_we_do/ceo.jpg",
    href: "/",
  },
  {
    title: "Talent Core",
    desc: "Connecting organizations with exceptional leaders who bring expertise, impact, and the capabilities needed for sustained business growth.",
    icon: "/images/homepage/what_we_do/talent.svg",
    img: "/images/homepage/what_we_do/talent.jpg",
    href: "/",
  },
  {
    title: "Talent Advisory",
    desc: "Helping organizations navigate talent challenges through market intelligence, compensation insights, and strategic workforce advisory expertise.",
    icon: "/images/homepage/what_we_do/talent_advisory.svg",
    img: "/images/homepage/what_we_do/talent_advisory.jpg",
    href: "/",
  },
  {
    title: "Entrepreneurial Services",
    desc: "Enabling entrepreneurs to access exceptional talent, strategic guidance, and leadership solutions for ambitious business growth.",
    icon: "/images/homepage/what_we_do/enterpreneurial_service.svg",
    img: "/images/homepage/what_we_do/enterpreneurial_service.jpg",
    href: "/",
  },
  {
    title: "Diversity",
    desc: "Building diverse, inclusive leadership teams that bring broader perspectives, stronger decisions, and lasting organizational impact.",
    icon: "/images/homepage/what_we_do/diversity.svg",
    img: "/images/homepage/what_we_do/diversity.jpg",
    href: "/",
  },
  {
    title: "PE & VC",
    desc: "Supporting PE and VC firms with exceptional leadership talent to drive portfolio growth, transformation, and long-term value.",
    icon: "/images/homepage/what_we_do/pe_vc.svg",
    img: "/images/homepage/what_we_do/pe_vc.jpg",
    href: "/",
  },
]

const WhatWeDo = () => {
  return (
    <div className="w-full relative overflow-hidden py-16 md:py-28">
      <Image
        src="/images/homepage/what_we_do_bg.svg"
        alt=""
        fill
        className="object-cover"
      />

      <div className="container relative z-10 space-y-10 md:space-y-14">
        <div className="text-center space-y-4">
          <h2 data-heading-effect className="text-white leading-none mx-auto w-fit">
            What We Do
          </h2>
          <p data-para-effect className="text-white/90 text-base md:text-lg">
            Connecting organizations with exceptional leaders who drive growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-6xl mx-auto">
          {services.map((item, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-white/25 bg-white/15 backdrop-blur-md p-5 md:p-6 min-h-55 flex flex-col transition-all duration-500 hover:border-white/40"
            >
              {item.img && (
                <>
                  <Image
                    src={item.img}
                    alt={item.title}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    fill
                    className="object-cover opacity-0 scale-110 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </>
              )}

              <div className="relative z-10 flex items-center gap-x-3">
                <div className="size-11 shrink-0 rounded-lg bg-white/20 border border-white/20 center">
                  <Image src={item.icon} alt="" width={26} height={26} />
                </div>
                <h6 className="text-white leading-tight">{item.title}</h6>
              </div>

              <p className="relative z-10 mt-6 text-white/90 text-sm leading-relaxed transition-all duration-500 md:group-hover:opacity-0 md:group-hover:-translate-y-2">
                {item.desc}
              </p>

              <div className="relative z-10 mt-auto pt-5 md:absolute md:inset-x-6 md:bottom-6 md:pt-0 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500">
                <Button label="Learn More" href={item.href} theme="light" className="w-full justify-center" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WhatWeDo
