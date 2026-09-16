import * as Tooltip from "@radix-ui/react-tooltip";
import { CodeXml, Loader2, Share2 } from "lucide-react";
import Select from "./Select";
import { LANGUAGES, THEMES } from "../languages";

interface ToolbarProps {
  title: string;
  language: string;
  theme: string;
  onTitleChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
  onThemeChange: (value: string) => void;
  onSave: () => void;
  saveDisabled: boolean;
  saving: boolean;
  hasUnsavedEdits: boolean;
  alreadyShared: boolean;
}

export default function Toolbar({
  title,
  language,
  theme,
  onTitleChange,
  onLanguageChange,
  onThemeChange,
  onSave,
  saveDisabled,
  saving,
  hasUnsavedEdits,
  alreadyShared,
}: ToolbarProps) {
  const showDisabledHint = alreadyShared && !hasUnsavedEdits && !saving;

  const saveButton = (
    <button
      type="button"
      onClick={onSave}
      disabled={saveDisabled}
      className="
        flex w-full shrink-0 items-center justify-center gap-1.5
        rounded-md bg-signal px-4 py-2 text-sm font-medium
        text-ink-950 transition-colors
        hover:bg-signal/90
        focus:outline-none
        focus-visible:outline-mist-100
        disabled:cursor-not-allowed
        disabled:bg-ink-600
        disabled:text-mist-400
        sm:w-auto sm:py-1.5
      "
    >
      {saving ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
      ) : (
        <Share2 className="h-4 w-4" aria-hidden />
      )}

      {saving ? "Guardando…" : "Guardar y compartir"}
    </button>
  );

  return (
    <header
      className="
        flex flex-wrap items-center gap-2
        border-b border-ink-600
        bg-ink-800
        px-3 py-2.5
        sm:flex-nowrap sm:gap-4 sm:px-6 sm:py-3
      "
    >
      {/* Logo */}
      <a href="/" className="flex w-full shrink-0 items-center gap-2 sm:w-auto">
        <span
          className="
            flex h-7 w-7 items-center justify-center
            rounded-md bg-ink-700 text-signal
          "
        >
          <CodeXml className="h-4 w-4" aria-hidden />
        </span>

        <span className="text-sm font-semibold tracking-tight text-mist-100 sm:text-base">
          NoteCode
        </span>
      </a>

      {/* Controls */}
      <div
        className="
          flex w-full min-w-0 flex-1
          flex-wrap items-center gap-2
          sm:w-auto sm:flex-nowrap sm:gap-3
        "
      >
        {/* Title */}
        <div className="relative w-full min-w-0 sm:w-52 sm:shrink-0">
          <input
            type="text"
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            placeholder="Título del snippet"
            aria-label="Título del snippet"
            className="
              h-9 w-full min-w-0
              rounded-md border border-ink-600
              bg-ink-700
              px-3
              text-sm text-mist-100
              placeholder:text-mist-400
              outline-none
              transition-colors
              focus:border-signal
              focus:ring-1 focus:ring-signal
            "
          />
        </div>

        {/* Language */}
        <Select
          id="language-select"
          label="Lenguaje"
          value={language}
          options={LANGUAGES}
          onChange={onLanguageChange}
        />

        {/* Theme */}
        <Select
          id="theme-select"
          label="Tema"
          value={theme}
          options={THEMES}
          onChange={onThemeChange}
        />
      </div>

      {/* Save */}
      {showDisabledHint ? (
        <Tooltip.Provider delayDuration={200}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>{saveButton}</Tooltip.Trigger>

            <Tooltip.Portal>
              <Tooltip.Content
                sideOffset={6}
                className="
                  z-50 rounded-md
                  border border-ink-600
                  bg-ink-700
                  px-2.5 py-1.5
                  text-xs text-mist-200
                  shadow-lg shadow-black/40
                  animate-in fade-in-0 zoom-in-95
                "
              >
                Edita el código para volver a compartir
                <Tooltip.Arrow className="fill-ink-700" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      ) : (
        saveButton
      )}
    </header>
  );
}
