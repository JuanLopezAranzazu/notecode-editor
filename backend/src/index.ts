import "dotenv/config";
import express from "express";
import cors from "cors";
import snippetsRouter from "./routes/snippets.js";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? "http://localhost:5173";

app.use(
  cors({
    origin: CORS_ORIGIN.split(",").map((origin) => origin.trim()),
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/snippets", snippetsRouter);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: "Ruta no encontrada." });
});

app.listen(PORT, () => {
  console.log(`NoteCode API escuchando en http://localhost:${PORT}`);
});
