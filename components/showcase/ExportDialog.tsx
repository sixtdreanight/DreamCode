'use client';

import { useState } from 'react';
import { X, Download, Copy, Globe, Cloud, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { DEPLOY_GUIDES } from '@/lib/deploy';

interface ExportDialogProps {
  code: string;
  title: string;
  onClose: () => void;
}

export default function ExportDialog({ code, title, onClose }: ExportDialogProps) {
  const [activeTab, setActiveTab] = useState<'download' | 'deploy'>('download');
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function handleDownload() {
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title || 'my-page'}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface rounded-3xl p-6 max-w-lg w-[95%] max-h-[80vh] overflow-y-auto shadow-2xl border border-edge animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-display font-bold text-lg">导出作品</h3>
            <p className="text-xs text-muted">{title || '未命名作品'}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-surface-alt flex items-center justify-center hover:bg-surface-raised transition-colors">
            <X className="w-4 h-4 text-muted" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-surface-alt mb-5">
          <button
            onClick={() => setActiveTab('download')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'download' ? 'bg-surface shadow-sm text-text-primary' : 'text-muted'
            }`}
          >
            <Download className="w-3.5 h-3.5 inline-block mr-1.5" />
            下载代码
          </button>
          <button
            onClick={() => setActiveTab('deploy')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'deploy' ? 'bg-surface shadow-sm text-text-primary' : 'text-muted'
            }`}
          >
            <Globe className="w-3.5 h-3.5 inline-block mr-1.5" />
            发布上网
          </button>
        </div>

        {activeTab === 'download' && (
          <div className="space-y-3">
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-accent text-white rounded-xl font-semibold hover:shadow-lg active:scale-[0.98] transition-all"
            >
              <Download className="w-4 h-4" />
              下载 HTML 文件
            </button>
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-edge rounded-xl text-sm text-muted hover:text-accent hover:border-accent/30 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
              {copied ? '已复制' : '复制代码'}
            </button>
          </div>
        )}

        {activeTab === 'deploy' && (
          <div className="space-y-2">
            {DEPLOY_GUIDES.map((guide) => (
              <div
                key={guide.id}
                className="border border-edge rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setExpandedGuide(expandedGuide === guide.id ? null : guide.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-surface-alt/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-accent-soft flex items-center justify-center">
                      {guide.id === 'github-pages' ? <Globe className="w-4 h-4 text-accent" /> :
                       guide.id === 'download' ? <Download className="w-4 h-4 text-accent" /> :
                       <Cloud className="w-4 h-4 text-accent" />}
                    </span>
                    <div>
                      <span className="text-sm font-semibold">{guide.label}</span>
                      <p className="text-[10px] text-muted">{guide.description}</p>
                    </div>
                  </div>
                  {expandedGuide === guide.id ? (
                    <ChevronUp className="w-4 h-4 text-muted shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted shrink-0" />
                  )}
                </button>
                {expandedGuide === guide.id && (
                  <div className="px-4 pb-4 animate-slide-down">
                    <ol className="list-decimal list-inside space-y-2 text-sm text-muted">
                      {guide.steps.map((step, i) => (
                        <li key={i} className="leading-relaxed">{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
