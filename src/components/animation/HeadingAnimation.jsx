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

                const split = new SplitText(el, {
                    type: "chars",
                })

                splits.push(split)

                split.chars.forEach((char) => {

                    const wrapper = document.createElement("span")

                    wrapper.style.overflow = "hidden"
                    wrapper.style.display = "inline-block"

                    char.parentNode.insertBefore(wrapper, char)

                    wrapper.appendChild(char)
                })

                gsap.set(split.chars, {
                    opacity: 0.1,
                })

                gsap.to(split.chars, {
                    opacity: 1,
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