# AI Compass

AI Compass 是一个面向 AI 工具发现、官网导航和行业资讯聚合的静态网站项目。当前站点已部署在 GitHub Pages：

https://kjc613.github.io/ai-compass/

项目定位是私有化运营的网站，不作为开源产品说明页。页面会优先展示各 AI 产品或厂商的官方网址，并提醒用户核对浏览器地址栏，避免进入仿冒网站。

## 当前内容

- AI 工具目录：维护在 `data/ai-tools.json`，当前包含 159 个工具。
- 分类页面：已生成 14 个独立分类页，位于 `categories/`。
- 首页导航：包含编辑推荐、重点分类概览、热门 AI 工具官网入口和 FAQ。
- 独立资讯页：`news.html` 展示每日 AI 资讯，不再与首页混在一起。
- 双语界面：中文 / 英文切换覆盖首页、资讯页、分类页和工具卡片内容。
- 搜索与筛选：支持工具名称、官网域名、分类、标签和简介搜索；短英文查询会优先匹配名称、域名和精确标签，减少无关结果。
- SEO 文件：包含 `sitemap.xml`、`robots.txt`、`site.webmanifest`、`llms.txt` 和分类页结构化数据。

## 项目结构

```text
.
├── index.html                 # 首页
├── news.html                  # AI 资讯页
├── categories/                # SEO 分类落地页
├── assets/
│   ├── app.js                 # 前端交互逻辑
│   ├── site-data.js           # 构建后的工具和资讯数据
│   ├── styles.css             # 页面样式
│   ├── seo-i18n.js            # SEO 页面双语切换
│   └── favicon.svg
├── data/
│   ├── ai-tools.json          # AI 工具源数据
│   └── news.json              # 每日资讯数据
├── scripts/
│   ├── build-site-data.js     # 将 data 写入前端可用数据文件
│   ├── build-seo-pages.js     # 生成分类页、sitemap 和 llms
│   ├── build-static.js        # 生成 dist 静态发布目录
│   ├── update-news.js         # 抓取并更新每日 AI 资讯
│   └── git-publish.ps1        # 一键提交并推送到 GitHub
├── .github/workflows/
│   └── update-news.yml        # GitHub Actions 每日资讯更新任务
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── wrangler.jsonc             # Cloudflare Workers 静态资源部署配置
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

## 数据维护

更新工具目录后，先修改：

```text
data/ai-tools.json
```

然后生成前端数据和 SEO 页面：

```bash
npm run build-data
npm run build-seo
```

如果要一次性生成静态发布目录：

```bash
npm run build
```

构建结果会输出到 `dist/`，该目录不会提交到 Git。

维护注意事项：

- `data/*.json`、`assets/*.js` 和 HTML 文件都应使用 UTF-8 保存。
- 修改 `data/ai-tools.json` 后，建议用 `npm run build-data` 同步首页数据。
- 新增或调整分类后，建议用 `npm run build-seo` 重新生成分类页、`sitemap.xml` 和 `llms.txt`。
- 不要手动编辑 `assets/site-data.js` 作为唯一数据源，它是由脚本生成给前端使用的文件。
- 如果只改页面样式或交互，一般不需要重新生成 `data/news.json`。

## 每日 AI 资讯

手动更新资讯：

```bash
npm run update-news
```

自动更新由 `.github/workflows/update-news.yml` 执行：

- 每天 UTC 23:00 运行一次，也就是北京时间 07:00。
- 可在 GitHub Actions 页面手动运行 `Update AI news`。
- 每次最多保留 `NEWS_LIMIT=60` 条资讯。
- 更新文件范围为 `data/news.json` 和 `assets/site-data.js`。
- 工作流使用 Node.js 24，并启用 `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24`，避免 GitHub Actions 的 Node.js 20 弃用警告。

## SEO 与搜索收录

当前项目已包含基础 SEO 文件：

- `sitemap.xml`：站点地图，提交到 Google Search Console 时应使用 `sitemap.xml`，不要填写 `/sitemap.xml`。
- `robots.txt`：允许搜索引擎抓取，并声明 sitemap 地址。
- `site.webmanifest`：站点应用信息。
- `llms.txt`：面向 AI/LLM 索引的站点摘要。
- 分类页 JSON-LD：分类页中包含 `CollectionPage` 结构化数据。

GitHub Pages 子路径站点的 sitemap 地址是：

```text
https://kjc613.github.io/ai-compass/sitemap.xml
```

Google Search Console 已添加验证文件：

```text
googleb6c54d335020eec1.html
```

提交站点地图时，如果属性是 `https://kjc613.github.io/ai-compass/`，输入框里填写 `sitemap.xml` 即可。不要填写 `/sitemap.xml`，否则可能会被解析到 `https://kjc613.github.io/sitemap.xml`，从而出现“无法抓取”。

## 广告变现准备

项目已补齐广告审核前常见的基础页面：

- `about.html`：关于本站
- `privacy.html`：隐私政策，包含 Cookie、广告和第三方链接说明
- `terms.html`：使用条款与免责声明
- `contact.html`：联系页面

这些页面已加入首页、资讯页、分类页页脚，也已加入 `sitemap.xml`。

尚未写入真实广告代码，因为接入 Google AdSense 需要你先在 AdSense 后台获得：

- 发布商 ID，例如 `ca-pub-xxxxxxxxxxxxxxxx`
- 广告单元代码或 Auto ads 代码
- `ads.txt` 授权记录

拿到这些信息后，再把 AdSense 脚本、广告位和 `ads.txt` 加入项目。不要提前写入假的发布商 ID，否则可能影响广告审核。

## 发布到 GitHub

本地仓库已配置：

```text
origin = https://github.com/kjc613/ai-compass.git
branch = main
```

普通手动流程：

```bash
git add -A
git commit -m "Update site"
git pull --rebase origin main
git push origin main
```

推荐使用一键发布脚本：

```powershell
npm run publish:git -- -Message "更新网站内容"
```

脚本会自动执行：

1. `git fetch origin main`
2. 检查是否有本地改动
3. `git add -A`
4. `git commit -m <Message>`
5. `git pull --rebase origin main`
6. `git push origin main`

如果没有本地改动，脚本会直接提示 `No local changes to publish.`。

## GitHub Pages 部署

当前站点可直接通过 GitHub Pages 访问：

```text
https://kjc613.github.io/ai-compass/
```

如果修改了静态文件并推送到 `main`，GitHub Pages 会在 Actions 构建完成后更新线上页面。

## Cloudflare 部署

项目也准备了 Cloudflare Workers 静态资源部署配置：

```text
wrangler.jsonc
```

Cloudflare 的推荐配置：

- Build command：`npm run build`
- Output directory：`dist`
- Deploy command：如果使用 Workers，可使用 `npx wrangler deploy`

注意不要把仓库根目录 `.` 作为静态资源目录直接部署，否则会把 `node_modules` 一起上传，可能触发 Cloudflare 单文件大小限制。

## 常用命令

```bash
npm start          # 本地启动网站
npm run check      # 检查 JS 语法
npm run build-data # 生成 assets/site-data.js
npm run build-seo  # 生成分类页、sitemap、llms
npm run build      # 生成 dist 静态发布目录
npm run update-news # 手动更新每日 AI 资讯
```

```powershell
npm run publish:git -- -Message "更新网站内容"
```
