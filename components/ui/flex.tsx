import React from 'react';

interface FlexProps {
  children: React.ReactNode;
  direction?: 'row' | 'col';
  gap?: number | string;
  className?: string;
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
}

export const Flex = ({
  children,
  direction = 'row',
  gap = 4,
  className = '',
  align = 'stretch',
  justify = 'start',
  wrap = false,
}: FlexProps) => {
  const directions = {
    row: 'flex-row',
    col: 'flex-col',
  };

  const aligns = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    baseline: 'items-baseline',
    stretch: 'items-stretch',
  };

  const justifies = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  // Gap handling (Tailwind supports gap-1, gap-2, etc.)
  const gapClass = typeof gap === 'number' ? `gap-${gap}` : '';
  const wrapClass = wrap ? 'flex-wrap' : 'flex-nowrap';

  return (
    <div 
      className={`flex ${directions[direction]} ${aligns[align]} ${justifies[justify]} ${gapClass} ${wrapClass} ${className}`}
      style={typeof gap === 'string' ? { gap } : {}}
    >
      {children}
    </div>
  );
};
