import Link from "next/link";
import { LIST_ITEMS } from "@/lib/demo/listItems";
import { notFound } from "next/navigation";

export default async function ListItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = LIST_ITEMS.find((i) => i.id === id);
  if (!item) notFound();

  return (
    <main className="flex flex-col gap-4">
      <Link href="/demo/list" className="text-sm text-zinc-600 hover:underline dark:text-zinc-400">
        Back to list
      </Link>
      <h1 className="text-2xl font-semibold">{item.title}</h1>
      <p>{item.body}</p>
    </main>
  );
}
