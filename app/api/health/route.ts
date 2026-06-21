/**
 * app/api/health/route.ts
 * -----------------------
 * GET /api/health — returns server & DB status.
 * Useful for uptime monitors and deployment checks.
 */

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db/mongoose";

export const dynamic = "force-dynamic";


export async function GET() {
  try {
    await connectDB();

    const dbState = mongoose.connection.readyState;
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    const dbStatus = dbState === 1 ? "connected" : "disconnected";

    return NextResponse.json(
      {
        success: true,
        status: "ok",
        timestamp: new Date().toISOString(),
        db: dbStatus,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[Health Check Error]", err);
    return NextResponse.json(
      {
        success: false,
        status: "error",
        timestamp: new Date().toISOString(),
        db: "disconnected",
      },
      { status: 503 }
    );
  }
}
