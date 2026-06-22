import React from 'react';
import { Flex } from './flex';
import { Typography } from './typography';

interface SectionHeaderProps {
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  align?: 'start' | 'center' | 'end';
  className?: string;
}

export const SectionHeader = ({
  title,
  description,
  align = 'center',
  className = '',
}: SectionHeaderProps) => {
  return (
    <Flex
      direction="col"
      gap={1}
      align={align}
      className={`w-full ${align === 'center' ? 'text-center' : align === 'end' ? 'text-right' : 'text-left'} ${className}`}
    >
      <Typography
        variant="h2"
        serif
        className="text-neutral-900 text-lg! font-regular!"
      >
        {title}
      </Typography>
      {description && (
        <Typography
          variant="p"
          className="text-neutral-500 max-w-2xl mx-auto text-sm!"
        >
          {description}
        </Typography>
      )}
    </Flex>
  );
};
