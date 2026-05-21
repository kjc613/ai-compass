# AI Compass

AI Compass 是一个 AI 工具导航与资讯站，聚合主流 AI 厂商官网入口、产品能力分类和每日 AI 行业动态。

## 功能

- AI 厂商导航：数据维护在 `data/ai-tools.json`，前端会自动按 `category` 分组。
- 搜索与排序：支持按品牌、业务、标签、简介搜索。
- 每日 AI 资讯：`scripts/update-news.js` 从 RSS 源抓取新闻并写入 `data/news.json`。
- 双语界面：支持中文和英文切换。
- 私有化运营：适合部署到支持私有仓库的托管平台并绑定自有域名。

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

## 自动更新资讯

`.github/workflows/update-news.yml` 已配置定时任务：

- UTC 每天 23:00 执行一次，相当于北京时间每天 07:00。
- 也可以在 Actions 页面手动运行 `Update AI news`。
- 脚本会更新 `data/news.json` 和 `assets/site-data.js`。

## 后续运营建议

- 增加“提交 AI 产品”表单，建立产品收录和审核流程。
- 为重点分类生成独立页面，如 AI 搜索、AI 视频、AI 编程。
- 增加榜单、专题页和 Newsletter，用内容沉淀长期访问。
