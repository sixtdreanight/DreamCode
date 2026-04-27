"use client";

import { useState } from "react";
import { Wand2, Copy, Check, Code2 } from "lucide-react";

export default function PromptPlayground() {
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generate() {
    if (!prompt.trim()) return;
    setLoading(true);
    setCode("");

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `请根据以下描述，生成一个完整的、可直接运行的 HTML 文件代码。要求：
1. 包含所有 CSS 和 JavaScript，不要依赖外部文件
2. 代码要有中文注释，解释关键部分
3. 使用现代简洁的设计风格
4. 直接返回代码，不要加任何解释性文字

描述：${prompt}`,
            },
          ],
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("请求失败");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullCode = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullCode += decoder.decode(value, { stream: true });
        setCode(fullCode);
      }
    } catch (err) {
      setCode("<!-- 出错了，请检查 API Key 配置或稍后重试 -->");
    } finally {
      setLoading(false);
    }
  }

  function copyCode() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const cleanCode = code
    .replace(/```html/g, "")
    .replace(/```/g, "")
    .trim();

  return (
    <div className="flex flex-col h-full border rounded-xl bg-white dark:bg-zinc-900 shadow-sm overflow-hidden animate-fade-in">
      <div className="px-4 py-3 border-b bg-zinc-50 dark:bg-zinc-800 flex items-center gap-2 shrink-0">
        <Wand2 className="w-5 h-5 text-purple-600" />
        <span className="font-semibold text-sm">Prompt Playground</span>
      </div>

      <div className="p-4 space-y-3 shrink-0">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="描述你想要做的网页，比如：帮我做一个个人介绍页面，顶部放名字，中间放照片和自我介绍..."
          className="w-full h-24 px-4 py-3 rounded-lg border bg-white dark:bg-zinc-900 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-400">
            例如：&ldquo;帮我做一个番茄钟&rdquo;
          </span>
          <button
            onClick={generate}
            disabled={loading || !prompt.trim()}
            className="px-5 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center gap-2 transition-all"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                生成中...
              </span>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                生成代码
              </>
            )}
          </button>
        </div>
      </div>

      {cleanCode && (
        <div className="flex-1 min-h-[200px] border-t flex flex-col animate-slide-up">
          <div className="flex items-center justify-between px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border-b shrink-0">
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <Code2 className="w-4 h-4" />
              生成的代码
            </div>
            <button
              onClick={copyCode}
              className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {copied ? "已复制" : "复制"}
            </button>
          </div>
          <pre className="flex-1 p-4 overflow-auto text-xs bg-zinc-950 text-zinc-100 font-mono leading-relaxed">
            <code>{cleanCode}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
