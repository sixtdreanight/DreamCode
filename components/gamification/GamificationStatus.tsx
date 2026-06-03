'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { loadProgress, saveProgress } from '@/lib/progress';
import type { GamificationState } from '@/lib/gamification';
import { calculateLevel, xpForNextLevel, emptyGamification, updateStreak, awardXp } from '@/lib/gamification';
import { checkNewBadges, getBadgeById, type BadgeContext } from '@/lib/achievements';
import { Flame, Trophy, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface GamificationStatusProps {
  compact?: boolean;
  onBadgeUnlock?: (badgeId: string) => void;
}

export default function GamificationStatus({ compact = false, onBadgeUnlock }: GamificationStatusProps) {
  const [gamification, setGamification] = useState<GamificationState>(emptyGamification);
  const level = calculateLevel(gamification.xp);
  const xpProgress = xpForNextLevel(gamification.xp);
  const onBadgeUnlockRef = useRef(onBadgeUnlock);
  onBadgeUnlockRef.current = onBadgeUnlock;

  // Load state on mount
  useEffect(() => {
    const progress = loadProgress();
    setGamification(progress.gamification || emptyGamification());
  }, []);

  const updateGamification = useCallback((gs: GamificationState) => {
    setGamification(gs);
    const progress = loadProgress();
    progress.gamification = gs;
    saveProgress(progress);

    // Check for new badges
    const ctx = buildBadgeContext(progress);
    const newBadges = checkNewBadges(ctx, gs.badges);
    if (newBadges.length > 0 && onBadgeUnlockRef.current) {
      const updated = {
        ...gs,
        badges: [...gs.badges, ...newBadges.map((b) => b.id)],
        xp: gs.xp + newBadges.reduce((s, b) => s + b.xpReward, 0),
        totalXpEarned: gs.totalXpEarned + newBadges.reduce((s, b) => s + b.xpReward, 0),
      };
      setGamification(updated);
      const p = loadProgress();
      p.gamification = updated;
      saveProgress(p);
      onBadgeUnlockRef.current(newBadges[0].id);
    }
  }, []);

  const handleEvent = useCallback((xpAmount: number) => {
    setGamification((prev) => {
      const next = updateStreak(awardXp(prev, xpAmount));
      return next;
    });
  }, []);

  // Subscribe to game events with proper cleanup
  useEffect(() => {
    const cleanups: (() => void)[] = [];
    import('@/lib/events').then(({ onGameEvent }) => {
      cleanups.push(onGameEvent('lesson:completed', () => handleEvent(50)));
      cleanups.push(onGameEvent('quiz:completed', (evt) => {
        const score = (evt as { score: number }).score;
        handleEvent(score >= 60 ? 30 : 10);
      }));
      cleanups.push(onGameEvent('playground:generated', () => handleEvent(20)));
      cleanups.push(onGameEvent('exercise:completed', () => handleEvent(15)));
      cleanups.push(onGameEvent('daily:visit', () => {
        setGamification((prev) => updateStreak(prev));
      }));
    });
    return () => { cleanups.forEach((fn) => fn()); };
  }, [handleEvent]);

  // Persist gamification state when it changes (after events fire)
  useEffect(() => {
    if (gamification.xp === 0 && gamification.lastActiveDate === '') return;
    const progress = loadProgress();
    progress.gamification = gamification;
    saveProgress(progress);
  }, [gamification]);

  if (compact) {
    return (
      <Link
        href="/dashboard"
        className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-surface transition-all group"
      >
        <span className="w-8 h-8 rounded-lg bg-accent-soft flex items-center justify-center text-xs font-bold text-accent">
          {level}
        </span>
        <div className="min-w-0 flex-1">
          <div className="h-1.5 rounded-full bg-surface-raised overflow-hidden">
            <div
              className="h-full rounded-full bg-accent transition-all duration-700"
              style={{ width: `${xpProgress.next > 0 ? (xpProgress.current / xpProgress.next) * 100 : 100}%` }}
            />
          </div>
        </div>
        {gamification.currentStreak > 0 && (
          <span className="text-xs text-warning flex items-center gap-0.5 tabular-nums">
            <Flame className="w-3 h-3" />
            {gamification.currentStreak}
          </span>
        )}
        <ChevronRight className="w-3.5 h-3.5 text-faint group-hover:text-accent transition-colors" />
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-alt border border-edge animate-slide-up">
      <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center font-display font-bold text-lg shrink-0 shadow-glow">
        {level}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold">Lv.{level}</span>
          <span className="text-[10px] text-muted tabular-nums">
            {gamification.totalXpEarned} XP
          </span>
        </div>
        <div className="h-2 rounded-full bg-surface-raised overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent to-warning transition-all duration-700"
            style={{ width: `${xpProgress.next > 0 ? (xpProgress.current / xpProgress.next) * 100 : 100}%` }}
          />
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {gamification.currentStreak > 0 && (
          <span className="text-sm font-semibold text-warning flex items-center gap-1 tabular-nums">
            <Flame className="w-4 h-4" />
            {gamification.currentStreak}
          </span>
        )}
        <Link
          href="/dashboard"
          className="flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors"
        >
          {gamification.badges.length > 0 && (
            <span className="flex items-center gap-0.5">
              <Trophy className="w-3.5 h-3.5" />
              {gamification.badges.length}
            </span>
          )}
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

function buildBadgeContext(progress: ReturnType<typeof loadProgress>): BadgeContext {
  const ids = Object.keys(progress.lessons);
  const completedLessons = ids.filter((id) => progress.lessons[id]?.completed);
  const passedQuizIds = ids.filter((id) => progress.lessons[id]?.quizCompleted);
  const perfectQuizIds = ids.filter(
    (id) => progress.lessons[id]?.quizCompleted && progress.lessons[id]?.quizScore === 100,
  );
  const projectCount = (progress.gamification as GamificationState & { projectsCreated?: number })?.projectsCreated || 0;
  const exercisesCompleted = (progress.gamification as GamificationState & { exercisesCompleted?: string[] })?.exercisesCompleted || [];

  return {
    completedLessons,
    passedQuizIds,
    perfectQuizIds,
    projectCount,
    currentStreak: progress.gamification?.currentStreak || 0,
    exercisesCompleted,
  };
}
