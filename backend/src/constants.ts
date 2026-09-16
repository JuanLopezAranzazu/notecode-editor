// Kept in sync with the frontend's language/theme pickers
// (frontend/src/languages.ts). Requests outside these lists are rejected.

export const SUPPORTED_LANGUAGES = [
  "plaintext",
  "javascript",
  "typescript",
  "python",
  "java",
  "csharp",
  "cpp",
  "c",
  "go",
  "rust",
  "php",
  "ruby",
  "swift",
  "kotlin",
  "sql",
  "html",
  "css",
  "json",
  "yaml",
  "markdown",
  "shell",
] as const;

export const SUPPORTED_THEMES = ["vs-dark", "vs-light", "hc-black"] as const;

export const MAX_CODE_LENGTH = 200_000; // ~200 KB of text
export const MAX_TITLE_LENGTH = 120;
