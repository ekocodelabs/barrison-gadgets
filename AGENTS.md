<!-- BEGIN:nextjs-agent-rules -->

# AGENTS.md — E-Commerce Store Context & Rules

## 1. Security & File Access Restrictions (STRICT)

- **No Environment File Access:** NEVER read, open, parse, summarize, or print contents from `.env`, `.env.local`, `.env.development`, `.env.production`, or any file containing secrets/API keys.
- **No Secret Generation or Logging:** Never hardcode database URIs, NextAuth secrets, or payment keys in code. Never `console.log(process.env)`.
- **Reference Only via Example:** If a new environment variable is required, document only the key name in `.env.example` with a dummy placeholder (e.g., `MONGODB_URI=your_mongodb_uri_here`).
- **Terminal Command Safety:** Do not run destructive shell commands (`rm -rf`, database drops) or inspect environment variables (`printenv`, `env`, `cat .env`) in the terminal.

## 2. Tech Stack & Package Management

- **Framework:** [Next.js](https://nextjs.org/docs "Next.js Documentation") (App Router)
- **Package Manager:** `npm` (Strictly use `npm install`, `npm run dev`, and `npm run build`—never use yarn, pnpm, or bun).
- **Authentication:** [NextAuth.js](https://authjs.dev "Auth.js Documentation")
- **Database & ODM:** [MongoDB](https://www.mongodb.com/docs/drivers/node-frameworks/next-integration/ "Integrate Next.js with MongoDB") with [Mongoose](https://mongoosejs.com "Mongoose Documentation")
- **UI & Styling:** Tailwind CSS + [shadcn/ui](https://shadcn.com "shadcn/ui Documentation")

---

## 3. Directory & File Structure

Follow this exact folder layout when creating or modifying files:

- `app/api/` — All backend API route handlers (`route.js` / `route.ts`). Keep business logic clean and validate request bodies before touching the database.
- `models/` — All Mongoose schemas and models (e.g., `User`, `Product`, `Order`, `Cart`). Always prevent model overwrite errors during hot-reloads using `mongoose.models.ModelName || mongoose.model(...)`.
- `components/` — Base [shadcn/ui](https://shadcn.com/components "shadcn/ui Components") primitives (e.g., `button.tsx`, `input.tsx`, `dialog.tsx`). **Do not manually rewrite core shadcn primitives unless explicitly asked.**
- `myComponent/` — Custom application and e-commerce components (e.g., product cards, navbar, cart drawers, checkout forms). Build these by composing primitives from `components/`.
- `lib/` — Shared utilities, database connection helpers (cached MongoDB connection), and NextAuth configuration.

---

## 4. Database & API Conventions

- **Cached Connections:** Always await the cached MongoDB connection utility before executing any Mongoose query in API routes or Server Components.
- **Model Reuse:** Import schemas strictly from the `models/` directory. Do not define inline Mongoose schemas inside API routes.
- **Error Handling:** Return standard HTTP status codes (`200`, `201`, `400`, `401`, `404`, `500`) with clear JSON responses (`{ message, data }` or `{ error }`).
- **Auth Protection:** Verify the user session via NextAuth on all protected API routes (such as checkout, order history, and admin product management) before performing database mutations.

---

## 5. Design & UI Consistency Rules

- **Component Hierarchy:** Always check `components/` (shadcn) first for base UI elements before creating custom HTML/CSS elements. Place all custom feature components inside `myComponent/`.
- **Styling Tokens:** Use Tailwind utility classes and existing CSS variables (`bg-background`, `text-foreground`, `border`, `primary`, `muted`, etc.) defined in `globals.css`. Avoid hardcoded hex colors so theme consistency is preserved.
- **Responsive Design:** Every storefront view (product grids, product details, cart, and checkout) must be mobile-first and responsive across mobile, tablet, and desktop breakpoints.
- **Interactive States:** Include loading skeletons/spinners, empty states (e.g., empty cart), and toast notifications for user actions like adding items to the cart or completing an order.

---

## 6. General Coding Guidelines

- Keep Server Components as the default; only add `"use client"` at the top of files inside `myComponent/` when interactivity, hooks (`useState`, `useEffect`), or event listeners are required.
- Never expose sensitive environment variables (`MONGODB_URI`, `NEXTAUTH_SECRET`, payment keys) to client-side components.

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->
