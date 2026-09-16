import Editor from "@monaco-editor/react";
import type { OnMount } from "@monaco-editor/react";
import { Loader2 } from "lucide-react";

interface CodeEditorProps {
  code: string;
  language: string;
  theme: string;
  onChange: (value: string) => void;
}

export default function CodeEditor({
  code,
  language,
  theme,
  onChange,
}: CodeEditorProps) {
  const handleMount: OnMount = (editor) => {
    // Keep the editor comfortably sized on small screens without users
    // having to pinch-zoom; Monaco itself is not responsive by default.
    editor.updateOptions({ fontSize: window.innerWidth < 640 ? 13 : 14 });
  };

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        language={language}
        theme={theme}
        value={code}
        onChange={(value) => onChange(value ?? "")}
        onMount={handleMount}
        options={{
          minimap: { enabled: window.innerWidth >= 1024 },
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontLigatures: true,
          fontSize: 14,
          padding: { top: 16 },
          scrollBeyondLastLine: false,
          wordWrap: "on",
          automaticLayout: true,
          smoothScrolling: true,
          cursorBlinking: "smooth",
        }}
        loading={
          <div className="flex h-full flex-col items-center justify-center gap-2 text-sm text-mist-300">
            <Loader2 className="h-5 w-5 animate-spin text-signal" aria-hidden />
            Cargando el editor…
          </div>
        }
      />
    </div>
  );
}
