import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getLesson,
  getNextLessonId,
  getPrevLessonId,
  lessons,
} from "@/lib/lessons";
import LessonNavigator from "@/components/LessonNavigator";
import ChatInterface from "@/components/ChatInterface";
import PromptPlayground from "@/components/PromptPlayground";
import ReactMarkdown from "react-markdown";
import { ChevronLeft, ChevronRight, MessageCircle, Wand2 } from "lucide-react";

export function generateStaticParams() {
  return lessons.map((lesson) => ({ id: lesson.id }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lesson = getLesson(id);
  if (!lesson) return notFound();

  const nextId = getNextLessonId(id);
  const prevId = getPrevLessonId(id);

  return (
    <div className="flex min-h-screen">
      <LessonNavigator />
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 max-w-4xl mx-auto w-full p-6 md:p-10">
          <div className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
            {lesson.module}
          </div>
          <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>

          <div className="prose dark:prose-invert max-w-none mb-10">
            <ReactMarkdown>{lesson.content}</ReactMarkdown>
          </div>

          {lesson.hasChat && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold">AI 助教</h2>
                <span className="text-sm text-zinc-500">
                  有任何问题，随时提问
                </span>
              </div>
              <div className="h-[500px]">
                <ChatInterface />
              </div>
            </div>
          )}

          {lesson.hasPlayground && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Wand2 className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-semibold">Prompt Playground</h2>
                <span className="text-sm text-zinc-500">
                  动手练习，描述你的想法，让 AI 生成代码
                </span>
              </div>
              <div className="h-[600px]">
                <PromptPlayground />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-8 border-t">
            {prevId ? (
              <Link
                href={`/lesson/${prevId}`}
                className="flex items-center gap-1 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                <ChevronLeft className="w-4 h-4" />
                上一课
              </Link>
            ) : (
              <div />
            )}
            {nextId ? (
              <Link
                href={`/lesson/${nextId}`}
                className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                下一课
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                href="/"
                className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                回到首页
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
