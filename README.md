# Vibe Coding 入门课

一个面向零基础学习者的 AI 辅助编程（Vibe Coding）互动教学网站。

## 功能

- **系统化课程**：从概念理解到动手实践，12 节课程循序渐进
- **AI 学习助手**：内置 Claude AI 助教，随时提问、随时解答
- **Prompt Playground**：输入描述即可生成可运行的 HTML/CSS/JS 代码
- **完全中文**：所有内容和界面均为中文，零门槛学习

## 技术栈

- [Next.js](https://nextjs.org/) 16 + React 19 + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4
- [Anthropic Claude API](https://www.anthropic.com/) — AI 对话与代码生成
- [Lucide React](https://lucide.dev/) — 图标
- [react-markdown](https://github.com/remarkjs/react-markdown) — 渲染课程内容

## 本地开发

### 1. 克隆项目

```bash
git clone https://github.com/你的用户名/vibe-coding-agent.git
cd vibe-coding-agent
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

```bash
cp .env.example .env.local
```

编辑 `.env.local`，填入你的 Anthropic API Key：

```
ANTHROPIC_API_KEY=sk-ant-...
```

获取 API Key：[Anthropic Console](https://console.anthropic.com/)

### 4. 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 开始学习。

## 部署

### 部署到 Vercel（推荐）

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 在 Environment Variables 中添加 `ANTHROPIC_API_KEY`
4. 部署完成

### 其他平台

任何支持 Next.js 的平台均可部署，如：
- [Railway](https://railway.app/)
- [Render](https://render.com/)
- [AWS](https://aws.amazon.com/)

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
```

## 自定义课程

编辑 `lib/lessons.ts` 即可修改或添加课程内容。课程支持 Markdown 格式。

## License

MIT
