import { NextResponse } from "next/server";
import { triggerNetworkCompromise } from "@/lib/pwnState";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    let body = {};
    try {
      body = await request.json();
    } catch {}

    const state = triggerNetworkCompromise(body);

    return NextResponse.json({
      success: true,
      message: "Network compromise triggered successfully",
      state,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
