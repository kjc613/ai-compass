import { mkdir, writeFile } from "node:fs/promises";

const siteUrl = "https://kjc613.cn";
const today = new Date().toISOString().slice(0, 10);

const topics = [
  {
    slug: "best-ai-coding-tools",
    title: "AI 编程工具推荐：Cursor、Trae、Copilot 怎么选",
    titleEn: "Best AI Coding Tools",
    description: "Cursor、Trae、GitHub Copilot、Codex、Cline、Roo Code 怎么选？按代码补全、多文件修改、智能体能力、官网入口和适用场景对比 AI 编程工具。",
    descriptionEn: "Compare Cursor, Trae, GitHub Copilot, Codex, Cline, Roo Code, and other AI coding tools by real development tasks.",
    keywords: "AI编程工具,AI IDE,Cursor,Trae,Codex,GitHub Copilot,Cline,Roo Code",
    intent: "适合搜索“AI 编程工具推荐”“Trae 和 Cursor 区别”“Codex 官网”“AI IDE 怎么选”的用户。",
    intentEn: "For users searching for AI coding tool recommendations, Trae vs Cursor, Codex official link, or how to choose an AI IDE.",
    tools: [
      ["Cursor", "适合以代码库问答、多文件修改、重构和 AI IDE 为核心的开发工作流。", "AI IDE", "https://www.cursor.com/"],
      ["Trae", "适合希望尝试字节系 AI 编程环境、项目理解和开发协作的用户。", "AI IDE", "https://www.trae.ai/"],
      ["GitHub Copilot", "适合已经深度使用 GitHub、VS Code 或 JetBrains 的开发者。", "Coding Assistant", "https://github.com/features/copilot"],
      ["Codex", "适合关注 OpenAI 编程智能体、代码任务执行和开发自动化的用户。", "Coding Agent", "https://openai.com/codex/"],
      ["Cline", "适合在 VS Code 中使用智能体处理文件修改、终端命令和项目任务。", "VS Code Agent", "https://cline.bot/"],
      ["Roo Code", "适合需要多模式智能体、代码编辑和本地工作流控制的开发者。", "Coding Agent", "https://roocode.com/"]
    ],
    sections: [
      ["怎么选", "如果你需要一个完整 AI IDE，优先看 Cursor 和 Trae；如果你主要在现有编辑器里补全和问答，优先看 GitHub Copilot；如果你希望让 AI 执行更完整的开发任务，可以关注 Codex、Cline 和 Roo Code。", "How to choose", "If you need a full AI IDE, start with Cursor and Trae. If you mostly want completion and Q&A inside an existing editor, start with GitHub Copilot. If you want AI to execute larger development tasks, look at Codex, Cline, and Roo Code."],
      ["避坑提醒", "AI 编程工具经常涉及代码仓库、终端命令和密钥文件。使用前应检查权限、忽略敏感文件，并确认打开的是官方域名。", "Safety note", "AI coding tools often touch repositories, terminal commands, and secret files. Check permissions, exclude sensitive files, and confirm that you are using the official domain before connecting a project."],
      ["用真实项目测试", "不要只用一道算法题判断工具好坏。更有效的方法是准备一个包含前端、接口、测试和文档的小型仓库，让工具完成定位缺陷、跨文件修改、补测试和解释变更四个任务，再比较正确率、修改范围和人工返工时间。", "Test with a real project", "Do not judge a coding tool with one algorithm problem. Use a small repository containing frontend code, an API, tests, and documentation. Ask each tool to locate a defect, make a cross-file change, add tests, and explain the result, then compare correctness, edit scope, and rework time."],
      ["团队采用前要检查", "团队采购时还要确认账号管理、代码是否用于训练、模型和地区可用性、审计记录、费用上限以及离职成员权限回收。个人体验优秀并不代表适合企业代码库。", "Checks before team adoption", "Before team adoption, review account administration, whether code is used for training, model and regional availability, audit logs, spending limits, and access removal for departing members. A strong personal experience does not automatically make a tool suitable for company repositories."],
      ["建议的试用周期", "可以用一周做基线：先记录没有 AI 时完成同类任务的时间，再让候选工具参与日常需求，统计接受的建议比例、测试通过率、回滚次数和节省时间。只有可重复的数据才能判断工具是否真正提高效率。", "Suggested trial period", "Use a one-week baseline. Record how long similar tasks take without AI, then use each candidate in daily work and track accepted suggestions, test pass rate, rollbacks, and time saved. Repeatable measurements are more useful than first impressions."]
    ]
  },
  {
    slug: "free-ai-tools",
    title: "免费 AI 工具推荐：可先试用的 AI 网站入口",
    titleEn: "Free AI Tools Directory",
    description: "整理免费或有免费额度的 AI 工具官网入口，覆盖 ChatGPT、Claude、Perplexity、Kimi、Ollama、ComfyUI 等对话、搜索、绘图和编程场景。",
    descriptionEn: "A practical directory of free or free-tier AI tools across chat, search, image, coding, local models, and creative workflows.",
    keywords: "免费AI工具,免费AI网站,免费AI导航,免费ChatGPT替代,免费AI绘图",
    intent: "适合搜索“免费 AI 工具”“免费 AI 网站”“免费 AI 绘图工具”“免费 AI 编程工具”的用户。",
    intentEn: "For users searching for free AI tools, free AI websites, free AI image tools, or free AI coding tools.",
    tools: [
      ["ChatGPT", "通用 AI 助手入口，适合问答、写作、文件理解和日常效率任务。", "AI Assistant", "https://chatgpt.com/"],
      ["Claude", "适合长文阅读、写作、分析和知识工作。", "AI Assistant", "https://claude.ai/"],
      ["Perplexity", "适合带来源引用的搜索问答和资料查证。", "AI Search", "https://www.perplexity.ai/"],
      ["Kimi", "适合中文长文档、资料整理和搜索问答。", "Chinese AI", "https://kimi.moonshot.cn/"],
      ["Ollama", "适合本地运行开源模型，重视隐私和离线实验的用户。", "Local Models", "https://ollama.com/"],
      ["ComfyUI", "适合本地或云端节点式图像生成工作流。", "Image Workflow", "https://www.comfy.org/"]
    ],
    sections: [
      ["免费不等于无限制", "多数免费工具会限制模型、速度、次数、图片数量或上下文长度。选择时要看清楚免费额度是否满足你的任务。", "Free does not mean unlimited", "Most free tools limit models, speed, usage count, image generation, or context length. Check whether the free tier is enough for your task before committing to a workflow."],
      ["优先使用官方入口", "搜索免费工具时最容易进入仿冒站、镜像站和诱导下载页。建议从本站卡片或浏览器地址栏核对官网域名。", "Use official links first", "Search results for free tools often include impersonation sites, mirrors, and misleading download pages. Use the cards here and verify the browser address bar before signing in."],
      ["先按任务选择", "通用对话、资料检索、图像生成、编程辅助和本地模型的免费额度不可直接横向比较。先写下每周最常做的三个任务，再判断免费限制会不会在关键步骤中断工作流。", "Choose by task first", "Free allowances for chat, research, image generation, coding, and local models are not directly comparable. List your three most frequent weekly tasks, then check whether free-tier limits interrupt critical steps."],
      ["隐私成本也要计算", "免费服务可能通过更严格的使用限制、较少的管理能力或不同的数据处理方式降低成本。上传合同、客户资料、源代码和人物照片前，应查看隐私设置和数据保留说明；敏感任务可以优先考虑本地工具。", "Include privacy in the cost", "Free services may reduce cost through stricter limits, fewer administrative controls, or different data handling. Before uploading contracts, customer data, source code, or personal photos, review privacy settings and retention terms. Local tools may be preferable for sensitive tasks."],
      ["保留迁移出口", "不要把所有提示词、知识库和项目文件锁在一个免费产品中。优先选择可以导出对话、文档或标准格式结果的工具，并定期保留本地副本，避免免费政策变化后无法迁移。", "Keep an exit path", "Do not lock all prompts, knowledge, and project files into one free product. Prefer tools that export chats, documents, or standard-format results, and keep local copies so policy changes do not block migration."]
    ]
  },
  {
    slug: "china-ai-tools",
    title: "国内 AI 工具入口：通义千问、文心一言、Kimi、DeepSeek",
    titleEn: "China AI Tools Directory",
    description: "国内 AI 工具官网入口汇总，对比通义千问、文心一言、Kimi、DeepSeek、智谱清言、豆包的适用场景、中文体验和安全提醒。",
    descriptionEn: "A directory of commonly used Chinese AI assistants, model platforms, and content tools including Qwen, ERNIE Bot, Kimi, DeepSeek, and Zhipu.",
    keywords: "国内AI工具,通义千问,文心一言,Kimi,DeepSeek,智谱清言,国产AI",
    intent: "适合搜索“国内 AI 工具”“国产 AI 大模型入口”“通义千问官网”“文心一言官网”的用户。",
    intentEn: "For users searching for Chinese AI tools, domestic model entrances, Qwen official link, or ERNIE Bot official link.",
    tools: [
      ["通义千问", "阿里云通义系列 AI 助手与模型入口，适合中文问答、办公和多模态任务。", "Chinese LLM", "https://tongyi.aliyun.com/"],
      ["文心一言", "百度文心系列 AI 助手入口，适合中文搜索、写作和办公场景。", "Chinese LLM", "https://yiyan.baidu.com/"],
      ["Kimi", "Moonshot AI 的中文长上下文助手，适合长文档和资料整理。", "Long Context", "https://kimi.moonshot.cn/"],
      ["DeepSeek", "提供对话、推理和 API 服务，适合开发者和中文场景。", "LLM API", "https://www.deepseek.com/"],
      ["智谱清言", "智谱 AI 的通用助手入口，适合中文知识工作和办公任务。", "Chinese LLM", "https://chatglm.cn/"],
      ["豆包", "字节跳动 AI 助手，覆盖对话、写作、图像和日常效率场景。", "AI Assistant", "https://www.doubao.com/"]
    ],
    sections: [
      ["选择重点", "国内 AI 工具的优势通常在中文理解、国内访问稳定性、办公生态和本地化场景。开发者还应重点比较 API 文档、价格和模型能力。", "Selection focus", "Chinese AI tools are often strong in Chinese understanding, domestic access stability, office ecosystems, and localized scenarios. Developers should also compare API documentation, pricing, and model capabilities."],
      ["官网核对", "国内 AI 产品常见入口较多，使用前应确认是否为厂商官方域名，避免进入仿冒登录页。", "Verify the official site", "Chinese AI products may have multiple entry points. Confirm that you are on a vendor-owned official domain before logging in or downloading anything."],
      ["中文任务怎么测", "可以准备一组包含长文摘要、表格提取、政策问答、口语改写和多轮追问的中文材料，观察工具是否遗漏条件、混淆专有名词或编造来源。单次回答流畅并不能代表复杂中文任务可靠。", "How to test Chinese tasks", "Prepare Chinese materials covering long-document summaries, table extraction, policy Q&A, conversational rewriting, and multi-turn follow-ups. Check for missed constraints, confused proper nouns, and invented sources. One fluent answer does not prove reliability on complex Chinese tasks."],
      ["个人版与 API 分开评估", "网页助手的体验、会员权益和开发者 API 是不同产品路线。个人用户关注文件上传、搜索和办公体验；开发团队则要单独比较鉴权、并发、限速、日志、发票和服务稳定性。", "Evaluate consumer and API products separately", "Web assistants, subscriptions, and developer APIs are different product tracks. Individuals should focus on file upload, search, and office workflows, while development teams should separately compare authentication, concurrency, rate limits, logs, invoicing, and reliability."],
      ["企业使用的边界", "团队接入前应明确哪些资料允许上传、谁能创建共享链接、管理员能否删除数据，以及员工离职后如何回收权限。涉及客户和内部经营数据时，先走企业安全审查。", "Enterprise boundaries", "Before team use, define what may be uploaded, who may create shared links, whether administrators can delete data, and how access is revoked when staff leave. Customer and internal business data should go through security review first."]
    ]
  },
  {
    slug: "ai-model-api-platforms",
    title: "AI 模型 API 平台怎么选：OpenAI、Claude、OpenRouter 对比",
    titleEn: "AI Model API Platforms",
    description: "对比 OpenAI、Anthropic Claude、Google AI、OpenRouter、DeepSeek、SiliconFlow 等模型 API 平台的官网入口、适用场景、价格和生产注意事项。",
    descriptionEn: "Compare OpenAI, Anthropic, Google AI, OpenRouter, DeepSeek, Volcengine Ark, SiliconFlow, and other model API platforms.",
    keywords: "AI API平台,模型API,OpenRouter,OpenAI API,DeepSeek API,SiliconFlow,火山方舟",
    intent: "适合搜索“AI 模型 API 平台”“OpenRouter 怎么用”“模型 API 怎么选”“便宜的大模型 API”的用户。",
    intentEn: "For users searching for AI model API platforms, OpenRouter usage, model API selection, or lower-cost model APIs.",
    tools: [
      ["OpenAI", "适合需要主流模型、工具生态、语音和多模态能力的产品。", "Model API", "https://openai.com/"],
      ["Anthropic", "适合长文档、知识工作、企业安全和 Claude 系列模型接入。", "Model API", "https://www.anthropic.com/"],
      ["Google AI", "适合 Gemini、多模态、搜索生态和 Google 开发者工具链。", "Model API", "https://ai.google/"],
      ["OpenRouter", "适合统一访问多家模型、比较价格和快速切换模型路线。", "Model Router", "https://openrouter.ai/"],
      ["DeepSeek", "适合关注推理模型、中文场景和 API 成本的开发者。", "Model API", "https://www.deepseek.com/"],
      ["SiliconFlow", "适合寻找国内可用模型服务、开源模型 API 和推理平台的用户。", "Inference API", "https://siliconflow.cn/"]
    ],
    sections: [
      ["比较维度", "选择 API 平台时应同时比较模型能力、上下文长度、价格、速率限制、工具调用、数据政策、SDK 文档和国内访问稳定性。", "Comparison dimensions", "When choosing an API platform, compare model quality, context length, pricing, rate limits, tool calling, data policy, SDK documentation, and access stability."],
      ["路由平台适合谁", "OpenRouter 这类模型路由平台适合测试和切换多模型；正式生产环境仍要评估稳定性、账单、可观测性和合规要求。", "Who model routers fit", "Model routing platforms such as OpenRouter are useful for testing and switching models. Production systems still need evaluation around stability, billing, observability, and compliance."],
      ["先建立评测集", "上线前应从真实业务中抽取代表性问题，覆盖正常输入、长文本、缺少信息、工具调用失败和敏感请求。固定提示词、模型参数和判分规则后再比较平台，避免被单个演示样例误导。", "Build an evaluation set first", "Before launch, sample representative tasks from real workflows, including normal inputs, long text, missing information, tool failures, and sensitive requests. Fix prompts, model settings, and scoring rules before comparing providers."],
      ["估算完整成本", "账单不只有输入输出 Token。还要计算重试、缓存、向量检索、图片或音频、日志存储、流量峰值和人工审核成本。低单价模型如果错误率高，整体成本可能更高。", "Estimate total cost", "Bills include more than input and output tokens. Account for retries, caching, retrieval, images or audio, log storage, traffic peaks, and human review. A lower-priced model may cost more overall if its error rate is high."],
      ["设计失败回退", "生产系统应为超时、限速、模型下线和供应商故障准备回退策略，包括备用模型、请求幂等、熔断、告警和可追踪日志。重要流程不要把业务连续性押在单一端点上。", "Design failure fallback", "Production systems need fallback for timeouts, rate limits, model removal, and provider outages, including backup models, idempotency, circuit breaking, alerts, and traceable logs. Critical workflows should not depend on one endpoint."]
    ]
  },
  {
    slug: "comfyui-tools",
    title: "ComfyUI 工具与 AI 绘图工作流入口",
    titleEn: "ComfyUI and AI Image Workflow Tools",
    description: "ComfyUI 官网和 AI 绘图工作流工具汇总，整理 Stable Diffusion、Replicate、RunPod、fal、OpenArt 等节点式生成、云 GPU 和图像创作入口。",
    descriptionEn: "A practical guide to ComfyUI, Stable Diffusion, Replicate, RunPod, fal, OpenArt, and AI image workflow tooling.",
    keywords: "ComfyUI,ComfyUI工具,AI绘图工作流,Stable Diffusion,RunPod,fal,OpenArt",
    intent: "适合搜索“ComfyUI 官网”“ComfyUI 工具”“AI 绘图工作流”“Stable Diffusion 节点工作流”的用户。",
    intentEn: "For users searching for ComfyUI official link, ComfyUI tools, AI image workflows, or Stable Diffusion node workflows.",
    tools: [
      ["ComfyUI", "节点式生成工作流核心工具，适合复杂图像、视频和模型管线。", "Node Workflow", "https://www.comfy.org/"],
      ["Stability AI", "Stable Diffusion 相关模型和生成能力的重要来源。", "Image Models", "https://stability.ai/"],
      ["Replicate", "适合通过 API 快速运行开源图像、视频、音频模型。", "Model API", "https://replicate.com/"],
      ["RunPod", "适合租用 GPU Pods 部署 ComfyUI、训练或推理任务。", "GPU Cloud", "https://www.runpod.io/"],
      ["fal", "适合高性能媒体生成 API 和图像视频工作流。", "Media API", "https://fal.ai/"],
      ["OpenArt", "适合图像生成、编辑、风格探索和创意参考。", "Image Creation", "https://openart.ai/"]
    ],
    sections: [
      ["本地还是云端", "本地 ComfyUI 适合长期使用和隐私敏感场景；云端 GPU 适合显卡不足、临时高负载和团队共享。", "Local or cloud", "Local ComfyUI is better for long-term use and privacy-sensitive work. Cloud GPUs are useful when local hardware is limited, workload is temporary, or a team needs shared access."],
      ["工作流管理", "复杂工作流要记录模型版本、节点依赖、提示词、输入图和输出参数，否则很难复现。", "Workflow management", "For complex workflows, record model versions, node dependencies, prompts, input images, and output parameters. Otherwise, results become hard to reproduce."],
      ["先从最小流程开始", "新用户可以先完成加载模型、输入提示词、采样和保存图片四个节点，再逐步加入 ControlNet、局部重绘、放大和视频节点。一次安装太多自定义节点会增加依赖冲突和排错难度。", "Start with the smallest workflow", "Beginners should first complete a four-node flow for loading a model, entering a prompt, sampling, and saving an image. Add ControlNet, inpainting, upscaling, and video nodes gradually. Installing many custom nodes at once makes dependency problems harder to diagnose."],
      ["硬件与云成本", "本地部署要考虑显存、模型磁盘空间、驱动和生成时长；云端则要关注实例空闲计费、持久存储、上传下载和工作流备份。短期试验适合云端，长期高频任务要计算月度总成本。", "Hardware and cloud cost", "Local deployment requires VRAM, model storage, drivers, and generation time. Cloud use adds idle instance charges, persistent storage, transfers, and workflow backups. Cloud is convenient for short trials, while frequent work needs a monthly total-cost comparison."],
      ["团队复现标准", "商业项目应把工作流 JSON、模型校验值、自定义节点版本、输入素材授权和关键参数一起归档。仅保存最终图片无法解释生成过程，也不利于返工、审计和多人协作。", "Team reproduction standard", "Commercial projects should archive workflow JSON, model checksums, custom-node versions, input licenses, and key settings. Saving only final images makes reproduction, revision, audit, and collaboration difficult."]
    ]
  },
  {
    slug: "openrouter-guide",
    title: "OpenRouter 官网入口与使用指南：多模型 API 怎么选",
    titleEn: "OpenRouter Guide",
    description: "OpenRouter 是什么、官网入口在哪里、多模型 API 路由适合谁？对比 OpenAI、Claude、Gemini、Mistral、Together AI 等模型接入方式。",
    descriptionEn: "A guide to OpenRouter use cases, official entry, model routing value, and how it differs from direct model API platforms.",
    keywords: "OpenRouter,OpenRouter官网,模型路由,多模型API,AI API聚合",
    intent: "适合搜索“OpenRouter 官网”“OpenRouter 是什么”“OpenRouter 怎么用”“多模型 API 平台”的用户。",
    intentEn: "For users searching for OpenRouter official site, what OpenRouter is, how to use OpenRouter, or multi-model API platforms.",
    tools: [
      ["OpenRouter", "统一访问多家大模型的路由与 API 平台，适合比较模型能力、价格和可用性。", "Model Router", "https://openrouter.ai/"],
      ["OpenAI", "适合直接接入 OpenAI 模型和官方生态能力。", "Direct API", "https://openai.com/"],
      ["Anthropic", "适合直接接入 Claude 系列模型和企业能力。", "Direct API", "https://www.anthropic.com/"],
      ["Google AI", "适合接入 Gemini 和 Google AI 开发者生态。", "Direct API", "https://ai.google/"],
      ["Mistral AI", "适合接入欧洲模型公司和开源权重生态。", "Model API", "https://mistral.ai/"],
      ["Together AI", "适合开源模型推理、微调和模型服务。", "Inference API", "https://www.together.ai/"]
    ],
    sections: [
      ["适合场景", "当你还在比较不同模型、希望快速切换供应商、或需要统一 OpenAI 兼容接口时，OpenRouter 这类路由平台会更省时间。", "Best-fit scenarios", "OpenRouter-style routing platforms save time when you are comparing models, switching providers quickly, or using one OpenAI-compatible interface across multiple vendors."],
      ["生产注意", "生产环境要关注账单、限速、模型可用性、日志、数据处理和失败回退策略。重要业务不应只依赖单一模型或单一路由。", "Production notes", "For production, review billing, rate limits, model availability, logs, data handling, and fallback behavior. Important workflows should not depend on only one model or one route."],
      ["路由不等于自动最优", "统一接口能降低切换成本，但不同模型的提示词、工具调用格式、上下文限制和安全策略仍有差异。切换模型后应重新跑评测集，不能只因为接口兼容就假设输出等价。", "Routing is not automatic optimization", "A unified API lowers switching cost, but models still differ in prompts, tool-call formats, context limits, and safety behavior. Re-run evaluations after switching; interface compatibility does not make outputs equivalent."],
      ["密钥和预算管理", "开发和生产环境应使用不同密钥，设置预算与速率上限，并避免把密钥写入前端代码或公开仓库。团队还需要约定密钥轮换、异常账单告警和离职成员权限回收。", "Key and budget management", "Use separate keys for development and production, set budget and rate limits, and never place keys in frontend code or public repositories. Teams also need key rotation, billing alerts, and access revocation procedures."],
      ["上线前的最小检查", "至少验证模型名称是否固定、供应商失败时是否回退、流式输出是否正确结束、工具调用能否重试、日志是否包含敏感数据，以及账单能否按项目区分。", "Minimum pre-launch checks", "Verify model pinning, provider fallback, correct stream completion, retryable tool calls, sensitive-data handling in logs, and project-level billing separation before launch."]
    ]
  }
];

const toolEnglish = {
  Cursor: {
    summary: "Best for codebase Q&A, multi-file edits, refactoring, and AI IDE-centered development workflows.",
    tag: "AI IDE"
  },
  Trae: {
    summary: "Useful for trying ByteDance's AI coding environment, project understanding, and development collaboration.",
    tag: "AI IDE"
  },
  "GitHub Copilot": {
    summary: "Best for developers already working deeply in GitHub, VS Code, or JetBrains IDEs.",
    tag: "Coding Assistant"
  },
  Codex: {
    summary: "For users interested in OpenAI coding agents, code task execution, and developer automation.",
    tag: "Coding Agent"
  },
  Cline: {
    summary: "A VS Code agent for file edits, terminal commands, and project-level development tasks.",
    tag: "VS Code Agent"
  },
  "Roo Code": {
    summary: "A coding agent option for multi-mode workflows, code editing, and local development control.",
    tag: "Coding Agent"
  },
  ChatGPT: {
    summary: "A general AI assistant for Q&A, writing, file understanding, and everyday productivity tasks.",
    tag: "AI Assistant"
  },
  Claude: {
    summary: "Useful for long-document reading, writing, analysis, coding support, and knowledge work.",
    tag: "AI Assistant"
  },
  Perplexity: {
    summary: "AI search and answer engine built around cited sources, useful for research and fact-checking.",
    tag: "AI Search"
  },
  Kimi: {
    summary: "Moonshot AI assistant for Chinese long documents, source organization, and search Q&A.",
    tag: "Long Context"
  },
  Ollama: {
    summary: "Useful for running open models locally, especially for privacy-sensitive or offline experiments.",
    tag: "Local Models"
  },
  ComfyUI: {
    summary: "Node-based generation workflow tool for complex image, video, and model pipeline tasks.",
    tag: "Node Workflow"
  },
  "通义千问": {
    name: "Qwen",
    summary: "Alibaba Cloud's Qwen assistant and model entry, useful for Chinese Q&A, office tasks, and multimodal work.",
    tag: "Chinese LLM"
  },
  "文心一言": {
    name: "ERNIE Bot",
    summary: "Baidu's ERNIE assistant entry for Chinese search, writing, office, and productivity scenarios.",
    tag: "Chinese LLM"
  },
  DeepSeek: {
    summary: "Provider of chat, reasoning, and API services for Chinese-language scenarios and developer integration.",
    tag: "LLM API"
  },
  "智谱清言": {
    name: "Zhipu Qingyan",
    summary: "Zhipu AI's general assistant for Chinese knowledge work and productivity tasks.",
    tag: "Chinese LLM"
  },
  "豆包": {
    name: "Doubao",
    summary: "ByteDance's AI assistant covering chat, writing, images, and everyday productivity scenarios.",
    tag: "AI Assistant"
  },
  OpenAI: {
    summary: "Best for mainstream models, tool ecosystems, voice, multimodal capabilities, and product integrations.",
    tag: "Model API"
  },
  Anthropic: {
    summary: "Best for long documents, knowledge work, enterprise safety needs, and Claude model access.",
    tag: "Model API"
  },
  "Google AI": {
    summary: "Best for Gemini, multimodal capabilities, search ecosystem integration, and Google developer tooling.",
    tag: "Model API"
  },
  OpenRouter: {
    summary: "A model routing and API platform for accessing many models, comparing cost, and switching providers quickly.",
    tag: "Model Router"
  },
  SiliconFlow: {
    summary: "A model inference platform for domestic access, open-model APIs, and developer workflows.",
    tag: "Inference API"
  },
  "Stability AI": {
    summary: "An important source for Stable Diffusion-related models and generative media capabilities.",
    tag: "Image Models"
  },
  Replicate: {
    summary: "API platform for quickly running open image, video, audio, and language models.",
    tag: "Model API"
  },
  RunPod: {
    summary: "GPU cloud platform for deploying ComfyUI, training jobs, or inference workloads.",
    tag: "GPU Cloud"
  },
  fal: {
    summary: "High-performance media generation API platform for image and video workflows.",
    tag: "Media API"
  },
  OpenArt: {
    summary: "Image generation and editing platform for style exploration, creative references, and visual production.",
    tag: "Image Creation"
  },
  "Mistral AI": {
    summary: "European AI model company with open-weight models, APIs, and enterprise options.",
    tag: "Model API"
  },
  "Together AI": {
    summary: "Inference, fine-tuning, and model service platform for open models.",
    tag: "Inference API"
  }
};

await mkdir("topics", { recursive: true });
for (const topic of topics) {
  await writeFile(`topics/${topic.slug}.html`, renderTopic(topic));
}

console.log(`Built ${topics.length} topic pages.`);

function renderTopic(topic) {
  const url = `${siteUrl}/topics/${topic.slug}.html`;
  const guideNotes = buildGuideNotes(topic);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: topic.titleEn,
        description: topic.descriptionEn,
        url,
        dateModified: today,
        author: {
          "@type": "Organization",
          name: "AI Compass",
          url: `${siteUrl}/about.html`
        },
        inLanguage: ["zh-CN", "en"],
        about: topic.tools.map(([name]) => name),
        isPartOf: {
          "@type": "WebSite",
          name: "AI Compass",
          url: `${siteUrl}/`
        }
      },
      {
        "@type": "FAQPage",
        mainEntity: guideNotes.faq.map((item) => ({
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
            name: "AI Tool Guides",
            item: `${siteUrl}/sitemap.html`
          },
          {
            "@type": "ListItem",
            position: 3,
            name: topic.titleEn,
            item: url
          }
        ]
      }
    ]
  };

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(topic.title)} - AI Compass</title>
  <meta name="description" content="${escapeHtml(topic.description)}">
  <meta name="keywords" content="${escapeHtml(topic.keywords)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${url}">
  <link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
  <link rel="manifest" href="../site.webmanifest">
  <meta name="google-adsense-account" content="ca-pub-5859243800721473">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5859243800721473" crossorigin="anonymous"></script>
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="AI Compass">
  <meta property="og:title" content="${escapeHtml(topic.title)} - AI Compass">
  <meta property="og:description" content="${escapeHtml(topic.description)}">
  <meta property="og:url" content="${url}">
  <meta name="twitter:card" content="summary">
  <link rel="stylesheet" href="../assets/styles.css?v=10">
  <script type="application/ld+json">${jsonScript(schema)}</script>
</head>
<body data-title-zh="${escapeHtml(`${topic.title} - AI Compass`)}" data-title-en="${escapeHtml(`${topic.titleEn} - AI Compass`)}" data-description-zh="${escapeHtml(topic.description)}" data-description-en="${escapeHtml(topic.descriptionEn)}">
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
        <span data-seo-zh="专题指南" data-seo-en="Guides">专题指南</span>
      </div>
      <p class="eyebrow" data-seo-zh="专题指南" data-seo-en="Guide">专题指南</p>
      <h1 data-seo-zh="${escapeAttribute(topic.title)}" data-seo-en="${escapeAttribute(topic.titleEn)}">${escapeHtml(topic.title)}</h1>
      <p data-seo-zh="${escapeAttribute(topic.description)}" data-seo-en="${escapeAttribute(topic.descriptionEn)}">${escapeHtml(topic.description)}</p>
    </div>
  </header>

  <main>
    <section class="section topic-page">
      <div class="topic-summary">
        <span data-seo-zh="搜索意图" data-seo-en="Search intent">搜索意图</span>
        <p data-seo-zh="${escapeAttribute(topic.intent)}" data-seo-en="${escapeAttribute(topic.intentEn)}">${escapeHtml(topic.intent)}</p>
      </div>

      <div class="topic-byline">
        <span data-seo-zh="AI Compass 编辑整理" data-seo-en="Curated by AI Compass">AI Compass 编辑整理</span>
        <time datetime="${today}" data-seo-zh="更新于 ${today}" data-seo-en="Updated ${today}">更新于 ${today}</time>
        <a href="../about.html" data-seo-zh="查看编辑原则" data-seo-en="Editorial principles">查看编辑原则</a>
      </div>

      <div class="editorial-grid">
${guideNotes.cards.map(renderGuideNote).join("\n")}
      </div>

      <div class="section-heading">
        <p class="eyebrow" data-seo-zh="Recommended official links" data-seo-en="Recommended official links">Recommended official links</p>
        <h2 data-seo-zh="推荐工具入口" data-seo-en="Recommended Tool Links">推荐工具入口</h2>
        <p data-seo-zh="以下卡片优先链接官方入口。访问前请核对浏览器地址栏，避免进入仿冒官网。" data-seo-en="The cards below prioritize official entries. Always verify the browser address bar before logging in or downloading anything.">以下卡片优先链接官方入口。访问前请核对浏览器地址栏，避免进入仿冒官网。</p>
      </div>

      <div class="directory-grid">
${topic.tools.map(renderToolCard).join("\n")}
      </div>

      <div class="topic-sections">
${topic.sections.map(([heading, body, headingEn = heading, bodyEn = body]) => `        <article>
          <h2 data-seo-zh="${escapeAttribute(heading)}" data-seo-en="${escapeAttribute(headingEn)}">${escapeHtml(heading)}</h2>
          <p data-seo-zh="${escapeAttribute(body)}" data-seo-en="${escapeAttribute(bodyEn)}">${escapeHtml(body)}</p>
        </article>`).join("\n")}
      </div>

      <div class="topic-summary">
        <span data-seo-zh="下一步" data-seo-en="Next step">下一步</span>
        <p data-seo-zh="如果你还不确定具体工具，可以回到 AI Compass 首页按分类继续筛选，或查看每日 AI 资讯了解近期产品变化。" data-seo-en="If you are still unsure, return to the AI Compass homepage to browse by category or check daily AI news for recent product changes.">如果你还不确定具体工具，可以回到 AI Compass 首页按分类继续筛选，或查看每日 AI 资讯了解近期产品变化。</p>
      </div>

      <section class="faq-section" aria-labelledby="topic-faq-title">
        <div class="section-heading compact">
          <p class="eyebrow" data-seo-zh="FAQ" data-seo-en="FAQ">FAQ</p>
          <h2 id="topic-faq-title" data-seo-zh="专题常见问题" data-seo-en="Guide FAQ">专题常见问题</h2>
        </div>
        <div class="faq-list">
${guideNotes.faq.map(renderFaqItem).join("\n")}
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

  <script src="../assets/seo-i18n.js?v=10"></script>
</body>
</html>
`;
}

function buildGuideNotes(topic) {
  const toolNamesZh = topic.tools.map(([name]) => name).join("、");
  const toolNamesEn = topic.tools.map(([name]) => toolEnglish[name]?.name || name).join(", ");

  return {
    cards: [
      {
        zhTitle: "编辑整理方法",
        enTitle: "Editorial method",
        zhBody: `本专题围绕真实搜索意图整理，而不是简单堆放链接。我们优先选择有明确官网入口、产品定位清晰、在该任务中有代表性的工具，并把 ${toolNamesZh} 放在同一页面中便于横向比较。`,
        enBody: `This guide is organized around real search intent rather than a plain link dump. We prioritize tools with clear official websites, clear product positioning, and representative value for the task, placing ${toolNamesEn} on one page for comparison.`
      },
      {
        zhTitle: "对比时先看什么",
        enTitle: "What to compare first",
        zhBody: "建议先用一个自己的真实任务测试，再比较价格、免费额度、输出质量、中文支持、数据政策、导出格式和团队协作。工具官网的功能演示通常只展示最佳效果，实际工作流还要看稳定性。",
        enBody: "Test with one of your own real tasks first, then compare pricing, free tier, output quality, Chinese support, data policy, export formats, and collaboration. Official demos usually show best-case results, while real workflows also need stability."
      },
      {
        zhTitle: "安全与商用提醒",
        enTitle: "Safety and commercial-use note",
        zhBody: "登录、上传文件、连接代码仓库或生成商用素材前，请确认官方域名、账号权限、隐私条款和授权范围。涉及客户数据、代码密钥、人物肖像或品牌素材时，不建议只依赖默认设置。",
        enBody: "Before logging in, uploading files, connecting repositories, or creating commercial assets, confirm the official domain, account permissions, privacy terms, and license scope. For customer data, code secrets, likenesses, or brand assets, do not rely only on default settings."
      }
    ],
    faq: [
      {
        questionZh: `这篇${topic.title}适合谁看？`,
        questionEn: `Who is this ${topic.titleEn} guide for?`,
        answerZh: topic.intent,
        answerEn: topic.intentEn
      },
      {
        questionZh: "为什么要从官网入口进入？",
        questionEn: "Why should I use official links?",
        answerZh: "AI 热门工具经常被仿冒站、镜像站和诱导下载页借流量。通过官网入口访问，并核对浏览器地址栏，可以降低账号、付款和下载风险。",
        answerEn: "Popular AI tools are often copied by impersonation sites, mirrors, and misleading download pages. Using official links and checking the browser address bar reduces account, payment, and download risk."
      },
      {
        questionZh: "免费工具是否可以直接用于正式项目？",
        questionEn: "Can free tools be used directly in formal projects?",
        answerZh: "不建议直接默认可以。免费额度、商用授权、数据保留、输出版权和地区可用性都可能变化，正式使用前应阅读官方条款并做小范围测试。",
        answerEn: "Do not assume so by default. Free tiers, commercial licenses, data retention, output rights, and regional availability may change, so read official terms and test on a small scope first."
      }
    ]
  };
}

function renderGuideNote(note) {
  return `        <article class="editorial-card">
          <h2 data-seo-zh="${escapeAttribute(note.zhTitle)}" data-seo-en="${escapeAttribute(note.enTitle)}">${escapeHtml(note.zhTitle)}</h2>
          <p data-seo-zh="${escapeAttribute(note.zhBody)}" data-seo-en="${escapeAttribute(note.enBody)}">${escapeHtml(note.zhBody)}</p>
        </article>`;
}

function renderFaqItem(item) {
  return `          <details>
            <summary data-seo-zh="${escapeAttribute(item.questionZh)}" data-seo-en="${escapeAttribute(item.questionEn)}">${escapeHtml(item.questionZh)}</summary>
            <p data-seo-zh="${escapeAttribute(item.answerZh)}" data-seo-en="${escapeAttribute(item.answerEn)}">${escapeHtml(item.answerZh)}</p>
          </details>`;
}

function renderToolCard([name, summary, tag, url]) {
  const en = toolEnglish[name] || {};
  const nameEn = en.name || name;
  const summaryEn = en.summary || summary;
  const tagEn = en.tag || tag;

  return `        <a class="tool-card" href="${escapeAttribute(url)}" target="_blank" rel="noopener" aria-label="打开 ${escapeAttribute(name)} 官网">
          <div class="card-top">
            <div class="tool-logo" aria-hidden="true">
              <img src="${escapeAttribute(faviconUrl(url))}" alt="" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';">
              <span data-seo-zh="${escapeAttribute(name.slice(0, 2))}" data-seo-en="${escapeAttribute(nameEn.slice(0, 2).toUpperCase())}">${escapeHtml(name.slice(0, 2))}</span>
            </div>
            <span class="badge" data-seo-zh="官方" data-seo-en="Official">官方</span>
          </div>
          <h3 data-seo-zh="${escapeAttribute(name)}" data-seo-en="${escapeAttribute(nameEn)}">${escapeHtml(name)}</h3>
          <p data-seo-zh="${escapeAttribute(summary)}" data-seo-en="${escapeAttribute(summaryEn)}">${escapeHtml(summary)}</p>
          <div class="tags"><span class="tag" data-seo-zh="${escapeAttribute(tag)}" data-seo-en="${escapeAttribute(tagEn)}">${escapeHtml(tag)}</span></div>
        </a>`;
}

function faviconUrl(url) {
  return `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=64`;
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
