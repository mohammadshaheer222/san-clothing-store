import React from "react";
import { Flex, Typography } from "@/components/ui";
import { Tag, Image as ImageIcon, HelpCircle, Columns, MessageSquare, LayoutGrid } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ isOpen, onClose, activeSection, onSectionChange }: SidebarProps) {
  const menuItems = [
    { id: "products", label: "Products", icon: <Tag size={18} /> },
    { id: "sections", label: "Sections CMS", icon: <LayoutGrid size={18} /> },
    { id: "banners", label: "Banners CMS", icon: <ImageIcon size={18} /> },
    { id: "faqs", label: "FAQ CMS", icon: <HelpCircle size={18} /> },
    { id: "reviews", label: "Reviews CMS", icon: <MessageSquare size={18} /> },
    { id: "stripes", label: "Stripes CMS", icon: <Columns size={18} /> },
  ];

  return (
    <>
      {/* Mobile drawer backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden backdrop-blur-xs transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={[
          "fixed top-0 bottom-0 left-0 w-64 bg-white border-r border-neutral-200 flex flex-col z-50 transition-transform duration-300 lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        {/* Logo and close button for mobile */}
        <Flex align="center" justify="between" className="p-5 border-b border-neutral-200 max-h-[64px] flex-shrink-0">
          <Flex align="center" gap={3}>
            <div className="w-9 h-9 rounded-xl bg-[#0C2565] flex items-center justify-center shadow-md shadow-[#0C2565]/20">
              <span className="text-base font-bold text-white">S</span>
            </div>
            <div>
              <Typography variant="p" className="text-sm! font-bold text-neutral-800 block">
                SAN Store
              </Typography>
              <Typography variant="caption" className="text-xs! text-neutral-400 normal-case block tracking-normal">
                Admin Panel
              </Typography>
            </div>
          </Flex>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
            aria-label="Close sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </Flex>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-primary/5 text-primary"
                    : "text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50"
                }`}
              >
                <span className={isActive ? "text-primary" : "text-neutral-400"}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
