'use client';

import { MessageCircle, MessagesSquare } from 'lucide-react';

interface SocraticToggleProps {
  value: boolean;
  onChange: (val: boolean) => void;
}

export default function SocraticToggle({ value, onChange }: SocraticToggleProps) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className={`${!value ? 'text-accent font-semibold' : 'text-faint'}`}>
        直接回答
      </span>
      <button
        onClick={() => onChange(!value)}
        role="switch"
        aria-checked={value}
        className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
          value ? 'bg-accent' : 'bg-surface-raised'
        }`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 flex items-center justify-center ${
            value ? 'left-[26px]' : 'left-0.5'
          }`}
        >
          {value ? (
            <MessagesSquare className="w-3 h-3 text-accent" />
          ) : (
            <MessageCircle className="w-3 h-3 text-muted" />
          )}
        </span>
      </button>
      <span className={`${value ? 'text-accent font-semibold' : 'text-faint'}`}>
        引导思考
      </span>
    </div>
  );
}
