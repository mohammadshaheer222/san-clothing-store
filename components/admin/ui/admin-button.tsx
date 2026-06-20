"use client";

import React from "react";

interface AdminButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  fullWidth?: boolean;
}

export function AdminButton({
  loading = false,
  children,
  variant = "primary",
  fullWidth = true,
  className = "",
  disabled,
  ...props
}: AdminButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold text-sm rounded-xl px-6 py-3 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none tracking-wide";

  const variants = {
    primary:
      "bg-[#0C2565] text-white hover:opacity-90 shadow-sm shadow-[#0C2565]/10",
    ghost:
      "bg-neutral-100 text-neutral-800 border border-neutral-200 hover:bg-neutral-200",
  };

  return (
    <button
      disabled={disabled || loading}
      className={[
        base,
        variants[variant],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...props}
    >
      {loading && (
        <svg
          className="w-4 h-4 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
