'use client'

import { useEffect, useState } from 'react'
import { loadProgress } from '@/lib/progress'
import ProgressBar from './ProgressBar'
import { Sparkles } from 'lucide-react'

export default function TotalProgress({ total }: { total: number }) {
  const [completed, setCompleted] = useState(0)

  useEffect(() => {
    setCompleted(Object.values(loadProgress().lessons).filter((l) => l.completed).length)
  }, [])

  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  const isDone = pct === 100

  return (
    <div className="space-y-3">
      {isDone ? (
        <div className="flex items-center gap-2 text-success mb-1">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-semibold">全部完成！你已经掌握了 Vibe Coding</span>
        </div>
      ) : completed > 0 ? (
        <p className="text-sm text-muted mb-1">
          已学完 <span className="font-bold text-accent">{completed}</span> 节课，继续加油
        </p>
      ) : (
        <p className="text-sm text-muted mb-1">开始你的第一节课吧</p>
      )}
      <ProgressBar completed={completed} total={total} label="学习进度" />
    </div>
  )
}
