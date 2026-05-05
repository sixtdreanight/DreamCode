import { streamText, createTextStreamResponse } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
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
    const provider = process.env.AI_PROVIDER || "anthropic";
    const model = process.env.AI_MODEL;

    if (!model) {
      return new Response(
        JSON.stringify({ error: "AI_MODEL 未配置" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    let languageModel;

    if (provider === "anthropic") {
      const apiKey = process.env.AI_API_KEY || process.env.ANTHROPIC_API_KEY;
      if (!apiKey) {
        return new Response(
          JSON.stringify({ error: "ANTHROPIC_API_KEY 或 AI_API_KEY 未配置" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
      const anthropic = createAnthropic({ apiKey });
      languageModel = anthropic(model);
    } else if (provider === "openai") {
      const apiKey = process.env.AI_API_KEY || process.env.OPENAI_API_KEY;
      if (!apiKey) {
        return new Response(
          JSON.stringify({ error: "OPENAI_API_KEY 或 AI_API_KEY 未配置" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
      const openai = createOpenAI({ apiKey });
      languageModel = openai(model);
    } else if (provider === "openai-compatible") {
      const apiKey = process.env.AI_API_KEY;
      const baseURL = process.env.AI_BASE_URL;
      if (!apiKey) {
        return new Response(
          JSON.stringify({ error: "AI_API_KEY 未配置" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
      if (!baseURL) {
        return new Response(
          JSON.stringify({ error: "AI_BASE_URL 未配置" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
      const openai = createOpenAI({ apiKey, baseURL });
      languageModel = openai(model);
    } else {
      return new Response(
        JSON.stringify({ error: `不支持的 AI_PROVIDER: ${provider}` }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const { messages } = (await req.json()) as {
      messages: { role: "user" | "assistant"; content: string }[];
    };

    const result = streamText({
      model: languageModel,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
      maxOutputTokens: 4096,
    });

    return createTextStreamResponse({
      textStream: result.textStream,
      headers: {
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Agent API error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ error: `服务器错误: ${message}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
