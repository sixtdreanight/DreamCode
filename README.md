# Vibe Coding 入门课 / Vibe Coding Crash Course

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![AI SDK](https://img.shields.io/badge/AI%20SDK-multi--model-purple)](https://sdk.vercel.ai/)

An interactive tutorial site that teaches absolute beginners how to code with AI assistance (Vibe Coding). 12 lessons, built-in AI teaching assistant, and a prompt playground that generates real HTML/CSS/JS.

一个面向零基础学习者的 AI 辅助编程（Vibe Coding）互动教学网站。12 节课程循序渐进，内置 AI 助教，Prompt Playground 可直接生成可运行的代码。

---

## Features / 功能

- **Structured curriculum / 系统化课程** — 12 lessons from concepts to hands-on practice / 从概念理解到动手实践
- **AI teaching assistant / AI 学习助手** — Ask questions anytime, get instant answers / 内置 AI 助教，随时提问
- **Prompt Playground** — Describe what you want, get runnable HTML/CSS/JS code / 输入描述即可生成可运行代码
- **Multi-model support / 多模型支持** — Claude, OpenAI, DeepSeek, and any OpenAI-compatible API

## Quick Start / 快速开始

### Auto setup / 自动设置（推荐）

```bash
bash scripts/setup.sh
```

### Manual / 手动

```bash
# 1. Install dependencies / 安装依赖
npm install

# 2. Configure environment / 配置环境变量
cp .env.example .env

# 3. Edit .env with your API key / 编辑 .env，填入 API Key

# 4. Start / 启动
npm run dev
```

Open http://localhost:3000 to start learning. / 打开 http://localhost:3000 开始学习。

> Detailed setup guide for beginners: [SETUP_GUIDE.md](./SETUP_GUIDE.md) / 详细的零基础设置指南

## Model Configuration / 配置多模型

Supports three AI providers, configured via `.env`:

### DeepSeek (recommended for users in China / 推荐，国内直接访问)
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

### OpenAI or compatible / 或兼容接口
```env
AI_PROVIDER=openai
AI_MODEL=gpt-4o
OPENAI_API_KEY=sk-...
```

## Tech Stack / 技术栈

- [Next.js](https://nextjs.org/) 16 + React 19 + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4
- [AI SDK](https://sdk.vercel.ai/) — unified multi-model interface / 统一多模型接口
- [Lucide React](https://lucide.dev/) — icons / 图标
- [react-markdown](https://github.com/remarkjs/react-markdown) — content rendering / 渲染课程内容

## Project Structure / 项目结构

```
app/
  api/agent/route.ts      # AI streaming chat API / AI 对话流式接口
  lesson/[id]/page.tsx    # Lesson detail page / 课程详情页
  page.tsx                # Home page / 首页
  layout.tsx              # Root layout / 根布局
components/
  ChatInterface.tsx       # AI chat component / AI 聊天组件
  PromptPlayground.tsx    # Code generation sandbox / 代码生成练习区
  LessonNavigator.tsx     # Course navigation sidebar / 课程导航侧边栏
lib/
  lessons.ts              # Course data / 课程数据
scripts/
  setup.sh                # Auto setup script / 自动设置脚本
```

## Customizing Lessons / 自定义课程

Edit `lib/lessons.ts` to modify or add lessons. Content supports Markdown. / 编辑 `lib/lessons.ts` 即可修改或添加课程内容，支持 Markdown 格式。

## License

MIT
