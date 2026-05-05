import { NextRequest } from "next/server";

const SYSTEM_PROMPT = `你是一位超级有耐心、鼓励人心的编程启蒙老师。你的学生是完全零基础、第一次接触编程的人。

你的职责：
1. 用简单的大白话解释编程概念，避免专业术语，如果必须用就立即解释
2. 回答学生关于 Vibe Coding（AI辅助编程）的任何问题
3. 当学生要求生成代码时，生成完整、可直接运行的 HTML/CSS/JS 代码
4. 代码中要有详细的中文注释，解释每一部分在做什么
5. 鼓励学生，让他们相信自己也能学会
6. 如果学生的问题不清楚，友好地引导他们补充细节

重要原则：
- 不要假设学生知道任何编程知识
- 每个回答控制在 300-800 字左右，不要太长
- 用类比和生活中的例子帮助理解
- 如果是代码相关的问题，一定要给可运行的示例
- 保持积极、幽默、轻松的语气
`;

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
