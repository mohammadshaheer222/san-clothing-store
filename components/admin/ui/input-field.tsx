"use client";

import React, { forwardRef } from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  id: string;
  rightElement?: React.ReactNode;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, id, rightElement, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label
          htmlFor={id}
          className="text-sm font-medium text-neutral-700 tracking-wide"
        >
          {label}
        </label>

        <div className="relative">
          <input
            ref={ref}
            id={id}
            className={[
              "w-full px-4 py-3 rounded-xl text-sm text-neutral-900",
              "bg-neutral-50 border transition-all duration-200 outline-none",
              "placeholder:text-neutral-400",
              "focus:bg-white focus:ring-2 focus:ring-[#0C2565]/20 focus:border-[#0C2565]",
              error
                ? "border-red-300 focus:ring-red-500/10 focus:border-red-500"
                : "border-neutral-200 focus:border-[#0C2565]",
              rightElement ? "pr-12" : "",
              className,
            ].join(" ")}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {rightElement}
            </div>
          )}
        </div>

        {error && (
          <p className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
            <svg
              className="w-3.5 h-3.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
