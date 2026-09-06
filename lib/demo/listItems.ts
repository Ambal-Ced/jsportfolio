export const LIST_ITEMS = Array.from({ length: 80 }, (_, i) => ({
  id: String(i + 1),
  title: `Entry ${i + 1}`,
  body: "Placeholder row for scroll restoration prep.",
}));
