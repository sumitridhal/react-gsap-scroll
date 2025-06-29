import "./App.css";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";
import Lenis from "lenis";
import { useEffect, useState } from "react";

import AnimatedBackground from "./components/AnimatedBackground";
import Hero from "./components/Hero";
import ImageLoader from "./components/ImageLoader";
import ScrollProgress from "./components/ScrollProgress";
import ThemeSelector from "./components/ThemeSelector";
import { ImageProvider } from "./contexts/ImageContext";
import { ThemeProvider } from "./contexts/ThemeContext";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin, SplitText);

function App() {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const handleLoadComplete = () => {
    // Animate out the loader before showing main content
    const loader = document.querySelector(".image-loader");
    if (loader) {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          setImagesLoaded(true);
          // Animate in main content
          const appDiv = document.querySelector(".app");
          if (appDiv) {
            gsap.fromTo(
              appDiv,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
            );
          }
        },
      });
    } else {
      setImagesLoaded(true);
    }
  };

  useEffect(() => {
    if (!imagesLoaded) return;

    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });
    // const lenis = new Lenis();

    // Connect Lenis with GSAP ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [imagesLoaded]);

  return (
    <ImageProvider>
      <ThemeProvider>
        {!imagesLoaded ? (
          <ImageLoader onLoadComplete={handleLoadComplete} />
        ) : (
          <>
            <ScrollProgress />
            <ThemeSelector />
            <div className="app">
              <AnimatedBackground />
              <Hero />
            </div>
          </>
        )}
      </ThemeProvider>
    </ImageProvider>
  );
}

export default App;
