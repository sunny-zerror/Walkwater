"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react';
import { hasNavigated, finishHeroIntro } from '../common/PageTransition';
import AutoplayVideo from '../common/AutoplayVideo';
import { RiVolumeMuteLine, RiVolumeUpLine } from '@remixicon/react';
gsap.registerPlugin(ScrollTrigger)

const LOADER_LINE = "India's Fastest-Growing Leadership Search and Talent Advisory Firm"

const Hero = () => {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const loaderRef = useRef(null)
  const lineRef = useRef(null)
  const curtainRef = useRef(null)
  const choiceRef = useRef(null)
  const followerRef = useRef(null)
  const followerX = useRef(null)
  const followerY = useRef(null)
  const [showCue, setShowCue] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [introDone, setIntroDone] = useState(hasNavigated)

  useEffect(() => {
    if (hasNavigated) return
    const onDone = () => setIntroDone(true)
    window.addEventListener("hero-intro-done", onDone, { once: true })
    return () => window.removeEventListener("hero-intro-done", onDone)
  }, [])

  // Mirror the video's real mute state (covers the browser forcing a muted start)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const sync = () => setIsMuted(video.muted)
    video.addEventListener("volumechange", sync)
    return () => video.removeEventListener("volumechange", sync)
  }, [])

  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    if (video.paused) video.play().catch(() => {})
  }

  // Sound toggle that trails the cursor across the hero
  useGSAP(() => {
    gsap.set(followerRef.current, { xPercent: -50, yPercent: -50, scale: 0, autoAlpha: 0 })
    followerX.current = gsap.quickTo(followerRef.current, "x", { duration: 0.6, ease: "power3.out" })
    followerY.current = gsap.quickTo(followerRef.current, "y", { duration: 0.6, ease: "power3.out" })
  })

  const { contextSafe: followerSafe } = useGSAP()
  const followerVisible = useRef(false)

  const showFollower = followerSafe((visible) => {
    if (followerVisible.current === visible) return
    followerVisible.current = visible
    gsap.to(followerRef.current, {
      scale: visible ? 1 : 0,
      autoAlpha: visible ? 1 : 0,
      duration: 0.4,
      ease: visible ? "back.out(1.7)" : "power2.out",
      overwrite: "auto",
    })
  })

  const handleHeroMove = (e) => {
    if (!introDone) return
    const rect = sectionRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    // Jump straight to the cursor when it first appears, then trail it
    if (!followerVisible.current && gsap.getProperty(followerRef.current, "opacity") === 0) {
      gsap.set(followerRef.current, { x, y })
    }
    followerX.current?.(x)
    followerY.current?.(y)
    // Step aside for the scroll cue so it stays clickable
    showFollower(!e.target.closest("[data-hero-cue]"))
  }

  const handleHeroClick = (e) => {
    if (!introDone || e.target.closest("button")) return
    toggleSound()
  }

  // Keep the page still while the loader waits for a sound choice
  useEffect(() => {
    if (hasNavigated) return
    const html = document.documentElement
    html.style.overflow = "hidden"
    // Lenis mounts after this component, so stop it on the next frame
    const frame = requestAnimationFrame(() => window.lenis?.stop())
    const release = () => {
      html.style.overflow = ""
      window.lenis?.start()
    }
    window.addEventListener("hero-intro-done", release, { once: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("hero-intro-done", release)
      release()
    }
  }, [])

  const { contextSafe } = useGSAP(() => {
    if (hasNavigated) {
      gsap.set(loaderRef.current, { autoAlpha: 0 })
      finishHeroIntro()
    } else {
      const elapsed = performance.now() / 1000
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const chars = lineRef.current.querySelectorAll(".loader-char")
        const sweepStart = Math.max(0, 0.3 - elapsed)
        const sweepDuration = gsap.utils.clamp(1, 1.6, 2 - elapsed - sweepStart)
        const charDuration = 0.1
        const stagger = (sweepDuration - charDuration) / Math.max(1, chars.length - 1)

        // Every char starts at opacity 25 and fills to the full blue, one after another
        const tl = gsap.timeline()
        tl.to(chars, {
          opacity: 1,
          duration: charDuration,
          ease: "power1.out",
          stagger,
        }, sweepStart)
        // Once the line has filled, the sound choice fades in and the loader waits for a click
        tl.fromTo(choiceRef.current, { autoAlpha: 0, y: "1rem" }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, "+=0.2")
      })

      // Reduced motion: the line and the choice show straight away
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(choiceRef.current, { autoAlpha: 1 })
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

  // Restart the hero video from the beginning, with or without sound
  const startVideo = (withSound) => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = 0
    video.muted = !withSound
    // If the browser still blocks sound, fall back to a muted start
    video.play().catch(() => {
      video.muted = true
      video.play().catch(() => {})
    })
  }

  const enter = contextSafe((withSound) => {
    const video = videoRef.current
    if (video) {
      // Play/pause inside the click so the browser unlocks sound for the later start
      video.muted = !withSound
      video.play().catch(() => {})
      video.pause()
      video.currentTime = 0
    }

    gsap.set(choiceRef.current, { pointerEvents: "none" })
    const done = () => {
      gsap.set(loaderRef.current, { autoAlpha: 0 })
      finishHeroIntro()
      startVideo(withSound)
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      done()
      return
    }

    const tl = gsap.timeline({ onComplete: done })
    tl.to([choiceRef.current, lineRef.current], { opacity: 0, duration: 0.5, ease: "power2.in" })
    tl.to(curtainRef.current, { y: "-250lvh", duration: 0.5, ease: "power2.in" })
  })

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
      <div ref={loaderRef} className='PageTransition mona fixed inset-0 w-full h-svh z-1000 pointer-events-none overflow-hidden'>
        <div ref={lineRef} className="container absolute inset-0 h-full flex items-center justify-center z-20">
          <p className="max-w-200 text-center text-balance  font-bold text-[#00689F] text-[2.25rem] md:text-[2.75rem] leading-tight animate-loader-in motion-reduce:animate-none">
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

        {/* Sound choice: the loader only leaves, and the video only starts, after one is picked */}
        <div ref={choiceRef} className="invisible opacity-0 absolute bottom-12 md:bottom-16 inset-x-0 z-30 flex flex-col items-center gap-y-3 pointer-events-auto">
          <button
            type="button"
            onClick={() => enter(true)}
            className="group border w-fit p-2 pl-4 rounded-full text-sm flex items-center gap-x-2 transition-all duration-300 bg-[#00689F] text-[#ffffff] border-[#00689F] hover:bg-[#ffffff] hover:text-[#00689F]"
          >
            <span className="font-medium">Enter with Sound</span>
            <span className="p-1 center rounded-full transition-all duration-300 bg-[#ffffff] text-[#00689F] group-hover:bg-[#00689F] group-hover:text-[#ffffff]">
              <RiVolumeUpLine size={14} />
            </span>
          </button>
          <button
            type="button"
            onClick={() => enter(false)}
            className="text-sm font-medium text-[#00689F] underline-offset-4 hover:underline"
          >
            Enter without Sound
          </button>
        </div>
      </div>

      <section
        ref={sectionRef}
        onMouseMove={handleHeroMove}
        onMouseLeave={() => showFollower(false)}
        onClick={handleHeroClick}
        className={`relative w-full h-screen overflow-hidden ${introDone ? "pointer-fine:cursor-none" : ""}`}
      >
        {/* On a hard load the video only preloads; the sound choice starts it */}
        <AutoplayVideo ref={videoRef} autoStart={hasNavigated} preload="auto" poster="/images/homepage/hero_poster.webp" className='absolute inset-0  cover will-change-transform'>
          <source src="/videos/hero_vid.mp4" type="video/mp4" />
        </AutoplayVideo>

        {/* Cursor-follow sound toggle (mouse); a click anywhere on the hero toggles it */}
        <div
          ref={followerRef}
          aria-hidden="true"
          className="pointer-coarse:hidden invisible absolute top-0 left-0 z-30 pointer-events-none flex items-center gap-x-2 rounded-full bg-[#ffffff] text-[#00689F] text-sm font-medium whitespace-nowrap p-2 shadow-lg"
        >
          <span className="p-1.5 center rounded-full bg-[#00689F] text-[#ffffff]">
            {isMuted ? <RiVolumeMuteLine size={16} /> : <RiVolumeUpLine size={16} />}
          </span>
        </div>

        {/* Real button for keyboard and touch; mouse users get the follower instead */}
        <button
          type="button"
          onClick={toggleSound}
          aria-label={isMuted ? "Turn sound on" : "Turn sound off"}
          aria-pressed={!isMuted}
          className={`pointer-fine:not-focus-visible:sr-only absolute bottom-8 right-4 md:right-8 z-20 size-11 rounded-full border border-white/60 center text-white transition-opacity duration-300 ${introDone ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          {isMuted ? <RiVolumeMuteLine size={20} /> : <RiVolumeUpLine size={20} />}
        </button>

        <button
          type="button"
          data-hero-cue
          aria-label="Scroll to content"
          onClick={scrollToContent}
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer size-11 rounded-full border border-white/60 center text-white transition-opacity duration-300 ${showCue ? "opacity-100" : "opacity-0 pointer-events-none"}`}
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
