"use client"

import { usePathname } from "next/navigation"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(ScrollTrigger, SplitText)

const GlobalParaReveal = () => {
  const pathname = usePathname()

  useGSAP(() => {

    const splits = []

    const ctx = gsap.context(async () => {

      await document.fonts.ready

      const elements = gsap.utils.toArray("[data-para-effect]")
      const listeners = []

      elements.forEach((el) => {

        if (el.dataset.splitInitialized) return

        el.dataset.splitInitialized = "true"

        const split = new SplitText(el, {
          type: "lines,words",
          linesClass: "split-line",
        })

        splits.push(split)

        split.lines.forEach((line) => {

          const wrapper = document.createElement("div")

          wrapper.style.overflow = "hidden"

          line.parentNode.insertBefore(wrapper, line)

          wrapper.appendChild(line)
        })

        gsap.set(split.lines, {
          yPercent: 110,
          willChange: "transform",
        })

        gsap.to(split.lines, {
          yPercent: -8,
          duration: 1,
          stagger: 0.08,
          ease: "expo.out",

          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })

        const onMouseEnter = () => {
          if (window.innerWidth < 1020) return;
          gsap.killTweensOf(split.words)
          const tl = gsap.timeline()

          split.lines.forEach((line, index) => {
            const lineWords = line.children

            tl.to(lineWords, {
              opacity: 0.2,
              stagger: { amount: 0.4 },
              duration: 0.15,
              ease: "power2.inOut",
            }, index * 0.05)
              .to(lineWords, {
                opacity: 1,
                color: "#86B039",
                stagger: { amount: 0.4 },
                duration: 0.25,
                ease: "power2.inOut",
              }, index * 0.05 + 0.1)
          })
        }

        const onMouseLeave = () => {
          if (window.innerWidth < 1020) return;
          gsap.killTweensOf(split.words)
          const tl = gsap.timeline()

          split.lines.forEach((line, index) => {
            const lineWords = line.children

            tl.to(lineWords, {
              opacity: 0.2,
              stagger: { amount: 0.4 },
              duration: 0.15,
              ease: "power2.inOut",
            }, index * 0.05)
              .to(lineWords, {
                opacity: 1,
                color: "",
                stagger: { amount: 0.4 },
                duration: 0.25,
                ease: "power2.inOut",
              }, index * 0.05 + 0.1)
          })
        }

        const triggerEl = el.closest('[data-hover-parent]') || el;

        triggerEl.addEventListener("mouseenter", onMouseEnter)
        triggerEl.addEventListener("mouseleave", onMouseLeave)
        listeners.push({ el: triggerEl, event: "mouseenter", handler: onMouseEnter })
        listeners.push({ el: triggerEl, event: "mouseleave", handler: onMouseLeave })
      })

    })

    const timeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 500)

    return () => {

      clearTimeout(timeout)

      listeners.forEach(({ el, event, handler }) => {
        el.removeEventListener(event, handler)
      })

      splits.forEach((split) => split.revert())

      document
        .querySelectorAll("[data-para-effect]")
        .forEach((el) => {
          delete el.dataset.splitInitialized
        })

      ctx.revert()
    }

  }, [pathname])

  return null
}

export default GlobalParaReveal