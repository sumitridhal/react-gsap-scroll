import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../contexts/ThemeContext";
import { useImages } from "../contexts/ImageContext";
import type { ImageData } from "../contexts/ImageContext";

// Register GSAP plugins
gsap.registerPlugin(SplitText, ScrollTrigger);

// Theme-specific titles and subtitles
const THEME_CONTENT = {
  "warm-beige": {
    title: "ARTISAN CHRONICLES",
    subtitle: "Crafted with Warmth & Soul",
  },
  "cool-grey": {
    title: "MINIMAL ECHOES",
    subtitle: "Pure Form & Function",
  },
  dark: {
    title: "SHADOW PROPHECIES",
    subtitle: "Embracing the Unknown",
  },
  forest: {
    title: "ORGANIC SPIRITS",
    subtitle: "Born from Nature's Wisdom",
  },
  sunset: {
    title: "GOLDEN LEGENDS",
    subtitle: "Chasing Endless Horizons",
  },
  ocean: {
    title: "FLUID MYSTERIES",
    subtitle: "Depths of Infinite Blue",
  },
  lavender: {
    title: "ETHEREAL VISIONS",
    subtitle: "Dreams in Purple Haze",
  },
};

// Function to get content for current theme
const getThemeContent = (theme: string) => {
  return (
    THEME_CONTENT[theme as keyof typeof THEME_CONTENT] ||
    THEME_CONTENT["warm-beige"]
  );
};

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  // Text refs and state
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  // Images refs and state
  const imagesRef = useRef<HTMLDivElement>(null);

  // Get theme and images from context
  const { currentTheme } = useTheme();
  const { getRandomImages, isLoading } = useImages();

  // State for current theme content
  const [currentContent, setCurrentContent] = useState(() =>
    getThemeContent(currentTheme)
  );
  const [isLoadingText, setIsLoadingText] = useState(false);

  // State for current images
  const [currentImages, setCurrentImages] = useState<ImageData[]>([]);
  const [isLoadingNewImages, setIsLoadingNewImages] = useState(false);

  // Initial load of images when context is ready
  useEffect(() => {
    if (!isLoading && currentImages.length === 0) {
      const newImages = getRandomImages(6);
      setCurrentImages(newImages);
    }
  }, [isLoading, getRandomImages, currentImages.length]);

  // Listen for theme changes and load new random images
  useEffect(() => {
    if (isLoading || currentImages.length === 0) {
      return;
    }

    setIsLoadingNewImages(true);
    const newImages = getRandomImages(6);
    setCurrentImages(newImages);

    // Reset loading state after animation completes
    setTimeout(() => {
      setIsLoadingNewImages(false);
    }, 1200);
  }, [currentTheme, isLoading, getRandomImages, currentImages.length]);

  // Hero floating animation (separate from main timeline)
  useGSAP(
    () => {
      if (!heroRef.current) return;

      // Add floating animation to the entire hero
      gsap.to(heroRef.current, {
        y: 0,
        duration: 6,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: heroRef }
  );

  // Main timeline for text and images
  useGSAP(
    () => {
      // Wait for all refs to be available and images to be loaded
      if (
        !textContainerRef.current ||
        !titleRef.current ||
        !heroRef.current ||
        !subtitleRef.current ||
        !imagesRef.current ||
        currentImages.length === 0
      ) {
        return;
      }

      // Handle theme changes with full reset
      const newContent = getThemeContent(currentTheme);

      if (newContent.title !== currentContent.title) {
        // COMPLETE RESET ON THEME CHANGE

        // 1. Kill all existing timelines and ScrollTriggers
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        gsap.killTweensOf("*"); // Kill all ongoing animations

        // 2. Reset scroll position to top
        window.scrollTo({ top: 0, behavior: "instant" });

        // 3. Reset all element states to initial values
        if (titleRef.current) {
          gsap.set(titleRef.current, {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            clearProps: "all",
          });
        }

        if (subtitleRef.current) {
          gsap.set(subtitleRef.current, {
            opacity: 0,
            y: 20,
            clearProps: "transform,opacity",
          });
        }

        // Reset images to initial hidden state
        const images = imagesRef.current?.querySelectorAll(".floating-image");
        if (images && images.length > 0) {
          gsap.set(images, {
            scale: 0,
            opacity: 0,
            visibility: "hidden",
            x: -1000,
            y: -1000,
            clearProps: "transform,opacity,visibility",
          });
        }

        // 4. Update content immediately
        setIsLoadingText(true);
        setCurrentContent(newContent);

        // 5. Brief delay to ensure DOM updates, then proceed with new animations
        setTimeout(() => {
          setIsLoadingText(false);
          // The rest of the animation setup will happen after this return
        }, 100);

        return; // Exit early to restart the whole effect with new theme
      }

      // Create character timeline
      const charsTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          refreshPriority: -1,
          scrub: 1,
        },
      });

      // Create title timeline
      const titleTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Split text for character animation
      if (!titleRef.current) {
        return;
      }

      gsap.set(titleRef.current, { opacity: 1 });
      const splitChars = SplitText.create(titleRef.current, {
        type: "words, chars",
      });

      if (!splitChars.chars || splitChars.chars.length === 0) {
        return;
      }

      // Set initial states
      gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
      gsap.set(splitChars.chars, { y: -100, opacity: 0 });

      // Get images for animation - ensure they exist
      const images = imagesRef.current?.querySelectorAll(".floating-image");

      if (images && images.length > 0) {
        gsap.set(images, {
          scale: 0,
          opacity: 0,
          visibility: "hidden",
          x: -1000,
          y: -1000,
        });
      }

      // Build the character timeline
      charsTimeline
        // Character animation (0-30% of scroll)
        .to(
          splitChars.chars,
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
            stagger: {
              amount: 0.2,
            },
          },
          0
        )

        // Subtitle animation (20-40% of scroll)
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "power2.out",
          },
          0.2
        );

      // Build the title timeline
      titleTimeline
        .to(
          titleRef.current,
          {
            scale: 0.8,
            opacity: 1,
            duration: 0.3,
            ease: "power2.in",
          },
          0.1
        )
        // Title scaling and fade (25-45% of scroll)
        .to(
          titleRef.current,
          {
            scale: 0.6,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          0.25
        );

      // Images animation (only if images exist)
      if (images && images.length > 0) {
        charsTimeline.to(
          {},
          {
            duration: 0.8,
            ease: "none",
            onUpdate: function () {
              const progress = this.progress();
              // Map timeline progress (0-1) to image movement progress
              const imageProgress = Math.max(0, (progress - 0.2) / 0.8);

              images.forEach((image, index) => {
                // Get current window dimensions
                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;

                // Calculate dynamic offscreen start positions based on screen size
                const startPositions = [
                  { x: -(windowWidth + 200), y: -(windowHeight + 200) }, // top-left
                  { x: windowWidth + 200, y: -(windowHeight + 200) }, // top-right
                  { x: -(windowWidth + 200), y: windowHeight + 200 }, // bottom-left
                  { x: windowWidth + 200, y: windowHeight + 200 }, // bottom-right
                  { x: -(windowWidth + 300), y: 0 }, // left
                  { x: windowWidth + 300, y: 0 }, // right
                ];

                // Calculate dynamic final positions based on screen size
                const finalPositions = [
                  { x: windowWidth * 0.045, y: windowHeight * 0.02 }, // top-left
                  { x: windowWidth * 0.75, y: windowHeight * 0.04 }, // top-right
                  { x: windowWidth * 0.1, y: windowHeight * 0.55 }, // bottom-left
                  { x: windowWidth * 0.8, y: windowHeight * 0.55 }, // bottom-right
                  { x: windowWidth * 0.4, y: windowHeight * 0.4 }, // left
                  { x: windowWidth * 0.5, y: windowHeight * 0.2 }, // right
                ];

                const startPos = startPositions[index % startPositions.length];
                const finalPos = finalPositions[index % finalPositions.length];

                // Interpolate between start and final positions
                const moveX =
                  startPos.x + (finalPos.x - startPos.x) * imageProgress;
                const moveY =
                  startPos.y + (finalPos.y - startPos.y) * imageProgress;

                const scale =
                  imageProgress > 0.1 ? Math.min(1, imageProgress * 2) : 0;
                const opacity = imageProgress > 0.05 ? 1 : imageProgress * 20;
                const visibility = imageProgress > 0.05 ? "visible" : "hidden";

                gsap.set(image, {
                  x: moveX,
                  y: moveY,
                  scale,
                  opacity,
                  visibility,
                });
              });
            },
          },
          0.2
        );
      }

      // Handle image loading animations
      const handleImageLoad = () => {
        const newImages = imagesRef.current?.querySelectorAll(
          ".floating-image img"
        );

        if (newImages && newImages.length > 0) {
          newImages.forEach((img) => {
            if (img instanceof HTMLImageElement) {
              if (!img.complete) {
                img.addEventListener("load", () => {
                  gsap.fromTo(
                    img.parentElement,
                    { scale: 0.8, opacity: 0 },
                    {
                      scale: 1,
                      opacity: 1,
                      duration: 0.6,
                      ease: "back.out(1.7)",
                    }
                  );
                });
              }
            }
          });
        }
      };

      handleImageLoad();

      // Add parallax effect on mousemove
      const handleMouseMove = (e: MouseEvent) => {
        if (!heroRef.current || !imagesRef.current) return;

        const heroRect = heroRef.current.getBoundingClientRect();
        const mouseX = e.clientX - heroRect.left;
        const mouseY = e.clientY - heroRect.top;

        // Normalize mouse position to -1 to 1 range
        const normalizedX = (mouseX / heroRect.width) * 2 - 1;
        const normalizedY = (mouseY / heroRect.height) * 2 - 1;

        // Get visible images (only apply parallax to visible ones)
        const visibleImages = imagesRef.current.querySelectorAll(
          ".floating-image[style*='visible']"
        );

        visibleImages.forEach((image, index) => {
          // Different parallax intensity for each image
          const intensityMultiplier = ((index % 3) + 1) * -24; // 8px, 16px, 24px max movement

          const parallaxX = normalizedX * intensityMultiplier;
          const parallaxY = normalizedY * intensityMultiplier;

          // Apply parallax using CSS transform on the image element inside
          const imageElement = image.querySelector("img");
          if (imageElement) {
            gsap.to(imageElement, {
              // duration: 2,
              ease: "linear",
              x: parallaxX,
              y: parallaxY,
              overwrite: "auto",
            });
          }
        });
      };

      // Store current heroRef for cleanup
      const currentHeroRef = heroRef.current;

      // Add mousemove listener
      if (currentHeroRef) {
        currentHeroRef.addEventListener("mousemove", handleMouseMove);
      }

      // Cleanup function
      return () => {
        if (splitChars) {
          splitChars.revert();
        }
        // Remove mousemove listener
        if (currentHeroRef) {
          currentHeroRef.removeEventListener("mousemove", handleMouseMove);
        }
        // Kill both timelines
        charsTimeline.kill();
        titleTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    {
      scope: heroRef,
      dependencies: [
        heroRef?.current,
        currentContent.title,
        currentTheme,
        currentImages,
      ],
    }
  );

  return (
    <section ref={heroRef} className="hero">
      {/* Text content */}
      <div ref={textContainerRef} className="hero-content">
        <h1 ref={titleRef} className="hero-title">
          {currentContent.title}
        </h1>
        <p ref={subtitleRef} className="hero-subtitle">
          {currentContent.subtitle}
        </p>
        {isLoadingText && (
          <div className="image-loading-indicator">
            ✨ Transforming experience...
          </div>
        )}
      </div>

      {/* Images content */}
      {isLoadingNewImages && (
        <div className="image-loading-indicator">✨ Loading new imagery...</div>
      )}
      <div ref={imagesRef} className="floating-images">
        {currentImages.map((imageData: ImageData, index: number) => (
          <div key={`${imageData.src}-${index}`} className="floating-image">
            <img
              src={`/react-gsap-scroll/images/${imageData.src}`}
              alt={imageData.alt}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
