import React from 'react';

interface TypographyProps {
  children: React.ReactNode;
  variant: 'h1' | 'h2' | 'h3' | 'p' | 'caption';
  className?: string;
  serif?: boolean;
  italic?: boolean;
}

export const Typography = ({
  children,
  variant,
  className = '',
  serif = false,
  italic = false,
}: TypographyProps) => {
  const baseStyles = serif ? 'font-serif' : 'font-sans';
  const italicStyles = italic ? 'italic' : '';
  
  const variants = {
    h1: 'text-6xl ipad-land:text-5xl mob-land:text-4xl font-bold tracking-tight',
    h2: 'text-5xl ipad-land:text-4xl mob-land:text-3xl font-bold tracking-tight',
    h3: 'text-2xl mob-land:text-xl font-medium tracking-wide',
    p: 'text-lg mob-land:text-base leading-relaxed',
    caption: 'text-sm mob-land:text-xs uppercase tracking-widest',
  };

  const Component = variant === 'caption' ? 'span' : variant;

  return (
    <Component className={`${baseStyles} ${italicStyles} ${variants[variant]} ${className}`}>
      {children}
    </Component>
  );
};
