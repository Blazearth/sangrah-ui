import { NextResponse } from "next/server";
import { coordinator } from "@/lib/coordinator";

export async function GET() {
  try {
    const data = await coordinator.health();
    return NextResponse.json(data);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
