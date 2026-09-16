import { Router, Request, Response } from "express";
import { v4 as uuidv4, validate as isUuid } from "uuid";
import { prisma } from "../prisma.js";
import {
  SUPPORTED_LANGUAGES,
  SUPPORTED_THEMES,
  MAX_CODE_LENGTH,
  MAX_TITLE_LENGTH,
} from "../constants.js";

const router = Router();

/**
 * POST /api/snippets
 * Body: { code: string, language?: string, theme?: string, title?: string }
 * Creates a new snippet and returns its generated id.
 */
router.post("/", async (req: Request, res: Response) => {
  const { code, language, theme, title } = req.body ?? {};

  if (typeof code !== "string" || code.trim().length === 0) {
    return res.status(400).json({ error: "El campo 'code' es obligatorio." });
  }

  if (code.length > MAX_CODE_LENGTH) {
    return res
      .status(400)
      .json({ error: `El código supera el límite de ${MAX_CODE_LENGTH} caracteres.` });
  }

  const resolvedLanguage =
    typeof language === "string" && (SUPPORTED_LANGUAGES as readonly string[]).includes(language)
      ? language
      : "plaintext";

  const resolvedTheme =
    typeof theme === "string" && (SUPPORTED_THEMES as readonly string[]).includes(theme)
      ? theme
      : "vs-dark";

  if (title !== undefined && title !== null) {
    if (typeof title !== "string" || title.length > MAX_TITLE_LENGTH) {
      return res
        .status(400)
        .json({ error: `El campo 'title' debe ser texto de máximo ${MAX_TITLE_LENGTH} caracteres.` });
    }
  }

  try {
    const snippet = await prisma.snippet.create({
      data: {
        id: uuidv4(),
        code,
        language: resolvedLanguage,
        theme: resolvedTheme,
        title: typeof title === "string" && title.trim() ? title.trim() : null,
      },
    });

    return res.status(201).json({
      id: snippet.id,
      language: snippet.language,
      theme: snippet.theme,
      title: snippet.title,
      createdAt: snippet.createdAt,
    });
  } catch (err) {
    console.error("Error creating snippet:", err);
    return res.status(500).json({ error: "No se pudo guardar el fragmento de código." });
  }
});

/**
 * GET /api/snippets/:id
 * Retrieves a snippet by its id.
 */
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!isUuid(id)) {
    return res.status(400).json({ error: "El ID proporcionado no es válido." });
  }

  try {
    const snippet = await prisma.snippet.findUnique({ where: { id } });

    if (!snippet) {
      return res.status(404).json({ error: "No se encontró ningún fragmento con ese ID." });
    }

    return res.status(200).json(snippet);
  } catch (err) {
    console.error("Error fetching snippet:", err);
    return res.status(500).json({ error: "No se pudo recuperar el fragmento de código." });
  }
});

export default router;
