// Downloads every stock photo listed in src/config/site.js into public/images/stock/
// so the live site serves them from your own domain.  Run:  npm run fetch-stock
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const src = await readFile(path.join(root, "src/config/site.js"), "utf8");

// Read the stockSources block without executing the config
const block = src.slice(src.indexOf("export const stockSources"), src.indexOf("};", src.indexOf("export const stockSources")));
const pexels = (id, w = 1920) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
const entries = [...block.matchAll(/^\s*"?([\w-]+)"?:\s*(pexels\((\d+)(?:,\s*(\d+))?\)|"([^"]+)")/gm)].map((m) => [
  m[1],
  m[3] ? pexels(m[3], m[4] ? Number(m[4]) : 1920) : m[5],
]);

const outDir = path.join(root, "public/images/stock");
await mkdir(outDir, { recursive: true });

const done = [];
for (const [key, url] of entries) {
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(path.join(outDir, `${key}.jpg`), Buffer.from(await res.arrayBuffer()));
    done.push(key);
    console.log(`✓ ${key}`);
  } catch (err) {
    console.log(`✗ ${key}: ${err.message} (site will keep using the online link)`);
  }
}

await writeFile(path.join(root, "src/config/stock-local.json"), JSON.stringify(done, null, 2) + "\n");
console.log(`\n${done.length}/${entries.length} photos saved to public/images/stock`);
