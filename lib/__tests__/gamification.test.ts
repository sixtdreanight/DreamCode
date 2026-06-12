import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import {
  getTodayKey,
  calculateLevel,
  xpForNextLevel,
  emptyGamification,
  updateStreak,
  awardXp,
} from "../gamification";

describe("getTodayKey", () => {
  it("returns YYYY-MM-DD format", () => {
    const key = getTodayKey();
    expect(key).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("calculateLevel", () => {
  it("starts at level 1 with 0 XP", () => {
    expect(calculateLevel(0)).toBe(1);
  });

  it("reaches level 2 at 100 XP", () => {
    expect(calculateLevel(100)).toBe(2);
  });

  it("reaches level 5 at 1600 XP", () => {
    expect(calculateLevel(1600)).toBe(5);
  });

  it("handles fractional XP", () => {
    expect(calculateLevel(50)).toBe(1);
  });
});

describe("xpForNextLevel", () => {
  it("shows progress within current level", () => {
    const result = xpForNextLevel(50);
    expect(result.current).toBe(50);
    expect(result.next).toBe(100);
  });

  it("shows progress for level 2", () => {
    const result = xpForNextLevel(150);
    expect(result.current).toBe(50);
    expect(result.next).toBe(300);
  });
});

describe("emptyGamification", () => {
  it("returns zeroed state", () => {
    const state = emptyGamification();
    expect(state.xp).toBe(0);
    expect(state.totalXpEarned).toBe(0);
    expect(state.currentStreak).toBe(0);
    expect(state.longestStreak).toBe(0);
    expect(state.badges).toEqual([]);
    expect(state.pendingBadgeUnlocks).toEqual([]);
  });
});

describe("updateStreak", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-12T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("starts streak at 1 on first visit", () => {
    const state = emptyGamification();
    const updated = updateStreak(state);
    expect(updated.currentStreak).toBe(1);
    expect(updated.longestStreak).toBe(1);
  });

  it("continues streak from yesterday", () => {
    const state = { ...emptyGamification(), currentStreak: 3, longestStreak: 5, lastActiveDate: "2026-06-11" };
    const updated = updateStreak(state);
    expect(updated.currentStreak).toBe(4);
    expect(updated.longestStreak).toBe(5);
  });

  it("resets streak when gap is more than 1 day", () => {
    const state = { ...emptyGamification(), currentStreak: 5, longestStreak: 7, lastActiveDate: "2026-06-09" };
    const updated = updateStreak(state);
    expect(updated.currentStreak).toBe(1);
    expect(updated.longestStreak).toBe(7);
  });

  it("does not double-count same day", () => {
    const state = { ...emptyGamification(), currentStreak: 2, lastActiveDate: "2026-06-12" };
    const updated = updateStreak(state);
    expect(updated.currentStreak).toBe(2);
  });
});

describe("awardXp", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-12T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("adds XP to the state", () => {
    const state = emptyGamification();
    const updated = awardXp(state, 50);
    expect(updated.xp).toBe(50);
    expect(updated.totalXpEarned).toBe(50);
  });

  it("accumulates multiple awards", () => {
    let state = emptyGamification();
    state = awardXp(state, 30);
    state = awardXp(state, 20);
    expect(state.xp).toBe(50);
    expect(state.totalXpEarned).toBe(50);
  });

  it("records activity for today", () => {
    const state = emptyGamification();
    const updated = awardXp(state, 25);
    expect(updated.activityLog["2026-06-12"]).toBe(25);
  });

  it("preserves existing activity log entries", () => {
    const state = { ...emptyGamification(), activityLog: { "2026-06-10": 50 } };
    const updated = awardXp(state, 25);
    expect(updated.activityLog["2026-06-10"]).toBe(50);
    expect(updated.activityLog["2026-06-12"]).toBe(25);
  });
});
