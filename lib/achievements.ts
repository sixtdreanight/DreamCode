export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  condition: (ctx: BadgeContext) => boolean;
}

export interface BadgeContext {
  completedLessons: string[];
  passedQuizIds: string[];
  perfectQuizIds: string[];
  projectCount: number;
  currentStreak: number;
  exercisesCompleted: string[];
}

export const BADGES: Badge[] = [
  {
    id: 'first-step', name: '第一步', description: '完成第一节课',
    icon: 'Footprints', xpReward: 25,
    condition: (ctx) => ctx.completedLessons.length >= 1,
  },
  {
    id: 'quick-learner', name: '学习达人', description: '完成 5 节课',
    icon: 'Zap', xpReward: 50,
    condition: (ctx) => ctx.completedLessons.length >= 5,
  },
  {
    id: 'halfway', name: '半程选手', description: '完成 11 节课',
    icon: 'Flag', xpReward: 75,
    condition: (ctx) => ctx.completedLessons.length >= 11,
  },
  {
    id: 'graduate', name: '毕业了！', description: '完成全部 22 节课',
    icon: 'GraduationCap', xpReward: 200,
    condition: (ctx) => ctx.completedLessons.length >= 22,
  },
  {
    id: 'perfect-score', name: '满分王', description: '任意测验获得 100 分',
    icon: 'Trophy', xpReward: 50,
    condition: (ctx) => ctx.perfectQuizIds.length >= 1,
  },
  {
    id: 'creator', name: '创造者', description: '在 Playground 中创建第一个项目',
    icon: 'Wand2', xpReward: 25,
    condition: (ctx) => ctx.projectCount >= 1,
  },
  {
    id: 'streak-3', name: '连续 3 天', description: '连续 3 天学习',
    icon: 'Flame', xpReward: 30,
    condition: (ctx) => ctx.currentStreak >= 3,
  },
  {
    id: 'streak-7', name: '连续 7 天', description: '连续一周不间断学习',
    icon: 'Flame', xpReward: 75,
    condition: (ctx) => ctx.currentStreak >= 7,
  },
  {
    id: 'explorer', name: '探索者', description: '尝试所有功能',
    icon: 'Compass', xpReward: 40,
    condition: (ctx) =>
      ctx.completedLessons.length >= 1 && ctx.projectCount >= 1 && ctx.passedQuizIds.length >= 1,
  },
  {
    id: 'hands-on', name: '动手实践', description: '完成第一个代码练习',
    icon: 'Code2', xpReward: 20,
    condition: (ctx) => ctx.exercisesCompleted.length >= 1,
  },
];

export function getBadgeById(id: string): Badge | undefined {
  return BADGES.find((b) => b.id === id);
}

export function checkNewBadges(ctx: BadgeContext, earnedBadgeIds: string[]): Badge[] {
  const earned = new Set(earnedBadgeIds);
  return BADGES.filter((b) => !earned.has(b.id) && b.condition(ctx));
}
