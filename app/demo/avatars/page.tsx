import { UserAvatar } from "@/components/ui/UserAvatar";
import { CachedMedia } from "@/components/ui/CachedMedia";

const people = [
  { name: "Ada Lovelace", src: "/next.svg" },
  { name: "Ada Lovelace", src: "/broken-avatar.png" },
  { name: "Grace Hopper", src: null },
  { name: "Alan", src: null },
  { name: "", src: "/still-broken.png" },
];

export default function AvatarsPage() {
  return (
    <main className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold">Avatars</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Photo first. If it fails, two-letter initials on a name-hashed color (same person, same color). If there is no
        name, a generic icon. The frame never collapses.
      </p>
      <ul className="flex flex-wrap gap-6">
        {people.map((p, i) => (
          <li key={i} className="flex flex-col items-center gap-2 text-sm">
            <UserAvatar name={p.name} src={p.src} size={56} />
            <span>{p.name || "(empty name)"}</span>
          </li>
        ))}
      </ul>
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-medium">Media loaded once</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          The same file is requested through the media cache; re-renders reuse the object URL.
        </p>
        <div className="flex gap-3">
          <CachedMedia src="/next.svg" alt="logo a" className="h-16 w-32 bg-zinc-100 object-contain p-2 dark:bg-zinc-900" />
          <CachedMedia src="/next.svg" alt="logo b" className="h-16 w-32 bg-zinc-100 object-contain p-2 dark:bg-zinc-900" />
        </div>
      </section>
    </main>
  );
}
