**語言 / Language:** [English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-Hant.md) | [日本語](README.ja.md)

# Vibe Coding 入門課

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![AI SDK](https://img.shields.io/badge/AI%20SDK-multi--model-purple)](https://sdk.vercel.ai/)

一個面向零基礎學習者的 AI 輔助程式設計（Vibe Coding）互動教學網站。12 節課程循序漸進，內建 AI 助教，Prompt Playground 可直接生成可執行的程式碼。

---

## 功能

- **系統化課程** — 12 節課程從概念理解到動手實踐
- **AI 學習助手** — 內建 AI 助教，隨時提問
- **Prompt Playground** — 輸入描述即可生成可執行程式碼
- **多模型支援** — Claude、OpenAI、DeepSeek 及任意 OpenAI 相容介面

## 快速開始

### 自動設定（推薦）

```bash
bash scripts/setup.sh
```

### 手動

```bash
npm install
cp .env.example .env
# 編輯 .env，填入 API Key
npm run dev
```

打開 http://localhost:3000 開始學習。

> 詳細的零基礎設定指南：[SETUP_GUIDE.md](./SETUP_GUIDE.md)

## 設定多模型

支援三種 AI 提供商，透過 `.env` 設定：

### DeepSeek（推薦，國內直接存取）

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

### OpenAI 或相容介面

```env
AI_PROVIDER=openai
AI_MODEL=gpt-4o
OPENAI_API_KEY=sk-...
```

## 技術棧

- [Next.js](https://nextjs.org/) 16 + React 19 + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4
- [AI SDK](https://sdk.vercel.ai/) — 統一多模型介面
- [Lucide React](https://lucide.dev/) — 圖示
- [react-markdown](https://github.com/remarkjs/react-markdown) — 渲染課程內容

## 專案結構

```
app/
  api/agent/route.ts      # AI 對話串流介面
  lesson/[id]/page.tsx    # 課程詳情頁
  page.tsx                # 首頁
  layout.tsx              # 根佈局
components/
  ChatInterface.tsx       # AI 聊天元件
  PromptPlayground.tsx    # 程式碼生成練習區
  LessonNavigator.tsx     # 課程導覽側邊欄
lib/
  lessons.ts              # 課程資料
scripts/
  setup.sh                # 自動設定腳本
```

## 自訂課程

編輯 `lib/lessons.ts` 即可修改或新增課程內容，支援 Markdown 格式。

## 相關專案

- [myBlog](https://github.com/sixtdreanight/myBlog) — 作者個人部落格，更多 Vibe Coding 相關文章

## License

MIT

---

<div align="center">

**Language / 語言 / 言語**

[**English**](README.md) | [**简体中文**](README.zh-CN.md) | [**繁體中文**](README.zh-Hant.md) | [**日本語**](README.ja.md)

</div>
