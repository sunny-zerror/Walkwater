"use client";
import React, { useEffect, useRef } from "react";

// Muted looping background video that reliably starts.
// React doesn't render `muted` into the server HTML, so the browser can refuse autoplay before
// hydration. This forces mute, then retries play() once data is ready, when the tab becomes
// visible again, and on the first user interaction (covers iOS / data-saver blocks).
const AutoplayVideo = ({ ref, children, ...props }) => {
  const videoRef = useRef(null);

  const setRef = (node) => {
    videoRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");

    const tryPlay = () => {
      if (video.paused) video.play().catch(() => {});
    };
    const onVisible = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    const interactions = ["pointerdown", "touchstart", "keydown", "scroll"];

    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    document.addEventListener("visibilitychange", onVisible);
    interactions.forEach((e) => window.addEventListener(e, tryPlay, { passive: true, once: true }));

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", onVisible);
      interactions.forEach((e) => window.removeEventListener(e, tryPlay));
    };
  }, []);

  return (
    <video ref={setRef} autoPlay loop muted playsInline {...props}>
      {children}
    </video>
  );
};

export default AutoplayVideo;
