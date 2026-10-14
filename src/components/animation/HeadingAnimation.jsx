"use client"

import { usePathname } from "next/navigation"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(ScrollTrigger, SplitText)

const HeadingAnimation = () => {
    const pathname = usePathname()

    useGSAP(() => {

        const splits = []
        const listeners = []

        const ctx = gsap.context(async () => {

            await document.fonts.ready

            const elements = gsap.utils.toArray("[data-heading-effect]")

            elements.forEach((el) => {

                if (el.dataset.splitInitialized) return

                el.dataset.splitInitialized = "true"

                // Split into words first so chars stay grouped and lines only break between words
                const split = new SplitText(el, {
                    type: "words,chars",
                    wordsClass: "split-word",
                })

                splits.push(split)

                split.chars.forEach((char) => {

                    const wrapper = document.createElement("span")

                    wrapper.style.overflow = "hidden"
                    wrapper.style.display = "inline-block"

                    char.parentNode.insertBefore(wrapper, char)

                    wrapper.appendChild(char)
                })

                // data-heading-effect="words" reveals word by word; otherwise char by char.
                // The hover effect below stays per char either way.
                const byWords = el.dataset.headingEffect === "words"
                const revealTargets = byWords ? split.words : split.chars

                gsap.set(revealTargets, {
                    opacity: 0.1,
                })

                gsap.to(revealTargets, {
                    opacity: 1,
                    duration: 1,
                    stagger: byWords ? 0.15 : 0.08,
                    ease: "expo.out",

                    scrollTrigger: {
                        trigger: el,
                        // data-heading-start lets a section reveal its heading earlier
                        start: el.dataset.headingStart || "top 85%",
                        toggleActions: "play none none reverse",
                    },
                })

                const onMouseEnter = () => {
                    if (window.innerWidth < 1020) return;
                    gsap.killTweensOf(split.chars)
                    const tl = gsap.timeline()
                    tl.to(split.chars, {
                        opacity: 0.2,
                        stagger: 0.03,
                        duration: 0.15,
                        ease: "power2.inOut",
                    })
                        .to(split.chars, {
                            opacity: 1,
                            stagger: 0.03,
                            duration: 0.25,
                            ease: "power2.inOut",
                        }, 0.08)
                }

                el.addEventListener("mouseenter", onMouseEnter)
                listeners.push({ el, handler: onMouseEnter })
            })

        })

        const timeout = setTimeout(() => {
            ScrollTrigger.refresh()
        }, 500)

        return () => {

            clearTimeout(timeout)

            listeners.forEach(({ el, handler }) => {
                el.removeEventListener("mouseenter", handler)
            })

            splits.forEach((split) => split.revert())

            document
                .querySelectorAll("[data-heading-effect]")
                .forEach((el) => {
                    delete el.dataset.splitInitialized
                })

            ctx.revert()
        }

    }, [pathname])

    return null
}

export default HeadingAnimation