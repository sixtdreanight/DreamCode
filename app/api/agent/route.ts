import { NextRequest } from "next/server";

const SYSTEM_PROMPT = `你是帮零基础朋友学编程的搭档。说人话，讲短句，用大白话。别用"首先其次最后""值得注意的是""综上所述"这种模板词。要代码就给完整能跑的 HTML/CSS/JS，注释点到为止。对方零基础但别把 ta 当傻子。`;

// Direct fetch to OpenAI-compatible APIs (DeepSeek etc.)
async function handleOpenAICompatible(
  apiKey: string,
  baseURL: string,
  model: string,
  messages: { role: string; content: string }[],
) {
  const url = baseURL.replace(/\/+$/, "") + "/chat/completions";

  const body = JSON.stringify({
    model,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
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
    throw new Error(`API 请求失败 (${response.status}): ${text.slice(0, 200)}`);
  }

  // Pipe SSE stream: extract delta.content from each chunk
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
  try {
    const provider = process.env.AI_PROVIDER || "openai-compatible";
    const model = process.env.AI_MODEL || "deepseek-chat";
    const apiKey = process.env.AI_API_KEY;
    const baseURL = process.env.AI_BASE_URL || "https://api.deepseek.com/v1";

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "AI_API_KEY 未配置，请在环境变量中设置" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const { messages } = (await req.json()) as {
      messages: { role: "user" | "assistant"; content: string }[];
    };

    if (provider === "openai-compatible" || provider === "openai") {
      const openaiBaseURL = provider === "openai"
        ? "https://api.openai.com/v1"
        : baseURL;
      return handleOpenAICompatible(apiKey, openaiBaseURL, model, messages);
    }

    // Anthropic: lazy-import AI SDK to avoid issues with other providers
    const { streamText, createTextStreamResponse } = await import("ai");
    const { createAnthropic } = await import("@ai-sdk/anthropic");
    const anthropic = createAnthropic({ apiKey });
    const languageModel = anthropic(model);

    const result = streamText({
      model: languageModel,
      system: SYSTEM_PROMPT,
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
    const message = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ error: `服务器错误: ${message}` }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
