import { contactItems, contactName, type ContactItem } from "@/lib/portfolio/contact";

function Icon({ id }: { id: ContactItem["id"] }) {
  const className = "h-6 w-6 text-accent";
  if (id === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v7h4v-7h3.2L17 11h-4V9c0-.6.4-1 1-1Z" />
      </svg>
    );
  }
  if (id === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
      </svg>
    );
  }
  if (id === "github") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.9 9.6.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.6.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1 .8-.2 1.6-.3 2.4-.3s1.6.1 2.4.3c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.7.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7 1 .7 2v2.9c0 .3.2.6.7.5 4-1.3 6.9-5.1 6.9-9.6C22 6.6 17.5 2 12 2Z" />
      </svg>
    );
  }
  if (id === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M6.5 9H3.7v11.2h2.8V9ZM5.1 3.5A1.65 1.65 0 1 0 5.1 6.8 1.65 1.65 0 0 0 5.1 3.5ZM20.3 13.3c0-3.2-1.7-4.7-4-4.7-1.8 0-2.6 1-3.1 1.7V9H10.4c0 1.9 0 11.2 0 11.2h2.8v-6.3c0-.3 0-.7.1-1 .3-.7.9-1.5 2-1.5 1.4 0 2 1.1 2 2.6v6.2h2.8V13.3Z" />
      </svg>
    );
  }
  if (id === "mobile") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <rect x="7" y="2.5" width="10" height="19" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 18.5h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === "email") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto mt-28 min-h-[70vh] max-w-5xl scroll-mt-[var(--header-h)] text-center">
      <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
      <p className="mt-3 text-lg font-semibold text-accent">{contactName}</p>
      <p className="mt-2 text-muted">Links and details below — replace the placeholders anytime.</p>

      <ul className="mt-10 grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {contactItems.map((item) => {
          const body = (
            <>
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
                <Icon id={item.id} />
              </span>
              <span className="mt-4 text-sm tracking-[0.18em] text-muted uppercase">{item.label}</span>
              <span className="wrap-anywhere mt-2 text-base font-medium text-foreground">{item.value}</span>
            </>
          );

          const className =
            "cert-card flex min-h-[11rem] min-w-0 flex-col items-center justify-center rounded-2xl border border-line bg-card px-5 py-6 text-center";

          if (item.href) {
            return (
              <li key={item.id} className="min-w-0">
                <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={`${className} text-foreground hover:border-accent/50`}>
                  {body}
                </a>
              </li>
            );
          }

          return (
            <li key={item.id} className="min-w-0">
              <div className={className}>{body}</div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
