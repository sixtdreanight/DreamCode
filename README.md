**Language:** [English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-Hant.md) | [日本語](README.ja.md)

# Vibe Coding Crash Course

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![CI](https://github.com/sixtdreanight/vibe-coding-agent/actions/workflows/ci.yml/badge.svg)](https://github.com/sixtdreanight/vibe-coding-agent/actions/workflows/ci.yml)

An interactive tutorial site that teaches absolute beginners how to code with AI assistance (Vibe Coding). 22 lessons across 7 chapters, built-in AI teaching assistant, gamification system, and a prompt playground that generates real HTML/CSS/JS.

---

## Features

- **22 structured lessons** — 7 chapters from concepts to publishing
- **AI teaching assistant** — Socratic and direct modes, streaming responses
- **Prompt Playground** — Describe what you want, get runnable HTML/CSS/JS code
- **Gamification** — XP, levels, streaks, 10 achievement badges
- **Code exercises** — Interactive exercises with hints and auto-check
- **Learning dashboard** — Progress tracking, heatmap, skill radar
- **PWA support** — Installable, works offline
- **Multi-model support** — Claude, OpenAI, DeepSeek, and any OpenAI-compatible API
- **AI fallback** — Automatic switch to backup provider if primary fails

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

### Docker

```bash
docker compose up -d
```

## Configuration

### Required

```env
# Shared secret for API authentication (generate a random string)
AI_API_AUTH_TOKEN=your-secret-token

# Primary AI provider
AI_PROVIDER=openai-compatible
AI_MODEL=deepseek-chat
AI_API_KEY=sk-...
AI_BASE_URL=https://api.deepseek.com/v1
```

### Optional: Fallback AI Provider

If the primary AI provider fails, the fallback is tried automatically:

```env
AI_FALLBACK_PROVIDER=openai
AI_FALLBACK_MODEL=gpt-4o-mini
AI_FALLBACK_API_KEY=sk-...
AI_FALLBACK_BASE_URL=https://api.openai.com/v1
```

See `.env.example` for all options.

## Development

```bash
npm install
npm run dev      # Start dev server
npm test         # Run tests (46 tests, 4 suites)
npm run build    # Production build
```

## Tech Stack

- [Next.js](https://nextjs.org/) 16 + React 19 + TypeScript (strict mode)
- [Tailwind CSS](https://tailwindcss.com/) v4
- [AI SDK](https://sdk.vercel.ai/) — unified multi-model interface
- [Vitest](https://vitest.dev/) — unit testing (80%+ coverage target)
- [Lucide React](https://lucide.dev/) — icons
- [react-markdown](https://github.com/remarkjs/react-markdown) — content rendering

## Project Structure

```
app/
  api/agent/route.ts        # AI streaming chat API (auth + rate limit + fallback)
  api/review/route.ts       # AI code review API
  api/storage/route.ts      # Server-side key-value storage
  api/analytics/route.ts    # Analytics event endpoint
  lesson/[id]/page.tsx      # Lesson detail page
  dashboard/page.tsx        # Learning dashboard
  page.tsx                  # Home page
components/
  ChatInterface.tsx         # AI chat with Socratic mode
  PromptPlayground.tsx      # Code generation sandbox
  exercise/                 # Interactive code exercises
  dashboard/                # Stats, heatmap, skill radar
  gamification/             # XP bar, badge unlock, confetti
  visualizations/           # Animated flow charts, DOM tree
lib/
  lessons.ts                # 22 lesson definitions
  progress.ts               # Learning progress (Repository pattern)
  gamification.ts           # XP, levels, streaks
  achievements.ts           # 10 badges with conditions
  adaptive.ts               # Learning recommendations
  repository.ts             # Storage abstraction (localStorage / server)
  logger.ts                 # Structured JSON logging
  analytics.ts              # User behavior tracking
scripts/
  setup.sh                  # Auto setup script
  generate-icons.mjs        # PWA icon generator
```

## Customizing Lessons

Edit `lib/lessons.ts` to modify or add lessons. Content supports Markdown.

## Deployment

### Vercel (easiest)

1. Push to GitHub
2. Import repo at [vercel.com](https://vercel.com/)
3. Add environment variables in project settings
4. Deploy

### Docker

```bash
docker compose up -d
```

The image uses multi-stage builds for a small footprint (~150MB).

## License

MIT

---

<div align="center">

**Language / 语言 / 言語**

[**English**](README.md) | [**简体中文**](README.zh-CN.md) | [**繁體中文**](README.zh-Hant.md) | [**日本語**](README.ja.md)

</div>
