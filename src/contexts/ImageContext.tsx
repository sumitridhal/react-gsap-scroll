import { createContext, useContext, useState } from "react";

// Complete list of all available images

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

// eslint-disable-next-line react-refresh/only-export-components
export const useImages = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImages must be used within an ImageProvider");
  }
  return context;
};

interface ImageProviderProps {
  children: React.ReactNode;
}

export const ImageProvider = ({ children }: ImageProviderProps) => {
  const [loadedImages, setLoadedImages] = useState<Map<string, ImageData>>(
    new Map()
  );
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
    <ImageContext.Provider value={value}>{children}</ImageContext.Provider>
  );
};
