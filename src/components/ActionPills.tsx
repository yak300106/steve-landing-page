import { useState, useEffect } from 'react';

interface ActionPillsProps {
  onActionClick: (action: string) => void;
}

export function ActionPills({ onActionClick }: ActionPillsProps) {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText('hello@mainframe.co');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is restricted
      const textArea = document.createElement('textarea');
      textArea.value = 'hello@mainframe.co';
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy', err);
      }
      document.body.removeChild(textArea);
    }
  };

  const pillButtons = [
    { id: 'pitch', label: 'Pitch us an idea' },
    { id: 'careers', label: 'Come work here' },
    { id: 'hello', label: 'Send a brief hello' },
    { id: 'operate', label: 'See how we operate' },
  ];

  return (
    <div
      className="flex flex-wrap gap-y-1 relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      {pillButtons.map((btn) => (
        <button
          key={btn.id}
          type="button"
          onClick={() => onActionClick(btn.id)}
          className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap cursor-pointer transition-colors duration-200 hover:bg-black hover:text-white"
        >
          {btn.label}
        </button>
      ))}

      {/* 1 outline pill button */}
      <button
        type="button"
        onClick={handleCopyEmail}
        className="group relative inline-flex items-center justify-center text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap cursor-pointer transition-colors duration-200 hover:bg-white hover:text-black gap-2 sm:gap-3"
        title="Click to copy email address"
      >
        <span>
          Reach us:{' '}
          <span className="underline underline-offset-1">
            hello@mainframe.co
          </span>
        </span>
        {copied ? (
          <span className="inline-flex items-center gap-1 text-[11px] sm:text-[12px] font-medium text-emerald-400 group-hover:text-emerald-700 transition-colors">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
              aria-hidden="true"
            >
              <path d="M2.5 6.5L4.5 8.5L9.5 3.5" />
            </svg>
            Copied!
          </span>
        ) : (
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
            aria-hidden="true"
          >
            <rect x="4.2" y="4.2" width="6.3" height="6.3" rx="1" />
            <path d="M2.5 7.5H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h4.5a1 1 0 0 1 1 1v0.5" />
          </svg>
        )}
      </button>
    </div>
  );
}
