import React from 'react';
import { ANNOUNCEMENT_TEXT } from '@/constants/mock-data';

interface AnnouncementBarProps {
  content?: string;
}

export const AnnouncementBar = ({ content = ANNOUNCEMENT_TEXT }: AnnouncementBarProps) => {
  return (
    <div className="bg-[#111111] text-white text-[9px] md:text-[11px] font-medium tracking-[0.1em] py-2.5 px-4 text-center">
      {content}
    </div>
  );
};
