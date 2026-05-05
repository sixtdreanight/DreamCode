'use client'

import type { Lesson } from '@/lib/lessons'
import { Clock, BarChart3, Tag } from 'lucide-react'

const DIFFICULTY_MAP: Record<string, { label: string; className: string }> = {
  beginner: { label: '入门', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
  intermediate: { label: '进阶', className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
  advanced: { label: '高级', className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' },
}

export default function LessonMeta({ lesson }: { lesson: Lesson }) {
  const diff = DIFFICULTY_MAP[lesson.difficulty] || DIFFICULTY_MAP.beginner

  return (
    <div className="flex flex-wrap items-center gap-3 text-xs animate-slide-up">
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${diff.className}`}>
        <BarChart3 className="w-3 h-3" />
        {diff.label}
      </span>
      <span className="inline-flex items-center gap-1 text-zinc-500">
        <Clock className="w-3 h-3" />
        约 {lesson.estimatedMinutes} 分钟
      </span>
      {lesson.tags.length > 0 && (
        <span className="inline-flex items-center gap-1 text-zinc-500">
          <Tag className="w-3 h-3" />
          {lesson.tags.join(' · ')}
        </span>
      )}
    </div>
  )
}
