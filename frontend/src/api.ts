import type { ApiError, CreateSnippetResponse, Snippet } from "./types";

// Configure this at build time, e.g. VITE_API_URL=https://api.notecode.app
const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

async function parseJsonOrThrow<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message = (data as ApiError | null)?.error ?? `Error ${res.status}`;
    throw new Error(message);
  }
  return data as T;
}

export async function createSnippet(payload: {
  code: string;
  language: string;
  theme: string;
  title?: string;
}): Promise<CreateSnippetResponse> {
  const res = await fetch(`${API_BASE_URL}/api/snippets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseJsonOrThrow<CreateSnippetResponse>(res);
}

export async function getSnippet(id: string): Promise<Snippet> {
  const res = await fetch(`${API_BASE_URL}/api/snippets/${id}`);
  return parseJsonOrThrow<Snippet>(res);
}
