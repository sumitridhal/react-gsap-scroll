import { useState, useEffect, useRef } from "react";
import { useImages, ALL_IMAGES } from "../contexts/ImageContext";
import type { ImageData } from "../contexts/ImageContext";

interface ImageLoaderProps {
  onLoadComplete: () => void;
}

const ImageLoader = ({ onLoadComplete }: ImageLoaderProps) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing Reality");

  const { setLoadedImages, setIsLoading } = useImages();
  const totalImages = ALL_IMAGES.length;
  const ignoreRef = useRef(false);

  useEffect(() => {
    const loadImages = async () => {
      const loadedImagesMap = new Map<string, ImageData>();

      const imagePromises = ALL_IMAGES.map((imageInfo) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            // Store the loaded image in our map
            loadedImagesMap.set(imageInfo.src, {
              src: imageInfo.src,
              alt: imageInfo.alt,
              element: img,
            });

            setLoadedCount((prev) => {
              const newCount = prev + 1;
              const newProgress = (newCount / totalImages) * 100;
              setProgress(newProgress);

              // Update loading text based on progress
              if (newProgress < 25) {
                setLoadingText("Initializing Reality");
              } else if (newProgress < 50) {
                setLoadingText("Loading Imagery");
              } else if (newProgress < 75) {
                setLoadingText("Crafting Experience");
              } else if (newProgress < 95) {
                setLoadingText("Almost Ready");
              } else {
                setLoadingText("Welcome");
              }

              return newCount;
            });
            resolve();
          };
          img.onerror = () => {
            console.warn(`Failed to load image: ${imageInfo.src}`);
            setLoadedCount((prev) => prev + 1);
            resolve();
          };
          img.src = `/images/${imageInfo.src}`;
        });
      });

      try {
        await Promise.all(imagePromises);
        // Store all loaded images in context
        setLoadedImages(loadedImagesMap);
        setIsLoading(false);

        // Add a small delay to show completion
        setTimeout(() => {
          onLoadComplete();
        }, 800);
      } catch (error) {
        console.error("Error loading images:", error);
        setIsLoading(false);
        onLoadComplete(); // Continue anyway
      }
    };

    if (!ignoreRef.current) loadImages();
    return () => {
      ignoreRef.current = true;
    };
  }, [onLoadComplete, totalImages]);

  return (
    <div className="image-loader">
      <div className="loader-content">
        <div className="loader-logo">
          <h1 className="loader-title">Loading Images</h1>
        </div>

        <div className="progress-container">
          <div className="progress-ring">
            <svg width="120" height="120" className="progress-svg">
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="2"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="rgba(255, 255, 255, 0.8)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 54}`}
                strokeDashoffset={`${2 * Math.PI * 54 * (1 - progress / 100)}`}
                transform="rotate(-90 60 60)"
                style={{
                  transition: "stroke-dashoffset 0.3s ease",
                }}
              />
            </svg>
            <div className="progress-percentage">{Math.round(progress)}%</div>
          </div>
        </div>

        <div className="stage-text">{loadingText}</div>

        <div className="loading-details">
          {loadedCount}/{totalImages} images loaded
        </div>
      </div>

      {/* Floating particles */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>
    </div>
  );
};

export default ImageLoader;
