"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { InputField } from "@/components/admin/ui/input-field";
import { AdminButton } from "@/components/admin/ui/admin-button";
import { FormError } from "@/components/admin/ui/form-error";
import { useAuth } from "@/hooks";

interface FieldErrors {
  email?: string;
  password?: string;
}

export function LoginForm() {
  const router = useRouter();
  const { login, loading, error: formError, setError: setFormError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function validate(): boolean {
    const errors: FieldErrors = {};
    if (!email.trim()) errors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Enter a valid email";
    if (!password) errors.password = "Password is required";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (!validate()) return;

    const success = await login(email.trim(), password);
    if (success) {
      router.push("/admin/dashboard");
      router.refresh();
    }
  }

  const EyeToggle = (
    <button
      type="button"
      onClick={() => setShowPassword((v) => !v)}
      className="text-slate-400 hover:text-white transition-colors focus:outline-none"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? (
        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
      ) : (
        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )}
    </button>
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <FormError message={formError} />

      <InputField
        id="admin-email"
        label="Email address"
        type="email"
        placeholder="admin@san-store.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: undefined }));
        }}
        error={fieldErrors.email}
        autoComplete="email"
        autoFocus
      />

      <InputField
        id="admin-password"
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="••••••••"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (fieldErrors.password) setFieldErrors((p) => ({ ...p, password: undefined }));
        }}
        error={fieldErrors.password}
        autoComplete="current-password"
        rightElement={EyeToggle}
      />

      <AdminButton type="submit" loading={loading} className="mt-2">
        {loading ? "Signing in…" : "Sign in to Dashboard"}
      </AdminButton>
    </form>
  );
}
