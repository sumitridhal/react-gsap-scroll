import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const AnimatedBackground = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!backgroundRef.current) return;

    const shapes: HTMLDivElement[] = [];
    const numberOfShapes = 15;

    // Create floating shapes
    for (let i = 0; i < numberOfShapes; i++) {
      const shape = document.createElement("div");
      shape.className = "floating-shape";

      const shapeType = Math.random();
      if (shapeType < 0.33) {
        shape.classList.add("circle");
      } else if (shapeType < 0.66) {
        shape.classList.add("square");
      } else {
        shape.classList.add("triangle");
      }

      backgroundRef.current.appendChild(shape);
      shapes.push(shape);

      // Random initial position
      gsap.set(shape, {
        x: gsap.utils.random(0, window.innerWidth),
        y: gsap.utils.random(0, window.innerHeight),
        scale: gsap.utils.random(0.5, 2),
        opacity: gsap.utils.random(0.1, 0.3),
      });

      // Floating animation
      gsap.to(shape, {
        x: `+=${gsap.utils.random(-200, 200)}`,
        y: `+=${gsap.utils.random(-200, 200)}`,
        rotation: gsap.utils.random(0, 360),
        duration: gsap.utils.random(10, 20),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: gsap.utils.random(0, 5),
      });
    }

    // Cleanup
    return () => {
      shapes.forEach((shape) => {
        if (shape.parentNode) {
          shape.parentNode.removeChild(shape);
        }
      });
    };
  }, []);

  return <div ref={backgroundRef} className="animated-background"></div>;
};

export default AnimatedBackground;
