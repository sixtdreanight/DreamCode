import { NextRequest } from "next/server";

const storage = new Map<string, string>();

export async function GET(req: NextRequest) {
  const authToken = process.env.AI_API_AUTH_TOKEN;
  if (!authToken) {
    return Response.json({ error: "Server not configured" }, { status: 500 });
  }
  const auth = req.headers.get("Authorization");
  if (!auth || auth !== `Bearer ${authToken}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const key = req.nextUrl.searchParams.get("key");
  if (!key) {
    return Response.json({ error: "Missing key parameter" }, { status: 400 });
  }

  const value = storage.get(key);
  return Response.json({ key, value: value ?? null });
}

export async function POST(req: NextRequest) {
  const authToken = process.env.AI_API_AUTH_TOKEN;
  if (!authToken) {
    return Response.json({ error: "Server not configured" }, { status: 500 });
  }
  const auth = req.headers.get("Authorization");
  if (!auth || auth !== `Bearer ${authToken}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  // Rate limit: 60 writes per minute per IP
  const rateMapKey = `__rate_${ip}`;
  const rateData = storage.get(rateMapKey);
  const now = Date.now();
  if (rateData) {
    const { count, resetAt } = JSON.parse(rateData);
    if (now < resetAt && count >= 60) {
      return Response.json({ error: "请求过于频繁" }, { status: 429 });
    }
    storage.set(
      rateMapKey,
      JSON.stringify({
        count: now >= resetAt ? 1 : count + 1,
        resetAt: now >= resetAt ? now + 60_000 : resetAt,
      }),
    );
  } else {
    storage.set(rateMapKey, JSON.stringify({ count: 1, resetAt: now + 60_000 }));
  }

  try {
    const body = await req.json();
    const { key, value } = body;
    if (!key || typeof key !== "string" || key.length > 256) {
      return Response.json({ error: "Invalid key" }, { status: 400 });
    }
    if (value === undefined || value === null) {
      storage.delete(key);
      return Response.json({ key, deleted: true });
    }
    if (typeof value !== "string" || value.length > 1_000_000) {
      return Response.json({ error: "Value too large" }, { status: 400 });
    }
    storage.set(key, value);
    return Response.json({ key, saved: true });
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
}
