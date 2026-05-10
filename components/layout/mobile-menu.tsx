'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { NAV_LINKS, SECONDARY_NAV_LINKS } from '@/constants/site';
import { Button } from '@/components/ui';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-500 ease-out"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="relative w-[85%] max-w-[400px] h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-500 ease-out">
        {/* Header */}
        <div className="h-[60px] flex items-center px-4 border-b border-neutral-100 bg-neutral-50/50">
          <Button 
            variant="ghost"
            onClick={onClose}
            className="w-10 h-10 !p-0 bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-all hover:rotate-90 duration-300"
          >
            <X size={20} strokeWidth={1.5} className="animate-in zoom-in spin-in-90 duration-500" />
          </Button>
        </div>

        {/* Main Links */}
        <div className="flex-1 overflow-y-auto">
          <nav className="flex flex-col">
            {NAV_LINKS.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={onClose}
                style={{ 
                  animationDelay: `${150 + index * 50}ms`,
                  animationFillMode: 'both' 
                }}
                className="flex items-center justify-between px-6 py-5 border-b border-neutral-50 text-[14px] font-medium tracking-widest text-neutral-900 hover:bg-neutral-50 transition-colors uppercase animate-in fade-in slide-in-from-left-6 duration-700 ease-out"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Secondary Links */}
          <nav className="flex flex-col px-6 py-10 gap-4">
            {SECONDARY_NAV_LINKS.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={onClose}
                style={{ 
                  animationDelay: `${400 + index * 50}ms`,
                  animationFillMode: 'both' 
                }}
                className="text-[12px] font-medium tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors uppercase animate-in fade-in slide-in-from-bottom-2 duration-700 ease-out"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
