import { readFile, writeFile } from "node:fs/promises";

const newsLimit = Number(process.env.NEWS_LIMIT || 60);
const translationProvider = (process.env.TRANSLATION_PROVIDER || detectTranslationProvider()).toLowerCase();
const translateNews = process.env.TRANSLATE_NEWS === "true" && Boolean(translationProvider);
const openaiModel = process.env.OPENAI_MODEL || "gpt-4.1-mini";
const qwenModel = process.env.QWEN_MODEL || "qwen-plus";
const qwenBaseUrl = process.env.QWEN_BASE_URL || "https://dashscope-intl.aliyuncs.com/compatible-mode/v1";

const feeds = [
  { source: "OpenAI News", url: "https://openai.com/news/rss.xml", focused: true },
  { source: "Anthropic News", url: "https://www.anthropic.com/news/rss.xml", focused: true },
  { source: "Google AI Blog", url: "https://blog.google/technology/ai/rss/", focused: true },
  { source: "Google DeepMind Blog", url: "https://deepmind.google/blog/rss.xml", focused: true },
  { source: "Hugging Face Blog", url: "https://huggingface.co/blog/feed.xml", focused: true },
  { source: "Microsoft AI Blog", url: "https://blogs.microsoft.com/ai/feed/", focused: true },
  { source: "NVIDIA AI Blog", url: "https://blogs.nvidia.com/blog/category/deep-learning/feed/", focused: true },
  { source: "Meta AI Blog", url: "https://ai.meta.com/blog/rss/", focused: true },
  { source: "AWS Machine Learning Blog", url: "https://aws.amazon.com/blogs/machine-learning/feed/", focused: true },
  { source: "Databricks Blog", url: "https://www.databricks.com/blog/feed", focused: false },
  { source: "TechCrunch AI", url: "https://techcrunch.com/category/artificial-intelligence/feed/", focused: true },
  { source: "The Verge AI", url: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml", focused: true },
  { source: "VentureBeat AI", url: "https://venturebeat.com/category/ai/feed/", focused: true },
  { source: "The Decoder", url: "https://the-decoder.com/feed/", focused: true },
  { source: "Ars Technica", url: "https://feeds.arstechnica.com/arstechnica/technology-lab", focused: false },
  { source: "The Batch", url: "https://www.deeplearning.ai/the-batch/feed/", focused: true },
  { source: "MIT Technology Review", url: "https://www.technologyreview.com/feed/", focused: false }
];

const results = [];

for (const feed of feeds) {
  try {
    const response = await fetch(feed.url, {
      signal: AbortSignal.timeout(15000),
      headers: {
        "Accept": "application/rss+xml, application/atom+xml, application/xml, text/xml, */*",
        "User-Agent": "AI Compass News Bot/1.0 (+https://kjc613.github.io/ai-compass/)"
      }
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const xml = await response.text();
    results.push(...parseFeed(xml, feed));
  } catch (error) {
    console.warn(`Skipping ${feed.source}: ${error.message}`);
  }
}

const items = dedupe(results)
  .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
  .slice(0, newsLimit);

if (!items.length) {
  const previousNewsData = await readExistingNewsData();
  console.warn("No news items were fetched. Keeping the previous news data.");
  await writeSiteDataModule(previousNewsData);
} else {
  const newsData = { updatedAt: new Date().toISOString(), items: await translateNewsItems(items) };
  await writeFile("data/news.json", JSON.stringify(newsData, null, 2) + "\n");
  await writeSiteDataModule(newsData);
}

function parseFeed(xml, feed) {
  const blocks = matchAll(xml, /<item\b[\s\S]*?<\/item>|<entry\b[\s\S]*?<\/entry>/gi);
  return blocks.map((block) => {
    const title = decodeXml(readTag(block, "title"));
    const rawLink = readTag(block, "link");
    const href = /href=["']([^"']+)["']/i.exec(block)?.[1];
    const url = decodeXml(href || rawLink);
    const publishedAt = normalizeDate(readTag(block, "pubDate") || readTag(block, "published") || readTag(block, "updated"));
    const summary = stripHtml(decodeXml(readTag(block, "description") || readTag(block, "summary") || readTag(block, "content")));

    return {
      title,
      titleEn: title,
      url,
      source: feed.source,
      publishedAt,
      summary: summary.slice(0, 160),
      summaryEn: summary.slice(0, 160)
    };
  }).filter((item) => item.title && item.url && (feed.focused || isAiRelevant(item)));
}

async function translateNewsItems(items) {
  const normalizedItems = items.map((item) => ({
    ...item,
    titleEn: item.titleEn || item.title,
    summaryEn: item.summaryEn || item.summary
  }));

  if (!translateNews) {
    console.warn("News translation skipped. Set TRANSLATE_NEWS=true and configure QWEN_API_KEY or OPENAI_API_KEY to enable it.");
    return normalizedItems;
  }

  const translatedItems = [...normalizedItems];
  const batchSize = 10;

  for (let index = 0; index < normalizedItems.length; index += batchSize) {
    const batch = normalizedItems.slice(index, index + batchSize);
    try {
      const translations = await translateBatch(batch);
      for (const translation of translations) {
        const targetIndex = index + Number(translation.index);
        if (!Number.isInteger(targetIndex) || !translatedItems[targetIndex]) continue;
        translatedItems[targetIndex] = {
          ...translatedItems[targetIndex],
          titleZh: translation.titleZh || translatedItems[targetIndex].title,
          summaryZh: translation.summaryZh || translatedItems[targetIndex].summary
        };
      }
    } catch (error) {
      console.warn(`Skipping news translation batch ${index / batchSize + 1}: ${error.message}`);
    }
  }

  return translatedItems;
}

async function translateBatch(batch) {
  const endpoint = translationProvider === "qwen"
    ? `${qwenBaseUrl.replace(/\/$/, "")}/chat/completions`
    : "https://api.openai.com/v1/chat/completions";
  const apiKey = translationProvider === "qwen" ? process.env.QWEN_API_KEY : process.env.OPENAI_API_KEY;
  const model = translationProvider === "qwen" ? qwenModel : openaiModel;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      temperature: 0.1,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "Translate AI news titles and summaries into concise Simplified Chinese. Preserve product names, company names, model names, and URLs. Return valid JSON only."
        },
        {
          role: "user",
          content: JSON.stringify({
            schema: {
              items: [
                {
                  index: 0,
                  titleZh: "中文标题",
                  summaryZh: "中文摘要"
                }
              ]
            },
            items: batch.map((item, index) => ({
              index,
              title: item.titleEn || item.title,
              summary: item.summaryEn || item.summary || ""
            }))
          })
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`${translationProvider} translation failed: ${response.status} ${response.statusText}`);
  }

  const body = await response.json();
  const content = extractChatCompletionText(body);
  const parsed = JSON.parse(content);
  return Array.isArray(parsed.items) ? parsed.items : [];
}

function extractChatCompletionText(body) {
  return body.choices?.[0]?.message?.content || "";
}

function detectTranslationProvider() {
  if (process.env.QWEN_API_KEY) return "qwen";
  if (process.env.OPENAI_API_KEY) return "openai";
  return "";
}

function matchAll(value, regex) {
  return Array.from(value.matchAll(regex), (match) => match[0]);
}

function readTag(block, tag) {
  const match = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i").exec(block);
  return match ? match[1].replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim() : "";
}

function decodeXml(value) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCharCode(Number.parseInt(code, 16)))
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
}

function isAiRelevant(item) {
  const text = `${item.title} ${item.summary}`.toLowerCase();
  return [
    " ai ",
    "artificial intelligence",
    "machine learning",
    "deep learning",
    "openai",
    "anthropic",
    "claude",
    "chatgpt",
    "gemini",
    "llm",
    "large language model",
    "agent"
  ].some((term) => text.includes(term));
}

function stripHtml(value) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function normalizeDate(value) {
  const date = value ? new Date(value) : new Date();
  return Number.isNaN(date.valueOf()) ? new Date().toISOString() : date.toISOString();
}

function dedupe(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = item.url || item.title;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function writeSiteDataModule(newsData) {
  const aiTools = JSON.parse(await readFile("data/ai-tools.json", "utf8"));
  const moduleSource = `window.SITE_DATA = ${JSON.stringify({ aiTools, newsData }, null, 2)};\n`;
  await writeFile("assets/site-data.js", moduleSource);
}

async function readExistingNewsData() {
  return JSON.parse(await readFile("data/news.json", "utf8"));
}
