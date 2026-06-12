import { logger } from "./logger";

type AnalyticsEventType =
  | "lesson:viewed"
  | "lesson:completed"
  | "quiz:attempted"
  | "playground:generated"
  | "exercise:attempted"
  | "exercise:completed"
  | "code:reviewed"
  | "dashboard:viewed";

interface AnalyticsEvent {
  type: AnalyticsEventType;
  timestamp: string;
  data?: Record<string, unknown>;
}

export function track(
  type: AnalyticsEventType,
  data?: Record<string, unknown>,
): void {
  const event: AnalyticsEvent = {
    type,
    timestamp: new Date().toISOString(),
    data,
  };

  if (typeof window !== "undefined" && navigator.sendBeacon) {
    const blob = new Blob([JSON.stringify(event)], {
      type: "application/json",
    });
    navigator.sendBeacon("/api/analytics", blob);
  } else {
    logger.info("analytics", event as unknown as Record<string, unknown>);
  }
}
