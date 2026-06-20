import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'sale' | 'new' | 'neutral';
  className?: string;
}

export const Badge = ({
  children,
  variant = 'primary',
  className = '',
}: BadgeProps) => {
  const variants = {
    primary: 'bg-primary text-white',
    sale: 'bg-primary text-white',
    new: 'bg-emerald-600 text-white',
    neutral: 'bg-neutral-100 text-neutral-700',
  };

  return (
    <span
      className={`inline-flex items-center text-[10px] font-bold px-2 py-1 rounded-sm tracking-wide uppercase ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
