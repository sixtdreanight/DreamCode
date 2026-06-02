"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="w-2 h-2 bg-accent/40 rounded-full animate-bounce [animation-delay:0ms]" />
      <span className="w-2 h-2 bg-accent/40 rounded-full animate-bounce [animation-delay:150ms]" />
      <span className="w-2 h-2 bg-accent/40 rounded-full animate-bounce [animation-delay:300ms]" />
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
    <div className="flex flex-col h-full rounded-xl border border-edge bg-surface overflow-hidden shadow-md">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-edge bg-surface-alt flex items-center gap-2.5 shrink-0">
        <span className="w-8 h-8 rounded-lg bg-accent-soft flex items-center justify-center">
          <Bot className="w-4 h-4 text-accent" />
        </span>
        <div>
          <span className="font-semibold text-sm">AI 学习助手</span>
          <span className="text-[10px] text-success ml-2 inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-success" />
            在线
          </span>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={containerRef}
        onScroll={(e) => {
          const el = e.currentTarget;
          isNearBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
        }}
        className="flex-1 overflow-y-auto p-5 space-y-5 min-h-[300px] bg-[radial-gradient(ellipse_at_top,_var(--color-accent-soft)_0%,_transparent_70%)]"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${
              msg.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ring-2 ring-offset-1 ${
                msg.role === "user"
                  ? "bg-accent text-white ring-accent/20 ring-offset-surface"
                  : "bg-surface-alt ring-edge ring-offset-surface"
              }`}
            >
              {msg.role === "user" ? (
                <User className="w-4 h-4" />
              ) : (
                <Sparkles className="w-4 h-4 text-accent" />
              )}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-accent text-white rounded-tr-md"
                  : "bg-surface-alt border border-edge rounded-tl-md"
              }`}
            >
              {msg.content ||
                (loading && i === messages.length - 1 ? <TypingDots /> : null)}
            </div>
          </div>
        ))}
        <div />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-edge bg-surface-alt flex gap-2.5 shrink-0"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入你的问题..."
          className="flex-1 px-4 py-3 rounded-xl border border-edge bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all placeholder:text-faint"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-5 py-3 bg-accent text-white rounded-xl text-sm font-semibold hover:shadow-lg active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center gap-2 transition-all"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </form>
    </div>
  );
}
