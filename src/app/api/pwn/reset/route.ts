import { NextResponse } from "next/server";
import { resetNetworkCompromise } from "@/lib/pwnState";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const state = resetNetworkCompromise();

    return NextResponse.json({
      success: true,
      message: "Network disinfected and restored",
      state,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
