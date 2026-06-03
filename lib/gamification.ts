export interface GamificationState {
  xp: number;
  totalXpEarned: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  badges: string[];
  activityLog: Record<string, number>;
  pendingBadgeUnlocks: string[];
}

export function getTodayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

export function xpForNextLevel(xp: number): { current: number; next: number } {
  const level = calculateLevel(xp);
  const currentThreshold = (level - 1) ** 2 * 100;
  const nextThreshold = level ** 2 * 100;
  return { current: xp - currentThreshold, next: nextThreshold - currentThreshold };
}

export function emptyGamification(): GamificationState {
  return {
    xp: 0,
    totalXpEarned: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: '',
    badges: [],
    activityLog: {},
    pendingBadgeUnlocks: [],
  };
}

export function updateStreak(state: GamificationState): GamificationState {
  const today = getTodayKey();
  if (state.lastActiveDate === today) return state;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

  const streakContinues = state.lastActiveDate === yesterdayKey;
  const newStreak = streakContinues ? state.currentStreak + 1 : 1;

  return {
    ...state,
    currentStreak: newStreak,
    longestStreak: Math.max(state.longestStreak, newStreak),
    lastActiveDate: today,
  };
}

export function awardXp(state: GamificationState, amount: number): GamificationState {
  const today = getTodayKey();
  const next = {
    ...state,
    xp: state.xp + amount,
    totalXpEarned: state.totalXpEarned + amount,
    activityLog: {
      ...state.activityLog,
      [today]: (state.activityLog[today] || 0) + amount,
    },
  };
  return next;
}
