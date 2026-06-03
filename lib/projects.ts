export interface SavedProject {
  id: string;
  title: string;
  description: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  lessonId?: string;
}

const STORAGE_KEY = 'vibe-coding-projects';

export function loadProjects(): SavedProject[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SavedProject[];
  } catch {
    return [];
  }
}

function saveProjects(projects: SavedProject[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function saveProject(project: Omit<SavedProject, 'id' | 'createdAt' | 'updatedAt'>): SavedProject {
  const projects = loadProjects();
  const id = generateId();
  const now = new Date().toISOString();
  const saved: SavedProject = {
    ...project,
    id,
    createdAt: now,
    updatedAt: now,
  };
  projects.unshift(saved);
  saveProjects(projects);
  return saved;
}

export function updateProject(id: string, updates: Partial<Pick<SavedProject, 'title' | 'description' | 'code' | 'tags'>>): SavedProject | null {
  const projects = loadProjects();
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  projects[idx] = {
    ...projects[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveProjects(projects);
  return projects[idx];
}

export function deleteProject(id: string): boolean {
  const projects = loadProjects();
  const filtered = projects.filter((p) => p.id !== id);
  if (filtered.length === projects.length) return false;
  saveProjects(filtered);
  return true;
}

export function getProjectById(id: string): SavedProject | undefined {
  return loadProjects().find((p) => p.id === id);
}

export function getProjectCount(): number {
  return loadProjects().length;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
