import React, { createContext, useContext, useState, ReactNode } from 'react';

// Complete list of all available images
export const ALL_IMAGES = [
  { src: "abstract-landscape-1.png", alt: "Abstract Digital Landscape" },
  { src: "cosmic-vessel-2.png", alt: "Cosmic Vessel Digital Art" },
  { src: "surreal-geometry-3.png", alt: "Surreal Geometric Forms" },
  { src: "ethereal-waves-4.png", alt: "Ethereal Wave Patterns" },
  { src: "digital-vessel-5.png", alt: "Digital Vessel Creation" },
  { src: "unreal-horizon-6.png", alt: "Unreal Horizon Vista" },
  { src: "ethereal-structures-7.png", alt: "Ethereal Architectural Forms" },
  { src: "cosmic-geometry-8.png", alt: "Cosmic Geometric Patterns" },
  { src: "digital-dreams-9.png", alt: "Dreamlike Digital Compositions" },
  { src: "surreal-vessels-10.png", alt: "Surreal Vessel Interpretations" },
  { src: "abstract-reality-11.png", alt: "Abstract Reality Concepts" },
  { src: "unreal-dimensions-12.png", alt: "Dimensional Art Pieces" },
  { src: "floating-forms-13.png", alt: "Floating Geometric Forms" },
  { src: "mystic-landscapes-14.png", alt: "Mystical Landscape Art" },
  { src: "digital-horizons-15.png", alt: "Digital Horizon Vistas" },
  { src: "cosmic-waves-16.png", alt: "Cosmic Wave Patterns" },
  { src: "ethereal-visions-17.png", alt: "Ethereal Visual Concepts" },
  { src: "surreal-depths-18.png", alt: "Deep Surreal Compositions" },
  { src: "abstract-vessels-19.png", alt: "Abstract Vessel Designs" },
  { src: "digital-realms-20.png", alt: "Digital Realm Landscapes" },
  { src: "unreal-cosmos-21.png", alt: "Cosmic Unreal Scenes" },
  { src: "floating-dreams-22.png", alt: "Floating Dream Imagery" },
  { src: "mystic-geometry-23.png", alt: "Mystical Geometric Art" },
  { src: "ethereal-infinity-24.png", alt: "Infinite Ethereal Concepts" },
];

export interface ImageData {
  src: string;
  alt: string;
  element: HTMLImageElement;
}

interface ImageContextType {
  loadedImages: Map<string, ImageData>;
  setLoadedImages: (images: Map<string, ImageData>) => void;
  getRandomImages: (count?: number) => ImageData[];
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const useImages = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImages must be used within an ImageProvider');
  }
  return context;
};

interface ImageProviderProps {
  children: ReactNode;
}

export const ImageProvider = ({ children }: ImageProviderProps) => {
  const [loadedImages, setLoadedImages] = useState<Map<string, ImageData>>(new Map());
  const [isLoading, setIsLoading] = useState(true);

  const getRandomImages = (count: number = 6): ImageData[] => {
    const imageArray = Array.from(loadedImages.values());
    if (imageArray.length === 0) return [];
    
    // Shuffle and return the requested count
    const shuffled = [...imageArray].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  };

  const value: ImageContextType = {
    loadedImages,
    setLoadedImages,
    getRandomImages,
    isLoading,
    setIsLoading,
  };

  return (
    <ImageContext.Provider value={value}>
      {children}
    </ImageContext.Provider>
  );
}; 