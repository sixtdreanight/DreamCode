"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { lessons } from "@/lib/lessons";
import { BookOpen, CheckCircle2, Circle } from "lucide-react";

export default function LessonNavigator() {
  const pathname = usePathname();
  const currentId = pathname.split("/").pop();

  const modules = lessons.reduce(
    (acc, lesson) => {
      if (!acc[lesson.module]) acc[lesson.module] = [];
      acc[lesson.module].push(lesson);
      return acc;
    },
    {} as Record<string, typeof lessons>
  );

  return (
    <nav className="w-64 shrink-0 border-r bg-zinc-50 dark:bg-zinc-900 overflow-y-auto h-screen sticky top-0">
      <div className="p-4 border-b">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-blue-700 dark:text-blue-400"
        >
          <BookOpen className="w-5 h-5" />
          Vibe Coding 入门
        </Link>
      </div>
      <div className="p-2 space-y-4">
        {Object.entries(modules).map(([moduleName, moduleLessons]) => (
          <div key={moduleName}>
            <h3 className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              {moduleName}
            </h3>
            <ul className="space-y-1">
              {moduleLessons.map((lesson) => {
                const isActive = lesson.id === currentId;
                return (
                  <li key={lesson.id}>
                    <Link
                      href={`/lesson/${lesson.id}`}
                      className={`flex items-start gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 font-medium"
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      }`}
                    >
                      {isActive ? (
                        <Circle className="w-4 h-4 mt-0.5 shrink-0 fill-blue-600 text-blue-600" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-zinc-400" />
                      )}
                      <div>
                        <div>{lesson.title}</div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5 line-clamp-1">
                          {lesson.description}
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
