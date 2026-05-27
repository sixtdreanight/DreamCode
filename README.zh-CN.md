**语言 / Language:** [English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-Hant.md) | [日本語](README.ja.md)

# Vibe Coding 入门课

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![AI SDK](https://img.shields.io/badge/AI%20SDK-multi--model-purple)](https://sdk.vercel.ai/)

一个面向零基础学习者的 AI 辅助编程（Vibe Coding）互动教学网站。12 节课程循序渐进，内置 AI 助教，Prompt Playground 可直接生成可运行的代码。

---

## 功能

- **系统化课程** — 12 节课程从概念理解到动手实践
- **AI 学习助手** — 内置 AI 助教，随时提问
- **Prompt Playground** — 输入描述即可生成可运行代码
- **多模型支持** — Claude、OpenAI、DeepSeek 及任意 OpenAI 兼容接口

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

## 配置多模型

支持三种 AI 提供商，通过 `.env` 配置：

### DeepSeek（推荐，国内直接访问）

```env
AI_PROVIDER=openai-compatible
AI_MODEL=deepseek-chat
AI_API_KEY=sk-...
AI_BASE_URL=https://api.deepseek.com/v1
```

### Anthropic Claude

```env
AI_PROVIDER=anthropic
AI_MODEL=claude-sonnet-4-20250514
ANTHROPIC_API_KEY=sk-ant-...
```

### OpenAI 或兼容接口

```env
AI_PROVIDER=openai
AI_MODEL=gpt-4o
OPENAI_API_KEY=sk-...
```

## 技术栈

- [Next.js](https://nextjs.org/) 16 + React 19 + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4
- [AI SDK](https://sdk.vercel.ai/) — 统一多模型接口
- [Lucide React](https://lucide.dev/) — 图标
- [react-markdown](https://github.com/remarkjs/react-markdown) — 渲染课程内容

## 项目结构

```
app/
  api/agent/route.ts      # AI 对话流式接口
  lesson/[id]/page.tsx    # 课程详情页
  page.tsx                # 首页
  layout.tsx              # 根布局
components/
  ChatInterface.tsx       # AI 聊天组件
  PromptPlayground.tsx    # 代码生成练习区
  LessonNavigator.tsx     # 课程导航侧边栏
lib/
  lessons.ts              # 课程数据
scripts/
  setup.sh                # 自动设置脚本
```

## 自定义课程

编辑 `lib/lessons.ts` 即可修改或添加课程内容，支持 Markdown 格式。

## 相关项目

- [myBlog](https://github.com/sixtdreanight/myBlog) — 作者个人博客，更多 Vibe Coding 相关文章

## License

MIT

---

<div align="center">

**Language / 语言 / 言語**

[**English**](README.md) | [**简体中文**](README.zh-CN.md) | [**繁體中文**](README.zh-Hant.md) | [**日本語**](README.ja.md)

</div>
