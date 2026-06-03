'use client';

import VibeCodingFlow from '@/components/visualizations/VibeCodingFlow';
import TokenStream from '@/components/visualizations/TokenStream';
import DomTree from '@/components/visualizations/DomTree';
import BoxModelVisualizer from '@/components/visualizations/BoxModelVisualizer';
import { Eye } from 'lucide-react';

// Map lesson IDs to their relevant visualizations
const VIZ_MAP: Record<string, { title: string; description: string; component: React.ReactNode }> = {
  '1-3': {
    title: 'Vibe Coding 是怎么工作的',
    description: '点击播放，看懂整个流程',
    component: <VibeCodingFlow />,
  },
  '2-1': {
    title: 'AI 如何理解你的需求',
    description: '看 AI 怎么把你的一句话变成完整代码',
    component: <TokenStream />,
  },
  '3-1': {
    title: '浏览器如何理解 HTML',
    description: '代码怎么变成网页结构',
    component: <DomTree />,
  },
  '6-1': {
    title: '每个元素都是一个盒子',
    description: '理解 CSS 盒模型，布局不再难',
    component: <BoxModelVisualizer />,
  },
};

interface LessonVisualizationsProps {
  lessonId: string;
}

export default function LessonVisualizations({ lessonId }: LessonVisualizationsProps) {
  const viz = VIZ_MAP[lessonId];
  if (!viz) return null;

  return (
    <div className="mb-12 animate-slide-up space-y-4">
      <div className="flex items-center gap-2.5">
        <span className="w-8 h-8 rounded-lg bg-accent-soft flex items-center justify-center">
          <Eye className="w-4 h-4 text-accent" />
        </span>
        <div>
          <span className="font-display font-bold text-lg text-accent">{viz.title}</span>
          <p className="text-xs text-muted">{viz.description}</p>
        </div>
      </div>
      {viz.component}
    </div>
  );
}
