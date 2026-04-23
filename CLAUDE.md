# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Layout

npm workspaces monorepo:

- `apps/backend` — Express + TypeScript + Prisma API (only app with real code today)
- `apps/frontend` — Next.js 14 App Router (empty stub, `.gitkeep` only)
- `packages/shared` — shared types/utils (empty stub, `.gitkeep` only)

Run everything from the repo root using workspace scripts — do not `cd` into `apps/backend` for day-to-day commands.

## Common Commands

From repo root:

```bash
npm install                 # install all workspaces
npm run dev                 # concurrent: frontend + backend
npm run dev:backend         # backend only (nodemon + tsx, hot reload)
npm run dev:frontend        # frontend only (once scaffolded)
```

Backend-specific (run via `--workspace=apps/backend`, or inside that dir):

```bash
npm run build   --workspace=apps/backend    # tsc → dist/
npm run start   --workspace=apps/backend    # node dist/server.js
npm run db:migrate --workspace=apps/backend # prisma migrate dev
npm run db:studio  --workspace=apps/backend # prisma studio GUI
npm run db:seed    --workspace=apps/backend # runs src/infrastructure/database/seed.ts
```

No test runner is configured yet. If adding one, wire it into the root workspace scripts.

Seed creates a default admin: `admin@nexaflow.com` / `admin123`.

## Architecture — Clean Architecture Layers (STRICT)

Backend uses four layers with unidirectional dependencies (outer → inner only). TS path aliases in `apps/backend/tsconfig.json` enforce imports by concept, not relative paths:

- `@domain/*`         → pure TypeScript, no framework deps
  - `entities/`       → plain interfaces (e.g. `User`, `Product`)
  - `repositories/`   → interfaces only, prefixed `I` (e.g. `IUserRepository`)
- `@application/*`    → `use-cases/` — business logic, depends only on `@domain`
- `@infrastructure/*` → Prisma-backed repositories, DB client, external services (n8n)
- `@presentation/*`   → Express `controllers/`, `routes/`, `middlewares/` — calls use-cases, no direct DB access
- `@config/*`         → env loading/validation

Hard rules:
1. NEVER import `@infrastructure` from `@domain` or `@application`.
2. NEVER import `@presentation` from `@application`.
3. NEVER use `any`. `tsconfig` has `strict: true`.
4. Controllers delegate to use-cases; use-cases depend on repository interfaces; infrastructure implements those interfaces (see `UserRepository implements IUserRepository` for the canonical pattern).

### Request flow

`app.ts` wires middleware in this order: `helmet` → `cors(origin=FRONTEND_URL)` → `morgan` → `express.json()` → `/api/v1` router → `errorHandler` (global, last).

Routes are mounted under `/api/v1` from `presentation/routes/index.ts`. As of now only `/health` is wired — feature routers (auth, categories, products, suppliers) are commented placeholders. When adding a feature, uncomment/add the `router.use(...)` line there.

### Key infrastructure patterns

- **Prisma singleton** — always import `prisma` from `@infrastructure/database/prismaClient`. It caches on `globalThis` in non-production to survive hot reload. Never `new PrismaClient()` outside that file (the seed script is the one exception because it runs standalone).
- **Env loading** — always read config via `import { env } from '@config/env'`. `env.ts` calls `assertEnv` at import time and throws if any required var is missing. Do not read `process.env.X` directly in app code; add the var to `EnvConfig` and `assertEnv` instead.
- **Zod validation** — wrap route handlers with `validate(schema)` from `@presentation/middlewares/validate`. It parses `req.body`, returns 400 with `{ field, message }[]` on failure, and passes unknown errors to the error handler.
- **Auth** — `authMiddleware` verifies `Bearer <JWT>`, decodes with `env.JWT_SECRET`, attaches `AuthPayload` to `req.user` (globally augmented type). Apply to all routes except `/auth/login` and `/auth/register`.
- **Error handler** — `errorHandler` reads `err.status` (defaults 500), returns the standard error response, and includes `err.stack` only when `NODE_ENV !== 'production'`.

## Response Format (ALL endpoints)

```json
// success
{ "success": true,  "data": {},      "message": "string" }
// error
{ "success": false, "message": "string", "errors": [] }
```

## API Surface (target)

Base URL: `/api/v1`

- `POST /auth/login`, `POST /auth/register`
- `GET|POST /categories`, `PUT|DELETE /categories/:id`
- `GET|POST /products`,   `PUT|DELETE /products/:id`
- `GET|POST /suppliers`,  `PUT|DELETE /suppliers/:id`
- `POST /email/trigger` — forwards to n8n at `N8N_WEBHOOK_URL`

URLs kebab-case. All mutation routes require JWT auth.

## Database

PostgreSQL via Prisma. Schema at `apps/backend/prisma/schema.prisma`. Models: `User`, `Category`, `Product`, `Supplier`. Enums: `Role (ADMIN|USER)`, `Status (ACTIVE|INACTIVE)`. `Product.categoryId` is required; `Product.supplierId` is optional. Tables are mapped to snake_case plural names (`users`, `categories`, `products`, `suppliers`) via `@@map`.

After changing `schema.prisma`: run `npm run db:migrate --workspace=apps/backend` and regenerate the Prisma client (migrate dev does this automatically).

## Naming Conventions

- Files: `camelCase` for utilities, `PascalCase` for classes and interfaces
- Repository interfaces: prefix `I` (`IUserRepository`)
- Use cases: `PascalCase` class names describing the action (`GetAllCategories`, `CreateProduct`)
- URL paths: kebab-case
- Env vars: `UPPER_SNAKE_CASE`

## Environment Variables

Backend `apps/backend/.env` (see `.env.example`) — all required, validated at startup:
`PORT`, `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `N8N_WEBHOOK_URL`, `FRONTEND_URL`

Frontend `apps/frontend/.env.local`:
`NEXT_PUBLIC_API_URL`

## Code Generation Rules

- `async`/`await` only, never callbacks
- Validate `req.body` with Zod via the `validate()` middleware before controller logic runs
- Wrap controller bodies in `try/catch` and forward errors with `next(err)` so `errorHandler` owns the response
- No business logic in controllers — only in `@application/use-cases`
- Use the Prisma singleton; inject `PrismaClient` via constructor into repositories (see `UserRepository`)
