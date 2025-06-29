import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ScrollProgress = () => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollProgress = scrollTop / scrollHeight;

      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: scrollProgress,
          duration: 0.1,
          ease: "none",
        });
      }
    };

    // Listen to scroll events (works with Lenis)
    window.addEventListener("scroll", updateProgress);
    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <div className="scroll-progress-container">
      <div ref={progressRef} className="scroll-progress-bar"></div>
    </div>
  );
};

export default ScrollProgress;
