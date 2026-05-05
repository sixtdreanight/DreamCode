interface Props {
  completed: number
  total: number
  label?: string
}

export default function ProgressBar({ completed, total, label }: Props) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  const color = pct === 0 ? 'bg-zinc-200 dark:bg-zinc-700' : pct === 100 ? 'bg-green-500' : 'bg-accent'

  return (
    <div className="space-y-1">
      {(label || true) && (
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>{label || '进度'}</span>
          <span>{completed}/{total} ({pct}%)</span>
        </div>
      )}
      <div className="h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
