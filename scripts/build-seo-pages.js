import { mkdir, readdir, writeFile } from "node:fs/promises";

const siteUrl = "https://kjc613.github.io/ai-compass";
const today = new Date().toISOString().slice(0, 10);
const tools = JSON.parse(await readText("data/ai-tools.json"));
const legalPages = ["about.html", "privacy.html", "terms.html", "contact.html"];

const categoryMeta = {
  "大模型与 API": {
    slug: "foundation-models-api",
    en: "Foundation Models & APIs",
    zhDescription: "通用模型、推理接口、多模态 API 和企业模型服务，是构建 AI 产品的底座。",
    enDescription: "General models, inference APIs, multimodal endpoints, and enterprise model services for building AI products."
  },
  "办公效率": {
    slug: "productivity",
    en: "Productivity",
    zhDescription: "写作、演示、文档、会议和个人知识管理相关 AI 工具。",
    enDescription: "AI tools for writing, slides, documents, meetings, and personal knowledge management."
  },
  "搜索问答": {
    slug: "search-qa",
    en: "Search & Q&A",
    zhDescription: "AI 搜索、资料查证、对话助手和多模型问答入口。",
    enDescription: "AI search, source-backed research, chat assistants, and multi-model Q&A entry points."
  },
  "图像与设计": {
    slug: "image-design",
    en: "Image & Design",
    zhDescription: "覆盖图像生成、海报设计、品牌素材和创意视觉，适合设计与营销团队。",
    enDescription: "Image generation, posters, brand assets, and creative visuals for design and marketing teams."
  },
  "视频与创意": {
    slug: "video-creative",
    en: "Video & Creative",
    zhDescription: "用于短视频、数字人、视频翻译和创意片段生产，适合内容团队。",
    enDescription: "Short videos, avatars, video translation, and creative clip production for content teams."
  },
  "模型与社区": {
    slug: "model-community",
    en: "Model Hubs & Communities",
    zhDescription: "模型、数据集、在线 Demo 和开发者社区生态。",
    enDescription: "Models, datasets, demos, and developer community ecosystems."
  },
  "开发者工具": {
    slug: "developer-tools",
    en: "Developer Tools",
    zhDescription: "面向代码生成、工程协作、模型调用和 AI 开发流程提效。",
    enDescription: "Coding, engineering collaboration, model access, and AI development workflow acceleration."
  },
  "语音与音频": {
    slug: "voice-audio",
    en: "Voice & Audio",
    zhDescription: "语音生成、配音、转写、音乐和音频编辑。",
    enDescription: "Voice generation, dubbing, transcription, music, and audio editing."
  },
  "营销与内容": {
    slug: "marketing-content",
    en: "Marketing & Content",
    zhDescription: "品牌文案、素材创作、活动内容和销售流程自动化。",
    enDescription: "Brand copy, creative assets, campaign content, and sales workflow automation."
  },
  "智能体与自动化": {
    slug: "agents-automation",
    en: "Agents & Automation",
    zhDescription: "把 AI 接入业务流程、SaaS 工具和自动化任务，适合运营与企业效率。",
    enDescription: "Connect AI to business processes, SaaS apps, and automated tasks for operations and enterprise productivity."
  },
  "AI 应用构建": {
    slug: "ai-app-builders",
    en: "AI App Building",
    zhDescription: "用于搭建聊天应用、智能体、RAG 和全栈 AI 原型。",
    enDescription: "Tooling for chat apps, agents, RAG systems, and full-stack AI prototypes."
  },
  "知识库与检索": {
    slug: "knowledge-retrieval",
    en: "Knowledge & Retrieval",
    zhDescription: "向量数据库、语义检索和 RAG 基础设施，适合企业知识库。",
    enDescription: "Vector databases, semantic retrieval, and RAG infrastructure for enterprise knowledge systems."
  },
  "数据与企业 AI": {
    slug: "data-enterprise-ai",
    en: "Data & Enterprise AI",
    zhDescription: "数据标注、模型评测、机器学习治理和企业决策 AI 平台。",
    enDescription: "Data labeling, model evaluation, ML governance, and enterprise decision AI platforms."
  },
  "生成工作流": {
    slug: "generation-workflows",
    en: "Generation Workflows",
    zhDescription: "节点式生成、模型管线、画布编辑和本地创作工作台，适合深度视觉工作流。",
    enDescription: "Node-based generation, model pipelines, canvas editing, and local creative workbenches for advanced visual workflows."
  }
};

const englishFallback = {
  OpenAI: {
    summary: "Home of ChatGPT, GPT models, developer APIs, voice, and multimodal capabilities for general AI apps and enterprise integration.",
    tags: ["ChatGPT", "API", "Multimodal", "Voice"]
  },
  Anthropic: {
    summary: "Official home of Claude models for conversation, writing, coding, enterprise knowledge work, and API access.",
    tags: ["Claude", "API", "Enterprise", "Writing"]
  },
  "Google AI": {
    summary: "Google's AI product and research hub, covering Gemini, developer tools, research updates, and ecosystem resources.",
    tags: ["Gemini", "Search", "Research", "Developers"]
  },
  "Microsoft Copilot": {
    summary: "AI assistant for personal and Microsoft 365 workflows, useful for productivity, search, writing, and collaboration.",
    tags: ["Office", "Copilot", "Productivity", "Enterprise"]
  },
  Perplexity: {
    summary: "AI search and answer engine built around cited sources, useful for research, fact-checking, and topic tracking.",
    tags: ["AI Search", "Q&A", "Citations", "Research"]
  },
  Midjourney: {
    summary: "AI image generation platform for concept visuals, posters, art direction, and brand inspiration.",
    tags: ["Image Generation", "Design", "Creative", "Art"]
  },
  Runway: {
    summary: "AI video generation and editing platform for creators, marketing teams, and visual production workflows.",
    tags: ["Video Generation", "Editing", "Creative", "Marketing"]
  },
  "Stability AI": {
    summary: "The company behind Stable Diffusion, offering image, video, audio, and 3D model capabilities.",
    tags: ["Stable Diffusion", "Model Community", "Image", "Models"]
  },
  "Hugging Face": {
    summary: "Community platform for models, datasets, and Spaces, ideal for discovering open models and building demos.",
    tags: ["Model Community", "Model Hub", "Datasets", "Spaces"]
  },
  Replicate: {
    summary: "Platform for running open AI models through APIs, useful for fast experiments across image, audio, video, and language models.",
    tags: ["API", "Open Models", "Deployment", "Developers"]
  },
  ElevenLabs: {
    summary: "AI voice generation, dubbing, voice cloning, and audio application platform.",
    tags: ["Voice Generation", "Dubbing", "Audio", "Cloning"]
  },
  "Notion AI": {
    summary: "AI writing, summarization, knowledge-base Q&A, and collaboration features inside Notion workspaces.",
    tags: ["Notes", "Knowledge Base", "Writing", "Collaboration"]
  },
  "Canva AI": {
    summary: "AI design tools for non-designers, covering copy, images, presentations, and marketing assets.",
    tags: ["Design", "Marketing", "Presentations", "Images"]
  },
  "GitHub Copilot": {
    summary: "AI coding assistant for code completion, chat, review, and engineering workflows.",
    tags: ["Coding", "IDE", "Code", "Developers"]
  },
  Cursor: {
    summary: "AI-first code editor for codebase Q&A, generation, refactoring, and multi-file edits.",
    tags: ["AI IDE", "Coding", "Codebase", "Developers"]
  },
  xAI: {
    summary: "Home of Grok models and xAI products, covering chat, real-time information, and developer APIs.",
    tags: ["Grok", "API", "Real-time Info", "Chat"]
  },
  "Mistral AI": {
    summary: "European AI model company offering open-weight models, enterprise platforms, and developer APIs.",
    tags: ["Open Models", "API", "Enterprise", "Europe"]
  },
  DeepSeek: {
    summary: "Provider of chat, reasoning, and API services, useful for Chinese-language scenarios and developer integration.",
    tags: ["Chinese", "Reasoning", "API", "LLM"]
  },
  MiniMax: {
    summary: "AI capabilities across text, voice, video, and agents for consumer products and developer use cases.",
    tags: ["Voice", "Video", "Agents", "API"]
  },
  Kimi: {
    summary: "Moonshot AI assistant for long-document reading, search Q&A, writing, and Chinese knowledge work.",
    tags: ["Long Documents", "Chinese", "Search", "Writing"]
  },
  Gemini: {
    summary: "Google's AI assistant for chat, information organization, multimodal queries, and productivity tasks.",
    tags: ["Google", "Assistant", "Multimodal", "Search"]
  }
};

const categories = [...new Set(tools.map((tool) => tool.category))];

await mkdir("categories", { recursive: true });

for (const category of categories) {
  const meta = categoryMeta[category];
  if (!meta) {
    throw new Error(`Missing category metadata for ${category}`);
  }

  const categoryTools = tools
    .filter((tool) => tool.category === category)
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.name.localeCompare(b.name));

  await writeFile(`categories/${meta.slug}.html`, renderCategoryPage(category, meta, categoryTools));
}

const categoryFiles = (await readdir("categories"))
  .filter((file) => file.endsWith(".html"))
  .sort();

await writeFile("sitemap.xml", renderSitemap(categoryFiles));
await writeFile("llms.txt", renderLlmsText(categoryFiles));

console.log(`Built ${categoryFiles.length} category pages, sitemap.xml, and llms.txt.`);

async function readText(path) {
  const { readFile } = await import("node:fs/promises");
  return readFile(path, "utf8");
}

function renderCategoryPage(category, meta, categoryTools) {
  const zhTitle = `${category} AI 工具目录 - AI Compass`;
  const enTitle = `${meta.en} AI Tools Directory - AI Compass`;
  const zhDescription = `AI Compass ${category}目录，收录 ${categoryTools.length} 个相关 AI 厂商与工具入口，优先提供官网链接并提醒用户防范假冒官网。`;
  const enDescription = `AI Compass ${meta.en} directory with ${categoryTools.length} AI vendors and tools, official website links prioritized, and reminders to avoid impersonation sites.`;
  const pageUrl = `${siteUrl}/categories/${meta.slug}.html`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: enTitle,
    description: enDescription,
    url: pageUrl,
    isPartOf: {
      "@type": "WebSite",
      name: "AI Compass",
      url: `${siteUrl}/`
    },
    hasPart: categoryTools.map((tool) => ({
      "@type": "SoftwareApplication",
      name: tool.nameEn || tool.name,
      url: tool.url,
      applicationCategory: meta.en
    }))
  };

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(zhTitle)}</title>
  <meta name="description" content="${escapeHtml(zhDescription)}">
  <link rel="canonical" href="${pageUrl}">
  <link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
  <link rel="manifest" href="../site.webmanifest">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="AI Compass">
  <meta property="og:title" content="${escapeHtml(zhTitle)}">
  <meta property="og:description" content="${escapeHtml(zhDescription)}">
  <meta property="og:url" content="${pageUrl}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${escapeHtml(enTitle)}">
  <meta name="twitter:description" content="${escapeHtml(enDescription)}">
  <link rel="stylesheet" href="../assets/styles.css?v=9">
  <script type="application/ld+json">${jsonScript(schema)}</script>
</head>
<body data-title-zh="${escapeHtml(zhTitle)}" data-title-en="${escapeHtml(enTitle)}" data-description-zh="${escapeHtml(zhDescription)}" data-description-en="${escapeHtml(enDescription)}">
  <header class="subpage-header">
    <nav class="topbar" aria-label="Primary navigation">
      <a class="brand" href="../index.html">
        <span class="brand-mark" aria-hidden="true">AI</span>
        <span>AI Compass</span>
      </a>
      <div class="nav-links">
        <a href="../index.html#directory" data-seo-zh="导航" data-seo-en="Directory">导航</a>
        <a href="../news.html" data-seo-zh="资讯" data-seo-en="News">资讯</a>
        <button class="language-toggle" id="languageToggle" type="button" aria-label="Switch language">EN</button>
      </div>
    </nav>
    <div class="subpage-hero">
      <div class="breadcrumb">
        <a href="../index.html" data-seo-zh="首页" data-seo-en="Home">首页</a>
        <span>/</span>
        <span data-seo-zh="${escapeHtml(category)}" data-seo-en="${escapeHtml(meta.en)}">${escapeHtml(category)}</span>
      </div>
      <p class="eyebrow" data-seo-zh="AI 工具分类目录" data-seo-en="AI Tool Category">AI 工具分类目录</p>
      <h1 data-seo-zh="${escapeHtml(category)}" data-seo-en="${escapeHtml(meta.en)}">${escapeHtml(category)}</h1>
      <p data-seo-zh="${escapeHtml(meta.zhDescription)}" data-seo-en="${escapeHtml(meta.enDescription)}">${escapeHtml(meta.zhDescription)}</p>
    </div>
  </header>

  <main>
    <aside class="ad-slot ad-slot-wide" aria-label="广告位">
      <span data-seo-zh="广告位" data-seo-en="Ad placement">广告位</span>
      <small data-seo-zh="分类页顶部横幅广告位" data-seo-en="Top banner placement for category pages">分类页顶部横幅广告位</small>
    </aside>

    <section class="section category-page" aria-labelledby="category-tools-title">
      <div class="section-heading">
        <p class="eyebrow" data-seo-zh="Official links" data-seo-en="Official links">Official links</p>
        <h2 id="category-tools-title" data-seo-zh="${escapeHtml(category)}目录" data-seo-en="${escapeHtml(meta.en)} Directory">${escapeHtml(category)}目录</h2>
        <p data-seo-zh="优先整理官网入口。点击任意卡片会直接打开对应厂商或工具官网，请核对浏览器地址栏，避免进入仿冒网站。" data-seo-en="Official entries are prioritized. Click any card to open the vendor or tool website, and always verify the browser address bar to avoid impersonation sites.">优先整理官网入口。点击任意卡片会直接打开对应厂商或工具官网，请核对浏览器地址栏，避免进入仿冒网站。</p>
      </div>
      <div class="category-tabs" aria-label="AI tool categories">
${renderCategoryTabs(category)}
      </div>
      <div class="directory-grid">
${categoryTools.map(renderToolCard).join("\n")}
      </div>
    </section>

    <aside class="ad-slot ad-slot-wide" aria-label="广告位">
      <span data-seo-zh="广告位" data-seo-en="Ad placement">广告位</span>
      <small data-seo-zh="分类目录后的横幅广告位" data-seo-en="Banner placement after the category directory">分类目录后的横幅广告位</small>
    </aside>
  </main>

  <footer class="footer">
    <span>AI Compass</span>
    <nav class="footer-links" aria-label="Footer">
      <a href="../about.html" data-seo-zh="关于" data-seo-en="About">关于</a>
      <a href="../privacy.html" data-seo-zh="隐私" data-seo-en="Privacy">隐私</a>
      <a href="../terms.html" data-seo-zh="条款" data-seo-en="Terms">条款</a>
      <a href="../contact.html" data-seo-zh="联系" data-seo-en="Contact">联系</a>
    </nav>
  </footer>

  <script src="../assets/seo-i18n.js?v=9"></script>
</body>
</html>
`;
}

function renderCategoryTabs(activeCategory) {
  return categories.map((category) => {
    const meta = categoryMeta[category];
    const activeClass = category === activeCategory ? " active" : "";
    const href = `${meta.slug}.html`;
    return `        <a class="tab-button${activeClass}" href="${href}" data-seo-zh="${escapeAttribute(category)}" data-seo-en="${escapeAttribute(meta.en)}">${escapeHtml(category)}</a>`;
  }).join("\n");
}

function renderToolCard(tool) {
  const enCopy = englishFallback[tool.name] || {};
  const zhTags = tool.tags || [];
  const enTags = tool.tagsEn || enCopy.tags || zhTags;
  const nameZh = tool.name;
  const nameEn = tool.nameEn || tool.name;
  const summaryZh = tool.summary || "";
  const summaryEn = tool.summaryEn || enCopy.summary || summaryZh;
  const initialZh = nameZh.slice(0, 2);
  const initialEn = nameEn.slice(0, 2).toUpperCase();

  return `        <a class="tool-card" href="${escapeAttribute(tool.url)}" target="_blank" rel="noopener" aria-label="${escapeAttribute(`打开 ${nameZh} 官网`)}">
          <div class="card-top">
            <div class="tool-logo" aria-hidden="true">
              <img src="${escapeAttribute(faviconUrl(tool.url))}" alt="" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';">
              <span data-seo-zh="${escapeAttribute(initialZh)}" data-seo-en="${escapeAttribute(initialEn)}">${escapeHtml(initialZh)}</span>
            </div>
            ${tool.featured ? `<span class="badge" data-seo-zh="精选" data-seo-en="Featured">精选</span>` : ""}
          </div>
          <h3 data-seo-zh="${escapeAttribute(nameZh)}" data-seo-en="${escapeAttribute(nameEn)}">${escapeHtml(nameZh)}</h3>
          <p data-seo-zh="${escapeAttribute(summaryZh)}" data-seo-en="${escapeAttribute(summaryEn)}">${escapeHtml(summaryZh)}</p>
          <div class="tags">${zhTags.slice(0, 4).map((tag, index) => `<span class="tag" data-seo-zh="${escapeAttribute(tag)}" data-seo-en="${escapeAttribute(enTags[index] || tag)}">${escapeHtml(tag)}</span>`).join("")}</div>
        </a>`;
}

function renderSitemap(files) {
  const pages = [
    { loc: `${siteUrl}/`, changefreq: "weekly", priority: "1.0" },
    { loc: `${siteUrl}/news.html`, changefreq: "daily", priority: "0.8" },
    ...legalPages.map((file) => ({
      loc: `${siteUrl}/${file}`,
      changefreq: "monthly",
      priority: "0.5"
    })),
    ...files.map((file) => ({
      loc: `${siteUrl}/categories/${file}`,
      changefreq: "weekly",
      priority: "0.7"
    }))
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;
}

function renderLlmsText(files) {
  return `# AI Compass

AI Compass is a Chinese and English AI tools directory and daily AI news site.

Site URL: ${siteUrl}/
Sitemap: ${siteUrl}/sitemap.xml
News page: ${siteUrl}/news.html
About page: ${siteUrl}/about.html
Privacy policy: ${siteUrl}/privacy.html
Terms: ${siteUrl}/terms.html
Contact: ${siteUrl}/contact.html

Main topics:
- AI tools and official website links
- AI coding tools and developer workflows
- AI agents and automation
- AI image, video, voice, and generation workflows
- Daily AI news from official blogs and technology media

Important category pages:
${files.map((file) => `- ${siteUrl}/categories/${file}`).join("\n")}
`;
}

function faviconUrl(url) {
  const domain = new URL(url).hostname;
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("\n", " ");
}

function jsonScript(value) {
  return JSON.stringify(value)
    .replaceAll("<", "\\u003c")
    .replaceAll(">", "\\u003e")
    .replaceAll("&", "\\u0026");
}
