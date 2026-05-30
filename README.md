# AI Compass

AI Compass 是一个私有化运营的 AI 工具导航与每日 AI 资讯站，面向想快速找到 AI 工具官网、模型平台、开发者工具、智能体工具和 AI 工作流入口的用户。

当前线上地址：

```text
https://kjc613.cn/
```

项目优先整理各厂商和工具的官方入口，并在页面中提醒用户核对浏览器地址栏，降低进入仿冒官网、镜像站或诱导下载页的风险。

## 当前内容

- AI 工具目录：维护在 `data/ai-tools.json`，覆盖大模型 API、开发者工具、智能体、图像视频、办公效率、搜索问答、语音音频、模型社区等分类。
- 首页：包含编辑推荐、重点分类概览、分类目录、专题指南、热门 AI 工具官网入口、分类指南和 FAQ。
- 分类页：`categories/` 下生成 14 个静态分类页面，便于搜索引擎收录。
- 专题页：`topics/` 下生成面向搜索需求的专题指南页面，例如 AI 编程工具、免费 AI 工具、国内 AI 工具、模型 API 平台、ComfyUI 工作流、OpenRouter 指南。
- 资讯页：`news.html` 独立展示每日 AI 资讯，由 GitHub Actions 定时更新。
- 双语体验：首页、资讯页、分类页和专题页支持中文 / 英文切换。
- SEO 文件：包含 `sitemap.xml`、`robots.txt`、`llms.txt`、`site.webmanifest`、结构化数据和规范链接。
- 广告基础：已接入 Google AdSense 自动广告脚本，并提供 `ads.txt`。

## 项目结构

```text
.
├── index.html                  # 首页
├── news.html                   # AI 资讯页
├── about.html                  # 关于页面
├── privacy.html                # 隐私政策
├── terms.html                  # 使用条款
├── contact.html                # 联系页面
├── categories/                 # SEO 分类页
├── topics/                     # SEO 专题指南页
├── assets/
│   ├── app.js                  # 首页和资讯页交互
│   ├── seo-i18n.js             # 静态 SEO 页双语切换
│   ├── site-data.js            # 构建后的工具和资讯数据
│   ├── styles.css              # 全站样式
│   └── favicon.svg
├── data/
│   ├── ai-tools.json           # AI 工具源数据
│   └── news.json               # 每日资讯数据
├── scripts/
│   ├── build-site-data.js      # 生成前端数据
│   ├── build-topic-pages.js    # 生成专题页
│   ├── build-seo-pages.js      # 生成分类页、sitemap 和 llms
│   ├── build-static.js         # 生成 dist 静态发布目录
│   ├── update-news.js          # 抓取并更新每日 AI 资讯
│   └── git-publish.ps1         # 一键提交并推送到 GitHub
├── .github/workflows/
│   └── update-news.yml         # GitHub Actions 每日资讯更新任务
├── ads.txt                     # Google AdSense 授权文件
├── CNAME                       # GitHub Pages 自定义域名
├── robots.txt
├── sitemap.xml
├── llms.txt
├── wrangler.jsonc              # Cloudflare Workers 静态资源部署配置
└── package.json
```

## 本地运行

要求 Node.js 20 或更高版本。

```bash
npm start
```

默认访问：

```text
http://localhost:8787
```

语法检查：

```bash
npm run check
```

## 数据与构建

更新工具目录后，先修改：

```text
data/ai-tools.json
```

然后生成前端数据和 SEO 页面：

```bash
npm run build-data
npm run build-seo
```

生成静态发布目录：

```bash
npm run build
```

构建结果输出到 `dist/`，该目录不提交到 Git。

维护注意事项：

- `data/*.json`、`assets/*.js` 和 HTML 文件应使用 UTF-8 保存。
- 不要把 `assets/site-data.js` 当作唯一数据源，它由 `scripts/build-site-data.js` 生成。
- 新增或调整分类、专题页后，运行 `npm run build-seo` 更新 `categories/`、`topics/`、`sitemap.xml` 和 `llms.txt`。
- 修改样式或页面结构后，运行 `npm run check` 和 `npm run build` 做基础验证。

## 每日 AI 资讯

手动更新资讯：

```bash
npm run update-news
```

自动更新由 `.github/workflows/update-news.yml` 执行：

- 每天 UTC 23:00 运行一次，也就是北京时间 07:00。
- 可以在 GitHub Actions 页面手动运行 `Update AI news`。
- 每次最多保留 `NEWS_LIMIT=60` 条资讯。
- 更新文件范围为 `data/news.json` 和 `assets/site-data.js`。
- 工作流使用 Node.js 24，避免 GitHub Actions 的 Node.js 20 弃用警告。

## SEO 与收录

当前站点的主要 SEO 入口：

```text
https://kjc613.cn/sitemap.xml
https://kjc613.cn/robots.txt
https://kjc613.cn/llms.txt
```

Google Search Console 提交 sitemap 时，如果属性是 `https://kjc613.cn/`，输入框填写：

```text
sitemap.xml
```

不要填写旧的 GitHub Pages 子路径 sitemap，也不要填写 `/sitemap.xml` 到错误属性中，否则可能出现无法抓取或抓取到旧地址的问题。

## 广告变现

项目已完成 Google AdSense 自动广告的基础接入：

- 页面 `<head>` 中已加入 AdSense 脚本。
- 页面已加入 `google-adsense-account` 元信息。
- `ads.txt` 已配置发布商授权记录。
- 手动广告位已移除，当前采用 Google 自动广告。

仍需要在 Google AdSense 后台完成的事项：

- 确认站点 `https://kjc613.cn/` 已通过审核。
- 确认自动广告已开启。
- 等待 Google 抓取 `ads.txt` 并完成广告投放学习。
- 持续提升搜索流量和真实访问量，否则即使广告接入成功，收益也会很低。

## 发布到 GitHub

推荐使用一键发布脚本：

```powershell
npm run publish:git -- -Message "更新网站内容"
```

脚本会自动执行：

1. `git fetch origin main`
2. 检查本地改动
3. `git add -A`
4. `git commit -m <Message>`
5. `git pull --rebase origin main`
6. `git push origin main`

如果没有本地改动，脚本会提示 `No local changes to publish.`。

## Cloudflare 部署

项目也准备了 Cloudflare Workers 静态资源部署配置：

```text
wrangler.jsonc
```

推荐配置：

- Build command：`npm run build`
- Output directory：`dist`
- Deploy command：如果使用 Workers，可使用 `npx wrangler deploy`

不要把仓库根目录 `.` 作为静态资源目录直接部署，否则可能把 `node_modules` 一起上传，触发 Cloudflare 单文件大小限制。

## 常用命令

```bash
npm start           # 本地启动网站
npm run check       # 检查 JS 语法
npm run build-data  # 生成 assets/site-data.js
npm run build-seo   # 生成分类页、专题页、sitemap 和 llms
npm run build       # 生成 dist 静态发布目录
npm run update-news # 手动更新每日 AI 资讯
```

```powershell
npm run publish:git -- -Message "更新网站内容"
```
