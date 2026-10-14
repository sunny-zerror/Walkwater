"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react';
import { hasNavigated } from '../common/PageTransition';
import AutoplayVideo from '../common/AutoplayVideo';
gsap.registerPlugin(ScrollTrigger)

const LOADER_LINE = "India's Fastest-Growing Leadership Search and Talent Advisory Firm"

const Hero = () => {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const loaderRef = useRef(null)
  const lineRef = useRef(null)
  const curtainRef = useRef(null)
  const [showCue, setShowCue] = useState(true)

  useGSAP(() => {
    if (hasNavigated) {
      gsap.set(loaderRef.current, { autoAlpha: 0 })
    } else {
      const elapsed = performance.now() / 1000
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const chars = lineRef.current.querySelectorAll(".loader-char")
        const sweepStart = Math.max(0, 0.3 - elapsed)
        const sweepDuration = gsap.utils.clamp(1, 1.6, 2 - elapsed - sweepStart)
        const charDuration = 0.4
        const stagger = (sweepDuration - charDuration) / Math.max(1, chars.length - 1)

        // Every char starts at opacity 25 and fills to the full blue, one after another
        const tl = gsap.timeline()
        tl.to(chars, {
          opacity: 1,
          duration: charDuration,
          ease: "power1.out",
          stagger,
        }, sweepStart)
        tl.to(lineRef.current, { opacity: 0, duration: 0.6, ease: "power2.in" }, Math.max(2 - elapsed, sweepStart + sweepDuration))
        tl.to(curtainRef.current, { y: "-250lvh", duration: 0.35, ease: "power2.in" })
        tl.set(loaderRef.current, { autoAlpha: 0 })
      })

      // Reduced motion: the line shows without movement, holds, and the loader disappears
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(loaderRef.current, { autoAlpha: 0, delay: Math.max(0, 2.6 - elapsed) })
      })
    }

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

  useEffect(() => {
    const handleScroll = () => setShowCue(window.scrollY <= 40)
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToContent = () => {
    const target = document.getElementById("about")
    if (!target) return
    if (window.lenis) {
      // Lenis ignores scroll-margin, so pass it in as the offset
      const offset = parseFloat(getComputedStyle(target).scrollMarginTop) || 0
      window.lenis.scrollTo(target, { offset: -offset })
    } else {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <div ref={loaderRef} className='PageTransition fixed inset-0 w-full h-screen z-1000 pointer-events-none overflow-hidden'>
        <div ref={lineRef} className="container absolute inset-0 h-full flex items-center justify-center z-20">
          <p className="max-w-200 text-center text-balance  font-semibold text-[#00689F] text-[1.75rem] md:text-[2.5rem] leading-tight animate-loader-in motion-reduce:animate-none">
            <span className="sr-only">{LOADER_LINE}</span>
            {/* Split per char for the sweep; each word stays on one line */}
            <span aria-hidden="true">
              {LOADER_LINE.split(" ").map((word, w) => (
                <React.Fragment key={w}>
                  {w > 0 && " "}
                  <span className="whitespace-nowrap">
                    {[...word].map((char, c) => (
                      <span key={c} className="loader-char opacity-15 motion-reduce:opacity-100">{char}</span>
                    ))}
                  </span>
                </React.Fragment>
              ))}
            </span>
          </p>
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
        <AutoplayVideo ref={videoRef} preload="auto" className='absolute inset-0 brightness-75 cover will-change-transform' src="/videos/hero_vid.mp4" />

        <button
          type="button"
          aria-label="Scroll to content"
          onClick={scrollToContent}
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 size-11 rounded-full border border-white/60 center text-white transition-opacity duration-300 ${showCue ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-6 animate-nudge motion-reduce:animate-none" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </section>
    </>
  );
}

export default Hero;
