import React from 'react';
import Image from 'next/image';

interface BackgroundImageProps {
  src: string;
  alt: string;
  overlay?: boolean;
  overlayOpacity?: string; // e.g., '10', '20', etc. for bg-black/10
  zoomAnimation?: boolean;
  priority?: boolean;
  className?: string;
}

export const BackgroundImage = ({
  src,
  alt,
  overlay = true,
  overlayOpacity = '10',
  zoomAnimation = true,
  priority = false,
  className = '',
}: BackgroundImageProps) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={`object-cover object-center ${zoomAnimation ? 'scale-105 animate-subtle-zoom' : ''}`}
      />
      {overlay && (
        <div className={`absolute inset-0 bg-black/${overlayOpacity}`} />
      )}
    </div>
  );
};
