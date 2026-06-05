import { NextRequest } from "next/server";
import { SYSTEM_PROMPT, SOCRATIC_SYSTEM_PROMPT } from "@/lib/system-prompt";

// ---- 速率限制 ----
const RATE_WINDOW_MS = 60_000; // 1 分钟窗口
const MAX_REQUESTS_PER_WINDOW = 30;
const rateMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now >= entry.resetAt) {
    // Periodic cleanup when map is large
    if (rateMap.size > 10000) {
      for (const [key, val] of rateMap) {
        if (now >= val.resetAt) rateMap.delete(key);
      }
    }
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQUESTS_PER_WINDOW) return false;
  entry.count++;
  // Periodic cleanup of stale entries
  if (Math.random() < 0.01) {
    for (const [key, val] of rateMap) {
      if (now >= val.resetAt) rateMap.delete(key);
    }
  }
  return true;
}

// ---- 允许的 baseURL 白名单（防 SSRF） ----
const ALLOWED_HOSTNAMES = new Set([
  "api.deepseek.com",
  "api.openai.com",
  "api.anthropic.com",
]);

function validateBaseURL(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return false;
    return ALLOWED_HOSTNAMES.has(parsed.hostname);
  } catch {
    return false;
  }
}

// ---- 消息验证 ----
const MAX_MESSAGES = 50;
const MAX_CONTENT_LENGTH = 8000;

function validateMessages(messages: unknown): {
  role: "user" | "assistant";
  content: string;
}[] {
  if (!Array.isArray(messages)) {
    throw new Error("messages 必须是数组");
  }
  if (messages.length > MAX_MESSAGES) {
    throw new Error(`消息数量不能超过 ${MAX_MESSAGES}`);
  }
  if (messages.length === 0) {
    throw new Error("消息不能为空");
  }
  return messages.slice(-MAX_MESSAGES).map((m, i) => {
    if (!m || typeof m !== "object") throw new Error(`消息[${i}]无效`);
    if (m.role !== "user" && m.role !== "assistant")
      throw new Error(`消息[${i}] role 无效`);
    if (typeof m.content !== "string")
      throw new Error(`消息[${i}] content 无效`);
    return {
      role: m.role,
      content: (m.content as string).slice(0, MAX_CONTENT_LENGTH),
    };
  });
}

// Direct fetch to OpenAI-compatible APIs
async function handleOpenAICompatible(
  apiKey: string,
  baseURL: string,
  model: string,
  messages: { role: string; content: string }[],
  systemPrompt: string,
) {
  const url = baseURL.replace(/\/+$/, "") + "/chat/completions";

  const body = JSON.stringify({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      ...messages.map((m) => ({ role: m.role, content: m.content })),
    ],
    stream: true,
    max_tokens: 4096,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `API 请求失败 (${response.status}): ${text.slice(0, 200)}`,
    );
  }

  const encoder = new TextEncoder();
  return new Response(
    new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }
        const decoder = new TextDecoder();
        let buffer = "";
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";
            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith("data:")) continue;
              const data = trimmed.slice(5).trim();
              if (data === "[DONE]") continue;
              try {
                const json = JSON.parse(data);
                const content = json.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(encoder.encode(content));
                }
              } catch {
                // skip unparseable chunks
              }
            }
          }
        } catch (e) {
          console.error("Stream read error:", e);
        } finally {
          controller.close();
        }
      },
    }),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    },
  );
}

export async function POST(req: NextRequest) {
  // API 认证（必需，不再可选）
  const authToken = process.env.AI_API_AUTH_TOKEN;
  if (!authToken) {
    return new Response(
      JSON.stringify({ error: "Server not configured: AI_API_AUTH_TOKEN is required" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
  const auth = req.headers.get("Authorization");
  if (!auth || auth !== `Bearer ${authToken}`) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    );
  }

  // 速率限制
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || req.headers.get("x-real-ip")
    || "unknown";
  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({ error: "请求过于频繁，请稍后再试" }),
      { status: 429, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const provider = process.env.AI_PROVIDER || "openai-compatible";
    const model = process.env.AI_MODEL || "deepseek-chat";
    const apiKey = process.env.AI_API_KEY;
    const baseURL = process.env.AI_BASE_URL || "https://api.deepseek.com/v1";

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "AI_API_KEY 未配置" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    // 验证 baseURL（防 SSRF）
    if (provider === "openai-compatible" && !validateBaseURL(baseURL)) {
      return new Response(
        JSON.stringify({ error: "AI_BASE_URL 不在允许列表中" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const body = await req.json();
    const messages = validateMessages(body.messages);
    const mode = body.mode === 'socratic' ? 'socratic' : 'direct';
    const activePrompt = mode === 'socratic' ? SOCRATIC_SYSTEM_PROMPT : SYSTEM_PROMPT;

    if (provider === "openai-compatible" || provider === "openai") {
      const openaiBaseURL =
        provider === "openai"
          ? "https://api.openai.com/v1"
          : baseURL;
      return handleOpenAICompatible(apiKey, openaiBaseURL, model, messages, activePrompt);
    }

    // Anthropic
    const { streamText, createTextStreamResponse } = await import("ai");
    const { createAnthropic } = await import("@ai-sdk/anthropic");
    const anthropic = createAnthropic({ apiKey });
    const languageModel = anthropic(model);

    const result = streamText({
      model: languageModel,
      system: activePrompt,
      messages: messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      maxOutputTokens: 4096,
    });

    return createTextStreamResponse({
      textStream: result.textStream,
      headers: { "Cache-Control": "no-cache" },
    });
  } catch (error) {
    console.error("Agent API error:", error);
    return new Response(
      JSON.stringify({ error: "请求处理失败" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
