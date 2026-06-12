**语言 / Language:** [English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-Hant.md) | [日本語](README.ja.md)

# Vibe Coding 入门课

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![CI](https://github.com/sixtdreanight/vibe-coding-agent/actions/workflows/ci.yml/badge.svg)](https://github.com/sixtdreanight/vibe-coding-agent/actions/workflows/ci.yml)

一个面向零基础学习者的 AI 辅助编程（Vibe Coding）互动教学网站。22 节课涵盖 7 个章节，内置 AI 助教、游戏化系统、Prompt Playground 可直接生成可运行的代码。

---

## 功能

- **22 节系统化课程** — 7 个章节从概念到发布
- **AI 学习助手** — 苏格拉底引导模式 + 直接回答模式，流式响应
- **Prompt Playground** — 输入描述即可生成可运行的 HTML/CSS/JS 代码
- **游戏化系统** — 经验值、等级、连续学习天数、10 种成就徽章
- **代码练习** — 互动式练习，带提示和自动检查
- **学习看板** — 进度追踪、热力图、技能雷达图
- **PWA 支持** — 可安装到桌面，支持离线使用
- **多模型支持** — Claude、OpenAI、DeepSeek 及任意 OpenAI 兼容接口
- **AI 降级** — 主服务故障时自动切换到备用服务

## 快速开始

### 自动设置（推荐）

```bash
bash scripts/setup.sh
```

### 手动

```bash
npm install
cp .env.example .env
# 编辑 .env，填入 API Key
npm run dev
```

打开 http://localhost:3000 开始学习。

> 详细的零基础设置指南：[SETUP_GUIDE.md](./SETUP_GUIDE.md)

### Docker

```bash
docker compose up -d
```

## 配置

### 必填

```env
# API 认证密钥（生成一个随机字符串）
AI_API_AUTH_TOKEN=你的密钥

# 主 AI 服务商
AI_PROVIDER=openai-compatible
AI_MODEL=deepseek-chat
AI_API_KEY=sk-...
AI_BASE_URL=https://api.deepseek.com/v1
```

### 可选：备用 AI 服务商

主服务商故障时自动切换：

```env
AI_FALLBACK_PROVIDER=openai
AI_FALLBACK_MODEL=gpt-4o-mini
AI_FALLBACK_API_KEY=sk-...
AI_FALLBACK_BASE_URL=https://api.openai.com/v1
```

完整配置参见 `.env.example`。

## 开发

```bash
npm install
npm run dev      # 启动开发服务器
npm test         # 运行测试（46 个测试，4 个套件）
npm run build    # 生产构建
```

## 技术栈

- [Next.js](https://nextjs.org/) 16 + React 19 + TypeScript（strict 模式）
- [Tailwind CSS](https://tailwindcss.com/) v4
- [AI SDK](https://sdk.vercel.ai/) — 统一多模型接口
- [Vitest](https://vitest.dev/) — 单元测试（目标 80%+ 覆盖率）
- [Lucide React](https://lucide.dev/) — 图标
- [react-markdown](https://github.com/remarkjs/react-markdown) — 渲染课程内容

## 项目结构

```
app/
  api/agent/route.ts        # AI 对话流式接口（认证 + 限流 + 降级）
  api/review/route.ts       # AI 代码审阅接口
  api/storage/route.ts      # 服务端键值存储
  api/analytics/route.ts    # 数据分析端点
  lesson/[id]/page.tsx      # 课程详情页
  dashboard/page.tsx        # 学习看板
  page.tsx                  # 首页
components/
  ChatInterface.tsx         # AI 聊天组件
  PromptPlayground.tsx      # 代码生成练习区
  exercise/                 # 互动代码练习
  dashboard/                # 统计、热力图、技能雷达
  gamification/             # 经验条、徽章解锁、彩纸特效
  visualizations/           # 动画流程图、DOM 树
lib/
  lessons.ts                # 22 节课定义
  progress.ts               # 学习进度（Repository 模式）
  gamification.ts           # 经验值、等级、连续学习
  achievements.ts           # 10 种成就徽章
  adaptive.ts               # 学习推荐引擎
  repository.ts             # 存储抽象层（localStorage / 服务端）
  logger.ts                 # 结构化日志
  analytics.ts              # 用户行为追踪
scripts/
  setup.sh                  # 自动设置脚本
  generate-icons.mjs        # PWA 图标生成器
```

## 自定义课程

编辑 `lib/lessons.ts` 即可修改或添加课程内容，支持 Markdown 格式。

## 部署

### Vercel（推荐）

1. 推送代码到 GitHub
2. 在 [vercel.com](https://vercel.com/) 导入仓库
3. 在项目设置中添加环境变量
4. 点击部署

### Docker

```bash
docker compose up -d
```

使用多阶段构建，镜像约 150MB。

## 相关项目

- [Blog-mizuki](https://github.com/sixtdreanight/Blog-mizuki) — 作者个人博客，更多 Vibe Coding 相关文章

## License

MIT

---

<div align="center">

**Language / 语言 / 言語**

[**English**](README.md) | [**简体中文**](README.zh-CN.md) | [**繁體中文**](README.zh-Hant.md) | [**日本語**](README.ja.md)

</div>
