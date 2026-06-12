export interface StorageRepository {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

class LocalStorageRepository implements StorageRepository {
  getItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  setItem(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      // localStorage 满了或不可用，静默失败
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {
      // 静默失败
    }
  }
}

export class MemoryRepository implements StorageRepository {
  private store = new Map<string, string>();

  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }
}

export class ServerRepository implements StorageRepository {
  private baseUrl: string;
  private authToken: string;

  constructor(baseUrl: string, authToken: string) {
    this.baseUrl = baseUrl;
    this.authToken = authToken;
  }

  getItem(key: string): string | null {
    // ServerRepository is async in practice, but the interface is sync.
    // For client-side use, data is preloaded during SSR or hydrated.
    // This returns null and expects the caller to use loadAsync instead.
    return null;
  }

  async loadAsync(key: string): Promise<string | null> {
    try {
      const url = `${this.baseUrl}/api/storage?key=${encodeURIComponent(key)}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${this.authToken}` },
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.value;
    } catch {
      return null;
    }
  }

  async saveAsync(key: string, value: string): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/api/storage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        },
        body: JSON.stringify({ key, value }),
      });
    } catch {
      // 静默失败
    }
  }

  async removeAsync(key: string): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/api/storage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        },
        body: JSON.stringify({ key, value: null }),
      });
    } catch {
      // 静默失败
    }
  }

  // Synchronous interface compatibility
  setItem(_key: string, _value: string): void {
    // Use saveAsync for actual persistence
  }

  removeItem(_key: string): void {
    // Use removeAsync for actual persistence
  }
}

let globalRepo: StorageRepository | null = null;

export function createRepository(): StorageRepository {
  if (typeof window !== "undefined" && window.localStorage) {
    return new LocalStorageRepository();
  }
  return new MemoryRepository();
}

export function getRepository(): StorageRepository {
  if (!globalRepo) {
    globalRepo = createRepository();
  }
  return globalRepo;
}

export function setRepository(repo: StorageRepository): void {
  globalRepo = repo;
}
