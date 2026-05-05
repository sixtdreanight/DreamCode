import Link from "next/link";
import { lessons } from "@/lib/lessons";
import { BookOpen, Sparkles, ArrowRight } from "lucide-react";
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
    <div>
      <header className="border-b border-edge bg-surface-alt">
        <div className="max-w-[800px] mx-auto px-4 py-16 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <h1 className="text-4xl font-bold">梦夜的编程课</h1>
          </div>
          <p className="text-muted text-lg max-w-2xl">
            零基础也能学会编程。不需要背语法、不需要写复杂代码，只要学会和 AI
            对话，你就能创造出自己的网站、工具和应用。
          </p>
          <div className="mt-4 max-w-xs">
            <TotalProgress total={lessons.length} />
          </div>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto px-4 py-16 space-y-8">
        <section>
          <div className="mb-8 font-bold uppercase tracking-widest text-accent text-sm">
            课程大纲
          </div>
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            {Object.entries(modules).map(([moduleName, moduleLessons], idx) => (
              <div
                key={moduleName}
                className="rounded-lg bg-surface-alt p-6 animate-slide-up"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </span>
                  <h2 className="font-bold">{moduleName}</h2>
                </div>
                <ul className="space-y-1">
                  {moduleLessons.map((lesson) => (
                    <li key={lesson.id}>
                      <Link
                        href={`/lesson/${lesson.id}`}
                        className="flex items-center gap-2 p-2 -mx-2 rounded-lg text-sm text-muted hover:text-accent transition-colors group"
                      >
                        <BookOpen className="w-4 h-4 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                        <span>{lesson.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="pt-8 border-t border-edge text-center animate-fade-in">
          <p className="text-muted mb-4">建议按顺序学习，也可以跳到感兴趣的部分</p>
          <Link
            href={`/lesson/${lessons[0].id}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:opacity-80 transition-opacity"
          >
            开始学习第一课
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <footer className="border-t border-edge py-8 text-center text-sm text-muted">
        梦夜的编程课 — 让每个人都能创造
      </footer>
    </div>
  );
}
