const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = path.join(__dirname, "..", "public");
const skip = new Set(["arzen.png", "arzenwhite.png"]);
const exts = new Set([".png", ".jpg", ".jpeg"]);

async function walk(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
      continue;
    }
    const ext = path.extname(entry.name).toLowerCase();
    if (!exts.has(ext)) continue;
    if (skip.has(entry.name)) continue;

    const out = full.slice(0, -ext.length) + ".webp";
    await sharp(full).webp({ quality: 78 }).toFile(out);
    await fs.promises.unlink(full);
    console.log("converted", path.relative(root, full), "->", path.relative(root, out));
  }
}

walk(root).catch((err) => {
  console.error(err);
  process.exit(1);
});
