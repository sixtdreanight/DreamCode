"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-0.5">
      <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce [animation-delay:0ms]" />
      <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce [animation-delay:150ms]" />
      <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce [animation-delay:300ms]" />
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
  const containerRef = useRef<HTMLDivElement>(null);
  const isNearBottom = useRef(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (isNearBottom.current) {
      el.scrollTop = el.scrollHeight;
    }
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
          content: `抱歉，出错了：${msg}\n\n提示：请检查 .env 文件中的 API Key 是否配置正确。`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full border border-edge rounded-lg bg-surface overflow-hidden animate-fade-in">
      <div className="px-4 py-3 border-b border-edge bg-surface-alt flex items-center gap-2 shrink-0">
        <Bot className="w-4 h-4 text-accent" />
        <span className="font-semibold text-sm">AI 学习助手</span>
      </div>

      <div
        ref={containerRef}
        onScroll={(e) => {
          const el = e.currentTarget;
          isNearBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
        }}
        className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px]"
      >
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
                  ? "bg-accent/10 text-accent"
                  : "bg-surface-alt"
              }`}
            >
              {msg.role === "user" ? (
                <User className="w-4 h-4" />
              ) : (
                <Bot className="w-4 h-4" />
              )}
            </div>
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-accent/10"
                  : "bg-surface-alt"
              }`}
            >
              {msg.content ||
                (loading && i === messages.length - 1 ? <TypingDots /> : null)}
            </div>
          </div>
        ))}
        <div />
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-3 border-t border-edge bg-surface-alt flex gap-2 shrink-0"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入你的问题..."
          className="flex-1 px-4 py-2.5 rounded-lg border border-edge bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-4 py-2.5 bg-accent/10 text-accent rounded-lg text-sm font-medium hover:bg-accent/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center gap-1.5 transition-all"
        >
          {loading ? (
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
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
