import { describe, it, expect } from "vitest";
import {
  BADGES,
  getBadgeById,
  checkNewBadges,
  type BadgeContext,
} from "../achievements";

const emptyCtx: BadgeContext = {
  completedLessons: [],
  passedQuizIds: [],
  perfectQuizIds: [],
  projectCount: 0,
  currentStreak: 0,
  exercisesCompleted: [],
};

describe("BADGES", () => {
  it("has 10 badges defined", () => {
    expect(BADGES).toHaveLength(10);
  });

  it("each badge has required fields", () => {
    for (const badge of BADGES) {
      expect(badge.id).toBeTruthy();
      expect(badge.name).toBeTruthy();
      expect(badge.description).toBeTruthy();
      expect(badge.icon).toBeTruthy();
      expect(badge.xpReward).toBeGreaterThan(0);
    }
  });

  it("no duplicate badge IDs", () => {
    const ids = BADGES.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("getBadgeById", () => {
  it("returns badge for valid id", () => {
    const badge = getBadgeById("first-step");
    expect(badge?.name).toBe("第一步");
  });

  it("returns undefined for unknown id", () => {
    expect(getBadgeById("nonexistent")).toBeUndefined();
  });
});

describe("checkNewBadges", () => {
  it("returns first-step badge after completing first lesson", () => {
    const ctx = { ...emptyCtx, completedLessons: ["1-1"] };
    const result = checkNewBadges(ctx, []);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("first-step");
  });

  it("returns quick-learner after 5 lessons", () => {
    const ctx = { ...emptyCtx, completedLessons: ["1-1", "1-2", "1-3", "2-1", "2-2"] };
    const result = checkNewBadges(ctx, []);
    const ids = result.map((b) => b.id);
    expect(ids).toContain("first-step");
    expect(ids).toContain("quick-learner");
  });

  it("returns graduate when all 22 lessons done", () => {
    const ctx = {
      ...emptyCtx,
      completedLessons: Array.from({ length: 22 }, (_, i) => `lesson-${i}`),
    };
    const result = checkNewBadges(ctx, []);
    const ids = result.map((b) => b.id);
    expect(ids).toContain("graduate");
    expect(ids).toContain("halfway");
  });

  it("returns perfect-score when any quiz scores 100", () => {
    const ctx = { ...emptyCtx, perfectQuizIds: ["quiz-1"] };
    const result = checkNewBadges(ctx, []);
    expect(result.some((b) => b.id === "perfect-score")).toBe(true);
  });

  it("returns creator when project exists", () => {
    const ctx = { ...emptyCtx, projectCount: 1 };
    const result = checkNewBadges(ctx, []);
    expect(result.some((b) => b.id === "creator")).toBe(true);
  });

  it("returns streak badges at correct thresholds", () => {
    const ctx3 = { ...emptyCtx, currentStreak: 3 };
    const result3 = checkNewBadges(ctx3, []);
    expect(result3.some((b) => b.id === "streak-3")).toBe(true);

    const ctx7 = { ...emptyCtx, currentStreak: 7 };
    const result7 = checkNewBadges(ctx7, []);
    expect(result7.some((b) => b.id === "streak-7")).toBe(true);
  });

  it("does not return already-earned badges", () => {
    const ctx = { ...emptyCtx, completedLessons: ["1-1"] };
    const result = checkNewBadges(ctx, ["first-step"]);
    expect(result).toHaveLength(0);
  });

  it("returns explorer when multiple features used", () => {
    const ctx = {
      ...emptyCtx,
      completedLessons: ["1-1"],
      projectCount: 1,
      passedQuizIds: ["quiz-ch1"],
    };
    const result = checkNewBadges(ctx, []);
    expect(result.some((b) => b.id === "explorer")).toBe(true);
  });

  it("returns hands-on when exercises completed", () => {
    const ctx = { ...emptyCtx, exercisesCompleted: ["ex-3-1"] };
    const result = checkNewBadges(ctx, []);
    expect(result.some((b) => b.id === "hands-on")).toBe(true);
  });
});
