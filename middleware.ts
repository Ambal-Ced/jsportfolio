import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const existing = request.cookies.get("prep-user-id")?.value;
  const userId = existing ?? crypto.randomUUID();
  const headers = new Headers(request.headers);
  headers.set("x-user-id", userId);
  const res = NextResponse.next({ request: { headers } });
  if (!existing) {
    res.cookies.set("prep-user-id", userId, { path: "/", sameSite: "lax" });
  }
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
