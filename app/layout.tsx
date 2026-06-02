import type { Metadata } from "next";
import { Noto_Sans_SC, Noto_Serif_SC, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const notoSansSC = Noto_Sans_SC({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "梦夜的编程课",
  description: "零基础学会用 AI 编程，让创意变成现实",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${notoSansSC.variable} ${notoSerifSC.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-surface">
        <a
          href="https://dreamnight.net.cn"
          className="fixed top-4 left-4 z-50 text-xs font-medium text-muted hover:text-accent transition-colors inline-flex items-center gap-1.5 glass px-4 py-2 rounded-full"
        >
          <span className="text-accent">&larr;</span>
          返回博客
        </a>
        {children}
      </body>
    </html>
  );
}
