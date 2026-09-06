import { createHash } from "node:crypto";

export function etagFor(body: string): string {
  const hash = createHash("sha1").update(body).digest("hex").slice(0, 16);
  return `"${hash}"`;
}

export function isNotModified(request: Request, etag: string): boolean {
  const inm = request.headers.get("if-none-match");
  if (!inm) return false;
  return inm
    .split(",")
    .map((p) => p.trim())
    .includes(etag);
}
