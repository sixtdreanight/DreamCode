"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { lessons } from "@/lib/lessons";
import { BookOpen, Circle, Menu, X } from "lucide-react";

export default function LessonNavigator() {
  const pathname = usePathname();
  const currentId = pathname.split("/").pop();
  const [open, setOpen] = useState(false);

  const modules = lessons.reduce(
    (acc, lesson) => {
      if (!acc[lesson.module]) acc[lesson.module] = [];
      acc[lesson.module].push(lesson);
      return acc;
    },
    {} as Record<string, typeof lessons>
  );

  const nav = (
    <>
      <div className="p-4 border-b border-edge shrink-0">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-accent hover:opacity-80 transition-opacity"
        >
          <BookOpen className="w-5 h-5" />
          梦夜的编程课
        </Link>
      </div>
      <div className="p-2 space-y-4 overflow-y-auto flex-1">
        {Object.entries(modules).map(([moduleName, moduleLessons], idx) => (
          <div key={moduleName} className="animate-fade-in" style={{ animationDelay: `${idx * 80}ms` }}>
            <h3 className="px-3 py-2 text-xs font-semibold text-muted uppercase tracking-wider">
              {moduleName}
            </h3>
            <ul className="space-y-1">
              {moduleLessons.map((lesson) => {
                const isActive = lesson.id === currentId;
                return (
                  <li key={lesson.id}>
                    <Link
                      href={`/lesson/${lesson.id}`}
                      onClick={() => setOpen(false)}
                      className={`flex items-start gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive
                          ? "bg-accent/10 text-accent font-medium"
                          : "text-muted hover:text-accent hover:bg-surface-alt"
                      }`}
                    >
                      <Circle className={`w-4 h-4 mt-0.5 shrink-0 ${isActive ? "fill-accent text-accent" : "text-muted opacity-50"}`} />
                      <div className="min-w-0">
                        <div className="truncate">{lesson.title}</div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-3 left-3 z-50 md:hidden w-9 h-9 rounded-lg bg-surface border border-edge flex items-center justify-center hover:bg-surface-alt transition-colors"
        aria-label={open ? "关闭菜单" : "打开菜单"}
      >
        {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden animate-fade-in"
          onClick={() => setOpen(false)}
        />
      )}

      <nav
        className={`fixed md:sticky top-0 left-0 z-40 w-64 h-screen shrink-0 border-r border-edge bg-surface-alt flex flex-col ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } transition-transform duration-300 ease-in-out`}
      >
        {nav}
      </nav>
    </>
  );
}
