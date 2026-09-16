import { useState } from "react";
import { Check, CircleCheck, Copy } from "lucide-react";

interface ShareStatusProps {
  snippetId: string;
}

export default function ShareStatus({ snippetId }: ShareStatusProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/${snippetId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API can be unavailable (e.g. insecure context); the
      // link is still visible and selectable for a manual copy.
    }
  };

  return (
    <div
      className="flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-ink-600 bg-ink-800 px-4 py-2 text-sm sm:px-6"
      role="status"
    >
      <span className="flex items-center gap-1.5 text-mint">
        <CircleCheck className="h-4 w-4 shrink-0" aria-hidden />
        Guardado
      </span>
      <span className="text-mist-400">·</span>
      <code className="truncate font-mono text-mist-100">{shareUrl}</code>
      <button
        type="button"
        onClick={handleCopy}
        className="ml-auto flex items-center gap-1.5 rounded-md border border-ink-600 px-2.5 py-1 text-xs
          text-mist-200 transition-colors hover:border-signal hover:text-signal focus:outline-none
          focus-visible:outline-signal"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5" aria-hidden />
        ) : (
          <Copy className="h-3.5 w-3.5" aria-hidden />
        )}
        {copied ? "Copiado" : "Copiar enlace"}
      </button>
    </div>
  );
}
