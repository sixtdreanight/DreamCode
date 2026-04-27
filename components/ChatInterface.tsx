"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, AlertCircle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-0.5">
      <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0ms]" />
      <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:150ms]" />
      <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:300ms]" />
    </span>
  );
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "你好！我是你的 Vibe Coding 学习助手。有什么不懂的随时问我，比如：\n\n- 这个课程里的概念我不太明白\n- 帮我看看这个描述能不能让 AI 理解\n- 我想做一个 [xxx]，该怎么描述？",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!response.ok || !response.body) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || "请求失败");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        assistantContent += chunk;
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = {
            role: "assistant",
            content: assistantContent,
          };
          return next;
        });
      }
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "抱歉，出错了。请检查 API Key 是否配置正确，或者稍后再试。";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `抱歉，出错了：${msg}\n\n💡 提示：请检查 .env 文件中的 API Key 是否配置正确。`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full border rounded-xl bg-white dark:bg-zinc-900 shadow-sm overflow-hidden animate-fade-in">
      <div className="px-4 py-3 border-b bg-zinc-50 dark:bg-zinc-800 flex items-center gap-2 shrink-0">
        <Bot className="w-5 h-5 text-blue-600" />
        <span className="font-semibold text-sm">AI 学习助手</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px]">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${
              msg.role === "user" ? "flex-row-reverse" : ""
            } ${i > 1 ? "animate-slide-up" : ""}`}
            style={{ animationDelay: i > 1 ? "0ms" : undefined }}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === "user"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {msg.role === "user" ? (
                <User className="w-4 h-4" />
              ) : (
                <Bot className="w-4 h-4" />
              )}
            </div>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
              }`}
            >
              {msg.content ||
                (loading && i === messages.length - 1 ? <TypingDots /> : null)}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-3 border-t bg-zinc-50 dark:bg-zinc-800 flex gap-2 shrink-0"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入你的问题..."
          className="flex-1 px-4 py-2.5 rounded-lg border bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center gap-1.5 transition-all"
        >
          {loading ? (
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              回复中
            </span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              发送
            </>
          )}
        </button>
      </form>
    </div>
  );
}
