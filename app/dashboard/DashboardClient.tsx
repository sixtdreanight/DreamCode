'use client';

import Link from 'next/link';
import { ArrowLeft, Trophy } from 'lucide-react';
import StatsGrid from '@/components/dashboard/StatsGrid';
import Heatmap from '@/components/dashboard/Heatmap';
import SkillRadar from '@/components/dashboard/SkillRadar';
import GamificationStatus from '@/components/gamification/GamificationStatus';

export default function DashboardClient() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-[1000px] mx-auto px-6 py-12 md:py-16">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          返回首页
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="decorative-line mb-4" />
          <h1 className="font-display text-3xl md:text-4xl font-bold">学习数据</h1>
          <p className="text-muted mt-3 text-lg">
            你的学习旅程，每一分努力都看得见
          </p>
        </div>

        {/* Gamification bar */}
        <div className="mb-8">
          <GamificationStatus />
        </div>

        {/* Stats */}
        <div className="mb-8">
          <StatsGrid />
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          <Heatmap />
          <SkillRadar />
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 pt-8 border-t border-edge text-center">
          <Link
            href="/showcase"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:shadow-lg active:scale-95 transition-all"
          >
            <Trophy className="w-4 h-4" />
            查看我的作品
          </Link>
        </div>
      </div>
    </div>
  );
}
