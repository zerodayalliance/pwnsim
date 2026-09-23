import { NextResponse } from "next/server";
import { getNetworkState } from "@/lib/pwnState";

export const dynamic = "force-dynamic";

export async function GET() {
  const state = getNetworkState();
  return NextResponse.json({
    success: true,
    state,
  });
}
