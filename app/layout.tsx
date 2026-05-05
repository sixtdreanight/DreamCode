import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-surface">
        <a
          href="https://dreamnight.net.cn"
          className="fixed top-3 left-3 z-50 text-xs text-muted hover:text-accent transition-colors inline-flex items-center gap-1 bg-surface/80 backdrop-blur px-3 py-1.5 rounded-full border border-edge"
        >
          &larr; 返回博客
        </a>
        {children}
      </body>
    </html>
  );
}
