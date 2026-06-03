import type { GamificationState } from './gamification';
import { emptyGamification } from './gamification';

const STORAGE_KEY = 'vibe-coding-progress';
const CURRENT_SCHEMA = 2;

export interface LessonProgress {
  completed: boolean;
  quizCompleted: boolean;
  quizScore?: number;
  lastAccessedAt: string;
  completedAt?: string;
}

export interface UserProgress {
  schemaVersion: number;
  lessons: Record<string, LessonProgress>;
  gamification?: GamificationState;
  lastUpdatedAt: string;
}

function emptyProgress(): UserProgress {
  return {
    schemaVersion: CURRENT_SCHEMA,
    lessons: {},
    gamification: emptyGamification(),
    lastUpdatedAt: new Date().toISOString(),
  };
}

function migrateProgress(data: Record<string, unknown>): UserProgress {
  const version = (data.schemaVersion as number) || 1;
  if (version < 2) {
    return {
      schemaVersion: CURRENT_SCHEMA,
      lessons: (data.lessons as Record<string, LessonProgress>) || {},
      gamification: emptyGamification(),
      lastUpdatedAt: new Date().toISOString(),
    };
  }
  return data as unknown as UserProgress;
}

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    const data = JSON.parse(raw);
    if (!data.schemaVersion || data.schemaVersion < CURRENT_SCHEMA) {
      const migrated = migrateProgress(data);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }
    return data as UserProgress;
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(p: UserProgress) {
  p.lastUpdatedAt = new Date().toISOString();
  p.schemaVersion = CURRENT_SCHEMA;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  notifyListeners();
}

const listeners = new Set<() => void>();

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notifyListeners() {
  listeners.forEach((fn) => fn());
}

export function getLessonProgress(lessonId: string): LessonProgress {
  const p = loadProgress();
  return p.lessons[lessonId] || { completed: false, quizCompleted: false, lastAccessedAt: '' };
}

function updateProgress(lessonId: string, updater: (p: LessonProgress) => void) {
  const p = loadProgress();
  if (!p.lessons[lessonId]) {
    p.lessons[lessonId] = { completed: false, quizCompleted: false, lastAccessedAt: '' };
  }
  updater(p.lessons[lessonId]);
  saveProgress(p);
}

export function markLessonAccessed(lessonId: string) {
  updateProgress(lessonId, (lesson) => {
    lesson.lastAccessedAt = new Date().toISOString();
  });
}

export function markLessonCompleted(lessonId: string) {
  updateProgress(lessonId, (lesson) => {
    lesson.completed = true;
    lesson.completedAt = new Date().toISOString();
  });
  // Fire event for gamification
  import('./events').then(({ emitGameEvent }) => {
    emitGameEvent({ type: 'lesson:completed', lessonId });
  });
}

export function saveQuizResult(lessonId: string, score: number) {
  updateProgress(lessonId, (lesson) => {
    lesson.quizCompleted = true;
    lesson.quizScore = score;
  });
  import('./events').then(({ emitGameEvent }) => {
    emitGameEvent({ type: 'quiz:completed', lessonId, score });
  });
}

export function getOverallProgress(total: number): { completed: number; percentage: number } {
  const p = loadProgress();
  const completed = Object.values(p.lessons).filter((l) => l.completed).length;
  return { completed, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
}

export function getModuleProgress(
  moduleName: string,
  lessonIds: string[],
): { completed: number; total: number } {
  const p = loadProgress();
  const total = lessonIds.length;
  const completed = lessonIds.filter((id) => p.lessons[id]?.completed).length;
  return { completed, total };
}
