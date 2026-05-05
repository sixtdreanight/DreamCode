'use client'

import { useEffect, useState } from 'react'
import { loadProgress } from '@/lib/progress'
import ProgressBar from './ProgressBar'

export default function TotalProgress({ total }: { total: number }) {
  const [completed, setCompleted] = useState(0)

  useEffect(() => {
    setCompleted(Object.values(loadProgress().lessons).filter((l) => l.completed).length)
  }, [])

  return <ProgressBar completed={completed} total={total} label="学习进度" />
}
