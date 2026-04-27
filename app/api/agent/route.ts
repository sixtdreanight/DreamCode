import Anthropic from "@anthropic-ai/sdk";
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

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "ANTHROPIC_API_KEY 未配置" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const { messages } = (await req.json()) as {
      messages: { role: "user" | "assistant"; content: string }[];
    };

    const anthropic = new Anthropic({ apiKey });

    const stream = anthropic.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Agent API error:", error);
    return new Response(
      JSON.stringify({ error: "服务器错误，请稍后重试" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
