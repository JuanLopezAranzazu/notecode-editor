# NoteCode

Aplicación para compartir fragmentos de código. Pega o escribe código en el
editor, elige lenguaje y tema, y pulsa **Guardar y compartir** para obtener
un enlace único (`/api/snippets/:id`) que cualquiera puede abrir sin
necesidad de registrarse.

```
notecode/
├── backend/    Express + TypeScript + Prisma (PostgreSQL)
└── frontend/   React + TypeScript + Vite + Monaco Editor + TailwindCSS
```

## Cómo funciona

- **Guardar y compartir**: genera un ID único (UUID v4) en el backend,
  guarda el código, lenguaje y tema en PostgreSQL, y actualiza la URL del
  navegador a `/<id>`.
- **Botón deshabilitado tras guardar**: una vez guardado, el botón se
  deshabilita hasta que el usuario modifique el código, el lenguaje o el
  tema — así se evita crear duplicados del mismo contenido.
- **Abrir un enlace compartido**: al visitar `/<id>` el frontend consulta
  `GET /api/snippets/:id` y carga el código, lenguaje y tema guardados.
- **Sin autenticación**: cualquiera con el enlace puede ver el fragmento;
  no hay cuentas de usuario.

## 1. Backend

### Requisitos
- Node.js 18+
- Una base de datos PostgreSQL (local o en la nube, p. ej. Supabase, Neon o Docker)

### Puesta en marcha

```bash
cd backend
npm install
cp .env.example .env
# Edita .env y coloca tu cadena de conexión real en DATABASE_URL
npx prisma migrate dev --name init   # crea la tabla `snippets`
npm run dev                          # http://localhost:4000
```

También puedes levantar Postgres rápidamente con Docker:

```bash
docker run --name notecode-db -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=notecode -p 5432:5432 -d postgres:16
```

y usar `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/notecode?schema=public"`.

### Endpoints

| Método | Ruta                  | Descripción                                  |
|--------|-----------------------|-----------------------------------------------|
| POST   | `/api/snippets`       | Guarda un fragmento y devuelve su `id`        |
| GET    | `/api/snippets/:id`   | Recupera un fragmento por `id`                |
| GET    | `/api/health`         | Comprobación de estado del servicio           |

**POST /api/snippets** — cuerpo:

```json
{
  "code": "console.log('hola')",
  "language": "javascript",
  "theme": "vs-dark",
  "title": "opcional"
}
```

Respuesta `201`:

```json
{
  "id": "b3c1b6b0-...",
  "language": "javascript",
  "theme": "vs-dark",
  "title": null,
  "createdAt": "2026-09-16T12:00:00.000Z"
}
```

## 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Ajusta VITE_API_URL si tu backend no corre en localhost:4000
npm run dev     # http://localhost:5173
```

Compilación de producción:

```bash
npm run build     # genera frontend/dist
npm run preview   # sirve el build localmente para probarlo
```
