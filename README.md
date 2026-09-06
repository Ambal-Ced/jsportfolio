# Justine Cedrick R. Ambal — Portfolio

Personal portfolio site for **Justine Cedrick R. Ambal** (ARZEN): intro sequence, about, projects, certificates, resume/CV, and contact.

Built with **Next.js 16** (App Router), **React 19**, **TypeScript**, and **Tailwind CSS 4**.

## Features

- Intro animation (GIF → welcome → header) once per browser tab
- Sticky header that hides on scroll down and returns on scroll up
- Dark / light theme (saved in the browser)
- Home sections: About, Projects (folder cards), Contact
- Project and certificate galleries with detail views
- Resume and CV images with fullscreen view and download
- Contact cards: Facebook, Instagram, GitHub, LinkedIn, mobile, email, address

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Pages

| Path | What it is |
| --- | --- |
| `/` | Home (hero, about, folders, contact) |
| `/projects` | Project gallery |
| `/projects/[slug]` | Project detail |
| `/certificate` | Certificate gallery |
| `/certificate/[slug]` | Certificate detail |
| `/resume` | Resume and CV |

## Edit content

Keep `slug` and `src` unless you also change the image file.

| File | What to edit |
| --- | --- |
| `lib/portfolio/contact.ts` | Name, links, phone, email, address |
| `lib/portfolio/projects.ts` | Project titles, descriptions, tags, URLs |
| `lib/portfolio/certificates.ts` | Certificate titles and descriptions |

## Assets

Put files in `public/`:

| Folder | Use |
| --- | --- |
| `public/self/` | Portrait (`me.png`), `resume.webp`, `cv.webp` |
| `public/proj/` | Project screenshots (WebP) |
| `public/certi/` | Certificate images (WebP) |
| `public/arzen.png` | Logo (dark mode) |
| `public/arzenwhite.png` | Logo (light mode) |
| `public/arzen.gif` | Intro animation |

After adding PNG or JPG files (except the ARZEN logos), you can convert them:

```bash
node scripts/convert-to-webp.cjs
```

## Theme

The header toggle switches dark and light mode. The choice is stored as `arzen-theme` in `localStorage`.

- Dark mode: yellow accent text
- Light mode: black text, yellow buttons, `arzenwhite.png` logo

## Notes

- The intro is skipped after the first play in a tab (`sessionStorage` key `arzen-intro-done`).
- The intro GIF is large, so the first load can take a while.
- Leftover `/demo` routes are from the original project template and are not part of the portfolio navigation.
