const translations = {
  zh: {
    pageTitle: "AI Compass - AI 厂商导航与资讯",
    htmlLang: "zh-CN",
    navLabel: "主导航",
    navDirectory: "导航",
    navNews: "资讯",
    heroEyebrow: "AI company directory",
    heroTitle: "把分散的 AI 官网、产品入口和新闻更新收进一个导航页。",
    heroText: "按大模型、图像视频、开发者工具、搜索问答、办公效率、语音、多模态、硬件等业务属性自动归类展示，优先整理官方入口，降低误入假冒官网和仿冒下载页的风险。",
    heroPrimary: "浏览 AI 导航",
    heroSecondary: "查看今日资讯",
    overviewLabel: "站点概览",
    metricTools: "AI 厂商入口",
    metricCategories: "业务分类",
    metricNews: "每日资讯",
    directoryEyebrow: "Directory",
    directoryTitle: "AI 厂商导航",
    directoryText: "搜索品牌、官网、能力标签，或切换业务分类快速找到对应工具。",
    categoryOverviewTitle: "重点分类概览",
    categoryOverviewText: "先按业务目标理解 AI 工具体系，再进入具体厂商。",
    editorPicksTitle: "编辑推荐",
    editorPicksText: "更适合新用户优先了解的高频入口。",
    searchLabel: "搜索",
    searchPlaceholder: "例如 OpenAI、图像生成、API、搜索",
    sortLabel: "排序",
    sortFeatured: "推荐优先",
    sortName: "按名称",
    sortCategory: "按分类",
    categoriesLabel: "业务分类",
    allCategory: "全部",
    featured: "精选",
    visit: "访问官网",
    noResultsTitle: "没有找到匹配项",
    noResultsText: "换个关键词试试，比如 API、视频、搜索、办公或智能体。",
    newsEyebrow: "Daily AI News",
    newsTitle: "每日 AI 资讯",
    newsUpdated: "最近更新：{date}。资讯源来自官方博客、研究机构和技术媒体 RSS。",
    readOriginal: "点击查看原文。",
    footerText: "持续整理 AI 产品入口、能力分类和行业资讯。",
    toggleLabel: "切换到英文",
    toggleText: "EN"
  },
  en: {
    pageTitle: "AI Compass - AI Directory and News",
    htmlLang: "en",
    navLabel: "Primary navigation",
    navDirectory: "Directory",
    navNews: "News",
    heroEyebrow: "AI company directory",
    heroTitle: "One navigation page for AI websites, product entrances, and daily news.",
    heroText: "Browse AI companies by business category with official entrances prioritized, reducing the risk of landing on impersonation sites or misleading download pages.",
    heroPrimary: "Browse directory",
    heroSecondary: "Read AI news",
    overviewLabel: "Site overview",
    metricTools: "AI company links",
    metricCategories: "Business categories",
    metricNews: "Daily news items",
    directoryEyebrow: "Directory",
    directoryTitle: "AI Company Directory",
    directoryText: "Search by brand, website, capability tag, or switch business categories to find the right AI tool.",
    categoryOverviewTitle: "Category Highlights",
    categoryOverviewText: "Understand the AI landscape by business goal before jumping into specific vendors.",
    editorPicksTitle: "Editor Picks",
    editorPicksText: "High-frequency entry points that are easier for new users to explore first.",
    searchLabel: "Search",
    searchPlaceholder: "Try OpenAI, image generation, API, search",
    sortLabel: "Sort",
    sortFeatured: "Featured first",
    sortName: "By name",
    sortCategory: "By category",
    categoriesLabel: "Business categories",
    allCategory: "All",
    featured: "Featured",
    visit: "Visit website",
    noResultsTitle: "No matches found",
    noResultsText: "Try another keyword such as API, video, search, productivity, or agents.",
    newsEyebrow: "Daily AI News",
    newsTitle: "Daily AI News",
    newsUpdated: "Last updated: {date}. Sources include official blogs, research teams, and technology media RSS feeds.",
    readOriginal: "Read the original story.",
    footerText: "Track AI product entrances, capability categories, and industry news.",
    toggleLabel: "Switch to Chinese",
    toggleText: "中"
  }
};

const categoryLabels = {
  "大模型与 API": "Foundation Models & APIs",
  "办公效率": "Productivity",
  "搜索问答": "Search & Q&A",
  "图像与设计": "Image & Design",
  "视频与创意": "Video & Creative",
  "生成工作流": "Generation Workflows",
  "模型与社区": "Model Hubs & Communities",
  "开发者工具": "Developer Tools",
  "语音与音频": "Voice & Audio",
  "营销与内容": "Marketing & Content",
  "智能体与自动化": "Agents & Automation",
  "AI 应用构建": "AI App Building",
  "知识库与检索": "Knowledge & Retrieval",
  "数据与企业 AI": "Data & Enterprise AI"
};

const categoryDescriptions = {
  zh: {
    "大模型与 API": "通用模型、推理接口、多模态 API 和企业模型服务，是构建 AI 产品的底座。",
    "图像与设计": "覆盖图像生成、海报设计、品牌素材和创意视觉，适合设计与营销团队。",
    "视频与创意": "用于短视频、数字人、视频翻译和创意片段生产，适合内容团队。",
    "生成工作流": "节点式生成、模型管线、画布编辑和本地创作工作台，适合深度视觉工作流。",
    "开发者工具": "面向代码生成、工程协作、模型调用和 AI 开发流程提效。",
    "AI 应用构建": "用于搭建聊天应用、智能体、RAG 和全栈 AI 原型。",
    "智能体与自动化": "把 AI 接入业务流程、SaaS 工具和自动化任务，适合运营与企业效率。",
    "知识库与检索": "向量数据库、语义检索和 RAG 基础设施，适合企业知识库。",
    "办公效率": "写作、演示、文档、会议和个人知识管理相关 AI 工具。",
    "搜索问答": "AI 搜索、资料查证、对话助手和多模型问答入口。",
    "语音与音频": "语音生成、配音、转写、音乐和音频编辑。",
    "营销与内容": "品牌文案、素材创作、活动内容和销售流程自动化。",
    "数据与企业 AI": "数据标注、模型评测、机器学习治理和企业决策 AI 平台。",
    "模型与社区": "模型、数据集、在线 Demo 和开发者社区生态。"
  },
  en: {
    "大模型与 API": "General models, inference APIs, multimodal endpoints, and enterprise model services for building AI products.",
    "图像与设计": "Image generation, posters, brand assets, and creative visuals for design and marketing teams.",
    "视频与创意": "Short videos, avatars, video translation, and creative clip production for content teams.",
    "生成工作流": "Node-based generation, model pipelines, canvas editing, and local creative workbenches for advanced visual workflows.",
    "开发者工具": "Coding, engineering collaboration, model access, and AI development workflow acceleration.",
    "AI 应用构建": "Tooling for chat apps, agents, RAG systems, and full-stack AI prototypes.",
    "智能体与自动化": "Connect AI to business processes, SaaS apps, and automated tasks for operations and enterprise productivity.",
    "知识库与检索": "Vector databases, semantic retrieval, and RAG infrastructure for enterprise knowledge systems.",
    "办公效率": "AI tools for writing, slides, documents, meetings, and personal knowledge management.",
    "搜索问答": "AI search, source-backed research, chat assistants, and multi-model Q&A entry points.",
    "语音与音频": "Voice generation, dubbing, transcription, music, and audio editing.",
    "营销与内容": "Brand copy, creative assets, campaign content, and sales workflow automation.",
    "数据与企业 AI": "Data labeling, model evaluation, ML governance, and enterprise decision AI platforms.",
    "模型与社区": "Models, datasets, demos, and developer community ecosystems."
  }
};

const englishToolCopy = {
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
  智谱清言: {
    summary: "Zhipu AI's chat product and model service entry point for Chinese conversation, agents, and enterprise applications.",
    tags: ["Chinese", "ChatGLM", "Agents", "Enterprise"]
  },
  通义千问: {
    summary: "Alibaba Cloud's Qwen AI product entry, covering chat, productivity, developer APIs, and enterprise scenarios.",
    tags: ["Alibaba Cloud", "Chinese", "API", "Enterprise"]
  },
  文心一言: {
    summary: "Baidu's ERNIE Bot product entry, connecting search, content generation, productivity, and agent use cases.",
    tags: ["Baidu", "Search", "Chinese", "Agents"]
  },
  Gemini: {
    summary: "Google's AI assistant for chat, information organization, multimodal queries, and productivity tasks.",
    tags: ["Google", "Assistant", "Multimodal", "Search"]
  }
};

const state = {
  tools: [],
  news: [],
  activeCategory: "全部",
  query: "",
  sort: "featured",
  language: localStorage.getItem("ai-compass-language") || "zh"
};

const categoryTabs = document.querySelector("#categoryTabs");
const directoryGrid = document.querySelector("#directoryGrid");
const searchInput = document.querySelector("#searchInput");
const sortSelect = document.querySelector("#sortSelect");
const newsGrid = document.querySelector("#newsGrid");
const languageToggle = document.querySelector("#languageToggle");
const overviewGrid = document.querySelector("#overviewGrid");
const pickStrip = document.querySelector("#pickStrip");

init();

function init() {
  const { aiTools, newsData } = window.SITE_DATA;
  state.tools = aiTools;
  state.news = newsData.items || [];

  document.querySelector("#toolCount").textContent = state.tools.length;
  document.querySelector("#categoryCount").textContent = getCategories().length - 1;
  document.querySelector("#newsCount").textContent = state.news.length;

  applyLanguage();
  renderOverview();
  renderPicks();
  renderTabs();
  renderDirectory();
  renderNews();

  searchInput.addEventListener("input", (event) => {
    state.query = event.target.value.trim().toLowerCase();
    renderDirectory();
  });

  sortSelect.addEventListener("change", (event) => {
    state.sort = event.target.value;
    renderDirectory();
  });

  languageToggle.addEventListener("click", () => {
    state.language = state.language === "zh" ? "en" : "zh";
    localStorage.setItem("ai-compass-language", state.language);
    applyLanguage();
    renderOverview();
    renderPicks();
    renderTabs();
    renderDirectory();
    renderNews();
  });
}

function applyLanguage() {
  const t = translations[state.language];
  document.documentElement.lang = t.htmlLang;
  document.title = t.pageTitle;

  for (const element of document.querySelectorAll("[data-i18n]")) {
    element.textContent = t[element.dataset.i18n];
  }

  for (const element of document.querySelectorAll("[data-i18n-placeholder]")) {
    element.setAttribute("placeholder", t[element.dataset.i18nPlaceholder]);
  }

  for (const element of document.querySelectorAll("[data-i18n-aria]")) {
    element.setAttribute("aria-label", t[element.dataset.i18nAria]);
  }

  languageToggle.textContent = t.toggleText;
  languageToggle.setAttribute("aria-label", t.toggleLabel);
  document.querySelector("#newsUpdated").textContent = t.newsUpdated.replace("{date}", formatDate(window.SITE_DATA.newsData.updatedAt));
}

function getCategories() {
  return ["全部", ...new Set(state.tools.map((tool) => tool.category))];
}

function renderOverview() {
  const categoryCounts = state.tools.reduce((counts, tool) => {
    counts[tool.category] = (counts[tool.category] || 0) + 1;
    return counts;
  }, {});

  const priority = [
    "大模型与 API",
    "AI 应用构建",
    "开发者工具",
    "智能体与自动化",
    "生成工作流",
    "图像与设计"
  ];

  overviewGrid.innerHTML = "";
  for (const category of priority) {
    const button = document.createElement("button");
    button.className = "overview-card";
    button.type = "button";
    button.setAttribute("aria-label", `${labelCategory(category)} ${categoryCounts[category] || 0}`);
    button.innerHTML = `
      <span class="overview-count">${categoryCounts[category] || 0}</span>
      <h4>${escapeHtml(labelCategory(category))}</h4>
      <p>${escapeHtml(categoryDescriptions[state.language][category])}</p>
    `;
    button.addEventListener("click", () => selectCategory(category, true));
    overviewGrid.append(button);
  }
}

function renderPicks() {
  const picks = state.tools
    .filter((tool) => Number.isFinite(tool.editorPickRank))
    .sort((a, b) => a.editorPickRank - b.editorPickRank)
    .slice(0, 16);

  pickStrip.innerHTML = "";
  for (const tool of picks) {
    const copy = toolCopy(tool);
    const link = document.createElement("a");
    const reason = state.language === "en" ? tool.editorPickReasonEn || tool.editorPickReason : tool.editorPickReason;
    const fallbackReason = reason || copy.tags.slice(0, 3).join(" / ");
    link.className = "pick-card";
    link.href = tool.url;
    link.target = "_blank";
    link.rel = "noopener";
    link.innerHTML = `
      <img src="${faviconUrl(tool.url)}" alt="" loading="lazy">
      <span>${escapeHtml(displayName(tool))}</span>
      <small>${escapeHtml(labelCategory(tool.category))}</small>
      <p>${escapeHtml(fallbackReason)}</p>
    `;
    pickStrip.append(link);
  }
}

function labelCategory(category) {
  if (category === "全部") return translations[state.language].allCategory;
  return state.language === "en" ? categoryLabels[category] || category : category;
}

function displayName(tool) {
  return state.language === "en" ? tool.nameEn || tool.name : tool.name;
}

function renderTabs() {
  categoryTabs.innerHTML = "";
  for (const category of getCategories()) {
    const button = document.createElement("button");
    button.className = `tab-button${category === state.activeCategory ? " active" : ""}`;
    button.type = "button";
    button.textContent = labelCategory(category);
    button.addEventListener("click", () => selectCategory(category));
    categoryTabs.append(button);
  }
}

function selectCategory(category, shouldScroll = false) {
  state.activeCategory = category;
  renderTabs();
  renderDirectory();
  if (shouldScroll) {
    categoryTabs.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function renderDirectory() {
  const tools = state.tools
    .filter((tool) => state.activeCategory === "全部" || tool.category === state.activeCategory)
    .filter((tool) => matchesQuery(tool))
    .sort(sortTools);

  directoryGrid.innerHTML = "";
  if (!tools.length) {
    directoryGrid.innerHTML = `<article class="tool-card"><h3>${text("noResultsTitle")}</h3><p>${text("noResultsText")}</p></article>`;
    return;
  }

  for (const tool of tools) {
    const copy = toolCopy(tool);
    const card = document.createElement("article");
    card.className = "tool-card";
    card.innerHTML = `
      <div class="card-top">
        <div class="tool-logo" aria-hidden="true">
          <img src="${faviconUrl(tool.url)}" alt="" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';">
          <span>${escapeHtml(displayName(tool).slice(0, 2))}</span>
        </div>
        ${tool.featured ? `<span class="badge">${text("featured")}</span>` : ""}
      </div>
      <h3>${escapeHtml(displayName(tool))}</h3>
      <p>${escapeHtml(copy.summary)}</p>
      <div class="tags">${copy.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
      <a class="card-link" href="${tool.url}" target="_blank" rel="noopener">${text("visit")}</a>
    `;
    directoryGrid.append(card);
  }
}

function renderNews() {
  newsGrid.innerHTML = "";
  for (const item of state.news.slice(0, 10)) {
    const card = document.createElement("article");
    card.className = "news-card";
    card.innerHTML = `
      <span class="news-meta">${escapeHtml(item.source)} · ${formatDate(item.publishedAt)}</span>
      <h3><a href="${item.url}" target="_blank" rel="noopener">${escapeHtml(item.title)}</a></h3>
      <p>${escapeHtml(item.summary || text("readOriginal"))}</p>
    `;
    newsGrid.append(card);
  }
}

function matchesQuery(tool) {
  const enCopy = englishToolCopy[tool.name] || {};
  const haystack = [
    tool.name,
    tool.nameEn,
    tool.category,
    categoryLabels[tool.category],
    tool.summary,
    tool.summaryEn,
    enCopy.summary,
    tool.url,
    ...(tool.tags || []),
    ...(tool.tagsEn || []),
    ...(enCopy.tags || [])
  ].join(" ").toLowerCase();

  return haystack.includes(state.query);
}

function toolCopy(tool) {
  if (state.language === "en" && tool.summaryEn) {
    return {
      summary: tool.summaryEn,
      tags: tool.tagsEn || tool.tags
    };
  }

  if (state.language === "en" && englishToolCopy[tool.name]) {
    return englishToolCopy[tool.name];
  }
  return {
    summary: tool.summary,
    tags: tool.tags
  };
}

function sortTools(a, b) {
  if (state.sort === "name") {
    return a.name.localeCompare(b.name);
  }
  if (state.sort === "category") {
    return labelCategory(a.category).localeCompare(labelCategory(b.category)) || a.name.localeCompare(b.name);
  }
  return Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name);
}

function formatDate(value) {
  if (!value) return state.language === "en" ? "Pending" : "待更新";
  return new Intl.DateTimeFormat(state.language === "en" ? "en-US" : "zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(value));
}

function text(key) {
  return translations[state.language][key];
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function faviconUrl(value) {
  const domain = new URL(value).hostname;
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
}
