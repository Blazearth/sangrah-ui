import { NextResponse } from "next/server";
import { coordinator } from "@/lib/coordinator";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const modelId = searchParams.get("model_id") ?? coordinator.modelId;
  const limit = parseInt(searchParams.get("limit") ?? "50", 10);

  try {
    const data = await coordinator.audit(modelId, limit);
    // Normalize: coordinator returns either { items: [...] } or { entries: [...] }
    const entries = data.items ?? data.entries ?? [];
    return NextResponse.json({ entries, count: entries.length });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
