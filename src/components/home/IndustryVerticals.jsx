"use client";
import { useGSAP } from '@gsap/react'
import { RiArrowRightLine } from '@remixicon/react'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Image from 'next/image'
import React, { useRef } from 'react'
gsap.registerPlugin(ScrollTrigger)

const data = [
  {
    id: 1,
    title: "Industrial, Energy & Process",
    desc: "Driving industrial progress through exceptional leadership and strategic talent solutions.",
    img: "/images/homepage/vertices/img1.png"
  },
  {
    id: 2,
    title: "Technology & Digital",
    desc: "Identifying transformative leaders for organizations driving the next generation of technology and digital innovation.",
    img: "/images/homepage/vertices/img2.png"
  },
  {
    id: 3,
    title: "Consumer, Retail, Media & Services",
    desc: "Empowering consumer-focused organizations through exceptional leadership and strategic talent.",
    img: "/images/homepage/vertices/img3.png"
  },
  {
    id: 4,
    title: "Pharma, Healthcare & Lifesciences",
    desc: "Building future-ready leadership teams that shape the future of healthcare, science, and human well-being.",
    img: "/images/homepage/vertices/img4.png"
  },
  {
    id: 5,
    title: "Banking, Financial Services and Consulting",
    desc: "Empowering financial and consulting organizations through exceptional leadership talent.",
    img: "/images/homepage/vertices/img5.png"
  },
]

const IndustryVerticals = () => {

  const containerRef = useRef()

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    })
    gsap.utils.toArray(".slide").forEach((slide) => {
      tl.to(slide, {
        top: 0,
        ease: "linear"
      })
    })
  })


  return (
    <div ref={containerRef} className=' relative h-[400vh] w-full'>
      <div className="container w-full h-screen! flex flex-col justify-center pt-20 space-y-[5vh] sticky! top-0 ">
        <div className="grid grid-cols-1 md:grid-cols-6">
          <div className="md:col-span-4">
            <h2 className="font-semibold leading-none text-[#00689F]">Industry Verticals</h2>
          </div>
          <div className="md:col-span-2 space-y-5 ">
            <p className="text-xl  text-[#657882]  leading-tight">
              Deep sector understanding enables us to deliver leadership talent relevant to complex and evolving business environments.
            </p>
            <button className='border border-[#00689F50] p-2 rounded-lg  text-sm flex items-center gap-x-2'>
              <p className='text-[#00689F]'>Explore Industries Verticals</p>
              <div className="p-1 text-white rounded-md bg-[#00689F]">
                <RiArrowRightLine size={14} />
              </div>
            </button>

          </div>
        </div>
        <div className="w-full relative overflow-hidden rounded-3xl">
          {data.map((item, i) => (
            <div key={i} className={` ${i === 0 ? "relative p-10" : ` slide left-0 top-full p-10 absolute z-[${i}]`}  bg-[#F7F8FF] rounded-3xl w-full  grid   grid-cols-2  `}>
              <div className={`flex flex-col gap-y-5  justify-center ${i % 2 === 0 ? " pr-44" : "order-2 pl-10"}`}>
                <h4 className='font-semibold text-[#00689F] leading-none'>{item.title}</h4>
                <p className='text-[#657882] leading-tight'>{item.desc}</p>
              </div>
              <div className="aspect-video relative overflow-hidden rounded-xl">
                <Image fill src={item.img} className='cover' alt={item.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default IndustryVerticals