**Language:** [English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-Hant.md) | [日本語](README.ja.md)

# Vibe Coding Crash Course

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![AI SDK](https://img.shields.io/badge/AI%20SDK-multi--model-purple)](https://sdk.vercel.ai/)

An interactive tutorial site that teaches absolute beginners how to code with AI assistance (Vibe Coding). 12 lessons, built-in AI teaching assistant, and a prompt playground that generates real HTML/CSS/JS.

---

## Features

- **Structured curriculum** — 12 lessons from concepts to hands-on practice
- **AI teaching assistant** — Ask questions anytime, get instant answers
- **Prompt Playground** — Describe what you want, get runnable HTML/CSS/JS code
- **Multi-model support** — Claude, OpenAI, DeepSeek, and any OpenAI-compatible API

## Quick Start

### Auto setup (recommended)

```bash
bash scripts/setup.sh
```

### Manual

```bash
npm install
cp .env.example .env
# Edit .env with your API key
npm run dev
```

Open http://localhost:3000 to start learning.

> Detailed setup guide for beginners: [SETUP_GUIDE.md](./SETUP_GUIDE.md)

## Model Configuration

Supports three AI providers, configured via `.env`:

### DeepSeek (recommended for users in China)

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

### OpenAI or compatible

```env
AI_PROVIDER=openai
AI_MODEL=gpt-4o
OPENAI_API_KEY=sk-...
```

## Tech Stack

- [Next.js](https://nextjs.org/) 16 + React 19 + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4
- [AI SDK](https://sdk.vercel.ai/) — unified multi-model interface
- [Lucide React](https://lucide.dev/) — icons
- [react-markdown](https://github.com/remarkjs/react-markdown) — content rendering

## Project Structure

```
app/
  api/agent/route.ts      # AI streaming chat API
  lesson/[id]/page.tsx    # Lesson detail page
  page.tsx                # Home page
  layout.tsx              # Root layout
components/
  ChatInterface.tsx       # AI chat component
  PromptPlayground.tsx    # Code generation sandbox
  LessonNavigator.tsx     # Course navigation sidebar
lib/
  lessons.ts              # Course data
scripts/
  setup.sh                # Auto setup script
```

## Customizing Lessons

Edit `lib/lessons.ts` to modify or add lessons. Content supports Markdown.

## Related

- [myBlog](https://github.com/sixtdreanight/myBlog) — Author's personal blog, more articles on vibe coding

## License

MIT

---

<div align="center">

**Language / 语言 / 言語**

[**English**](README.md) | [**简体中文**](README.zh-CN.md) | [**繁體中文**](README.zh-Hant.md) | [**日本語**](README.ja.md)

</div>
