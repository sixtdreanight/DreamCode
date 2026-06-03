'use client';

import { useHeatmap } from '@/hooks/useHeatmap';

const COLORS = ['#ebe5d9', '#fcd9c8', '#f7a88a', '#f07b5a', '#e85d3a'];

export default function Heatmap() {
  const { data } = useHeatmap();

  // Group into weeks
  const weeks: typeof data[] = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  const CELL = 12;
  const GAP = 2;
  const LABELS = ['', '一', '', '三', '', '五', ''];

  return (
    <div className="card p-5 animate-slide-up">
      <h3 className="font-display font-bold text-base mb-4">学习热力图</h3>
      <div className="overflow-x-auto">
        <svg
          width={weeks.length * (CELL + GAP) + 40}
          height={CELL * 7 + GAP * 6 + 24}
          className="min-w-full"
        >
          {/* Day labels */}
          {LABELS.map((label, i) => (
            <text
              key={i}
              x={0}
              y={i * (CELL + GAP) + CELL - 2}
              className="text-[8px] fill-faint"
              textAnchor="start"
            >
              {label}
            </text>
          ))}

          {/* Cells */}
          <g transform="translate(24, 0)">
            {weeks.map((week, wi) =>
              week.map((day, di) => (
                <rect
                  key={`${wi}-${di}`}
                  x={wi * (CELL + GAP)}
                  y={di * (CELL + GAP)}
                  width={CELL}
                  height={CELL}
                  rx={2}
                  fill={COLORS[day.level]}
                  className="transition-colors duration-200"
                >
                  <title>
                    {day.date}: {day.xp} XP
                  </title>
                </rect>
              )),
            )}
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-1.5 mt-3">
        <span className="text-[10px] text-faint">少</span>
        {COLORS.map((color, i) => (
          <span
            key={i}
            className="w-2.5 h-2.5 rounded-sm"
            style={{ backgroundColor: color }}
          />
        ))}
        <span className="text-[10px] text-faint">多</span>
      </div>
    </div>
  );
}
