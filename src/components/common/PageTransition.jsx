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

            // 1. Curtain moves in to cover the screen
            // Using -75vw because the left gradient is 75vw wide, so the solid 100vw center perfectly covers the screen.
            tl.to(curtainRef.current, {
                x: "-75vw",
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
            // 6. Curtain continues moving left to reveal the new page
            .to(curtainRef.current, {
                x: "-250vw",
                duration: 1,
                ease: "power4.inOut"
            })
            // 7. Reset curtain position for next time
            .set(curtainRef.current, {
                x: "100vw"
            });
        };

        window.addEventListener('start-page-transition', handleTransition);
        return () => window.removeEventListener('start-page-transition', handleTransition);
    }, []);

    return (
        <div className='PageTransition fixed inset-0 w-full h-screen z-[1000] pointer-events-none overflow-hidden'>
            <div className="w-full absolute inset-0 h-full flex items-center justify-center z-20">
                <h2 ref={textRef} className="text-white capitalize text-5xl md:text-7xl font-bold opacity-0">
                    {title}
                </h2>
            </div>
            <div 
                ref={curtainRef} 
                className="PageTransition-curtainWrapper h-full absolute flex inset-0"
                style={{ width: '250vw', transform: 'translateX(100vw)' }}
            >
                <div className="PageTransition-curtainGradientLeft shrink-0"></div>
                <div className="PageTransition-curtainGradientTop hidden"></div>
                <div className="PageTransition-curtainCentre shrink-0 relative flex items-center justify-center">
                   {/* Background color from CSS is applied here */}
                </div>
                <div className="PageTransition-curtainGradientBottom hidden"></div>
                <div className="PageTransition-curtainGradientRight shrink-0"></div>
            </div>
        </div>
    );
}

export default PageTransition;