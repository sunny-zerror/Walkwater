"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const transitionPage = (href, title, router) => {
    window.dispatchEvent(
        new CustomEvent('start-page-transition', {
            detail: { href, title, router }
        })
    );
};

const PageTransition = () => {
    const [title, setTitle] = useState("");
    const curtainRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const handleTransition = (e) => {
            const { href, title, router } = e.detail;
            setTitle(title);

            const tl = gsap.timeline();

            // 1. Curtain moves in from bottom to cover the screen
            tl.to(curtainRef.current, {
                y: "-75lvh",
                duration: 1,
                ease: "power4.inOut"
            })
            // 2. Text fades in
            .to(textRef.current, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            })
            // 3. Trigger Next.js Router navigation
            .call(() => {
                if(router && router.push) {
                    router.push(href);
                } else {
                    window.location.href = href;
                }
            })
            // 4. Small delay to let new page mount
            .to({}, { duration: 0.5 })
            // 5. Text fades out
            .to(textRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            })
            // 6. Curtain continues moving up to reveal the new page
            .to(curtainRef.current, {
                y: "-250lvh",
                duration: 1,
                ease: "power4.inOut"
            })
            // 7. Reset curtain position for next time
            .set(curtainRef.current, {
                y: "100lvh"
            });
        };

        window.addEventListener('start-page-transition', handleTransition);
        return () => window.removeEventListener('start-page-transition', handleTransition);
    }, []);

    return (
        <div className='PageTransition fixed inset-0 w-full h-screen z-[1000] pointer-events-none overflow-hidden'>
            <div className="w-full absolute inset-0 h-full flex items-center justify-center z-20">
                <h2 ref={textRef} className="text-black capitalize text-5xl md:text-7xl font-bold opacity-0">
                    {title}
                </h2>
            </div>
            <div 
                ref={curtainRef} 
                className="PageTransition-curtainWrapper w-full absolute flex flex-col inset-0"
                style={{ height: '250lvh', transform: 'translateY(100lvh)' }}
            >
                <div className="PageTransition-curtainGradientTop shrink-0"></div>
                <div className="PageTransition-curtainCentre shrink-0 relative flex items-center justify-center">
                   {/* Background color from CSS is applied here */}
                </div>
                <div className="PageTransition-curtainGradientBottom shrink-0"></div>
            </div>
        </div>
    );
}

export default PageTransition;