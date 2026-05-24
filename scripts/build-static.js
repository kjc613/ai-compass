import { cp, mkdir, rm } from "node:fs/promises";

const outputDir = "dist";
const staticPaths = [
  "index.html",
  "news.html",
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  "llms.txt",
  "assets",
  "categories",
  "data"
];

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

for (const path of staticPaths) {
  await cp(path, `${outputDir}/${path}`, { recursive: true });
}

console.log(`Built static site in ${outputDir}/`);
