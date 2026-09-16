export interface Snippet {
  id: string;
  code: string;
  language: string;
  theme: string;
  title: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSnippetResponse {
  id: string;
  language: string;
  theme: string;
  title: string | null;
  createdAt: string;
}

export interface ApiError {
  error: string;
}
