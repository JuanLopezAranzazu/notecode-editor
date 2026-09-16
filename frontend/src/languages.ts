export interface LanguageOption {
  value: string;
  label: string;
}

// Monaco language ids -> friendly labels. Keep the `value`s in sync with
// backend/src/constants.ts (SUPPORTED_LANGUAGES).
export const LANGUAGES: LanguageOption[] = [
  { value: "plaintext", label: "Texto plano" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "cpp", label: "C++" },
  { value: "c", label: "C" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "sql", label: "SQL" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "json", label: "JSON" },
  { value: "yaml", label: "YAML" },
  { value: "markdown", label: "Markdown" },
  { value: "shell", label: "Shell" },
];

export interface ThemeOption {
  value: string;
  label: string;
}

export const THEMES: ThemeOption[] = [
  { value: "vs-dark", label: "Oscuro" },
  { value: "vs-light", label: "Claro" },
  { value: "hc-black", label: "Alto contraste" },
];
