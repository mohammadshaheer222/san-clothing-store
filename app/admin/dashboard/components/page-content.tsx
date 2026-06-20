"use client";

import React, { useState } from "react";
import { Flex, Typography } from "@/components/ui";
import { Sidebar } from "./sections/sidebar";
import { LogoutButton } from "./sections/logout-button";

interface DashboardPageContentProps {
  adminEmail: string;
}

export default function DashboardPageContent({ adminEmail }: DashboardPageContentProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-white-soft flex relative">
      {/* Sidebar (drawer on mobile, static on desktop) */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 border-b border-neutral-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-6 flex-shrink-0">
          <Flex align="center" gap={3}>
            {/* Hamburger menu button for mobile devices */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 transition-colors focus:outline-none"
              aria-label="Open sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div>
              <Typography variant="h3" className="text-lg! font-bold text-neutral-800 tracking-tight">
                Dashboard
              </Typography>
            </div>
          </Flex>
          <LogoutButton adminEmail={adminEmail} />
        </header>

        {/* Content body */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="border border-dashed border-neutral-200 bg-white rounded-2xl h-full flex flex-col items-center justify-center p-8 text-center min-h-[300px] shadow-sm">
            <Typography variant="h3" className="text-[#0C2565] font-semibold mb-2">
              Dashboard Content Removed
            </Typography>
            <Typography variant="p" className="text-neutral-500 text-sm max-w-sm">
              All dashboard stats, widgets, and recent order lists have been successfully cleared.
            </Typography>
          </div>
        </main>
      </div>
    </div>
  );
}
