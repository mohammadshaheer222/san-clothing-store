import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary: 'bg-primary text-secondary hover:opacity-90 shadow-sm',
    secondary: 'bg-white text-primary border border-primary hover:bg-neutral-50',
    outline: 'border border-neutral-200 bg-transparent hover:bg-neutral-50 text-neutral-900',
    ghost: 'bg-transparent hover:bg-neutral-100 text-neutral-900',
    white: 'bg-white text-primary hover:bg-neutral-100 shadow-sm',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base',
    xl: 'px-10 py-4 text-lg',
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} rounded-full ${className}`;

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};
