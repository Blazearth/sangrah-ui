import { NextResponse } from "next/server";
import { coordinator } from "@/lib/coordinator";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const modelId = searchParams.get("model_id") ?? coordinator.modelId;

  try {
    const data = await coordinator.activeEpoch(modelId);
    return NextResponse.json(data);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    // 404 when no active epoch (PENDING state)
    if (msg.includes("404") || msg.includes("No active epoch")) {
      return NextResponse.json({ error: "No active epoch", code: 404 }, { status: 404 });
    }
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
