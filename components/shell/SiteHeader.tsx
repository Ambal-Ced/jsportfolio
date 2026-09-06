import Link from "next/link";
import { CountBadge } from "@/components/ui/CountBadge";

const links = [
  { href: "/", label: "Home" },
  { href: "/demo/avatars", label: "Avatars" },
  { href: "/demo/notifications", label: "Notifications" },
  { href: "/demo/numbers", label: "Numbers" },
  { href: "/demo/intent", label: "Intent" },
  { href: "/demo/form", label: "Form" },
  { href: "/demo/list", label: "List" },
  { href: "/demo/resilience", label: "Resilience" },
];

export function SiteHeader({ unread = 0 }: { unread?: number }) {
  return (
    <header
      data-sticky-header
      className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90"
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4">
        <Link href="/" className="font-semibold tracking-tight">
          Node prep
        </Link>
        <nav className="flex flex-wrap items-center gap-3 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
              {l.label}
            </Link>
          ))}
          <span className="inline-flex items-center gap-1">
            Inbox
            <CountBadge count={unread} />
          </span>
        </nav>
      </div>
    </header>
  );
}
