"use client";
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import React from 'react'
gsap.registerPlugin(ScrollTrigger)

const page = () => {

    useGSAP(() => {

        gsap.set(".outer_circ", { rotate: -90 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".ncd",
                start: "top top",
                end: "bottom bottom",
                scrub: true
            }
        })
        tl.to(".outer_circ", {
            scale: 1,
            stagger: 0.1
        })
        tl.to(".inner_circ", {
            scale: 1,
        }, "<+=0.5")
        tl.to(".outer_circ", {
            rotate: 0,
        }, "<")
        tl.to(".grad_circle", {
            backgroundColor: "#86B039",
        })
        tl.to(".pulse_ring", {
            scale: 2.5,
            opacity: 0,
            backgroundColor: "#86B039",
            duration: 0.5,
            ease: "power2.out",
        }, ">")

        tl.to(".outer_circ", {
            rotate: 90,
        }, "<+=0.85")
        tl.to(".inner_circ", {
            scale: 0,
        }, "<")
        tl.to(".outer_center", {
            backgroundColor: "#86B039",
            duration: 0.2,
        })
        tl.to(".outer_center", {
            width: "14vw",
            height: "14vw",
        }, "<+=0.5")
        tl.to(".outer_center", {
            width: "21vw",
            height: "21vw",
        })
        tl.to(".outer_center", {
            width: "28vw",
            height: "28vw",
        })
        tl.to(".outer_center", {
            width: "35vw",
            height: "35vw",
        })
        tl.to(".outer_circ", {
            opacity: 0,
            duration: 0.0
        })
        tl.to(".last_circ_paren", {
            opacity: 1,
            duration: 0.0
        })
        tl.to(".pulse_ring_2", {
            scale: 1.25,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
        })
        tl.to(".last_1", {
            opacity: 1,
            width: "29vw",
            height: "29vw",
        })
        tl.to(".last_2", {
            opacity: 1,
            width: "21vw",
            height: "21vw",
        }, "<")
        tl.to(".last_3", {
            opacity: 1,
            width: "13vw",
            height: "13vw",
        }, "<")

    })

    return (
        <div className=' ncd h-[500vh] w-full relative'>
            <div className="w-full sticky top-0 h-screen center">


                <div className=" last_circ_paren opacity-0 size-[35vw] aspect-square border border-[#00000050] absolute flex items-end justify-center bg-[#86B039] rounded-full">
                    <div className="pulse_ring_2 absolute w-full h-full rounded-full bg-[#86B039] opacity-80"></div>
                    <div className=" last_1 opacity-0 size-[35vw] aspect-square border border-[#00000050] absolute bg-white/28 rounded-full"></div>
                    <div className="last_2 opacity-0 size-[35vw] aspect-square border border-[#00000050] absolute rounded-full bg-white/40 "></div>
                    <div className="last_3 opacity-0 size-[35vw] aspect-square border border-[#00000050] absolute rounded-full bg-white/70 "></div>
                </div>
                <div className=" outer_circ  scale-0 size-[35vw] aspect-square border border-[#00000050] absolute center rounded-full">
                    <div className=" inner_circ scale-0 absolute size-[1vw] aspect-square border border-[#00000050] bg-[#ffffff] rounded-full -translate-x-[4vw] translate-y-[-17vw]"></div>
                    <div className="inner_circ scale-0 absolute size-[4vw] aspect-square border border-[#00000050]  rounded-full bg-[#ffffff] grad_circle center -translate-x-[17.5vw]">
                        <div className="pulse_ring absolute w-full h-full rounded-full bg-[#ffffff] opacity-80"></div>
                    </div>
                    <div className="inner_circ scale-0 absolute size-[4vw] aspect-square border border-[#00000050]  rounded-full bg-[#ffffff] grad_circle center translate-x-[8vw] translate-y-[15.5vw]">
                        <div className="pulse_ring absolute w-full h-full rounded-full bg-[#ffffff] opacity-80"></div>
                    </div>
                </div>
                <div className=" outer_circ  scale-0 size-[28vw] aspect-square border border-[#00000050] absolute center rounded-full">
                    <div className="inner_circ scale-0 absolute size-[2vw] aspect-square border border-[#00000050] bg-[#ffffff] rounded-full -translate-x-[10vw] translate-y-[10vw]"></div>
                    <div className="inner_circ scale-0 absolute size-[1.5vw] aspect-square border border-[#00000050] bg-[#ffffff] rounded-full translate-x-[5vw] translate-y-[-13vw]"></div>
                </div>
                <div className=" outer_circ  scale-0 size-[21vw] aspect-square border border-[#00000050] absolute center rounded-full">
                    <div className=" inner_circ scale-0 absolute size-[2vw] aspect-square border border-[#00000050] rounded-full center translate-x-[9.5vw] bg-[#ffffff] grad_circle translate-y-[-4.5vw]">
                        <div className="pulse_ring absolute w-full h-full rounded-full bg-[#ffffff] opacity-80"></div>
                    </div>
                    <div className=" inner_circ scale-0 absolute size-[1vw] aspect-square border border-[#00000050] bg-[#ffffff] rounded-full translate-x-[1.5vw] translate-y-[10.3vw]"></div>
                </div>
                <div className=" outer_circ  scale-0 size-[14vw] aspect-square border border-[#00000050] absolute center rounded-full">
                    <div className="inner_circ scale-0 absolute size-[2vw] aspect-square border border-[#00000050] bg-[#ffffff] rounded-full -translate-x-[5vw] translate-y-[-4.9vw]"></div>
                </div>
                <div className=" outer_circ outer_center scale-0 size-[7vw] aspect-square border border-[#00000050] absolute center rounded-full">
                    <div className="inner_circ scale-0 absolute size-[1vw] aspect-square border border-[#00000050] rounded-full center translate-y-[3.35vw] bg-[#ffffff] grad_circle translate-x-[0.5vw]">
                        <div className="pulse_ring absolute w-full h-full rounded-full bg-[#ffffff] opacity-80"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page