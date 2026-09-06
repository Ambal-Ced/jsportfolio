import Link from "next/link";

export function BackLink({
  href,
  onClick,
}: {
  href?: string;
  onClick?: () => void;
}) {
  const className =
    "inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent";
  const icon = (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {icon}
        Back
      </button>
    );
  }

  return (
    <Link href={href ?? "/"} className={className}>
      {icon}
      Back
    </Link>
  );
}
