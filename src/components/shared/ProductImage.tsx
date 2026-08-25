import React, { useState, useEffect } from "react";
import { generatePlaceholderSvg } from "../../utils/imageFallback";

interface ProductImageProps {
  src?: string;
  alt: string;
  brand?: string;
  className?: string;
  containerClassName?: string;
  loading?: "lazy" | "eager";
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  brand,
  className = "w-full h-full object-contain",
  containerClassName = "",
  loading = "lazy",
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset states when the image source changes
  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  const fallbackSrc = generatePlaceholderSvg(alt, brand);
  const finalSrc = hasError || !src || src.trim() === "" ? fallbackSrc : src;

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${containerClassName}`}
    >
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800/60 animate-pulse rounded-lg" />
      )}
      <img
        src={finalSrc}
        alt={alt}
        loading={loading}
        referrerPolicy="no-referrer"
        style={{
          backgroundImage: `url("${fallbackSrc}")`,
          backgroundSize: "cover",
        }}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        className={`${className} transition-opacity duration-300`}
      />
    </div>
  );
};
