# AI Compass

一个可免费部署的 AI 导航站：聚合 AI 厂商官网入口，按业务属性自动分类展示，并通过定时脚本每天更新 AI 资讯。

## 功能

- AI 厂商导航：数据维护在 `data/ai-tools.json`，前端会自动按 `category` 分组。
- 搜索与排序：支持按品牌、业务、标签、简介搜索。
- 每日 AI 资讯：`scripts/update-news.js` 从 RSS 源抓取新闻并写入 `data/news.json`。
- 广告变现位：页面预留顶部横幅和侧边栏广告位，可接 Google AdSense、联盟链接或付费推荐。
- 免费部署友好：纯静态页面，可部署到 GitHub Pages、Cloudflare Pages、Netlify 或 Vercel。

## 本地运行

```bash
npm start
```

打开：

```text
http://localhost:8787
```

检查语法：

```bash
npm run check
```

手动更新资讯：

```bash
npm run update-news
```

## 部署到 GitHub Pages

项目已包含 `.github/workflows/deploy-pages.yml`。推送到 `main` 分支后，在仓库的 `Settings -> Pages` 中把 Source 设为 `GitHub Actions`，即可自动部署。

## 每日自动更新资讯

`.github/workflows/update-news.yml` 已配置定时任务：

- UTC 每天 23:00 执行一次，相当于北京时间每天 07:00。
- 也可以在 GitHub Actions 页面手动运行 `Update AI news`。
- 脚本会更新 `data/news.json` 和 `assets/site-data.js` 并自动提交。

## 后续运营建议

- 增加“提交 AI 产品”表单，可先用 Tally、Google Forms 或 GitHub Issues 免费承接。
- 做 SEO 页面：为每个分类生成独立页面，如 AI 搜索、AI 视频、AI 编程。
- 变现优先级：联盟链接、付费收录、Newsletter 赞助、展示广告。
