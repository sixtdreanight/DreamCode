"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { lessons } from "@/lib/lessons";
import { BookOpen, Circle, Menu, X, ChevronRight, Sparkles } from "lucide-react";
import { loadProgress } from "@/lib/progress";

export default function LessonNavigator() {
  const pathname = usePathname();
  const currentId = pathname.split("/").pop();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const p = loadProgress();
    const map: Record<string, boolean> = {};
    for (const [id, data] of Object.entries(p.lessons)) {
      map[id] = data.completed;
    }
    setProgress(map);
  }, [pathname]);

  const modules = lessons.reduce(
    (acc, lesson) => {
      if (!acc[lesson.module]) acc[lesson.module] = [];
      acc[lesson.module].push(lesson);
      return acc;
    },
    {} as Record<string, typeof lessons>
  );

  const completedCount = Object.values(progress).filter(Boolean).length;

  const nav = (
    <>
      {/* Header */}
      <div className="p-5 border-b border-edge shrink-0">
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
        >
          <span className="w-9 h-9 rounded-xl bg-accent text-white flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
            <Sparkles className="w-4.5 h-4.5" />
          </span>
          <div className="min-w-0">
            <div className="font-display font-bold text-base leading-tight group-hover:text-accent transition-colors">
              梦夜的编程课
            </div>
            <div className="text-[10px] text-muted">
              {completedCount} / {lessons.length} 课完成
            </div>
          </div>
        </Link>
      </div>

      {/* Lesson list */}
      <div className="p-3 space-y-5 overflow-y-auto flex-1">
        {Object.entries(modules).map(([moduleName, moduleLessons], idx) => {
          const moduleCompleted = moduleLessons.every((l) => progress[l.id]);
          return (
            <div key={moduleName}>
              {/* Module title */}
              <div className="px-3 mb-2 flex items-center gap-2">
                <span
                  className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 ${
                    moduleCompleted
                      ? "bg-success text-white"
                      : "bg-surface-raised text-muted"
                  }`}
                >
                  {moduleCompleted ? "✓" : idx + 1}
                </span>
                <h3 className="text-[11px] font-semibold text-muted uppercase tracking-wider leading-tight line-clamp-1">
                  {moduleName}
                </h3>
              </div>

              {/* Lessons */}
              <ul className="space-y-0.5">
                {moduleLessons.map((lesson) => {
                  const isActive = lesson.id === currentId;
                  const isCompleted = progress[lesson.id];
                  return (
                    <li key={lesson.id}>
                      <Link
                        href={`/lesson/${lesson.id}`}
                        onClick={() => setOpen(false)}
                        className={`flex items-start gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group/item ${
                          isActive
                            ? "bg-accent-soft text-accent font-semibold shadow-sm"
                            : "text-muted hover:text-accent hover:bg-surface"
                        }`}
                      >
                        {/* Status indicator */}
                        <span className="mt-[3px] shrink-0">
                          {isCompleted ? (
                            <span className="w-4 h-4 rounded-full bg-success flex items-center justify-center">
                              <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
                                <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                          ) : isActive ? (
                            <ChevronRight className="w-4 h-4 text-accent" />
                          ) : (
                            <Circle className="w-4 h-4 text-faint/40" />
                          )}
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="truncate">{lesson.title}</div>
                          {lesson.type === "project" && (
                            <span className="text-[9px] text-warning font-medium">实战项目</span>
                          )}
                        </div>

                        {/* Lesson number */}
                        <span className="text-[10px] text-faint/50 tabular-nums mt-[2px] shrink-0">
                          {lesson.id}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-edge shrink-0">
        <Link
          href="/"
          className="flex items-center justify-center gap-1.5 text-xs text-muted hover:text-accent transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" />
          回到课程首页
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-3 left-3 z-50 md:hidden w-10 h-10 rounded-xl glass flex items-center justify-center hover:border-accent/30 transition-all"
        aria-label={open ? "关闭菜单" : "打开菜单"}
      >
        {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden animate-fade-in"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`fixed md:sticky top-0 left-0 z-40 w-72 h-screen shrink-0 border-r border-edge bg-surface-alt/95 backdrop-blur flex flex-col ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } transition-transform duration-300 var(--ease-out-expo)`}
      >
        {nav}
      </nav>
    </>
  );
}
