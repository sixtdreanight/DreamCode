interface Props {
  completed: number
  total: number
  label?: string
}

export default function ProgressBar({ completed, total, label }: Props) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  const color = pct === 0 ? "bg-muted" : pct === 100 ? "bg-green-500" : "bg-accent"

  return (
    <div className="space-y-1">
      {label && (
        <div className="flex items-center justify-between text-xs text-muted">
          <span>{label}</span>
          <span>{completed}/{total} ({pct}%)</span>
        </div>
      )}
      <div className="h-1.5 rounded-full bg-surface-alt overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
