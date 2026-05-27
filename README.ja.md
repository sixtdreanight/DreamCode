**言語 / Language:** [English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-Hant.md) | [日本語](README.ja.md)

# Vibe Coding 入門コース

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![AI SDK](https://img.shields.io/badge/AI%20SDK-multi--model-purple)](https://sdk.vercel.ai/)

ゼロから学べる AI アシストプログラミング（Vibe Coding）のインタラクティブな学習サイトです。12 のレッスンで段階的に学習でき、AI チューターが組み込まれており、Prompt Playground で直接実行可能なコードを生成できます。

---

## 機能

- **体系的なカリキュラム** — 12 のレッスンで概念理解から実践まで
- **AI 学習アシスタント** — 組み込みの AI チューターにいつでも質問可能
- **Prompt Playground** — 説明を入力するだけで実行可能なコードを生成
- **マルチモデル対応** — Claude、OpenAI、DeepSeek 及び任意の OpenAI 互換インターフェース

## クイックスタート

### 自動セットアップ（推奨）

```bash
bash scripts/setup.sh
```

### 手動セットアップ

```bash
npm install
cp .env.example .env
# .env を編集して API Key を入力
npm run dev
```

http://localhost:3000 にアクセスして学習を開始してください。

> 初心者向けの詳細なセットアップガイド：[SETUP_GUIDE.md](./SETUP_GUIDE.md)

## マルチモデルの設定

3 つの AI プロバイダーを `.env` で設定できます：

### DeepSeek（推奨、国内から直接アクセス可能）

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

### OpenAI または互換インターフェース

```env
AI_PROVIDER=openai
AI_MODEL=gpt-4o
OPENAI_API_KEY=sk-...
```

## 技術スタック

- [Next.js](https://nextjs.org/) 16 + React 19 + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4
- [AI SDK](https://sdk.vercel.ai/) — 統一マルチモデルインターフェース
- [Lucide React](https://lucide.dev/) — アイコン
- [react-markdown](https://github.com/remarkjs/react-markdown) — レッスンコンテンツのレンダリング

## プロジェクト構造

```
app/
  api/agent/route.ts      # AI 会話ストリーミング API
  lesson/[id]/page.tsx    # レッスン詳細ページ
  page.tsx                # トップページ
  layout.tsx              # ルートレイアウト
components/
  ChatInterface.tsx       # AI チャットコンポーネント
  PromptPlayground.tsx    # コード生成練習エリア
  LessonNavigator.tsx     # レッスンナビゲーションサイドバー
lib/
  lessons.ts              # レッスンデータ
scripts/
  setup.sh                # 自動セットアップスクリプト
```

## カスタムレッスン

`lib/lessons.ts` を編集すると、レッスンコンテンツの修正や追加が可能です。Markdown 形式に対応しています。

## 関連プロジェクト

- [myBlog](https://github.com/sixtdreanight/myBlog) — 著者の個人ブログ、Vibe Coding に関する記事多数

## License

MIT

---

<div align="center">

**Language / 語言 / 言語**

[**English**](README.md) | [**简体中文**](README.zh-CN.md) | [**繁體中文**](README.zh-Hant.md) | [**日本語**](README.ja.md)

</div>
