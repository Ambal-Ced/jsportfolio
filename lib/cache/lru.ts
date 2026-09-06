import { registerForIncrementalGc, type GcEntry } from "@/lib/cache/incrementalGc";

type Node<V> = GcEntry & {
  key: string;
  value: V;
  prev: Node<V> | null;
  next: Node<V> | null;
};

export class LruCache<V> {
  private map = new Map<string, Node<V>>();
  private head: Node<V> | null = null;
  private tail: Node<V> | null = null;

  constructor(
    private readonly max = 500,
    private readonly ttlMs = 60_000,
  ) {
    registerForIncrementalGc({
      entries: () => this.gcEntries(),
      delete: (key) => this.delete(key),
    });
  }

  private *gcEntries(): IterableIterator<[string, GcEntry]> {
    for (const [k, n] of this.map) yield [k, n];
  }

  get(key: string): V | undefined {
    const n = this.map.get(key);
    if (!n) return undefined;
    if (n.expiresAt <= Date.now()) {
      this.delete(key);
      return undefined;
    }
    this.touch(n);
    return n.value;
  }

  set(key: string, value: V, ttlMs = this.ttlMs): void {
    const existing = this.map.get(key);
    if (existing) {
      existing.value = value;
      existing.expiresAt = Date.now() + ttlMs;
      this.touch(existing);
      return;
    }
    const n: Node<V> = {
      key,
      value,
      expiresAt: Date.now() + ttlMs,
      prev: null,
      next: null,
    };
    this.map.set(key, n);
    this.prepend(n);
    while (this.map.size > this.max) {
      if (this.tail) this.delete(this.tail.key);
      else break;
    }
  }

  delete(key: string): boolean {
    const n = this.map.get(key);
    if (!n) return false;
    this.map.delete(key);
    this.detach(n);
    return true;
  }

  invalidatePrefix(prefix: string): void {
    for (const key of [...this.map.keys()]) {
      if (key.startsWith(prefix)) this.delete(key);
    }
  }

  private prepend(n: Node<V>): void {
    n.next = this.head;
    n.prev = null;
    if (this.head) this.head.prev = n;
    this.head = n;
    if (!this.tail) this.tail = n;
  }

  private detach(n: Node<V>): void {
    if (n.prev) n.prev.next = n.next;
    else this.head = n.next;
    if (n.next) n.next.prev = n.prev;
    else this.tail = n.prev;
    n.prev = null;
    n.next = null;
  }

  private touch(n: Node<V>): void {
    this.detach(n);
    this.prepend(n);
  }
}
