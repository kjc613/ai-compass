import { readFile, writeFile } from "node:fs/promises";

const [aiTools, newsData] = await Promise.all([
  readJson("data/ai-tools.json"),
  readJson("data/news.json")
]);

await writeFile(
  "assets/site-data.js",
  `window.SITE_DATA = ${JSON.stringify({ aiTools, newsData }, null, 2)};\n`
);

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}
