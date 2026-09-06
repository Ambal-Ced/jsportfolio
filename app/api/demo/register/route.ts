import { NextResponse } from "next/server";
import { runMutation } from "@/lib/http/pipeline";

export async function POST(request: Request) {
  return runMutation(request, "register", async () => {
    const body = (await request.json().catch(() => ({}))) as { email?: string; name?: string };
    const errors: Record<string, string> = {};
    if (!body.email?.trim()) errors.email = "Email is required";
    if (!body.name?.trim()) errors.name = "Name is required";
    if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 400 });
    return NextResponse.json({ ok: true });
  });
}
