import Link from "next/link";
import { lessons } from "@/lib/lessons";
import { BookOpen, Sparkles, ArrowRight } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";
import TotalProgress from "@/components/TotalProgress";

export default function Home() {
  const modules = lessons.reduce(
    (acc, lesson) => {
      if (!acc[lesson.module]) acc[lesson.module] = [];
      acc[lesson.module].push(lesson);
      return acc;
    },
    {} as Record<string, typeof lessons>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <header className="border-b bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-5xl mx-auto px-6 py-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Vibe Coding 入门课</h1>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-lg">
            零基础也能学会编程。不需要背语法、不需要写复杂代码，只要学会和 AI
            对话，你就能创造出自己的网站、工具和应用。
          </p>
          <div className="mt-4 max-w-xs">
            <TotalProgress total={lessons.length} />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid gap-8 md:grid-cols-2">
          {Object.entries(modules).map(([moduleName, moduleLessons], idx) => (
            <div
              key={moduleName}
              className="border rounded-2xl p-6 bg-zinc-50 dark:bg-zinc-900 hover:shadow-md transition-all hover:-translate-y-0.5 animate-slide-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </span>
                <h2 className="text-lg font-bold">{moduleName}</h2>
              </div>
              <ul className="space-y-2">
                {moduleLessons.map((lesson) => (
                  <li key={lesson.id}>
                    <Link
                      href={`/lesson/${lesson.id}`}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-zinc-800 hover:ring-2 hover:ring-accent/20 hover:shadow-sm transition-all group"
                    >
                      <BookOpen className="w-5 h-5 text-zinc-400 group-hover:text-accent mt-0.5 shrink-0 transition-colors" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">
                          {lesson.title}
                        </div>
                        <div className="text-xs text-zinc-500 mt-0.5 line-clamp-1">
                          {lesson.description}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-accent group-hover:translate-x-0.5 shrink-0 mt-1 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-fade-in">
          <h3 className="text-xl font-bold mb-3">准备好了吗？</h3>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            点击任意课程开始学习。建议按顺序进行，但也可以跳到感兴趣的部分。
          </p>
          <Link
            href={`/lesson/${lessons[0].id}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-medium hover:opacity-90 active:scale-95 transition-all"
          >
            开始学习第一课
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <footer className="border-t mt-20 py-8 text-center text-sm text-zinc-500">
        Vibe Coding 入门课 — 让每个人都能创造
      </footer>
    </div>
  );
}
