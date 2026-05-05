const STORAGE_KEY = 'vibe-coding-progress'

export interface LessonProgress {
  completed: boolean
  quizCompleted: boolean
  quizScore?: number
  lastAccessedAt: string
  completedAt?: string
}

export interface UserProgress {
  lessons: Record<string, LessonProgress>
  lastUpdatedAt: string
}

function emptyProgress(): UserProgress {
  return { lessons: {}, lastUpdatedAt: new Date().toISOString() }
}

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyProgress()
    return JSON.parse(raw) as UserProgress
  } catch {
    return emptyProgress()
  }
}

function saveProgress(p: UserProgress) {
  p.lastUpdatedAt = new Date().toISOString()
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
  notifyListeners()
}

const listeners = new Set<() => void>()

export function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function notifyListeners() {
  listeners.forEach((fn) => fn())
}

export function getLessonProgress(lessonId: string): LessonProgress {
  const p = loadProgress()
  return p.lessons[lessonId] || { completed: false, quizCompleted: false, lastAccessedAt: '' }
}

export function markLessonAccessed(lessonId: string) {
  const p = loadProgress()
  if (!p.lessons[lessonId]) {
    p.lessons[lessonId] = { completed: false, quizCompleted: false, lastAccessedAt: '' }
  }
  p.lessons[lessonId].lastAccessedAt = new Date().toISOString()
  saveProgress(p)
}

export function markLessonCompleted(lessonId: string) {
  const p = loadProgress()
  if (!p.lessons[lessonId]) {
    p.lessons[lessonId] = { completed: false, quizCompleted: false, lastAccessedAt: '' }
  }
  p.lessons[lessonId].completed = true
  p.lessons[lessonId].completedAt = new Date().toISOString()
  saveProgress(p)
}

export function saveQuizResult(lessonId: string, score: number) {
  const p = loadProgress()
  if (!p.lessons[lessonId]) {
    p.lessons[lessonId] = { completed: false, quizCompleted: false, lastAccessedAt: '' }
  }
  p.lessons[lessonId].quizCompleted = true
  p.lessons[lessonId].quizScore = score
  saveProgress(p)
}

export function getOverallProgress(total: number): { completed: number; percentage: number } {
  const p = loadProgress()
  const completed = Object.values(p.lessons).filter((l) => l.completed).length
  return { completed, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 }
}

export function getModuleProgress(moduleName: string, lessonIds: string[]): { completed: number; total: number } {
  const p = loadProgress()
  const total = lessonIds.length
  const completed = lessonIds.filter((id) => p.lessons[id]?.completed).length
  return { completed, total }
}
