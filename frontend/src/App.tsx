import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FileX2, Loader2, CircleAlert } from "lucide-react";
import Toolbar from "./components/Toolbar";
import CodeEditor from "./components/CodeEditor";
import ShareStatus from "./components/ShareStatus";
import { createSnippet, getSnippet } from "./api";
import { CODE_EXAMPLES } from "./codeExamples";

const DEFAULT_LANGUAGE = "javascript";

function exampleFor(language: string): string {
  return CODE_EXAMPLES[language] ?? CODE_EXAMPLES.plaintext;
}

// True while `code` is still exactly one of the bundled examples (or empty),
// meaning the user hasn't typed anything of their own yet — safe to swap
// out for a different language's example without losing their work.
function isUntouchedExample(code: string): boolean {
  const trimmed = code.trim();

  if (trimmed.length === 0) return true;

  return Object.values(CODE_EXAMPLES).some(
    (example) => example.trim() === trimmed,
  );
}

export default function App() {
  const { id: routeId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [code, setCode] = useState(exampleFor(DEFAULT_LANGUAGE));
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [theme, setTheme] = useState("vs-dark");

  // The id of the snippet currently represented by the editor's contents,
  // i.e. what the share link points to right now.
  const [snippetId, setSnippetId] = useState<string | null>(null);
  const [hasUnsavedEdits, setHasUnsavedEdits] = useState(false);

  const [loadingSnippet, setLoadingSnippet] = useState(Boolean(routeId));
  const [loadError, setLoadError] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Load an existing snippet when the URL contains an id.
  useEffect(() => {
    if (!routeId) {
      setLoadingSnippet(false);
      return;
    }

    let cancelled = false;

    setLoadingSnippet(true);
    setLoadError(null);

    getSnippet(routeId)
      .then((snippet) => {
        if (cancelled) return;

        setCode(snippet.code);
        setTitle(snippet.title ?? "");
        setLanguage(snippet.language);
        setTheme(snippet.theme);
        setSnippetId(snippet.id);
        setHasUnsavedEdits(false);
      })
      .catch((err: Error) => {
        if (cancelled) return;

        setLoadError(
          err.message || "No se pudo cargar el fragmento de código.",
        );
      })
      .finally(() => {
        if (!cancelled) {
          setLoadingSnippet(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [routeId]);

  const handleCodeChange = useCallback((value: string) => {
    setCode(value);
    setHasUnsavedEdits(true);
  }, []);

  const handleTitleChange = useCallback((value: string) => {
    setTitle(value);
    setHasUnsavedEdits(true);
  }, []);

  const handleLanguageChange = useCallback((value: string) => {
    setLanguage(value);
    setHasUnsavedEdits(true);

    setCode((prev) => (isUntouchedExample(prev) ? exampleFor(value) : prev));
  }, []);

  const handleThemeChange = useCallback((value: string) => {
    setTheme(value);
    setHasUnsavedEdits(true);
  }, []);

  const handleSave = useCallback(async () => {
    if (!code.trim() || saving) return;

    setSaving(true);
    setSaveError(null);

    try {
      const result = await createSnippet({
        code,
        language,
        theme,
        title,
      });

      setSnippetId(result.id);
      setHasUnsavedEdits(false);

      navigate(`/${result.id}`, { replace: true });
    } catch (err) {
      setSaveError(
        err instanceof Error ? err.message : "No se pudo guardar el fragmento.",
      );
    } finally {
      setSaving(false);
    }
  }, [code, language, theme, title, saving, navigate]);

  const saveDisabled =
    loadingSnippet ||
    saving ||
    !code.trim() ||
    (snippetId !== null && !hasUnsavedEdits);

  return (
    <div className="flex h-screen flex-col bg-ink-900">
      <Toolbar
        title={title}
        language={language}
        theme={theme}
        onTitleChange={handleTitleChange}
        onLanguageChange={handleLanguageChange}
        onThemeChange={handleThemeChange}
        onSave={handleSave}
        saveDisabled={saveDisabled}
        saving={saving}
        hasUnsavedEdits={hasUnsavedEdits}
        alreadyShared={snippetId !== null}
      />

      {saveError && (
        <p className="flex items-center gap-1.5 border-b border-ink-600 bg-ink-800 px-4 py-2 text-sm text-danger sm:px-6">
          <CircleAlert className="h-4 w-4 shrink-0" aria-hidden />
          {saveError}
        </p>
      )}

      <main className="min-h-0 flex-1 overflow-hidden p-3 sm:p-6 lg:p-8">
        <div className="mx-auto flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-ink-600 bg-ink-800 shadow-2xl shadow-black/40">
          <div className="relative min-h-0 flex-1">
            {loadingSnippet ? (
              <div className="flex h-full flex-col items-center justify-center gap-2 text-sm text-mist-300">
                <Loader2
                  className="h-5 w-5 animate-spin text-signal"
                  aria-hidden
                />
                Cargando el fragmento…
              </div>
            ) : loadError ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
                <FileX2 className="h-8 w-8 text-mist-400" aria-hidden />

                <p className="text-sm text-mist-200">{loadError}</p>

                <a
                  href="/"
                  className="rounded-md border border-ink-600 px-3 py-1.5 text-sm text-mist-200 transition-colors hover:border-signal hover:text-signal"
                >
                  Empezar un fragmento nuevo
                </a>
              </div>
            ) : (
              <CodeEditor
                code={code}
                language={language}
                theme={theme}
                onChange={handleCodeChange}
              />
            )}
          </div>

          {snippetId && !loadingSnippet && !loadError && (
            <ShareStatus snippetId={snippetId} />
          )}
        </div>
      </main>
    </div>
  );
}
