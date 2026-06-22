"use client";

import React, { useState } from "react";
import { Flex, Typography } from "@/components/ui";
import { Sidebar } from "./sections/sidebar";
import { LogoutButton } from "./sections/logout-button";
import { ProductManager } from "./sections/product-manager";
import { BannerManager } from "./sections/banner-manager";
import { FaqManager } from "./sections/faq-manager";
import { ReviewManager } from "./sections/review-manager";
import { SectionsManager } from "./sections/sections-manager";
import { StripeManager } from "./sections/stripe-manager";
import { ValuesManager } from "./sections/values-manager";
import { AboutManager } from "./sections/about-manager";

interface DashboardPageContentProps {
  adminEmail: string;
}

export default function DashboardPageContent({ adminEmail }: DashboardPageContentProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("products");

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-white-soft flex relative">
      {/* Sidebar (drawer on mobile, static on desktop) */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

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
                {activeSection === "products" && "Product Inventory"}
                {activeSection === "sections" && "Homepage Sections CMS"}
                {activeSection === "banners" && "Homepage Banner CMS"}
                {activeSection === "values" && "Brand Values CMS"}
                {activeSection === "faqs" && "Frequently Asked Questions CMS"}
                {activeSection === "reviews" && "Customer Reviews CMS"}
                {activeSection === "stripes" && "Storefront Stripes CMS"}
                {activeSection === "about" && "About Page CMS"}
              </Typography>
            </div>
          </Flex>
          <LogoutButton adminEmail={adminEmail} />
        </header>

        {/* Content body */}
        <main className="flex-1 p-6 overflow-auto">
          {activeSection === "products" && <ProductManager />}
          {activeSection === "sections" && <SectionsManager />}
          {activeSection === "banners" && <BannerManager />}
          {activeSection === "values" && <ValuesManager />}
          {activeSection === "faqs" && <FaqManager />}
          {activeSection === "reviews" && <ReviewManager />}
          {activeSection === "stripes" && <StripeManager />}
          {activeSection === "about" && <AboutManager />}
        </main>
      </div>
    </div>
  );
}
