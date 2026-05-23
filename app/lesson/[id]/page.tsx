import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getLesson,
  getNextLessonId,
  getPrevLessonId,
  lessons,
} from "@/lib/lessons";
import { getLessonContent } from "@/lib/lessons-content";
import LessonNavigator from "@/components/LessonNavigator";
import ChatInterface from "@/components/ChatInterface";
import PromptPlayground from "@/components/PromptPlayground";
import LessonMeta from "@/components/LessonMeta";
import Quiz from "@/components/Quiz";
import { getQuizByLessonId, getQuizById } from "@/lib/quiz-data";
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
  const quiz = lesson.quizId ? getQuizById(lesson.quizId) : getQuizByLessonId(id);
  const content = getLessonContent(id);

  return (
    <div className="flex min-h-screen">
      <LessonNavigator />
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 max-w-[800px] mx-auto w-full px-4 py-16 animate-fade-in">
          <div className="mb-2 text-sm text-muted animate-slide-up">
            {lesson.module}
          </div>
          <h1 className="text-4xl font-bold mb-3 animate-slide-up">
            {lesson.title}
          </h1>
          <div className="mb-8">
            <LessonMeta lesson={lesson} />
          </div>

          <div className="prose dark:prose-invert max-w-none mb-10 animate-slide-up">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>

          {quiz && (
            <div className="mb-8 animate-slide-up space-y-3">
              <div className="font-bold uppercase tracking-widest text-accent text-sm">课后测验</div>
              <Quiz quizId={quiz.id} />
            </div>
          )}

          {lesson.hasChat && (
            <div className="mb-8 animate-slide-up space-y-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-accent" />
                <span className="font-bold uppercase tracking-widest text-accent text-sm">AI 助教</span>
              </div>
              <div className="h-[500px]">
                <ChatInterface />
              </div>
            </div>
          )}

          {lesson.hasPlayground && (
            <div className="mb-8 animate-slide-up space-y-3">
              <div className="flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-accent" />
                <span className="font-bold uppercase tracking-widest text-accent text-sm">Prompt Playground</span>
              </div>
              <div className="h-[600px]">
                <PromptPlayground />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-8 border-t border-edge animate-fade-in">
            {prevId ? (
              <Link
                href={`/lesson/${prevId}`}
                className="flex items-center gap-1 text-sm text-muted hover:text-accent transition-colors"
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
                className="flex items-center gap-1 text-sm font-medium text-accent hover:opacity-80 transition-colors"
              >
                下一课
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                href="/"
                className="flex items-center gap-1 text-sm font-medium text-accent hover:opacity-80 transition-colors"
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
