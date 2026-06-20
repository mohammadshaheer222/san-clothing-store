import { Flex, Typography } from "@/components/ui";
import { LoginForm } from "./sections/login-form";

export default function AdminLoginPageContent() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white-soft relative overflow-hidden">
      {/* ---- Subtle background glow ---- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#0C2565]/5 blur-[120px]" />
      </div>

      {/* ---- Grid texture overlay ---- */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(12,37,101,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(12,37,101,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ---- Login card ---- */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-8 animate-[fade-in-up_0.5s_ease-out]">
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-xl p-8 md:p-10">
          <Flex direction="col" align="center" gap={3} className="mb-10">
            {/* Logo mark */}
            <div className="w-14 h-14 rounded-2xl bg-[#0C2565] flex items-center justify-center shadow-md shadow-[#0C2565]/20 mb-1">
              <span className="text-2xl font-bold text-white font-sans tracking-tight">S</span>
            </div>
            <div className="text-center">
              <Typography variant="h3" className="text-[#0C2565] font-bold tracking-tight">
                Welcome back
              </Typography>
              <Typography variant="p" className="text-neutral-500 text-sm! mt-1 block">
                Sign in to the SAN Admin Dashboard
              </Typography>
            </div>
          </Flex>
          <LoginForm />
          <Typography variant="caption" className="text-center text-xs! text-neutral-400 mt-8 block normal-case font-medium">
            Protected area — authorised personnel only
          </Typography>
        </div>
        <Typography variant="caption" className="text-center text-xs! text-neutral-500 mt-6 block normal-case font-medium">
          © {new Date().getFullYear()} SAN Clothing Store
        </Typography>
      </div>
    </main>
  );
}

