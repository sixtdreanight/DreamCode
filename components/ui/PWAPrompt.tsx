'use client';

import { Download, X } from 'lucide-react';

interface PWAPromptProps {
  onInstall: () => void;
  onDismiss: () => void;
}

export default function PWAPrompt({ onInstall, onDismiss }: PWAPromptProps) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md animate-slide-up">
      <div className="glass rounded-2xl p-4 border border-accent/20 shadow-xl flex items-center gap-3">
        {/* Icon */}
        <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shrink-0">
          <Download className="w-5 h-5" />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold">安装应用</p>
          <p className="text-xs text-muted">添加到主屏幕，随时随地学习</p>
        </div>

        {/* Actions */}
        <button
          onClick={onInstall}
          className="px-4 py-2 bg-accent text-white rounded-xl text-sm font-semibold hover:shadow-lg active:scale-95 transition-all shrink-0"
        >
          安装
        </button>
        <button
          onClick={onDismiss}
          className="p-2 rounded-lg hover:bg-surface-alt text-muted hover:text-accent transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
