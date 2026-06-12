**語言 / Language:** [English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-Hant.md) | [日本語](README.ja.md)

# Vibe Coding 入門課

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![CI](https://github.com/sixtdreanight/vibe-coding-agent/actions/workflows/ci.yml/badge.svg)](https://github.com/sixtdreanight/vibe-coding-agent/actions/workflows/ci.yml)

一個面向零基礎學習者的 AI 輔助程式設計（Vibe Coding）互動教學網站。22 節課涵蓋 7 個章節，內建 AI 助教、遊戲化系統、Prompt Playground 可直接生成可執行的程式碼。

---

## 功能

- **22 節系統化課程** — 7 個章節從概念到發布
- **AI 學習助手** — 蘇格拉底引導模式 + 直接回答模式，串流回應
- **Prompt Playground** — 輸入描述即可生成可執行的 HTML/CSS/JS 程式碼
- **遊戲化系統** — 經驗值、等級、連續學習天數、10 種成就徽章
- **程式碼練習** — 互動式練習，附提示與自動檢查
- **學習儀表板** — 進度追蹤、熱力圖、技能雷達圖
- **PWA 支援** — 可安裝到桌面，支援離線使用
- **多模型支援** — Claude、OpenAI、DeepSeek 及任意 OpenAI 相容介面
- **AI 降級** — 主服務故障時自動切換到備用服務

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

### Docker

```bash
docker compose up -d
```

## 設定

### 必填

```env
# API 認證金鑰（產生一個隨機字串）
AI_API_AUTH_TOKEN=你的金鑰

# 主 AI 服務商
AI_PROVIDER=openai-compatible
AI_MODEL=deepseek-chat
AI_API_KEY=sk-...
AI_BASE_URL=https://api.deepseek.com/v1
```

### 選用：備用 AI 服務商

主服務商故障時自動切換：

```env
AI_FALLBACK_PROVIDER=openai
AI_FALLBACK_MODEL=gpt-4o-mini
AI_FALLBACK_API_KEY=sk-...
AI_FALLBACK_BASE_URL=https://api.openai.com/v1
```

完整設定參見 `.env.example`。

## 開發

```bash
npm install
npm run dev      # 啟動開發伺服器
npm test         # 執行測試（46 個測試，4 個套件）
npm run build    # 生產建置
```

## 技術棧

- [Next.js](https://nextjs.org/) 16 + React 19 + TypeScript（strict 模式）
- [Tailwind CSS](https://tailwindcss.com/) v4
- [AI SDK](https://sdk.vercel.ai/) — 統一多模型介面
- [Vitest](https://vitest.dev/) — 單元測試（目標 80%+ 覆蓋率）
- [Lucide React](https://lucide.dev/) — 圖示
- [react-markdown](https://github.com/remarkjs/react-markdown) — 渲染課程內容

## 專案結構

```
app/
  api/agent/route.ts        # AI 對話串流介面（認證 + 限流 + 降級）
  api/review/route.ts       # AI 程式碼審閱介面
  api/storage/route.ts      # 伺服器端鍵值儲存
  api/analytics/route.ts    # 資料分析端點
  lesson/[id]/page.tsx      # 課程詳情頁
  dashboard/page.tsx        # 學習儀表板
  page.tsx                  # 首頁
components/
  ChatInterface.tsx         # AI 聊天元件
  PromptPlayground.tsx      # 程式碼生成練習區
  exercise/                 # 互動程式碼練習
  dashboard/                # 統計、熱力圖、技能雷達
  gamification/             # 經驗條、徽章解鎖、彩帶特效
  visualizations/           # 動畫流程圖、DOM 樹
lib/
  lessons.ts                # 22 節課定義
  progress.ts               # 學習進度（Repository 模式）
  gamification.ts           # 經驗值、等級、連續學習
  achievements.ts           # 10 種成就徽章
  adaptive.ts               # 學習推薦引擎
  repository.ts             # 儲存抽象層（localStorage / 伺服器端）
  logger.ts                 # 結構化日誌
  analytics.ts              # 使用者行為追蹤
scripts/
  setup.sh                  # 自動設定指令碼
  generate-icons.mjs        # PWA 圖示產生器
```

## 自訂課程

編輯 `lib/lessons.ts` 即可修改或新增課程內容，支援 Markdown 格式。

## 部署

### Vercel（推薦）

1. 推送程式碼到 GitHub
2. 在 [vercel.com](https://vercel.com/) 匯入倉庫
3. 在專案設定中新增環境變數
4. 點擊部署

### Docker

```bash
docker compose up -d
```

使用多階段建置，映像檔約 150MB。

## 相關專案

- [Blog-mizuki](https://github.com/sixtdreanight/Blog-mizuki) — 作者個人部落格，更多 Vibe Coding 相關文章

## License

MIT

---

<div align="center">

**Language / 語言 / 言語**

[**English**](README.md) | [**简体中文**](README.zh-CN.md) | [**繁體中文**](README.zh-Hant.md) | [**日本語**](README.ja.md)

</div>
