import { NextRequest } from "next/server";
import { logger } from "@/lib/logger";

const rateMap = new Map<string, { count: number; resetAt: number }>();

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  // Rate limit: 100 events per 60s per IP
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (entry) {
    if (now < entry.resetAt && entry.count >= 100) {
      return Response.json({ error: "Too many requests" }, { status: 429 });
    }
    if (now >= entry.resetAt) {
      rateMap.set(ip, { count: 1, resetAt: now + 60_000 });
    } else {
      entry.count++;
    }
    // Cleanup stale entries periodically
    if (rateMap.size > 10000 && Math.random() < 0.01) {
      for (const [key, val] of rateMap) {
        if (now >= val.resetAt) rateMap.delete(key);
      }
    }
  } else {
    rateMap.set(ip, { count: 1, resetAt: now + 60_000 });
  }

  try {
    const body = await req.json();
    if (!body || !body.type) {
      return Response.json({ error: "Invalid event" }, { status: 400 });
    }
    // Only log known event types; strip unknown fields
    const knownTypes = [
      "lesson:viewed", "lesson:completed", "quiz:attempted",
      "playground:generated", "exercise:attempted", "exercise:completed",
      "code:reviewed", "dashboard:viewed",
    ];
    if (!knownTypes.includes(body.type)) {
      return Response.json({ error: "Unknown event type" }, { status: 400 });
    }
    // Sanitize: only log type and timestamp, not arbitrary data
    logger.info("analytics", { type: body.type, timestamp: body.timestamp });
    return Response.json({ received: true });
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}
