import { NextResponse } from "next/server";
import { runMutation } from "@/lib/http/pipeline";
import { withDb } from "@/lib/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  return runMutation(request, "login", async () => {
    const body = (await request.json().catch(() => ({}))) as { email?: string; password?: string };
    const errors: Record<string, string> = {};
    if (!body.email?.trim()) errors.email = "Email is required";
    if (!body.password) errors.password = "Password is required";
    if (Object.keys(errors).length) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    await withDb(async (db) => {
      await db.select({ id: users.id }).from(users).where(eq(users.email, body.email!)).limit(1);
    });

    return NextResponse.json({ ok: true });
  });
}
