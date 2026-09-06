"use client";

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import Link from "next/link";
import { loadMediaOnce } from "@/lib/cache/mediaCache";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { SiteHeader } from "@/components/portfolio/SiteHeader";

const fadeStartMs = 7000;
const fadeDurationMs = 1000;
const welcomeDelayMs = 1500;
const shrinkDelayMs = 1900;
const shrinkDurationMs = 900;

const introStorageKey = "arzen-intro-done";

const roles = ["Software Programmer", "Web Developer", "Data Analyst", "IT Quality Assurance"];

const projectFolders = [
  {
    label: "Projects",
    href: "/projects",
    files: [
      { src: "/proj/ecotrack.webp", name: "ecotrack.webp" },
      { src: "/proj/eventria.webp", name: "eventria.webp" },
      { src: "/proj/github.webp", name: "github.webp" },
    ],
  },
  {
    label: "Certificate",
    href: "/certificate",
    files: [
      { src: "/certi/bitcon.webp", name: "bitcon.webp" },
      {
        src: "/certi/certificate.Data_Analytics_Fundamentals_Justine_Ambal.webp",
        name: "data-analytics.webp",
      },
      { src: "/certi/cisco_cybersecurity.webp", name: "cisco.webp" },
    ],
  },
  {
    label: "Resume & CV",
    href: "/resume",
    files: [
      { src: "/self/resume.webp", name: "resume.webp" },
      { src: "/self/cv.webp", name: "cv.webp" },
      { src: "/self/resume.webp", name: "resume-copy.webp" },
    ],
  },
];

type Stage = "loading" | "gif" | "black" | "welcome" | "shrinking" | "site";

export default function Home() {
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [fading, setFading] = useState(false);
  const [stage, setStage] = useState<Stage>("loading");
  const [welcomeStyle, setWelcomeStyle] = useState<CSSProperties | undefined>();
  const welcomeRef = useRef<HTMLParagraphElement>(null);
  const logoSlotRef = useRef<HTMLAnchorElement>(null);
  const fadeLock = useRef(false);
  const lastScrollY = useRef(0);
  const ignoreHideUntil = useRef(0);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);

  useEffect(() => {
    let alive = true;

    try {
      if (sessionStorage.getItem(introStorageKey) === "1") {
        setStage("site");
        return () => {
          alive = false;
        };
      }
    } catch {
      // Ignore blocked storage and play the intro.
    }

    loadMediaOnce("/arzen.gif").then((url) => {
      if (!alive) return;
      setGifUrl(url);
      setStage("gif");
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (stage !== "black") return;
    const id = window.setTimeout(() => setStage("welcome"), welcomeDelayMs);
    return () => window.clearTimeout(id);
  }, [stage]);

  useEffect(() => {
    if (stage !== "welcome") return;
    const id = window.setTimeout(() => setStage("shrinking"), shrinkDelayMs);
    return () => window.clearTimeout(id);
  }, [stage]);

  useEffect(() => {
    if (stage !== "shrinking") return;

    const welcome = welcomeRef.current;
    const logo = logoSlotRef.current;
    if (welcome && logo) {
      const from = welcome.getBoundingClientRect();
      const to = logo.getBoundingClientRect();
      const dx = to.left + to.width / 2 - (from.left + from.width / 2);
      const dy = to.top + to.height / 2 - (from.top + from.height / 2);
      const scale = Math.min(to.width / from.width, to.height / from.height) * 0.92;
      requestAnimationFrame(() => {
        setWelcomeStyle({
          transform: `translate(${dx}px, ${dy}px) scale(${scale})`,
          opacity: 0,
        });
      });
    }

    const id = window.setTimeout(() => setStage("site"), shrinkDurationMs);
    return () => window.clearTimeout(id);
  }, [stage]);

  useEffect(() => {
    if (stage !== "site") {
      setHeaderHidden(false);
      return;
    }

    try {
      sessionStorage.setItem(introStorageKey, "1");
    } catch {
      // Ignore blocked storage.
    }

    lastScrollY.current = window.scrollY;
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastScrollY.current;

        if (Date.now() >= ignoreHideUntil.current) {
          if (y < 56) {
            setHeaderHidden(false);
          } else if (delta > 12) {
            setHeaderHidden(true);
          } else if (delta < -8) {
            setHeaderHidden(false);
          }
        }

        lastScrollY.current = y;
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [stage]);

  useEffect(() => {
    if (stage !== "site") return;
    const id = window.setInterval(() => {
      setRoleVisible(false);
      window.setTimeout(() => {
        setRoleIndex((current) => (current + 1) % roles.length);
        setRoleVisible(true);
      }, 400);
    }, 2800);
    return () => window.clearInterval(id);
  }, [stage]);

  function revealHeader() {
    setHeaderHidden(false);
    ignoreHideUntil.current = Date.now() + 1200;
  }

  function scrollToSection(href: string, event?: MouseEvent<HTMLAnchorElement>) {
    event?.preventDefault();
    revealHeader();

    const hash = href.includes("#") ? `#${href.split("#")[1]}` : "#top";
    const id = hash.replace("#", "");
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      history.pushState(null, "", "#top");
      return;
    }

    const el = document.getElementById(id);
    if (!el) return;

    const header = document.querySelector<HTMLElement>("[data-sticky-header]");
    const headerH = header?.offsetHeight ?? 80;
    const top = Math.max(0, window.scrollY + el.getBoundingClientRect().top - headerH);
    window.scrollTo({ top, behavior: "smooth" });
    history.pushState(null, "", hash);
  }

  function beginFade() {
    if (fadeLock.current) return;
    fadeLock.current = true;
    setFading(true);
    window.setTimeout(() => {
      setGifUrl(null);
      setStage("black");
    }, fadeDurationMs);
  }

  const showIntro =
    stage === "loading" || stage === "gif" || stage === "black" || stage === "welcome" || stage === "shrinking";
  const showLogo = stage === "shrinking" || stage === "site";
  const showSite = stage === "site";

  return (
    <div className="min-h-full bg-background text-foreground">
      <SiteHeader
        logoRef={logoSlotRef}
        hidden={headerHidden}
        revealed={showLogo}
        introLift={showIntro && showLogo}
        animate={showLogo}
        onNavigate={scrollToSection}
      />

      <main
        id="top"
        className={`mx-auto max-w-6xl px-4 pb-24 pt-[calc(var(--header-h)+2.5rem)] ${showSite ? "site-in" : "invisible"}`}
      >
        <section className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center">
            <div className="aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-line bg-well shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/self/me.png"
                alt="Justine Cedrick R. Ambal"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <p className="mt-6 text-xl text-foreground">
              I am a{" "}
              <span className="role-fade inline-block min-w-[12ch] font-bold text-accent" data-visible={roleVisible}>
                {roles[roleIndex]}
              </span>
            </p>
          </div>

          <div className="text-center lg:text-left">
            <p className="text-3xl font-bold tracking-tight sm:text-4xl">Hello, I&apos;m</p>
            <h1 className="wrap-anywhere mt-2 text-3xl font-bold tracking-tight text-accent sm:text-4xl lg:text-5xl">
              Justine Cedrick R. Ambal
            </h1>
            <p className="mt-6 text-lg text-muted">
              I&apos;m IT Major In Business Analytics With Exceptional Skills in Software Development and Web
              Development.
            </p>
            <p className="mt-4 text-lg text-muted">
              I Am Proficient In C# Programming And Willing To Learn More Programming Language and More Technical Skill.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/resume"
                className="inline-flex rounded-lg bg-accent px-6 py-3 font-semibold text-black transition-opacity hover:opacity-90"
              >
                View My Resume/CV
              </Link>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto mt-28 min-h-[70vh] max-w-3xl scroll-mt-[var(--header-h)] text-center">
          <h2 className="text-2xl font-semibold tracking-tight">About Me</h2>
          <p className="mt-4 text-muted">
          Hi! I’m Justine Cedrick R. Ambal, a BSIT graduate and aspiring Data Analyst and Software Developer. 
          I have a strong interest in C#, .NET, React, and Node.js, and I enjoy learning new technologies and solving technical problems.
          </p>
          <p className="mt-4 text-muted">
            I started programming in 2022, with C/C++ as my first programming language, and later focused on C# and web development. I currently develop C#/.NET applications and websites using React and Node.js to strengthen my software and web development skills.
          </p>
          <p className="mt-4 text-muted">
          I also work with public datasets for data analysis, exploring topics such as electricity generation in the Philippines, healthcare, and other areas. I’m always eager to learn and apply my technical skills to contribute to a company’s goals.
          </p>
          <p className="mt-4 text-muted">
            I focus on clear interfaces, thoughtful motion, and products that feel finished. The intro you just saw is
            part of that: a short sequence, then the work.
          </p>
        </section>

        <section id="projects" className="mx-auto mt-28 min-h-[70vh] max-w-5xl scroll-mt-[var(--header-h)] text-center">
          <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projectFolders.map((folder) => {
              const body = (
                <>
                  <div className="folder-stage">
                    {folder.files.slice(0, 3).map((file) => (
                      <div key={file.src + file.name} className="folder-file">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={file.src} alt={file.name} />
                      </div>
                    ))}
                    <div className="folder-tab" />
                    <div className="folder-back" />
                    <div className="folder-front" />
                  </div>
                  <h3 className="mt-2 text-lg font-medium">{folder.label}</h3>
                </>
              );

              const className =
                "folder-box block rounded-2xl border border-line bg-card px-4 pb-6 pt-4 text-foreground";

              if ("href" in folder && folder.href) {
                return (
                  <Link key={folder.label} href={folder.href} className={className}>
                    {body}
                  </Link>
                );
              }

              return (
                <article key={folder.label} className={className}>
                  {body}
                </article>
              );
            })}
          </div>
        </section>

        <ContactSection />
      </main>

      {showIntro ? (
        <div className="fixed inset-0 z-[100] overflow-hidden bg-black">
          {stage === "loading" ? (
            <div className="flex h-full flex-col items-center justify-center gap-6 px-6 text-center">
              <div className="load-spinner" aria-hidden="true" />
              <p className="text-sm tracking-[0.35em] text-zinc-300 uppercase">Loading</p>
              <p className="max-w-sm text-sm leading-relaxed text-zinc-500">
                Preparing the website based on your internet for a better experience.
              </p>
            </div>
          ) : null}

          {gifUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={gifUrl}
              alt=""
              className={`h-full w-full object-contain ${fading ? "intro-gif-fade" : ""}`}
              onLoad={() => window.setTimeout(beginFade, fadeStartMs)}
            />
          ) : null}

          {stage === "welcome" || stage === "shrinking" ? (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
              <p
                ref={welcomeRef}
                className={`max-w-3xl text-center text-xl font-medium tracking-wide text-white sm:text-3xl ${
                  stage === "welcome" ? "welcome-in" : "welcome-shrink"
                }`}
                style={welcomeStyle}
              >
                Welcome to Justine Cedrick R. Ambal Portfolio Website
              </p>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
