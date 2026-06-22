import { mkdir, readdir, writeFile } from "node:fs/promises";

const siteUrl = "https://kjc613.cn";
const today = new Date().toISOString().slice(0, 10);
const tools = JSON.parse(await readText("data/ai-tools.json"));
const indexableUtilityPages = ["about.html"];
const topicPages = [
  "best-ai-coding-tools.html",
  "free-ai-tools.html",
  "china-ai-tools.html",
  "ai-model-api-platforms.html",
  "comfyui-tools.html",
  "openrouter-guide.html"
];

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

const categoryEditorial = {
  "大模型与 API": {
    chooseZh: "先明确你是要直接聊天、接入 API、做多模态应用，还是搭建企业内部系统。个人用户更应关注网页端体验和可用模型，开发者要比较上下文长度、工具调用、价格、速率限制、数据保留政策和 SDK 文档，企业团队还要看权限管理、审计、合规与服务稳定性。",
    chooseEn: "Start by deciding whether you need chat access, API integration, multimodal features, or an internal enterprise system. Individual users should compare web experience and available models, while developers should review context length, tool calling, pricing, rate limits, data retention, and SDK documentation. Enterprise teams also need access control, auditability, compliance, and service reliability.",
    fitZh: "适合产品经理、开发者、创业团队、企业 IT 和需要把模型能力接入真实业务流程的用户。",
    fitEn: "Best for product managers, developers, startup teams, enterprise IT, and users integrating model capabilities into real workflows.",
    reviewZh: "不要只看模型名称。建议用自己的真实任务做小样本测试，包括中文理解、长文档、函数调用、图片输入、延迟和失败重试。涉及客户数据时，应优先阅读官方数据使用条款。",
    reviewEn: "Do not choose by model name alone. Test with your own real tasks, including Chinese understanding, long documents, function calling, image input, latency, and retry behavior. For customer data, read the provider's official data-use terms first."
  },
  "办公效率": {
    chooseZh: "办公类 AI 工具最重要的是能否嵌入你的日常文档、会议、邮件和知识库。优先比较导入格式、团队协作、权限边界、导出能力和是否支持中文场景，而不是只看生成文案是否流畅。",
    chooseEn: "For productivity tools, the key question is whether the tool fits into your documents, meetings, email, and knowledge base. Compare import formats, collaboration, permission boundaries, export options, and Chinese-language support instead of judging only by writing fluency.",
    fitZh: "适合需要提高写作、总结、会议记录、资料整理和团队协作效率的个人与团队。",
    fitEn: "Best for individuals and teams improving writing, summarization, meeting notes, research organization, and collaboration.",
    reviewZh: "如果工具会读取公司文档或会议内容，先确认管理员设置、数据保留、分享链接权限和删除机制。免费工具适合试用，不建议直接承载敏感资料。",
    reviewEn: "If a tool reads company documents or meetings, check admin settings, data retention, sharing permissions, and deletion controls. Free tools are useful for trials but should not immediately handle sensitive material."
  },
  "搜索问答": {
    chooseZh: "搜索问答工具要重点看来源引用质量、答案可追溯性、时效性和是否能区分事实与推断。适合用于初步调研，但重要结论仍应回到原始来源交叉验证。",
    chooseEn: "For AI search and Q&A, focus on citation quality, traceability, freshness, and whether the answer separates facts from inference. These tools are useful for initial research, but important conclusions should still be checked against primary sources.",
    fitZh: "适合资料查证、竞品研究、学习新主题、追踪技术动态和快速整理参考链接。",
    fitEn: "Best for fact-checking, competitor research, learning new topics, tracking technical updates, and gathering references quickly.",
    reviewZh: "警惕没有引用、引用不对应原文、或把旧信息当成最新信息的回答。对医疗、法律、金融等高风险问题，应只把搜索问答作为线索入口。",
    reviewEn: "Be cautious when answers lack citations, cite sources that do not support the claim, or present old information as current. For medical, legal, and financial topics, use AI search only as a starting point."
  },
  "图像与设计": {
    chooseZh: "图像设计工具要按输出目标选择：灵感草图、营销海报、品牌素材、商品图、角色设定和商用交付的要求完全不同。重点比较版权条款、分辨率、编辑控制、风格一致性和团队协作能力。",
    chooseEn: "Choose image and design tools by output goal: inspiration sketches, marketing posters, brand assets, product visuals, character design, and commercial delivery have different requirements. Compare licensing, resolution, editing control, style consistency, and collaboration.",
    fitZh: "适合设计师、运营、营销团队、创作者和需要快速生成视觉素材的中小团队。",
    fitEn: "Best for designers, operators, marketing teams, creators, and small teams producing visual assets quickly.",
    reviewZh: "商用前要确认生成内容授权、训练素材争议、人物肖像和品牌元素使用限制。涉及客户品牌时，建议保留提示词、版本和授权截图。",
    reviewEn: "Before commercial use, confirm output licensing, training-data concerns, likeness restrictions, and brand-element rules. For client work, keep prompts, versions, and license screenshots."
  },
  "视频与创意": {
    chooseZh: "视频类 AI 工具差异主要体现在时长、镜头控制、人物一致性、字幕/配音、商用授权和导出规格。短视频灵感与正式广告片所需的稳定性并不相同。",
    chooseEn: "AI video tools differ by clip length, camera control, character consistency, subtitles, dubbing, commercial license, and export formats. A short-form idea tool is not the same as a production tool for formal ads.",
    fitZh: "适合短视频团队、广告创意、教育内容、产品演示、数字人和多语言视频本地化。",
    fitEn: "Best for short-video teams, advertising concepts, education content, product demos, avatars, and multilingual video localization.",
    reviewZh: "正式发布前应人工检查画面变形、文字错误、人物授权、音乐版权和平台审核风险，避免直接把试验片当作最终交付。",
    reviewEn: "Before publishing, manually review visual artifacts, text errors, likeness rights, music licensing, and platform review risk. Do not treat experimental clips as final deliverables."
  },
  "模型与社区": {
    chooseZh: "模型社区适合发现开源模型、数据集、演示和实践案例。选择资源时要看许可证、下载量、维护频率、模型卡说明、依赖环境和社区反馈。",
    chooseEn: "Model communities are useful for discovering open models, datasets, demos, and examples. Review license, downloads, maintenance frequency, model cards, dependencies, and community feedback.",
    fitZh: "适合研究人员、开发者、学生、AI 产品团队和需要评估开源模型路线的用户。",
    fitEn: "Best for researchers, developers, students, AI product teams, and users evaluating open-model options.",
    reviewZh: "不要直接把未知模型用于生产或敏感数据。先在隔离环境测试安全性、性能、许可证和输出质量，再决定是否部署。",
    reviewEn: "Do not use unknown models directly in production or with sensitive data. Test safety, performance, license, and output quality in an isolated environment before deployment."
  },
  "开发者工具": {
    chooseZh: "开发者 AI 工具要看它能否理解项目上下文、是否支持多文件修改、如何处理终端命令、是否能生成测试，以及能不能在你的 IDE、仓库和团队流程里稳定使用。",
    chooseEn: "Developer AI tools should be evaluated by project-context understanding, multi-file editing, terminal-command handling, test generation, and fit with your IDE, repository, and team workflow.",
    fitZh: "适合程序员、技术负责人、独立开发者和需要提升代码阅读、修改、测试与交付效率的团队。",
    fitEn: "Best for programmers, tech leads, indie developers, and teams improving code reading, editing, testing, and delivery.",
    reviewZh: "接入仓库前应检查忽略文件、密钥、自动命令权限和代码审查流程。AI 生成代码仍需要测试、审查和版本控制记录。",
    reviewEn: "Before connecting a repository, check ignored files, secrets, command permissions, and review workflow. AI-generated code still needs tests, review, and version-control history."
  },
  "语音与音频": {
    chooseZh: "语音音频工具要按转写、配音、克隆、音乐生成或音频分析来选。重点比较语言覆盖、音色自然度、延迟、批量处理、版权授权和对敏感声音的限制。",
    chooseEn: "Choose voice and audio tools by task: transcription, dubbing, cloning, music generation, or audio analysis. Compare language coverage, naturalness, latency, batch processing, licensing, and restrictions on sensitive voices.",
    fitZh: "适合播客、短视频、课程制作、会议记录、客服质检和多语言内容团队。",
    fitEn: "Best for podcasts, short videos, courses, meeting notes, support QA, and multilingual content teams.",
    reviewZh: "涉及声音克隆和人物声音时，应取得授权并保留记录。公开发布前还要检查平台对 AI 语音标识和版权音乐的要求。",
    reviewEn: "For voice cloning and identifiable voices, obtain permission and keep records. Before publishing, check platform rules for AI-voice disclosure and copyrighted music."
  },
  "营销与内容": {
    chooseZh: "营销内容工具的价值不在于生成更多文字，而在于能否贴合品牌语气、受众画像、渠道格式和转化目标。建议用真实活动 brief 测试，而不是只看模板数量。",
    chooseEn: "Marketing AI tools are valuable when they fit brand voice, audience profile, channel format, and conversion goal, not when they merely generate more text. Test with real campaign briefs instead of counting templates.",
    fitZh: "适合增长团队、内容运营、电商卖家、销售支持和需要持续产出多渠道素材的团队。",
    fitEn: "Best for growth teams, content operations, ecommerce sellers, sales enablement, and teams producing multi-channel assets.",
    reviewZh: "发布前要人工检查事实、价格、承诺、合规词和品牌一致性。不要把未经核实的 AI 文案直接用于广告投放或销售页面。",
    reviewEn: "Before publishing, manually check facts, prices, claims, compliance wording, and brand consistency. Do not use unchecked AI copy directly in ads or sales pages."
  },
  "智能体与自动化": {
    chooseZh: "智能体工具应从任务边界开始评估：它能连接哪些应用、是否需要人工审批、失败后如何回滚、日志是否清晰、能否限制权限。越靠近真实业务，越要重视可控性。",
    chooseEn: "Evaluate agent tools by task boundaries: connected apps, human approval, rollback behavior, logs, and permission limits. The closer the agent is to real operations, the more control matters.",
    fitZh: "适合运营自动化、销售流程、内部助手、数据处理、浏览器任务和跨工具工作流。",
    fitEn: "Best for operations automation, sales workflows, internal assistants, data processing, browser tasks, and cross-tool workflows.",
    reviewZh: "不要一开始就给智能体高权限账号。先用测试账号、低风险任务和明确审批点验证，再逐步接入核心流程。",
    reviewEn: "Do not start with high-privilege accounts. Validate with test accounts, low-risk tasks, and explicit approval points before connecting core workflows."
  },
  "AI 应用构建": {
    chooseZh: "AI 应用构建平台适合快速搭建聊天应用、RAG、内部工具和原型。选择时要看数据源连接、部署方式、权限、观测、模型切换和后续迁移成本。",
    chooseEn: "AI app builders are useful for chat apps, RAG, internal tools, and prototypes. Compare data-source connectors, deployment, permissions, observability, model switching, and migration cost.",
    fitZh: "适合产品原型、企业内部知识库、客服助手、低代码团队和希望快速验证 AI 应用的创业者。",
    fitEn: "Best for product prototypes, internal knowledge bases, support assistants, low-code teams, and founders validating AI apps quickly.",
    reviewZh: "低代码并不等于低风险。上线前要检查数据权限、回答边界、日志、用户反馈和人工兜底流程。",
    reviewEn: "Low-code does not mean low-risk. Before launch, check data permissions, answer boundaries, logs, user feedback, and human fallback."
  },
  "知识库与检索": {
    chooseZh: "知识库与检索工具的核心是资料接入、切分、权限继承、召回质量和答案引用。只看“能聊天”不够，要测试它是否能准确找到原文依据。",
    chooseEn: "Knowledge and retrieval tools depend on ingestion, chunking, permission inheritance, retrieval quality, and answer citations. Chat alone is not enough; test whether the system finds the right source evidence.",
    fitZh: "适合企业知识库、客服资料库、研发文档、法务条款库和需要基于内部资料问答的团队。",
    fitEn: "Best for enterprise knowledge bases, support libraries, engineering docs, legal repositories, and teams answering from internal material.",
    reviewZh: "上线前应准备标准问题集，检查召回准确率、权限泄露、过期文档和无答案时的拒答能力。",
    reviewEn: "Before launch, prepare a benchmark question set and check retrieval accuracy, permission leakage, stale documents, and refusal behavior when no answer exists."
  },
  "数据与企业 AI": {
    chooseZh: "企业 AI 和数据平台要重点评估安全、治理、评测、权限、审计和与现有数据栈的连接。不要只从演示效果判断，要看能否稳定进入生产流程。",
    chooseEn: "Enterprise AI and data platforms should be evaluated by security, governance, evaluation, permissions, auditability, and integration with the existing data stack. Do not judge only by demos; check production readiness.",
    fitZh: "适合数据团队、机器学习平台团队、企业 IT、风控、运营分析和需要治理模型生命周期的组织。",
    fitEn: "Best for data teams, ML platform teams, enterprise IT, risk control, operations analytics, and organizations governing model lifecycles.",
    reviewZh: "采购或上线前建议准备安全问卷、数据流图、权限模型、SLA 需求和成本测算，避免后期迁移困难。",
    reviewEn: "Before procurement or launch, prepare a security questionnaire, data-flow map, permission model, SLA requirements, and cost estimate to avoid difficult migrations later."
  },
  "生成工作流": {
    chooseZh: "生成工作流工具适合需要可复现、可控和批量化创作的人。重点比较节点生态、模型管理、参数记录、队列、显卡资源和团队协作方式。",
    chooseEn: "Generation workflow tools are for users who need reproducible, controllable, and batch creative production. Compare node ecosystem, model management, parameter records, queues, GPU resources, and collaboration.",
    fitZh: "适合视觉创作者、ComfyUI 用户、工作室、模型测试人员和需要稳定输出图像/视频资产的团队。",
    fitEn: "Best for visual creators, ComfyUI users, studios, model testers, and teams producing image or video assets reliably.",
    reviewZh: "复杂工作流要记录模型版本、节点依赖、输入素材和参数。没有复现记录的工作流，很难用于商业交付或团队协作。",
    reviewEn: "For complex workflows, record model versions, node dependencies, input assets, and parameters. Workflows without reproduction records are hard to use for commercial delivery or team collaboration."
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
const indexableCategoryFiles = [];

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
  if (categoryTools.length >= 5) {
    indexableCategoryFiles.push(`${meta.slug}.html`);
  }
}

const categoryFiles = (await readdir("categories"))
  .filter((file) => file.endsWith(".html"))
  .sort();

await writeFile("sitemap.xml", renderSitemap(indexableCategoryFiles));
await writeFile("sitemap.html", renderHtmlSitemap(categoryFiles));
await writeFile("llms.txt", renderLlmsText(categoryFiles));

console.log(`Built ${categoryFiles.length} category pages, sitemap.xml, sitemap.html, and llms.txt.`);

async function readText(path) {
  const { readFile } = await import("node:fs/promises");
  return readFile(path, "utf8");
}

function renderCategoryPage(category, meta, categoryTools) {
  const isIndexable = categoryTools.length >= 5;
  const categoryLabel = categoryToolLabel(category);
  const zhTitle = `${categoryLabel}推荐与官网入口：${categoryTools.length} 个 AI 工具怎么选`;
  const enTitle = `${meta.en} AI Tools: ${categoryTools.length} Official Links and Selection Guide`;
  const zhDescription = `${categoryLabel}怎么选？AI Compass 整理 ${categoryTools.length} 个官网入口、适用场景、选择指标、商用和安全注意事项，帮助你快速找到可靠工具。`;
  const enDescription = `How to choose ${meta.en} AI tools. AI Compass curates ${categoryTools.length} official links, use cases, selection criteria, and safety notes for reliable tool discovery.`;
  const pageUrl = `${siteUrl}/categories/${meta.slug}.html`;
  const editorial = categoryEditorial[category];
  if (!editorial) {
    throw new Error(`Missing category editorial content for ${category}`);
  }
  const faqItems = buildCategoryFaq(category, categoryLabel, meta, editorial, categoryTools.length);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
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
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.questionEn,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answerEn
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "AI Compass",
            item: `${siteUrl}/`
          },
          {
            "@type": "ListItem",
            position: 2,
            name: categoryLabel,
            item: pageUrl
          }
        ]
      }
    ]
  };

  const guideArticles = [
    {
      zhTitle: "怎么选择这一类 AI 工具",
      enTitle: "How to choose tools in this category",
      zhBody: editorial.chooseZh,
      enBody: editorial.chooseEn
    },
    {
      zhTitle: "适合哪些用户",
      enTitle: "Who this category is for",
      zhBody: editorial.fitZh,
      enBody: editorial.fitEn
    },
    {
      zhTitle: "使用前的复核重点",
      enTitle: "What to review before use",
      zhBody: editorial.reviewZh,
      enBody: editorial.reviewEn
    },
  ];

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(zhTitle)} - AI Compass</title>
  <meta name="description" content="${escapeHtml(zhDescription)}">
  <meta name="robots" content="${isIndexable ? "index,follow,max-image-preview:large" : "noindex,follow"}">
  <link rel="canonical" href="${pageUrl}">
  <link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
  <link rel="manifest" href="../site.webmanifest">
  ${isIndexable ? `<meta name="google-adsense-account" content="ca-pub-5859243800721473">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5859243800721473" crossorigin="anonymous"></script>` : ""}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="AI Compass">
  <meta property="og:title" content="${escapeHtml(`${zhTitle} - AI Compass`)}">
  <meta property="og:description" content="${escapeHtml(zhDescription)}">
  <meta property="og:url" content="${pageUrl}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${escapeHtml(enTitle)}">
  <meta name="twitter:description" content="${escapeHtml(enDescription)}">
  <link rel="stylesheet" href="../assets/styles.css?v=9">
  <script type="application/ld+json">${jsonScript(schema)}</script>
</head>
<body data-title-zh="${escapeHtml(`${zhTitle} - AI Compass`)}" data-title-en="${escapeHtml(`${enTitle} - AI Compass`)}" data-description-zh="${escapeHtml(zhDescription)}" data-description-en="${escapeHtml(enDescription)}">
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
      <h1 data-seo-zh="${escapeHtml(`${categoryLabel}推荐与官网入口`)}" data-seo-en="${escapeHtml(`${meta.en} AI Tools and Official Links`)}">${escapeHtml(categoryLabel)}推荐与官网入口</h1>
      <p data-seo-zh="${escapeHtml(meta.zhDescription)}" data-seo-en="${escapeHtml(meta.enDescription)}">${escapeHtml(meta.zhDescription)}</p>
    </div>
  </header>

  <main>

    <section class="section category-page" aria-labelledby="category-tools-title">
      <div class="section-heading">
        <p class="eyebrow" data-seo-zh="Official links" data-seo-en="Official links">Official links</p>
        <h2 id="category-tools-title" data-seo-zh="${escapeHtml(`${categoryLabel}目录`)}" data-seo-en="${escapeHtml(meta.en)} Directory">${escapeHtml(categoryLabel)}目录</h2>
        <p data-seo-zh="优先整理官网入口。点击任意卡片会直接打开对应厂商或工具官网，请核对浏览器地址栏，避免进入仿冒网站。" data-seo-en="Official entries are prioritized. Click any card to open the vendor or tool website, and always verify the browser address bar to avoid impersonation sites.">优先整理官网入口。点击任意卡片会直接打开对应厂商或工具官网，请核对浏览器地址栏，避免进入仿冒网站。</p>
      </div>
      <div class="category-tabs" aria-label="AI tool categories">
${renderCategoryTabs(category)}
      </div>

      <div class="editorial-grid">
${guideArticles.map(renderEditorialArticle).join("\n")}
      </div>

      <div class="directory-grid">
${categoryTools.map(renderToolCard).join("\n")}
      </div>

      <section class="faq-section" aria-labelledby="category-faq-title">
        <div class="section-heading compact">
          <p class="eyebrow" data-seo-zh="FAQ" data-seo-en="FAQ">FAQ</p>
          <h2 id="category-faq-title" data-seo-zh="${escapeAttribute(`${categoryLabel}常见问题`)}" data-seo-en="${escapeAttribute(meta.en)} FAQ">${escapeHtml(categoryLabel)}常见问题</h2>
        </div>
        <div class="faq-list">
${faqItems.map(renderFaqItem).join("\n")}
        </div>
      </section>
    </section>
  </main>

  <footer class="footer">
    <span>AI Compass</span>
    <nav class="footer-links" aria-label="Footer">
      <a href="../about.html" data-seo-zh="关于" data-seo-en="About">关于</a>
      <a href="../privacy.html" data-seo-zh="隐私" data-seo-en="Privacy">隐私</a>
      <a href="../terms.html" data-seo-zh="条款" data-seo-en="Terms">条款</a>
      <a href="../contact.html" data-seo-zh="联系" data-seo-en="Contact">联系</a>
      <a href="../sitemap.html" data-seo-zh="站点地图" data-seo-en="Sitemap">站点地图</a>
    </nav>
  </footer>

  <script src="../assets/seo-i18n.js?v=9"></script>
</body>
</html>
`;
}

function categoryToolLabel(category) {
  if (category.endsWith("工具")) {
    return category;
  }

  if (category.endsWith("AI") || category.includes("API")) {
    return `${category} 工具`;
  }

  return `${category} AI 工具`;
}

function renderEditorialArticle(article) {
  return `        <article class="editorial-card">
          <h3 data-seo-zh="${escapeAttribute(article.zhTitle)}" data-seo-en="${escapeAttribute(article.enTitle)}">${escapeHtml(article.zhTitle)}</h3>
          <p data-seo-zh="${escapeAttribute(article.zhBody)}" data-seo-en="${escapeAttribute(article.enBody)}">${escapeHtml(article.zhBody)}</p>
        </article>`;
}

function buildCategoryFaq(category, categoryLabel, meta, editorial, count) {
  return [
    {
      questionZh: `${categoryLabel}应该先看哪些指标？`,
      questionEn: `What should I check first when choosing ${meta.en} tools?`,
      answerZh: editorial.chooseZh,
      answerEn: editorial.chooseEn
    },
    {
      questionZh: `AI Compass 为什么优先放官网入口？`,
      questionEn: "Why does AI Compass prioritize official links?",
      answerZh: `这个分类当前整理了 ${count} 个入口。AI 工具搜索结果里常见仿冒域名、镜像站和诱导下载页，优先使用官网链接可以降低登录、付款或下载时进入错误页面的风险。`,
      answerEn: `This category currently lists ${count} entries. AI tool search results often include impersonation domains, mirrors, and misleading download pages, so official links reduce the risk of logging in, paying, or downloading from the wrong site.`
    },
    {
      questionZh: `这些工具是否都适合商用？`,
      questionEn: "Are all listed tools suitable for commercial use?",
      answerZh: "不一定。不同工具的免费额度、商用授权、数据使用政策和地区可用性都可能不同。正式用于客户项目、广告投放或企业流程前，应阅读对应厂商的官方条款。",
      answerEn: "Not necessarily. Free tiers, commercial licenses, data-use policies, and regional availability differ by vendor. Before using a tool for client projects, ads, or enterprise workflows, read the vendor's official terms."
    }
  ];
}

function renderFaqItem(item) {
  return `          <details>
            <summary data-seo-zh="${escapeAttribute(item.questionZh)}" data-seo-en="${escapeAttribute(item.questionEn)}">${escapeHtml(item.questionZh)}</summary>
            <p data-seo-zh="${escapeAttribute(item.answerZh)}" data-seo-en="${escapeAttribute(item.answerEn)}">${escapeHtml(item.answerZh)}</p>
          </details>`;
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
    ...indexableUtilityPages.map((file) => ({
      loc: `${siteUrl}/${file}`,
      changefreq: "monthly",
      priority: "0.5"
    })),
    ...topicPages.map((file) => ({
      loc: `${siteUrl}/topics/${file}`,
      changefreq: "weekly",
      priority: "0.8"
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

function renderHtmlSitemap(files) {
  const topicLinks = topicPages.map((file) => {
    const title = topicTitle(file);
    return `          <li><a href="topics/${file}">${escapeHtml(title.zh)}</a><span>${escapeHtml(title.desc)}</span></li>`;
  }).join("\n");

  const categoryLinks = files.map((file) => {
    const category = categoryFromFile(file);
    const meta = categoryMeta[category];
    return `          <li><a href="categories/${file}">${escapeHtml(categoryToolLabel(category))}</a><span>${escapeHtml(meta.zhDescription)}</span></li>`;
  }).join("\n");

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>站点地图 - AI Compass</title>
  <meta name="description" content="AI Compass 站点地图，汇总首页、每日资讯、AI 工具专题指南、分类目录和重要说明页面，方便用户和搜索引擎发现全部页面。">
  <meta name="robots" content="noindex,follow">
  <link rel="canonical" href="${siteUrl}/sitemap.html">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="manifest" href="site.webmanifest">
  <link rel="stylesheet" href="assets/styles.css?v=11">
</head>
<body data-title-zh="站点地图 - AI Compass" data-title-en="Sitemap - AI Compass" data-description-zh="AI Compass 站点地图，汇总首页、每日资讯、AI 工具专题指南、分类目录和重要说明页面。" data-description-en="AI Compass sitemap with homepage, news, AI tool guides, category directories, and important site pages.">
  <header class="subpage-header">
    <nav class="topbar" aria-label="主导航">
      <a class="brand" href="index.html">
        <span class="brand-mark" aria-hidden="true">AI</span>
        <span>AI Compass</span>
      </a>
      <div class="nav-links">
        <a href="index.html#directory" data-seo-zh="导航" data-seo-en="Directory">导航</a>
        <a href="news.html" data-seo-zh="资讯" data-seo-en="News">资讯</a>
        <button class="language-toggle" id="languageToggle" type="button" aria-label="Switch language">EN</button>
      </div>
    </nav>
    <div class="subpage-hero">
      <p class="eyebrow" data-seo-zh="Sitemap" data-seo-en="Sitemap">Sitemap</p>
      <h1 data-seo-zh="AI Compass 站点地图" data-seo-en="AI Compass Sitemap">AI Compass 站点地图</h1>
      <p data-seo-zh="这里集中列出 AI Compass 的主要页面，方便用户按主题浏览，也帮助搜索引擎更稳定地发现分类页和专题页。" data-seo-en="This page lists the main AI Compass pages for users and helps search engines discover category and guide pages more reliably.">这里集中列出 AI Compass 的主要页面，方便用户按主题浏览，也帮助搜索引擎更稳定地发现分类页和专题页。</p>
    </div>
  </header>

  <main>
    <section class="section sitemap-page">
      <div class="sitemap-group">
        <h2 data-seo-zh="核心页面" data-seo-en="Core Pages">核心页面</h2>
        <ul class="sitemap-link-list">
          <li><a href="index.html" data-seo-zh="首页" data-seo-en="Home">首页</a><span data-seo-zh="AI 工具导航、编辑推荐和分类入口。" data-seo-en="AI tool directory, editor picks, and category entry points.">AI 工具导航、编辑推荐和分类入口。</span></li>
          <li><a href="news.html" data-seo-zh="每日 AI 资讯" data-seo-en="Daily AI News">每日 AI 资讯</a><span data-seo-zh="跟踪 AI 产品、模型和行业新闻。" data-seo-en="AI product, model, and industry news tracking.">跟踪 AI 产品、模型和行业新闻。</span></li>
          <li><a href="about.html" data-seo-zh="关于本站" data-seo-en="About">关于本站</a><span data-seo-zh="站点定位、内容来源和编辑原则。" data-seo-en="Site focus, sources, and editorial principles.">站点定位、内容来源和编辑原则。</span></li>
          <li><a href="privacy.html" data-seo-zh="隐私政策" data-seo-en="Privacy Policy">隐私政策</a><span data-seo-zh="Cookie、广告和第三方链接说明。" data-seo-en="Cookies, advertising, and third-party link notes.">Cookie、广告和第三方链接说明。</span></li>
        </ul>
      </div>

      <div class="sitemap-group">
        <h2 data-seo-zh="专题指南" data-seo-en="Topic Guides">专题指南</h2>
        <ul class="sitemap-link-list">
${topicLinks}
        </ul>
      </div>

      <div class="sitemap-group">
        <h2 data-seo-zh="AI 工具分类" data-seo-en="AI Tool Categories">AI 工具分类</h2>
        <ul class="sitemap-link-list">
${categoryLinks}
        </ul>
      </div>
    </section>
  </main>

  <footer class="footer">
    <span>AI Compass</span>
    <nav class="footer-links" aria-label="Footer">
      <a href="about.html" data-seo-zh="关于" data-seo-en="About">关于</a>
      <a href="privacy.html" data-seo-zh="隐私" data-seo-en="Privacy">隐私</a>
      <a href="terms.html" data-seo-zh="条款" data-seo-en="Terms">条款</a>
      <a href="contact.html" data-seo-zh="联系" data-seo-en="Contact">联系</a>
      <a href="sitemap.html" data-seo-zh="站点地图" data-seo-en="Sitemap">站点地图</a>
    </nav>
  </footer>

  <script src="assets/seo-i18n.js?v=11"></script>
</body>
</html>
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

Important guide pages:
${topicPages.map((file) => `- ${siteUrl}/topics/${file}`).join("\n")}

Important category pages:
${files.map((file) => `- ${siteUrl}/categories/${file}`).join("\n")}
`;
}

function categoryFromFile(file) {
  const slug = file.replace(/\.html$/, "");
  const match = Object.entries(categoryMeta).find(([, meta]) => meta.slug === slug);
  if (!match) {
    throw new Error(`Missing category for ${file}`);
  }

  return match[0];
}

function topicTitle(file) {
  const topics = {
    "best-ai-coding-tools.html": {
      zh: "AI 编程工具推荐：Cursor、Trae、Copilot 怎么选",
      desc: "对比开发者常用 AI IDE、代码助手和编程智能体。"
    },
    "free-ai-tools.html": {
      zh: "免费 AI 工具推荐",
      desc: "整理可先试用的对话、搜索、绘图、编程和本地模型工具。"
    },
    "china-ai-tools.html": {
      zh: "国内 AI 工具入口",
      desc: "通义千问、文心一言、Kimi、DeepSeek 等国内常用工具。"
    },
    "ai-model-api-platforms.html": {
      zh: "AI 模型 API 平台怎么选",
      desc: "OpenAI、Claude、OpenRouter、DeepSeek 等模型 API 对比。"
    },
    "comfyui-tools.html": {
      zh: "ComfyUI 工具与 AI 绘图工作流",
      desc: "节点式生成、云 GPU、Stable Diffusion 和工作流工具。"
    },
    "openrouter-guide.html": {
      zh: "OpenRouter 官网入口与使用指南",
      desc: "多模型 API 路由、官网入口和生产环境注意事项。"
    }
  };

  return topics[file] || { zh: file.replace(".html", ""), desc: "AI Compass 专题指南。" };
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
