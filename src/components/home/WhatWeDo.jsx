import Image from 'next/image'
import React from 'react'
import Button from '../common/Button'

const services = [
  {
    title: "CEO and Board Search",
    desc: "As new sectors emerge and the CEO's role grows less predictable, we find the CEOs and board members organizations need for what comes next.",
    icon: "/images/homepage/what_we_do/ceo.svg",
    img: "/images/homepage/what_we_do/ceo.jpg",
    href: "/",
  },
  {
    title: "Talent Core",
    desc: "Our specialized executive search for the core talent of an organization: the senior and functional leaders every business depends on.",
    icon: "/images/homepage/what_we_do/talent.svg",
    img: "/images/homepage/what_we_do/talent.jpg",
    href: "/",
  },
  {
    title: "Talent Advisory",
    desc: "Talent trends, market compensation and sector-specific data for organizations at every stage, so leadership decisions rest on facts.",
    icon: "/images/homepage/what_we_do/talent_advisory.svg",
    img: "/images/homepage/what_we_do/talent_advisory.jpg",
    href: "/",
  },
  {
    title: "Entrepreneurial Services",
    desc: "Start-ups are rewriting the rules of business. We find leaders who can drive growth in fast-moving, founder-led organizations.",
    icon: "/images/homepage/what_we_do/enterpreneurial_service.svg",
    img: "/images/homepage/what_we_do/enterpreneurial_service.jpg",
    href: "/",
  },
  {
    title: "Diversity",
    desc: "India's many languages and cultures make a complex, compelling talent landscape. We help organizations build leadership teams that reflect it.",
    icon: "/images/homepage/what_we_do/diversity.svg",
    img: "/images/homepage/what_we_do/diversity.jpg",
    href: "/",
  },
  {
    title: "PE & VC",
    desc: "Private equity and venture capital have backed Indian business since the 1990s. We find leaders who build value across their portfolios.",
    icon: "/images/homepage/what_we_do/pe_vc.svg",
    img: "/images/homepage/what_we_do/pe_vc.jpg",
    href: "/",
  },
]

const WhatWeDo = () => {
  return (
    <div className="w-full relative overflow-hidden py-section">
      <Image
        src="/images/homepage/what_we_do_bg.svg"
        alt=""
        fill
        className="object-cover"
      />

      <div className="container relative z-10 space-y-stack">
        <div className="text-center space-y-title">
          <h2 data-heading-effect className="text-white leading-none mx-auto w-fit">
            What We Do
          </h2>
          <p data-para-effect className="text-white/90 text-base md:text-lg">
            Leadership search and talent advisory for every stage of an organization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-grid">
          {services.map((item, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-white/25 bg-white/15 backdrop-blur-md p-5 md:p-6 aspect-5/3 flex flex-col justify-between transition-all duration-500 hover:border-white/40"
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
                  <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </>
              )}

              <div className="relative z-10 flex items-center gap-x-3">
                <div className="size-11 shrink-0 rounded-lg bg-white border border-white center">
                  <Image src={item.icon} alt="" width={26} height={26} />
                </div>
                <h6 className="text-white leading-tight">{item.title}</h6>
              </div>

              {/* Below lg (touch) the description and Learn More stay visible; hover swaps them on desktop */}
              <p className=" max-sm:mt-5 relative z-10 text-white/90 transition-all duration-500 lg:group-hover:opacity-0 lg:group-hover:-translate-y-2">
                {item.desc}
              </p>

              <div className="relative z-10 mt-auto pt-5 lg:absolute lg:inset-x-6 lg:bottom-6 lg:pt-0 lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-500">
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
