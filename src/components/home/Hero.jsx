"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const logoRef = useRef(null)
  const curtainRef = useRef(null)

  useGSAP(() => {
    // Intro: logo fades in/out, then the gradient curtain slides up to reveal the page
    const tl = gsap.timeline({
      delay: 0.5
    })
    tl.to(logoRef.current, {
      opacity: 1
    })
    tl.to(logoRef.current, {
      opacity: 0,
      delay: 0.5
    })
    tl.to(curtainRef.current, {
      y: "-250lvh",
    })

    gsap.to(videoRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    })
  })

  return (
    <>
      <div className='PageTransition fixed inset-0 w-full h-screen z-1000 pointer-events-none overflow-hidden'>
        <div className="w-full absolute inset-0 h-full flex items-center justify-center z-20">
          <Image
            ref={logoRef}
            src="/logo.svg"
            alt="WalkWater Talent Advisors"
            width={400}
            height={100}
            className="h-16 opacity-0 w-auto object-contain"
            priority
          />
        </div>
        <div
          ref={curtainRef}
          className="PageTransition-curtainWrapper w-full absolute flex flex-col inset-0"
          style={{ height: '250lvh', transform: 'translateY(-75lvh)' }}
        >
          <div className="PageTransition-curtainGradientTop shrink-0"></div>
          <div className="PageTransition-curtainCentre shrink-0 relative flex items-center justify-center"></div>
          <div className="PageTransition-curtainGradientBottom shrink-0"></div>
        </div>
      </div>

      <section ref={sectionRef} className="relative w-full h-screen overflow-hidden">
        <video ref={videoRef} loop muted playsInline autoPlay className='absolute inset-0 brightness-75 cover will-change-transform' src="/videos/hero_vid.mp4"></video>
      </section>
    </>
  );
}

export default Hero;
