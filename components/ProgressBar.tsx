interface Props {
  completed: number
  total: number
  label?: string
}

export default function ProgressBar({ completed, total, label }: Props) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  const isDone = pct === 100
  const isEmpty = pct === 0

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">{label}</span>
          <span className="text-sm text-muted tabular-nums">
            <span className={`font-bold ${isDone ? "text-success" : isEmpty ? "text-muted" : "text-accent"}`}>
              {completed}
            </span>
            <span className="text-faint"> / {total}</span>
            <span className={`ml-1.5 text-xs font-medium ${isDone ? "text-success" : isEmpty ? "text-faint" : "text-accent"}`}>
              {pct}%
            </span>
          </span>
        </div>
      )}

      <div className="relative h-3 rounded-full bg-surface-raised overflow-hidden">
        {/* Background track pattern */}
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px)`
          }}
        />

        {/* Progress fill */}
        <div
          className={`absolute inset-y-0 left-0 rounded-full transition-all duration-700 var(--ease-out-expo) ${
            isDone
              ? "bg-success"
              : isEmpty
              ? "bg-muted/30"
              : "bg-accent"
          }`}
          style={{ width: `${Math.max(pct, isEmpty ? 0 : 2)}%` }}
        />

        {/* Glow effect */}
        {!isEmpty && !isDone && (
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-accent opacity-20 blur-sm transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        )}
      </div>

      {/* Milestone dots */}
      <div className="flex justify-between px-0.5">
        {[0, 25, 50, 75, 100].map((milestone) => (
          <div
            key={milestone}
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
              pct >= milestone ? (isDone ? "bg-success" : "bg-accent") : "bg-muted/30"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
