import { readFileSync } from "fs";
import { join } from "path";

function load(id: string) {
  return readFileSync(join(process.cwd(), "content/lessons", `${id}.md`), "utf-8");
}

export interface Lesson {
  id: string;
  module: string;
  title: string;
  description: string;
  content: string;
  hasChat: boolean;
  hasPlayground: boolean;
  type: "lesson" | "project";
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedMinutes: number;
  prerequisites: string[];
  tags: string[];
  quizId?: string;
  projectId?: string;
}

export const lessons: Lesson[] = [
  {
    id: "1-1", module: "第一章：什么是 Vibe Coding", title: "编程是什么",
    description: "不需要害怕，编程就是让电脑帮你做事",
    content: load("1-1"), hasChat: true, hasPlayground: false,
    type: "lesson", difficulty: "beginner", estimatedMinutes: 8,
    prerequisites: [], tags: ["概念"],
  },
  {
    id: "1-2", module: "第一章：什么是 Vibe Coding", title: "AI 能帮我们做什么",
    description: "了解 AI 编程助手的能力边界",
    content: load("1-2"), hasChat: true, hasPlayground: false,
    type: "lesson", difficulty: "beginner", estimatedMinutes: 8,
    prerequisites: [], tags: ["概念"],
  },
  {
    id: "1-3", module: "第一章：什么是 Vibe Coding", title: "什么是 Vibe Coding",
    description: "进入心流状态，让创意自然流淌",
    content: load("1-3"), hasChat: true, hasPlayground: false,
    type: "lesson", difficulty: "beginner", estimatedMinutes: 10,
    prerequisites: ["1-1", "1-2"], tags: ["概念"],
  },
  {
    id: "2-1", module: "第二章：如何和 AI 对话", title: "描述你的需求",
    description: "好的描述 = 好的结果",
    content: load("2-1"), hasChat: true, hasPlayground: false,
    type: "lesson", difficulty: "beginner", estimatedMinutes: 10,
    prerequisites: ["1-3"], tags: ["技巧"],
  },
  {
    id: "2-2", module: "第二章：如何和 AI 对话", title: "给出具体例子",
    description: "例子比抽象描述更有力",
    content: load("2-2"), hasChat: true, hasPlayground: false,
    type: "lesson", difficulty: "beginner", estimatedMinutes: 12,
    prerequisites: ["2-1"], tags: ["技巧"],
  },
  {
    id: "2-3", module: "第二章：如何和 AI 对话", title: "一步步来",
    description: "不要一次要求太多，分步实现",
    content: load("2-3"), hasChat: true, hasPlayground: false,
    type: "lesson", difficulty: "beginner", estimatedMinutes: 10,
    prerequisites: ["2-2"], tags: ["技巧"],
  },
  {
    id: "3-1", module: "第三章：动手实践", title: "创建一个网页",
    description: "打开右侧 playground，开始你的第一次 vibe coding",
    content: load("3-1"), hasChat: false, hasPlayground: true,
    type: "lesson", difficulty: "beginner", estimatedMinutes: 15,
    prerequisites: ["2-3"], tags: ["实践"],
  },
  {
    id: "3-2", module: "第三章：动手实践", title: "修改和优化",
    description: "迭代是 Vibe Coding 的核心",
    content: load("3-2"), hasChat: false, hasPlayground: true,
    type: "lesson", difficulty: "beginner", estimatedMinutes: 12,
    prerequisites: ["3-1"], tags: ["实践"],
  },
  {
    id: "3-3", module: "第三章：动手实践", title: "保存你的代码",
    description: "学会管理和备份你的作品",
    content: load("3-3"), hasChat: true, hasPlayground: false,
    type: "lesson", difficulty: "intermediate", estimatedMinutes: 12,
    prerequisites: ["3-2"], tags: ["实践", "工具"],
  },
  {
    id: "4-1", module: "第四章：进阶技巧", title: "当 AI 犯错时怎么办",
    description: "AI 不是万能的，学会处理错误",
    content: load("4-1"), hasChat: true, hasPlayground: false,
    type: "lesson", difficulty: "intermediate", estimatedMinutes: 12,
    prerequisites: ["3-3"], tags: ["技巧"],
  },
  {
    id: "4-2", module: "第四章：进阶技巧", title: "如何继续对话",
    description: "让 AI 记住上下文，保持连贯",
    content: load("4-2"), hasChat: true, hasPlayground: false,
    type: "lesson", difficulty: "intermediate", estimatedMinutes: 10,
    prerequisites: ["4-1"], tags: ["技巧"],
  },
  {
    id: "4-3", module: "第四章：进阶技巧", title: "做出你的作品",
    description: "从学习到创造，完成你的第一个项目",
    content: load("4-3"), hasChat: true, hasPlayground: true,
    type: "lesson", difficulty: "intermediate", estimatedMinutes: 15,
    prerequisites: ["4-2"], tags: ["实践", "项目"],
  },
  {
    id: "5-1", module: "第五章：工具与准备工作", title: "AI 工具对比与选择",
    description: "Claude、ChatGPT、Cursor、Copilot 各有千秋，选对工具事半功倍",
    content: load("5-1"), hasChat: true, hasPlayground: false,
    type: "lesson", difficulty: "beginner", estimatedMinutes: 10,
    prerequisites: ["4-3"], tags: ["工具"],
  },
  {
    id: "5-2", module: "第五章：工具与准备工作", title: "注册与第一次对话",
    description: "从注册账号到发出第一条指令，一步步带你上手",
    content: load("5-2"), hasChat: true, hasPlayground: false,
    type: "lesson", difficulty: "beginner", estimatedMinutes: 8,
    prerequisites: ["5-1"], tags: ["工具"],
  },
  {
    id: "5-3", module: "第五章：工具与准备工作", title: "文件与文件夹基础",
    description: "不懂编程也要会的文件管理知识",
    content: load("5-3"), hasChat: false, hasPlayground: false,
    type: "lesson", difficulty: "beginner", estimatedMinutes: 10,
    prerequisites: ["5-2"], tags: ["工具"],
  },
  {
    id: "5-4", module: "第五章：工具与准备工作", title: "浏览器开发者工具入门",
    description: "按 F12 能看到什么？学会查看和调试代码效果",
    content: load("5-4"), hasChat: true, hasPlayground: false,
    type: "lesson", difficulty: "intermediate", estimatedMinutes: 12,
    prerequisites: ["5-3"], tags: ["工具"],
  },
  {
    id: "6-1", module: "第六章：动手做项目", title: "做一个个人主页",
    description: "从零开始，构建属于你的个人名片网页",
    content: load("6-1"), hasChat: false, hasPlayground: true,
    type: "lesson", difficulty: "beginner", estimatedMinutes: 15,
    prerequisites: ["5-4"], tags: ["实践", "项目"],
  },
  {
    id: "6-2", module: "第六章：动手做项目", title: "做一个待办清单",
    description: "学会创建有交互功能的网页应用",
    content: load("6-2"), hasChat: false, hasPlayground: true,
    type: "lesson", difficulty: "intermediate", estimatedMinutes: 15,
    prerequisites: ["6-1"], tags: ["实践", "项目"],
  },
  {
    id: "6-3", module: "第六章：动手做项目", title: "做一个倒计时工具",
    description: "练习定时器、日期处理和界面更新",
    content: load("6-3"), hasChat: false, hasPlayground: true,
    type: "lesson", difficulty: "intermediate", estimatedMinutes: 12,
    prerequisites: ["6-2"], tags: ["实践", "项目"],
  },
  {
    id: "6-4", module: "第六章：动手做项目", title: "组合项目：个人作品集",
    description: "将之前的项目组合成一个作品集页面",
    content: load("6-4"), hasChat: false, hasPlayground: true,
    type: "lesson", difficulty: "intermediate", estimatedMinutes: 20,
    prerequisites: ["6-3"], tags: ["实践", "项目"],
  },
  {
    id: "7-1", module: "第七章：分享与发布", title: "网站是怎么出现在互联网上的",
    description: "理解托管、域名和部署的基本概念",
    content: load("7-1"), hasChat: true, hasPlayground: false,
    type: "lesson", difficulty: "beginner", estimatedMinutes: 8,
    prerequisites: ["6-4"], tags: ["工具"],
  },
  {
    id: "7-2", module: "第七章：分享与发布", title: "用 GitHub Pages 免费发布你的网站",
    description: "最简单的免费网站发布方式，手把手教学",
    content: load("7-2"), hasChat: true, hasPlayground: false,
    type: "lesson", difficulty: "intermediate", estimatedMinutes: 15,
    prerequisites: ["7-1"], tags: ["工具", "实践"],
  },
];

export function getLesson(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

export function getNextLessonId(id: string): string | null {
  const idx = lessons.findIndex((l) => l.id === id);
  if (idx >= 0 && idx < lessons.length - 1) return lessons[idx + 1].id;
  return null;
}

export function getPrevLessonId(id: string): string | null {
  const idx = lessons.findIndex((l) => l.id === id);
  if (idx > 0) return lessons[idx - 1].id;
  return null;
}
