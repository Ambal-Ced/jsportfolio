import { NextResponse } from "next/server";
import { runMutation } from "@/lib/http/pipeline";

export async function POST(request: Request) {
  return runMutation(request, "api", async () => {
    return NextResponse.json({ error: "Deleted resource is gone" }, { status: 410 });
  });
}
