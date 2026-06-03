'use client';

import { useState, useEffect } from 'react';
import { loadProgress } from '@/lib/progress';
import { lessons } from '@/lib/lessons';

interface Skill {
  label: string;
  value: number; // 0-100
}

export default function SkillRadar() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const radius = (size / 2) - 40;

  useEffect(() => {
    const progress = loadProgress();
    const lessonEntries = Object.entries(progress.lessons);
    const completedIds = lessonEntries.filter(([, v]) => v.completed).map(([k]) => k);
    const passedQuizIds = lessonEntries.filter(([, v]) => v.quizCompleted && (v.quizScore || 0) >= 60).map(([k]) => k);

    // Calculate skill levels based on tags and progress
    const htmlLessons = lessons.filter((l) => l.tags.includes('实践') || l.tags.includes('项目'));
    const jsLessons = lessons.filter((l) => l.tags.includes('项目') && l.difficulty !== 'beginner');
    const promptLessons = lessons.filter((l) => l.tags.includes('技巧'));
    const toolLessons = lessons.filter((l) => l.tags.includes('工具'));
    const conceptLessons = lessons.filter((l) => l.tags.includes('概念'));

    const calcScore = (lessonSet: typeof lessons): number => {
      if (lessonSet.length === 0) return 0;
      const completedInSet = lessonSet.filter((l) => completedIds.includes(l.id)).length;
      return Math.round((completedInSet / lessonSet.length) * 100);
    };

    setSkills([
      { label: 'HTML/CSS', value: calcScore(htmlLessons) },
      { label: 'JavaScript', value: calcScore(jsLessons) },
      { label: '提示词', value: calcScore(promptLessons) },
      { label: '工具使用', value: calcScore(toolLessons) },
      { label: '概念理解', value: calcScore(conceptLessons) },
      { label: '动手实践', value: completedIds.length > 0 ? Math.round((completedIds.length / lessons.length) * 100) : 0 },
    ]);
  }, []);

  if (skills.length === 0) return null;

  const angles = skills.map((_, i) => (i * 2 * Math.PI) / skills.length - Math.PI / 2);

  // Generate polygon points for a given set of values
  function polygonPoints(vals: number[]): string {
    return vals
      .map((v, i) => {
        const r = (v / 100) * radius;
        const x = cx + r * Math.cos(angles[i]);
        const y = cy + r * Math.sin(angles[i]);
        return `${x},${y}`;
      })
      .join(' ');
  }

  return (
    <div className="card p-5 animate-slide-up">
      <h3 className="font-display font-bold text-base mb-4">技能雷达</h3>
      <div className="flex justify-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Background grid */}
          {[0.25, 0.5, 0.75, 1].map((scale) => (
            <polygon
              key={scale}
              points={polygonPoints(skills.map(() => scale * 100))}
              fill="none"
              stroke="var(--color-border-primary)"
              strokeWidth="1"
              opacity="0.5"
            />
          ))}

          {/* Axis lines */}
          {angles.map((angle, i) => {
            const x = cx + radius * Math.cos(angle);
            const y = cy + radius * Math.sin(angle);
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke="var(--color-border-primary)"
                strokeWidth="1"
                opacity="0.3"
              />
            );
          })}

          {/* Labels */}
          {skills.map((skill, i) => {
            const labelR = radius + 24;
            const x = cx + labelR * Math.cos(angles[i]);
            const y = cy + labelR * Math.sin(angles[i]);
            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[10px] fill-muted font-medium"
              >
                {skill.label}
              </text>
            );
          })}

          {/* Data polygon */}
          <polygon
            points={polygonPoints(skills.map((s) => s.value))}
            fill="var(--color-accent)"
            fillOpacity="0.15"
            stroke="var(--color-accent)"
            strokeWidth="2"
            className="transition-all duration-700"
          />

          {/* Data points */}
          {skills.map((skill, i) => {
            const r = (skill.value / 100) * radius;
            const x = cx + r * Math.cos(angles[i]);
            const y = cy + r * Math.sin(angles[i]);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="3"
                fill="var(--color-accent)"
                className="animate-scale-in"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
