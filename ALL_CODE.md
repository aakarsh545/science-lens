# ALL_CODE.md

This file was generated automatically by scripts/generate_all_code_md.cjs.
It contains repository files, a short explanation, and full contents for text files.

## .env

**Explanation:** Repository file.

```
VITE_OPENAI_API_KEY="your_api_key_here"
VITE_SUPABASE_PROJECT_ID="oyalgnheaxmlhnkkcduy"
VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95YWxnbmhlYXhtbGhua2tjZHV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwNDAwMjQsImV4cCI6MjA3MzYxNjAyNH0.G6dUjoSbi6MMVy1mKdnvmIIheITZiiN0qLV66qdRg-g"
VITE_SUPABASE_URL="https://oyalgnheaxmlhnkkcduy.supabase.co"

```

## .env.local.example

**Explanation:** Repository file.

```example
# Copy this file to .env.local and fill in the real values. DO NOT commit real secrets.

# OpenAI
OPENAI_API_KEY=

# Supabase
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

```

## .gitignore

**Explanation:** Repository file.

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

```

## README.md

**Explanation:** Documentation or README.

```md
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/39031c40-923c-46dd-bf78-b53f4db60840

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/39031c40-923c-46dd-bf78-b53f4db60840) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/39031c40-923c-46dd-bf78-b53f4db60840) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Local development: API server for OpenAI

This project uses Vite for the frontend. To make it easy to test the Next-style API route added in `pages/api/openai/ask.ts` while running Vite locally, there's a lightweight Express dev server that mirrors the same endpoint.

Files:

- `server/dev-server.js` — small Express server that exposes `POST /api/openai/ask` and proxies to OpenAI using the `OPENAI_API_KEY` env var.

Scripts:

Run the frontend (Vite):

```bash
npm run dev
```

Run the dev API server:

```bash
npm run dev:api
```

Run both concurrently (requires `concurrently` to be installed globally or added to devDependencies):

```bash
npm run dev:all
```

Notes:

- Set `OPENAI_API_KEY` in your environment before starting the dev API server. Example:

```bash
export OPENAI_API_KEY="sk-..."
npm run dev:api
```

- The dev server listens on port `8787` by default (override with `DEV_API_PORT`).
- This dev server is for local development and testing only — do not use it as-is in production.

```

## SUPABASE_INTEGRATION.md

**Explanation:** Documentation or README.

```md
# Supabase + OpenAI Integration Guide

## Overview

This Science Lens app now includes a complete backend integration using Supabase Edge Functions and OpenAI API. The integration provides secure API key management, database logging, and scalable architecture.

## Architecture

### Database Tables

1. **`ai_logs`** - Stores all AI interactions
   - `id` (serial primary key)
   - `prompt` (text) - User's question
   - `response` (text) - AI's response
   - `created_at` (timestamp) - When the interaction occurred

2. **`articles`** - Stores science articles
   - `id` (serial primary key)
   - `title` (text) - Article title
   - `content` (text) - Article content
   - `created_at` (timestamp) - Creation timestamp
   - `updated_at` (timestamp) - Last update timestamp

### Edge Functions

#### 1. `/api/ask` (POST)
- **Purpose**: Main AI interaction endpoint
- **Functionality**: 
  - Accepts user questions via POST request
  - Calls OpenAI API (gpt-4o-mini model)
  - Logs both prompt and response to `ai_logs` table
  - Returns AI response to frontend
- **Request Body**: `{ "prompt": "your question here" }`
- **Response**: `{ "response": "AI response", "logged": true }`

#### 2. `/api/test-openai` (GET)
- **Purpose**: Health check for OpenAI integration
- **Functionality**: 
  - Tests OpenAI API connection
  - Returns "Hello from GPT!" message
  - Verifies API key is working
- **Response**: `{ "message": "Hello from GPT!", "status": "OpenAI connection successful" }`

#### 3. `/api/data` (GET/POST/PUT/DELETE)
- **Purpose**: CRUD operations for articles
- **GET**: Fetch all articles
- **POST**: Create new article - `{ "title": "...", "content": "..." }`  
- **PUT**: Update article - `{ "id": 1, "title": "...", "content": "..." }`
- **DELETE**: Delete article - `{ "id": 1 }`

## Security Features

- **API Key Protection**: OpenAI API key stored as Supabase secret (server-side only)
- **Row Level Security (RLS)**: Enabled on both tables with public access policies
- **CORS Headers**: Properly configured for web app access
- **Error Handling**: Comprehensive error logging and user-friendly responses

## Frontend Changes

The frontend has been updated to:
- Use Supabase Edge Functions instead of direct OpenAI API calls
- Remove client-side API key management
- Implement proper error handling for backend calls
- Maintain the same user experience with enhanced reliability

## Testing

### API Test Suite
Visit `/api-test` in your app to access the comprehensive test suite:

1. **OpenAI Connection Test**: Verifies the OpenAI API key and connection
2. **Ask Endpoint Test**: Tests the main AI interaction with database logging
3. **Data Endpoint Test**: Tests article CRUD operations

### Manual Testing

1. **Test OpenAI Endpoint**:
   ```bash
   curl -X GET https://your-project.supabase.co/functions/v1/test-openai
   ```

2. **Test Ask Endpoint**:
   ```bash
   curl -X POST https://your-project.supabase.co/functions/v1/ask \
     -H "Content-Type: application/json" \
     -d '{"prompt": "Explain gravity in 5 words"}'
   ```

3. **Test Data Endpoint**:
   ```bash
   # Create article
   curl -X POST https://your-project.supabase.co/functions/v1/data \
     -H "Content-Type: application/json" \
     -d '{"title": "Test Article", "content": "This is test content"}'
   
   # Get all articles
   curl -X GET https://your-project.supabase.co/functions/v1/data
   ```

## Environment Setup

The integration uses Supabase secrets for secure environment variable management:

- `OPENAI_API_KEY`: Your OpenAI API key (configured via Supabase secrets)
- `SUPABASE_URL`: Automatically available in Edge Functions
- `SUPABASE_SERVICE_ROLE_KEY`: Automatically available in Edge Functions

## Benefits

1. **Security**: API keys are server-side only
2. **Scalability**: Supabase Edge Functions auto-scale
3. **Reliability**: Built-in error handling and fallbacks  
4. **Analytics**: All interactions are logged to the database
5. **Flexibility**: Easy to extend with new endpoints and features
6. **Performance**: Optimized for fast response times

## Future Enhancements

- User authentication integration for personalized experiences
- Rate limiting and usage analytics
- Advanced AI prompt engineering
- Real-time collaboration features
- Integration with additional AI models

## Troubleshooting

1. **OpenAI API Errors**: Check the Edge Function logs in Supabase dashboard
2. **Database Issues**: Verify RLS policies and table permissions
3. **CORS Errors**: Ensure Edge Functions include proper CORS headers
4. **Authentication**: Check Supabase auth configuration if implementing user accounts

For detailed logs and monitoring, visit your Supabase project dashboard under Edge Functions > Logs.
```

## bun.lockb

**Explanation:** Repository file.

**Note:** binary file or non-text asset omitted from inline content. Path: bun.lockb

## components.json

**Explanation:** Repository file.

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

## eslint.config.js

**Explanation:** Source code file.

```js
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": "off",
    },
  }
);

```

## index.html

**Explanation:** Root HTML file that mounts the React app.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ScienceLens - See the Science Behind Anything</title>
    <meta name="description" content="Upload any photo and discover the amazing science hiding in plain sight! Perfect for curious minds who love to explore and learn." />
    <meta name="author" content="ScienceLens" />
    <meta name="keywords" content="science, education, photo analysis, learning, kids, teens, STEM" />

    <meta property="og:title" content="ScienceLens - See the Science Behind Anything" />
    <meta property="og:description" content="Upload any photo and discover the amazing science hiding in plain sight! Perfect for curious minds who love to explore and learn." />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@lovable_dev" />
    <meta name="twitter:title" content="ScienceLens - See the Science Behind Anything" />
    <meta name="twitter:description" content="Upload any photo and discover the amazing science hiding in plain sight!" />
    <meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
    <!-- Favicon: primary points to the requested logo URL; fallback to local svg in public/ -->
    <link rel="icon" href="https://sora.chatgpt.com/g/gen_01k6ccmxkefs6rjzzjyf374xfx" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/favicon.svg" />
  </head>

  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```

## package.json

**Explanation:** npm/Yarn package manifest and scripts.

```json
{
  "name": "vite_react_shadcn_ts",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "dev:api": "node server/dev-server.js",
    "dev:all": "concurrently \"npm run dev\" \"npm run dev:api\"",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@radix-ui/react-accordion": "^1.2.11",
    "@radix-ui/react-alert-dialog": "^1.1.14",
    "@radix-ui/react-aspect-ratio": "^1.1.7",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-checkbox": "^1.3.2",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-context-menu": "^2.2.15",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-dropdown-menu": "^2.1.15",
    "@radix-ui/react-hover-card": "^1.1.14",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-menubar": "^1.1.15",
    "@radix-ui/react-navigation-menu": "^1.2.13",
    "@radix-ui/react-popover": "^1.1.14",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-radio-group": "^1.3.7",
    "@radix-ui/react-scroll-area": "^1.2.9",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slider": "^1.3.5",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.2.5",
    "@radix-ui/react-tabs": "^1.1.12",
    "@radix-ui/react-toast": "^1.2.14",
    "@radix-ui/react-toggle": "^1.1.9",
    "@radix-ui/react-toggle-group": "^1.1.10",
    "@radix-ui/react-tooltip": "^1.2.7",
    "@supabase/supabase-js": "^2.57.4",
    "@tanstack/react-query": "^5.83.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^3.6.0",
    "embla-carousel-react": "^8.6.0",
    "framer-motion": "^12.23.12",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.462.0",
    "next-themes": "^0.4.6",
    "openai": "^5.23.1",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-dropzone": "^14.3.8",
    "react-hook-form": "^7.61.1",
    "react-resizable-panels": "^2.1.9",
    "react-router-dom": "^6.30.1",
    "recharts": "^2.15.4",
    "sonner": "^1.7.4",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^0.9.9",
    "zod": "^3.25.76"
  },
  "devDependencies": {
    "body-parser": "^1.20.3",
    "concurrently": "^8.2.0",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
  "node-fetch": "^3.3.1",
    "@eslint/js": "^9.32.0",
    "@tailwindcss/typography": "^0.5.16",
    "@types/node": "^22.16.5",
    "@types/react": "^18.3.23",
    "@types/react-dom": "^18.3.7",
    "@vitejs/plugin-react-swc": "^3.11.0",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.32.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^15.15.0",
    "lovable-tagger": "^1.1.9",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.8.3",
    "typescript-eslint": "^8.38.0",
    "vite": "^5.4.19"
  }
}

```

## pages/api/openai/ask.ts

**Explanation:** Source code file.

```ts
import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

// NOTE: sanitize is implemented in src/utils/sanitize.ts. Import relatively.
import { sanitize } from '../../../src/utils/sanitize';

// Simple in-memory rate limiter per IP. Works for a single server process.
// For serverless or multi-instance deployments replace with Redis or other shared store.
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;
const rateMap = new Map<string, { count: number; firstTs: number }>();

async function tryLogToSupabase(payload: { ip?: string; questionPreview?: string }) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseServiceRole) return;
  try {
    // import at runtime to avoid hard dependency failures in environments without the package
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseServiceRole);
    await supabase.from('security_logs').insert([
      {
        user_id: null,
        action: 'openai.ask',
        created_at: new Date().toISOString(),
      },
    ]);
  } catch (e) {
    // don't block the request on logging failures
    // eslint-disable-next-line no-console
    console.warn('Supabase logging failed', e?.message || e);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Basic content-type and body checks
  if (!req.headers['content-type']?.includes('application/json')) {
    return res.status(400).json({ error: 'Expected application/json' });
  }

  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';

  // Rate limiting per IP
  const now = Date.now();
  const entry = rateMap.get(ip) || { count: 0, firstTs: now };
  if (now - entry.firstTs > RATE_LIMIT_WINDOW_MS) {
    entry.count = 0;
    entry.firstTs = now;
  }
  entry.count += 1;
  rateMap.set(ip, entry);
  if (entry.count > MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }

  let question: unknown = null;
  try {
    question = req.body?.question;
  } catch (e) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  if (typeof question !== 'string' || !question.trim()) {
    return res.status(400).json({ error: 'Missing or invalid `question` string' });
  }

  // enforce max length
  if (question.length > 4000) {
    return res.status(400).json({ error: 'Question too long' });
  }

  const cleaned = sanitize(question).slice(0, 4000);

  // Create OpenAI client using server-side env var. Do NOT commit keys to repo.
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }

  const openai = new OpenAI({ apiKey });

  try {
    // Write log to Supabase (best-effort, non-blocking)
    void tryLogToSupabase({ ip, questionPreview: cleaned.slice(0, 200) });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: cleaned }],
      max_tokens: 800,
    });

    // Attempt to read reply from known shapes
    const reply =
      // OpenAI's chat response
      (completion as any)?.choices?.[0]?.message?.content ||
      // fallback to text
      (completion as any)?.choices?.[0]?.text ||
      '';

    return res.status(200).json({ reply });
  } catch (err: any) {
    // Log error server-side and return generic message
    // eslint-disable-next-line no-console
    console.error('OpenAI request failed', err?.message || err);
    return res.status(502).json({ error: 'AI service error' });
  }
}

```

## postcss.config.js

**Explanation:** Source code file.

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

```

## public/favicon.ico

**Explanation:** Static public asset.

**Note:** binary file or non-text asset omitted from inline content. Path: public/favicon.ico

## public/favicon.svg

**Explanation:** Static public asset.

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#0ea5a4"/>
      <stop offset="1" stop-color="#7c3aed"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="12" fill="url(#g)" />
  <g transform="translate(8,8) scale(0.75)" fill="#fff">
    <path d="M24 6a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM10 36l4-8 10 4-4 8-10-4z" />
  </g>
</svg>

```

## public/placeholder.svg

**Explanation:** Static public asset.

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" fill="none"><rect width="1200" height="1200" fill="#EAEAEA" rx="3"/><g opacity=".5"><g opacity=".5"><path fill="#FAFAFA" d="M600.709 736.5c-75.454 0-136.621-61.167-136.621-136.62 0-75.454 61.167-136.621 136.621-136.621 75.453 0 136.62 61.167 136.62 136.621 0 75.453-61.167 136.62-136.62 136.62Z"/><path stroke="#C9C9C9" stroke-width="2.418" d="M600.709 736.5c-75.454 0-136.621-61.167-136.621-136.62 0-75.454 61.167-136.621 136.621-136.621 75.453 0 136.62 61.167 136.62 136.621 0 75.453-61.167 136.62-136.62 136.62Z"/></g><path stroke="url(#a)" stroke-width="2.418" d="M0-1.209h553.581" transform="scale(1 -1) rotate(45 1163.11 91.165)"/><path stroke="url(#b)" stroke-width="2.418" d="M404.846 598.671h391.726"/><path stroke="url(#c)" stroke-width="2.418" d="M599.5 795.742V404.017"/><path stroke="url(#d)" stroke-width="2.418" d="m795.717 796.597-391.441-391.44"/><path fill="#fff" d="M600.709 656.704c-31.384 0-56.825-25.441-56.825-56.824 0-31.384 25.441-56.825 56.825-56.825 31.383 0 56.824 25.441 56.824 56.825 0 31.383-25.441 56.824-56.824 56.824Z"/><g clip-path="url(#e)"><path fill="#666" fill-rule="evenodd" d="M616.426 586.58h-31.434v16.176l3.553-3.554.531-.531h9.068l.074-.074 8.463-8.463h2.565l7.18 7.181V586.58Zm-15.715 14.654 3.698 3.699 1.283 1.282-2.565 2.565-1.282-1.283-5.2-5.199h-6.066l-5.514 5.514-.073.073v2.876a2.418 2.418 0 0 0 2.418 2.418h26.598a2.418 2.418 0 0 0 2.418-2.418v-8.317l-8.463-8.463-7.181 7.181-.071.072Zm-19.347 5.442v4.085a6.045 6.045 0 0 0 6.046 6.045h26.598a6.044 6.044 0 0 0 6.045-6.045v-7.108l1.356-1.355-1.282-1.283-.074-.073v-17.989h-38.689v23.43l-.146.146.146.147Z" clip-rule="evenodd"/></g><path stroke="#C9C9C9" stroke-width="2.418" d="M600.709 656.704c-31.384 0-56.825-25.441-56.825-56.824 0-31.384 25.441-56.825 56.825-56.825 31.383 0 56.824 25.441 56.824 56.825 0 31.383-25.441 56.824-56.824 56.824Z"/></g><defs><linearGradient id="a" x1="554.061" x2="-.48" y1=".083" y2=".087" gradientUnits="userSpaceOnUse"><stop stop-color="#C9C9C9" stop-opacity="0"/><stop offset=".208" stop-color="#C9C9C9"/><stop offset=".792" stop-color="#C9C9C9"/><stop offset="1" stop-color="#C9C9C9" stop-opacity="0"/></linearGradient><linearGradient id="b" x1="796.912" x2="404.507" y1="599.963" y2="599.965" gradientUnits="userSpaceOnUse"><stop stop-color="#C9C9C9" stop-opacity="0"/><stop offset=".208" stop-color="#C9C9C9"/><stop offset=".792" stop-color="#C9C9C9"/><stop offset="1" stop-color="#C9C9C9" stop-opacity="0"/></linearGradient><linearGradient id="c" x1="600.792" x2="600.794" y1="403.677" y2="796.082" gradientUnits="userSpaceOnUse"><stop stop-color="#C9C9C9" stop-opacity="0"/><stop offset=".208" stop-color="#C9C9C9"/><stop offset=".792" stop-color="#C9C9C9"/><stop offset="1" stop-color="#C9C9C9" stop-opacity="0"/></linearGradient><linearGradient id="d" x1="404.85" x2="796.972" y1="403.903" y2="796.02" gradientUnits="userSpaceOnUse"><stop stop-color="#C9C9C9" stop-opacity="0"/><stop offset=".208" stop-color="#C9C9C9"/><stop offset=".792" stop-color="#C9C9C9"/><stop offset="1" stop-color="#C9C9C9" stop-opacity="0"/></linearGradient><clipPath id="e"><path fill="#fff" d="M581.364 580.535h38.689v38.689h-38.689z"/></clipPath></defs></svg>
```

## public/robots.txt

**Explanation:** Static public asset.

```txt
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /

```

## scripts/generate_all_code_md.cjs

**Explanation:** Service or helper script.

```cjs
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const outPath = path.join(root, 'ALL_CODE.md');

const IGNORE = [
  'node_modules',
  'dist',
  '.git',
  'build',
  'coverage',
  'node_modules',
  'package-lock.json',
  'yarn.lock',
];

function isBinary(filePath) {
  try {
    const buf = fs.readFileSync(filePath);
    for (let i = 0; i < Math.min(buf.length, 512); i++) {
      if (buf[i] === 0) return true;
    }
    return false;
  } catch (e) {
    return true;
  }
}

function explain(filePath) {
  const p = filePath.replace(root + path.sep, '');
  if (p === 'index.html') return 'Root HTML file that mounts the React app.';
  if (p === 'package.json') return 'npm/Yarn package manifest and scripts.';
  if (p.startsWith('src/pages/')) return 'React page component used by the router.';
  if (p.startsWith('src/components/ui/')) return 'UI primitive component (shared low-level UI).' ;
  if (p.startsWith('src/components/')) return 'Reusable React UI component.';
  if (p.startsWith('src/hooks/')) return 'Custom React hook.';
  if (p.startsWith('src/services/') || p.startsWith('server/') || p.startsWith('scripts/')) return 'Service or helper script.';
  if (p.startsWith('src/lib/')) return 'Library helper utilities.';
  if (p.startsWith('supabase/functions/')) return 'Supabase Edge Function handler.';
  if (p.startsWith('public/')) return 'Static public asset.';
  if (p.endsWith('.md')) return 'Documentation or README.';
  if (p.endsWith('.ts') || p.endsWith('.tsx') || p.endsWith('.js') || p.endsWith('.jsx')) return 'Source code file.';
  return 'Repository file.';
}

function walk(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (IGNORE.some(i => e.name === i)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

function extForFence(filePath) {
  const ext = path.extname(filePath).slice(1);
  if (!ext) return '';
  if (ext === 'ts' || ext === 'tsx') return 'ts';
  if (ext === 'js' || ext === 'jsx') return 'js';
  if (ext === 'json') return 'json';
  if (ext === 'css' || ext === 'scss') return 'css';
  if (ext === 'html') return 'html';
  return ext;
}

const allFiles = walk(root).filter(f => !f.includes('ALL_CODE.md'));

let md = '# ALL_CODE.md\n\n';
md += 'This file was generated automatically by scripts/generate_all_code_md.cjs.\n';
md += 'It contains repository files, a short explanation, and full contents for text files.\n\n';

for (const filePath of allFiles) {
  const relative = path.relative(root, filePath).replace(/\\/g, '/');
  md += `## ${relative}\n\n`;
  md += `**Explanation:** ${explain(filePath)}\n\n`;
  if (isBinary(filePath)) {
    md += `**Note:** binary file or non-text asset omitted from inline content. Path: ${relative}\n\n`;
    continue;
  }
  let content = '';
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    md += `**Error reading file:** ${e.message}\n\n`;
    continue;
  }
  const fenceLang = extForFence(filePath);
  md += '```' + fenceLang + '\n' + content + '\n```\n\n';
}

fs.writeFileSync(outPath, md, 'utf8');
console.log('Wrote', outPath);

```

## scripts/generate_all_code_md.js

**Explanation:** Service or helper script.

```js
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const outPath = path.join(root, 'ALL_CODE.md');

const IGNORE = [
  'node_modules',
  'dist',
  '.git',
  'build',
  'coverage',
  'node_modules',
  'package-lock.json',
  'yarn.lock',
];

function isBinary(filePath) {
  try {
    const buf = fs.readFileSync(filePath);
    for (let i = 0; i < Math.min(buf.length, 512); i++) {
      if (buf[i] === 0) return true;
    }
    return false;
  } catch (e) {
    return true;
  }
}

function explain(filePath) {
  const p = filePath.replace(root + path.sep, '');
  if (p === 'index.html') return 'Root HTML file that mounts the React app.';
  if (p === 'package.json') return 'npm/Yarn package manifest and scripts.';
  if (p.startsWith('src/pages/')) return 'React page component used by the router.';
  if (p.startsWith('src/components/ui/')) return 'UI primitive component (shared low-level UI).' ;
  if (p.startsWith('src/components/')) return 'Reusable React UI component.';
  if (p.startsWith('src/hooks/')) return 'Custom React hook.';
  if (p.startsWith('src/services/') || p.startsWith('server/') || p.startsWith('scripts/')) return 'Service or helper script.';
  if (p.startsWith('src/lib/')) return 'Library helper utilities.';
  if (p.startsWith('supabase/functions/')) return 'Supabase Edge Function handler.';
  if (p.startsWith('public/')) return 'Static public asset.';
  if (p.endsWith('.md')) return 'Documentation or README.';
  if (p.endsWith('.ts') || p.endsWith('.tsx') || p.endsWith('.js') || p.endsWith('.jsx')) return 'Source code file.';
  return 'Repository file.';
}

function walk(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (IGNORE.some(i => e.name === i)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

function extForFence(filePath) {
  const ext = path.extname(filePath).slice(1);
  if (!ext) return '';
  if (ext === 'ts' || ext === 'tsx') return 'ts';
  if (ext === 'js' || ext === 'jsx') return 'js';
  if (ext === 'json') return 'json';
  if (ext === 'css' || ext === 'scss') return 'css';
  if (ext === 'html') return 'html';
  return ext;
}

const allFiles = walk(root).filter(f => !f.includes('ALL_CODE.md'));

let md = '# ALL_CODE.md\n\n';
md += 'This file was generated automatically by scripts/generate_all_code_md.js.\n';
md += 'It contains repository files, a short explanation, and full contents for text files.\n\n';

for (const filePath of allFiles) {
  const relative = path.relative(root, filePath).replace(/\\/g, '/');
  md += `## ${relative}\n\n`;
  md += `**Explanation:** ${explain(filePath)}\n\n`;
  if (isBinary(filePath)) {
    md += `**Note:** binary file or non-text asset omitted from inline content. Path: ${relative}\n\n`;
    continue;
  }
  let content = '';
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    md += `**Error reading file:** ${e.message}\n\n`;
    continue;
  }
  const fenceLang = extForFence(filePath);
  md += '```' + fenceLang + '\n' + content + '\n```\n\n';
}

fs.writeFileSync(outPath, md, 'utf8');
console.log('Wrote', outPath);

```

## scripts/test-openai.js

**Explanation:** Service or helper script.

```js
#!/usr/bin/env node
/* Quick script to test OPENAI_API_KEY from environment locally.
   Usage: OPENAI_API_KEY=sk... node scripts/test-openai.js "What is 2+2?"
*/
import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;
async function main() {
  if (!apiKey) {
    console.error('OPENAI_API_KEY not set');
    process.exit(2);
  }
  const openai = new OpenAI({ apiKey });
  const question = process.argv[2] || 'Say hello in one line.';
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: question }],
      max_tokens: 200,
    });
    const reply = completion?.choices?.[0]?.message?.content || completion?.choices?.[0]?.text;
    console.log('reply:', reply);
  } catch (e) {
    console.error('OpenAI error:', e?.message || e);
    process.exit(1);
  }
}

main();

```

## server/dev-server.js

**Explanation:** Service or helper script.

```js
#!/usr/bin/env node
/**
 * Lightweight dev server to expose /api/openai/ask for Vite local development.
 * Mirrors the Next.js API handler behavior in pages/api/openai/ask.ts
 *
 * Usage:
 *   DEV_API_PORT=8787 OPENAI_API_KEY=sk... node server/dev-server.js
 */
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const PORT = process.env.DEV_API_PORT ? Number(process.env.DEV_API_PORT) : 8787;

const app = express();
app.use(bodyParser.json({ limit: '1mb' }));

// Simple in-memory rate limiter per IP (development only)
const RATE_LIMIT_WINDOW_MS = 60_000; // 60s
const MAX_REQUESTS_PER_WINDOW = 20;
const ipRequestLog = new Map();

function rateLimit(ip) {
  const now = Date.now();
  const entry = ipRequestLog.get(ip) || { count: 0, windowStart: now };
  if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    entry.count = 0;
    entry.windowStart = now;
  }
  entry.count += 1;
  ipRequestLog.set(ip, entry);
  return entry.count <= MAX_REQUESTS_PER_WINDOW;
}

function sanitize(input) {
  if (!input) return '';
  return String(input).replace(/<[^>]*>/g, '').trim();
}

app.get('/health', (req, res) => res.json({ ok: true, env: { hasOpenAI: !!process.env.OPENAI_API_KEY } }));

app.post('/api/openai/ask', async (req, res) => {
  try {
    if (!req.is('application/json')) {
      return res.status(400).json({ error: 'Expected application/json' });
    }

    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown';
    if (!rateLimit(ip)) {
      return res.status(429).json({ error: 'Too many requests' });
    }

    const { question } = req.body || {};
    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Missing question string in body' });
    }

    const prompt = sanitize(question).slice(0, 2000);

    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      return res.status(500).json({ error: 'OPENAI_API_KEY not set on server' });
    }

    const client = new OpenAI({ apiKey: openaiKey });

    const chatReq = {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are Science Lens, a helpful assistant that provides clear, step-by-step scientific explanations.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 700,
      temperature: 0.7,
    };

    const completion = await client.chat.completions.create(chatReq);
    const reply = completion?.choices?.[0]?.message?.content || completion?.choices?.[0]?.text || '';

    return res.json({ reply });
  } catch (err) {
    console.error('dev-server /api/openai/ask error:', err);
    return res.status(500).json({ error: (err && err.message) || 'unknown' });
  }
});

app.listen(PORT, () => {
  console.log(`Dev API server listening on http://localhost:${PORT}`);
  if (!process.env.OPENAI_API_KEY) {
    console.warn('Warning: OPENAI_API_KEY not set — /api/openai/ask will return 500 until it is configured.');
  }
});

```

## src/App.css

**Explanation:** Repository file.

```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}

```

## src/App.tsx

**Explanation:** Source code file.

```ts
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Landing from "./pages/Landing";
import ScienceLens from "./pages/ScienceLens";
import Pricing from "./pages/Pricing";
import ApiTest from "./pages/ApiTest";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="science-lens-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/explore" element={<ScienceLens />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/api-test" element={<ApiTest />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

```

## src/assets/science-hero.jpg

**Explanation:** Repository file.

**Note:** binary file or non-text asset omitted from inline content. Path: src/assets/science-hero.jpg

## src/components/AIAnswerHighlighting.tsx

**Explanation:** Reusable React UI component.

```ts
import React from 'react';
import { useQuery } from 'react-query';
import { getScienceExplanation } from '../api/science-explanation';

const ScienceExplanation = () => {
  const { data, error, isLoading } = useQuery(
    'science-explanation',
    getScienceExplanation,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <p>
        {data.description}
        <span className="highlight">
          <b>{data.highlightedText}</b>
        </span>
      </p>
    </div>
  );
};

export default ScienceExplanation;

```

## src/components/AIChatBubble.tsx

**Explanation:** Reusable React UI component.

```ts
import React, { useEffect } from 'react';

const AIChatBubble = ({ message, isUser }) => {
  useEffect(() => {
    // Optionally add animation logic here
  }, []);

  return (
    <div className={isUser ? 'user-chat-bubble' : 'ai-chat-bubble'}>
      <p>{message}</p>
    </div>
  );
};

export default AIChatBubble;

```

## src/components/AIDashboard.tsx

**Explanation:** Reusable React UI component.

```ts
import React from 'react';
import { useQuery } from 'react-query';
import { getRecentQuestions, getAchievements, getFavoriteTopics } from '../api/ai-dashboard';

const AIDashboard = () => {
  const { data, error, isLoading } = useQuery(
    'ai-dashboard',
    async () => {
      const recentQuestions = await getRecentQuestions();
      const achievements = await getAchievements();
      const favoriteTopics = await getFavoriteTopics();
      return { recentQuestions, achievements, favoriteTopics };
    },
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Recent Questions</h1>
      <ul>
        {data.recentQuestions.map((question) => (
          <li key={question.id}>{question.text}</li>
        ))}
      </ul>

      <h1>Achievements</h1>
      <ul>
        {data.achievements.map((achievement) => (
          <li key={achievement.id}>{achievement.name}</li>
        ))}
      </ul>

      <h1>Favorite Topics</h1>
      <ul>
        {data.favoriteTopics.map((topic) => (
          <li key={topic.id}>{topic.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AIDashboard;

```

## src/components/AILoader.tsx

**Explanation:** Reusable React UI component.

```ts
import React from 'react';
import Lottie from 'react-lottie';

const AILoader = () => {
  const animationData = require('../animations/spaceship.json');

  return (
    <div>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData,
          rendererSettings: {
            preserveAspectRatio: 'xMinYMin slice',
          },
        }}
        height={200}
        width={200}
      />
    </div>
  );
};

export default AILoader;

```

## src/components/AchievementBadge.tsx

**Explanation:** Reusable React UI component.

```ts
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Achievement } from '@/types';

interface AchievementBadgeProps {
  achievement: Achievement;
  onCelebrate?: () => void;
}

export function AchievementBadge({ achievement, onCelebrate }: AchievementBadgeProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      className="cursor-pointer"
      onClick={onCelebrate}
    >
      <Card className={`p-4 transition-all duration-300 ${
        achievement.unlocked 
          ? 'bg-gradient-science shadow-glow border-primary/50' 
          : 'bg-muted/50 opacity-60'
      }`}>
        <div className="text-center space-y-2">
          <div className="text-2xl">{achievement.icon}</div>
          <div className="space-y-1">
            <h4 className="font-semibold text-sm">{achievement.title}</h4>
            <p className="text-xs text-muted-foreground">{achievement.description}</p>
          </div>
          {achievement.unlocked && (
            <Badge variant="secondary" className="text-xs">
              Unlocked!
            </Badge>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
```

## src/components/AchievementConfetti.tsx

**Explanation:** Reusable React UI component.

```ts
import React, { useState } from 'react';
import { useToast } from 'react-toastify';
import confetti from 'canvas-confetti';

const AchievementConfetti = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  const handleOpen = () => {
    setIsOpen(true);
    toast.success('You unlocked a new achievement!');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
    });
  };

  return (
    <div>
      <button onClick={handleOpen}>Unlock Achievement</button>
      {isOpen && <p>Congratulations!</p>}
    </div>
  );
};

export default AchievementConfetti;

```

## src/components/AchievementNotification.tsx

**Explanation:** Reusable React UI component.

```ts
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { Achievement } from '@/types';

interface AchievementNotificationProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-4 right-4 z-50"
        >
          <Card className="p-4 bg-gradient-science text-white shadow-glow max-w-sm">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="p-2 bg-white/20 rounded-full">
                  <Award className="h-5 w-5" />
                </div>
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-semibold text-sm">Achievement Unlocked!</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{achievement.icon}</span>
                  <span className="font-medium">{achievement.title}</span>
                </div>
                <p className="text-xs opacity-90">{achievement.description}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-6 w-6 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

## src/components/AchievementToast.tsx

**Explanation:** Reusable React UI component.

```ts
import React, { useState } from 'react';
import { useToast } from 'react-toastify';

const AchievementToast = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  const handleOpen = () => {
    setIsOpen(true);
    toast.success('You unlocked a new achievement!');
  };

  return (
    <div>
      <button onClick={handleOpen}>Unlock Achievement</button>
      {isOpen && (
        <div>
          <h1>Congratulations!</h1>
          <p>You unlocked a new achievement!</p>
          <canvas
            className="confetti"
            width={200}
            height={200}
            ref={(canvas) => {
              if (canvas) {
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = 'hotpink';
                ctx.fillRect(0, 0, 200, 200);
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AchievementToast;

```

## src/components/AchievementsBadges.tsx

**Explanation:** Reusable React UI component.

```ts
import React, { useState } from 'react';
import { useToast } from 'react-toastify';
import confetti from 'canvas-confetti';

const AchievementBadges = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const toast = useToast();

  const handleUnlock = () => {
    setIsUnlocked(true);
    toast.success('You unlocked a new achievement!');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
    });
  };

  return (
    <div>
      <button onClick={handleUnlock}>Unlock Achievement</button>
      {isUnlocked && <p>Congratulations!</p>}
    </div>
  );
};

export default AchievementBadges;

```

## src/components/ApiKeyPrompt.tsx

**Explanation:** Reusable React UI component.

```ts
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, ExternalLink, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ApiKeyPromptProps {
  onApiKeySet: (key: string) => void;
  onDismiss: () => void;
}

export function ApiKeyPrompt({ onApiKeySet, onDismiss }: ApiKeyPromptProps) {
  const [apiKey, setApiKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = async () => {
    if (!apiKey.trim()) return;
    
    setIsValidating(true);
    
    // Simple validation - just check if it starts with sk-
    if (apiKey.startsWith('sk-')) {
      // Store in localStorage for this session
      localStorage.setItem('temp_openai_key', apiKey);
      onApiKeySet(apiKey);
    } else {
      alert('Please enter a valid OpenAI API key (starts with sk-)');
    }
    
    setIsValidating(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={onDismiss}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <Key className="h-5 w-5 text-primary" />
              <CardTitle>Enable AI Responses</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                ScienceLens can provide enhanced AI responses using OpenAI's GPT-4. 
                Enter your API key below or continue using our detailed mock responses.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <label htmlFor="apiKey" className="text-sm font-medium">
                OpenAI API Key
              </label>
              <Input
                id="apiKey"
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <p className="text-xs text-muted-foreground">
                Your API key is stored locally and never sent to our servers.
              </p>
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={handleSubmit}
                disabled={!apiKey.trim() || isValidating}
                className="flex-1"
              >
                {isValidating ? 'Validating...' : 'Enable AI'}
              </Button>
              <Button
                variant="outline"
                onClick={onDismiss}
                className="flex-1"
              >
                Use Mock Responses
              </Button>
            </div>

            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground mb-2">
                Need an API key?
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                asChild
              >
                <a 
                  href="https://platform.openai.com/api-keys" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get OpenAI API Key
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
```

## src/components/AuthModal.tsx

**Explanation:** Reusable React UI component.

```ts
import { useState } from 'react'
import { supabase, isSupabaseAvailable } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Loader2, Mail, Lock, User, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const { toast } = useToast()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!isSupabaseAvailable() || !supabase) {
      setError('Authentication service is not available. Please check your Supabase configuration.')
      setIsLoading(false)
      return
    }

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name
          }
        }
      })

      if (signUpError) throw signUpError

      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      })
      
      onSuccess()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!isSupabaseAvailable() || !supabase) {
      setError('Authentication service is not available. Please check your Supabase configuration.')
      setIsLoading(false)
      return
    }

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) throw signInError

      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      })
      
      onSuccess()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setName('')
    setError(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Join ScienceLens
          </DialogTitle>
          <DialogDescription>
            Create an account to save your discoveries and track your learning progress
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="signin" onValueChange={resetForm}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="signin-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signin-password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </Label>
                <Input
                  id="signin-password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Sign In
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Name
                </Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Create a password (min 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
```

## src/components/CategoryFilter.tsx

**Explanation:** Reusable React UI component.

```ts
import React, { useState } from 'react';

const CategoryFilter = () => {
  const [category, setCategory] = useState('all');
  const categories = ['all', 'physics', 'biology', 'chemistry', 'space'];

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <select value={category} onChange={handleCategoryChange}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;

```

## src/components/CategoryFiltersForQuestions.tsx

**Explanation:** Reusable React UI component.

```ts
import React, { useState } from 'react';

const CategoryFilter = () => {
  const [category, setCategory] = useState('all');
  const categories = ['all', 'physics', 'biology', 'chemistry', 'space'];

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <select value={category} onChange={handleCategoryChange}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;

```

## src/components/CelebrationAnimation.tsx

**Explanation:** Reusable React UI component.

```ts
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Achievement } from '@/data/achievements';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  velocity: { x: number; y: number };
}

interface CelebrationAnimationProps {
  achievement: Achievement | null;
  onComplete: () => void;
}

const confettiColors = [
  'hsl(217 91% 60%)', // primary
  'hsl(260 60% 65%)', // secondary  
  'hsl(142 76% 55%)', // accent
  'hsl(45 93% 58%)', // yellow
  'hsl(0 84% 60%)', // red
  'hsl(120 60% 50%)', // green
];

export function CelebrationAnimation({ achievement, onComplete }: CelebrationAnimationProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    if (!achievement) return;

    // Create confetti pieces
    const pieces: ConfettiPiece[] = [];
    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        rotation: Math.random() * 360,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        size: Math.random() * 8 + 4,
        velocity: {
          x: (Math.random() - 0.5) * 4,
          y: Math.random() * 3 + 2
        }
      });
    }
    setConfetti(pieces);
    setShowBadge(true);

    // Clean up after animation
    const timeout = setTimeout(() => {
      setConfetti([]);
      setShowBadge(false);
      onComplete();
    }, 4000);

    return () => clearTimeout(timeout);
  }, [achievement, onComplete]);

  if (!achievement) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {/* Confetti */}
      <AnimatePresence>
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{
              x: piece.x,
              y: piece.y,
              rotate: piece.rotation,
              scale: 0
            }}
            animate={{
              x: piece.x + piece.velocity.x * 200,
              y: window.innerHeight + 100,
              rotate: piece.rotation + 720,
              scale: 1
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 4,
              ease: "easeOut"
            }}
            className="absolute"
            style={{
              width: piece.size,
              height: piece.size,
              backgroundColor: piece.color,
              borderRadius: piece.size % 3 === 0 ? '50%' : '2px'
            }}
          />
        ))}
      </AnimatePresence>

      {/* Achievement Badge */}
      <AnimatePresence>
        {showBadge && (
          <motion.div
            initial={{ scale: 0, y: 100, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0, y: -100, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.5
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="bg-gradient-cosmic text-white p-8 rounded-2xl shadow-glow text-center max-w-sm mx-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.6, repeat: 2 }}
                className="text-6xl mb-4"
              >
                {achievement.icon}
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="text-xl font-bold mb-2"
              >
                Achievement Unlocked!
              </motion.h2>
              
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="text-lg font-semibold mb-2"
              >
                {achievement.title}
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="text-sm opacity-90 mb-3"
              >
                {achievement.description}
              </motion.p>

              {achievement.bonusCredits && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.6, type: "spring" }}
                  className="inline-flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full"
                >
                  <span className="text-sm">🎁</span>
                  <span className="text-sm font-medium">+{achievement.bonusCredits} Credits</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background glow effect */}
      <AnimatePresence>
        {showBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gradient-cosmic"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
```

## src/components/ChatInterface.tsx

**Explanation:** Reusable React UI component.

```ts
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Paperclip, Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ScienceExplanation } from '@/components/ScienceExplanation';
import type { Message } from '@/types';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (content: string, image?: File) => void;
  isLoading: boolean;
  onClearChat: () => void;
}

export function ChatInterface({ messages, onSendMessage, isLoading, onClearChat }: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Filter out undefined/null messages and add debug logging
  const validMessages = messages?.filter((message) => {
    if (!message) {
      console.warn('ChatInterface: Found undefined/null message, filtering out');
      return false;
    }
    if (!message.id || !message.type || !message.content) {
      console.warn('ChatInterface: Found invalid message structure:', message);
      return false;
    }
    return true;
  }) || [];

  console.log('ChatInterface: Rendering with messages:', validMessages.length);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Please select an image smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl('');
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    if (!input.trim() && !selectedImage) return;
    
    onSendMessage(input.trim(), selectedImage || undefined);
    setInput('');
    handleRemoveImage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Messages */}
      <div className="space-y-4 min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {validMessages.map((message, index) => {
            try {
              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className={`p-4 ${
                    message.type === 'user' 
                      ? 'ml-auto max-w-[80%] bg-primary text-primary-foreground' 
                      : 'mr-auto max-w-[90%]'
                  }`}>
                    {message.image && (
                      <img 
                        src={message.image} 
                        alt="Uploaded content"
                        className="rounded-lg mb-2 max-h-64 object-cover"
                      />
                    )}
                    {message.type === 'assistant' ? (
                      <ScienceExplanation 
                        content={message.content} 
                        category={message.category || 'general'} 
                      />
                    ) : (
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </div>
                    )}
                    <div className="text-xs opacity-70 mt-2">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </Card>
                </motion.div>
              );
            } catch (error) {
              console.error('ChatInterface: Error rendering message:', message, error);
              return null;
            }
          })}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mr-auto max-w-[90%]"
          >
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm text-muted-foreground">
                  Analyzing your question...
                </span>
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <Card className="p-4 shadow-science">
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <div className="relative inline-block">
              <img
                src={previewUrl}
                alt="Selected"
                className="h-20 w-20 object-cover rounded-lg"
              />
              <Button
                size="icon"
                variant="destructive"
                className="absolute -top-2 -right-2 h-6 w-6"
                onClick={handleRemoveImage}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </motion.div>
        )}
        
        <div className="space-y-3">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask any science question... (e.g., 'Why is the sky blue?' or 'How do plants make oxygen?')"
            className="min-h-[80px] resize-none border-0 focus:ring-0 text-base"
            disabled={isLoading}
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
              >
                <Paperclip className="h-4 w-4 mr-2" />
                Add Photo
              </Button>
              
              {validMessages.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClearChat}
                  disabled={isLoading}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Chat
                </Button>
              )}
            </div>
            
            <Button
              onClick={handleSubmit}
              disabled={(!input.trim() && !selectedImage) || isLoading}
              className="bg-gradient-cosmic hover:opacity-90"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
```

## src/components/CopyToClipboardButton.tsx

**Explanation:** Reusable React UI component.

```ts
import React, { useState } from 'react';

const CopyToClipboardButton = ({ text = 'Formula or code snippet' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <button onClick={handleCopy}>Copy to Clipboard</button>
      {copied && <p>Copied!</p>}
    </div>
  );
};

export default CopyToClipboardButton;

```

## src/components/CreditsDisplay.tsx

**Explanation:** Reusable React UI component.

```ts
import { motion } from 'framer-motion';
import { Coins, Clock, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCredits } from '@/hooks/useCredits';

interface CreditsDisplayProps {
  className?: string;
  compact?: boolean;
}

export function CreditsDisplay({ className = '', compact = false }: CreditsDisplayProps) {
  const { credits, hasCredits, getTimeUntilReset, bonusCredits, totalEarned } = useCredits();

  if (compact) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="flex items-center space-x-1 text-sm">
          <Coins className="h-4 w-4 text-primary" />
          <span className={hasCredits ? 'text-foreground' : 'text-destructive'}>
            {credits}
          </span>
        </div>
        {bonusCredits > 0 && (
          <Badge variant="secondary" className="text-xs">
            <Gift className="h-3 w-3 mr-1" />
            {bonusCredits}
          </Badge>
        )}
      </div>
    );
  }

  return (
    <Card className={`${className}`}>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Coins className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Credits</h3>
                <p className="text-sm text-muted-foreground">Daily questions</p>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${hasCredits ? 'text-foreground' : 'text-destructive'}`}>
                {credits}
              </div>
              <div className="text-xs text-muted-foreground">
                of 5 daily
              </div>
            </div>
          </div>

          {bonusCredits > 0 && (
            <div className="flex items-center justify-between p-2 bg-accent/10 rounded-lg">
              <div className="flex items-center space-x-2">
                <Gift className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium">Bonus Credits</span>
              </div>
              <Badge variant="secondary">+{bonusCredits}</Badge>
            </div>
          )}

          {!hasCredits && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
            >
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium text-destructive">Out of Credits</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Credits reset in {getTimeUntilReset()}
              </p>
              <p className="text-xs text-muted-foreground">
                💡 Earn bonus credits by unlocking achievements!
              </p>
            </motion.div>
          )}

          <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t">
            <span>Total earned: {totalEarned}</span>
            <span>Resets daily at midnight</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

## src/components/DailyQuestionStreakCounter.tsx

**Explanation:** Reusable React UI component.

```ts
import React, { useState, useEffect } from 'react';

const DailyQuestionStreakCounter = () => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const streakData = localStorage.getItem('streak');
    if (streakData) {
      setStreak(JSON.parse(streakData));
    }
  }, []);

  const handleIncrementStreak = () => {
    setStreak(streak + 1);
    localStorage.setItem('streak', JSON.stringify(streak + 1));
  };

  return (
    <div>
      <p>You asked {streak} days in a row!</p>
      <button onClick={handleIncrementStreak}>Increment Streak</button>
    </div>
  );
};

export default DailyQuestionStreakCounter;

```

## src/components/DailyStreakCounter.tsx

**Explanation:** Reusable React UI component.

```ts
import React, { useState, useEffect } from 'react';

const DailyStreakCounter = () => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const streakData = localStorage.getItem('streak');
    if (streakData) {
      setStreak(JSON.parse(streakData));
    }
  }, []);

  const handleIncrementStreak = () => {
    setStreak(streak + 1);
    localStorage.setItem('streak', JSON.stringify(streak + 1));
  };

  return (
    <div>
      <p>You asked {streak} days in a row!</p>
      <button onClick={handleIncrementStreak}>Increment Streak</button>
    </div>
  );
};

export default DailyStreakCounter;

```

## src/components/DarkModeToggle.tsx

**Explanation:** Reusable React UI component.

```ts
import React from 'react';
import { useState } from 'react';
import { useTheme } from 'next-themes';

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <button
      className={`${
        isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
      } text-white rounded-full p-2`}
      onClick={handleToggle}
    >
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;

```

## src/components/DifficultyToggle.tsx

**Explanation:** Reusable React UI component.

```ts
import React from 'react';
import { GraduationCap, Baby, User } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export type DifficultyLevel = 'child' | 'teen' | 'expert';

interface DifficultyToggleProps {
  difficulty: DifficultyLevel;
  onChange: (difficulty: DifficultyLevel) => void;
}

const difficulties = [
  {
    id: 'child' as DifficultyLevel,
    name: 'Explain like I\'m 5',
    icon: <Baby className="h-4 w-4" />,
    description: 'Simple, fun explanations with examples',
    color: 'text-green-600',
  },
  {
    id: 'teen' as DifficultyLevel,
    name: 'Teen Level',
    icon: <User className="h-4 w-4" />,
    description: 'Clear explanations with some detail',
    color: 'text-blue-600',
  },
  {
    id: 'expert' as DifficultyLevel,
    name: 'Expert Mode',
    icon: <GraduationCap className="h-4 w-4" />,
    description: 'Technical, in-depth explanations',
    color: 'text-purple-600',
  },
];

export const DifficultyToggle: React.FC<DifficultyToggleProps> = ({ difficulty, onChange }) => {
  const currentDifficulty = difficulties.find(d => d.id === difficulty) || difficulties[1];

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground">Difficulty:</span>
      <Select value={difficulty} onValueChange={onChange}>
        <SelectTrigger className="w-48">
          <SelectValue>
            <div className="flex items-center space-x-2">
              <span className={currentDifficulty.color}>
                {currentDifficulty.icon}
              </span>
              <span className="text-sm">{currentDifficulty.name}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {difficulties.map((diff) => (
            <SelectItem key={diff.id} value={diff.id}>
              <div className="flex items-center space-x-2">
                <span className={diff.color}>{diff.icon}</span>
                <div>
                  <div className="font-medium">{diff.name}</div>
                  <div className="text-xs text-muted-foreground">{diff.description}</div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export const getDifficultyPrompt = (difficulty: DifficultyLevel): string => {
  switch (difficulty) {
    case 'child':
      return 'Explain this in very simple terms that a 5-year-old would understand. Use fun analogies, simple words, and engaging examples. Make it playful and easy to imagine.';
    case 'teen':
      return 'Explain this at a high school level. Use clear language with some scientific terms, but make sure to explain complex concepts. Include relevant examples and context.';
    case 'expert':
      return 'Provide a detailed, technical explanation suitable for someone with advanced scientific knowledge. Include relevant formulas, precise terminology, and in-depth analysis.';
    default:
      return '';
  }
};
```

## src/components/DiscoveryHistory.tsx

**Explanation:** Reusable React UI component.

```ts
import { motion } from 'framer-motion';
import { Clock, MessageSquare, Image, Star, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Conversation } from '@/types';

interface DiscoveryHistoryProps {
  conversations: Conversation[];
  onSelectConversation: (conversation: Conversation) => void;
  onDeleteConversation: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  favorites: string[];
}

export function DiscoveryHistory({ 
  conversations, 
  onSelectConversation, 
  onDeleteConversation,
  onToggleFavorite,
  favorites 
}: DiscoveryHistoryProps) {
  const sortedConversations = [...conversations].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <Card className="h-[600px]">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>Discovery History</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px] px-6 pb-6">
          <div className="space-y-3">
            {sortedConversations.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No discoveries yet!</p>
                <p className="text-sm">Start asking science questions to build your history.</p>
              </div>
            ) : (
              sortedConversations.map((conversation, index) => (
                <motion.div
                  key={conversation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="p-4 cursor-pointer hover:shadow-md transition-all duration-200 group"
                    onClick={() => onSelectConversation(conversation)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium text-sm line-clamp-2 flex-1 mr-2">
                          {conversation.title}
                        </h3>
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleFavorite(conversation.id);
                            }}
                          >
                            <Star 
                              className={`h-3 w-3 ${
                                favorites.includes(conversation.id) 
                                  ? 'fill-primary text-primary' 
                                  : 'text-muted-foreground'
                              }`} 
                            />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteConversation(conversation.id);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-3 w-3" />
                            <span>{conversation.messages.length} messages</span>
                          </div>
                          {conversation.messages.some(m => m.image) && (
                            <div className="flex items-center space-x-1">
                              <Image className="h-3 w-3" />
                              <span>Has photos</span>
                            </div>
                          )}
                        </div>
                        <span>{new Date(conversation.timestamp).toLocaleDateString()}</span>
                      </div>
                      
                      {favorites.includes(conversation.id) && (
                        <Badge variant="secondary" className="text-xs">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          Favorite
                        </Badge>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
```

## src/components/EnhancedAuthModal.tsx

**Explanation:** Reusable React UI component.

```ts
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface EnhancedAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const EnhancedAuthModal: React.FC<EnhancedAuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        }
      });

      if (error) throw error;
      
      // The redirect will handle the success case
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Google Sign-in Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      setError('');

      if (!email || !password || !name) {
        throw new Error('All fields are required');
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            name: name,
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Account Created! 🎉",
        description: "Please check your email to verify your account.",
      });
      
      onSuccess();
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Sign-up Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    try {
      setLoading(true);
      setError('');

      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back! 🚀",
        description: "Successfully signed in to your account.",
      });
      
      onSuccess();
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Sign-in Error", 
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <Card className="border-0 shadow-none">
            <CardHeader className="bg-gradient-science text-white text-center relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 text-white hover:bg-white/20"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
              <CardTitle className="text-2xl">Join Science Lens</CardTitle>
              <CardDescription className="text-white/90">
                Unlock unlimited scientific exploration
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-6">
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                {/* Google Sign-in Button */}
                <Button
                  variant="outline"
                  className="w-full mb-4 border-gray-300 hover:bg-gray-50"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                >
                  <Chrome className="w-4 h-4 mr-2" />
                  Continue with Google
                </Button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <TabsContent value="signin" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="signin-password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-science hover:shadow-glow" 
                    onClick={handleSignIn}
                    disabled={loading}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-science hover:shadow-glow" 
                    onClick={handleSignUp}
                    disabled={loading}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
```

## src/components/FeedbackButton.tsx

**Explanation:** Reusable React UI component.

```ts
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { updateFeedback } from '../api/feedback';

const FeedbackButton = () => {
  const [isHelpful, setIsHelpful] = useState(null);
  const { mutate, isLoading } = useMutation(updateFeedback);

  const handleFeedback = (helpful) => {
    setIsHelpful(helpful);
    mutate({ helpful });
  };

  return (
    <div>
      <button onClick={() => handleFeedback(true)}>Helpful</button>
      <button onClick={() => handleFeedback(false)}>Not Helpful</button>
      {isLoading && <p>Loading...</p>}
      {isHelpful !== null && <p>Thanks for your feedback!</p>}
    </div>
  );
};

export default FeedbackButton;

```

## src/components/HoverTooltip.tsx

**Explanation:** Reusable React UI component.

```ts
import React, { useState } from 'react';

const HoverTooltip = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [definition, setDefinition] = useState('');

  const handleMouseOver = (event) => {
    setIsHovering(true);
    setDefinition(event.target.getAttribute('data-definition'));
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div>
      <span
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        data-definition="This is a scientific term"
      >
        Scientific Term
      </span>
      {isHovering && <p>{definition}</p>}
    </div>
  );
};

export default HoverTooltip;

```

## src/components/HoverTooltipsOnKeyWords.tsx

**Explanation:** Reusable React UI component.

```ts
import React, { useState } from 'react';

const HoverTooltipOnKeyWords = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [definition, setDefinition] = useState('');

  const handleMouseOver = (event) => {
    setIsHovering(true);
    setDefinition(event.target.getAttribute('data-definition'));
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div>
      <span
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        data-definition="This is a scientific term"
      >
        Scientific Term
      </span>
      {isHovering && <p>{definition}</p>}
    </div>
  );
};

export default HoverTooltipOnKeyWords;

```

## src/components/InlineFeedbackForAIResponses.tsx

**Explanation:** Reusable React UI component.

```ts
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { updateFeedback } from '../api/feedback';

const FeedbackButton = () => {
  const [isHelpful, setIsHelpful] = useState(null);
  const { mutate, isLoading } = useMutation(updateFeedback);

  const handleFeedback = (helpful) => {
    setIsHelpful(helpful);
    mutate({ helpful });
  };

  return (
    <div>
      <button onClick={() => handleFeedback(true)}>Helpful</button>
      <button onClick={() => handleFeedback(false)}>Not Helpful</button>
      {isLoading && <p>Loading...</p>}
      {isHelpful !== null && <p>Thanks for your feedback!</p>}
    </div>
  );
};

export default FeedbackButton;

```

## src/components/InteractiveScienceVisuals.tsx

**Explanation:** Reusable React UI component.

```ts
import React from 'react';
import { Canvas } from '@react-three/fiber';

const ScienceVisuals = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh ref={(mesh) => {
        mesh.rotation.x = Math.PI / 2;
      }}>
        <sphereGeometry args={[1, 60, 60]} />
        <meshBasicMaterial color="hotpink" />
      </mesh>
    </Canvas>
  );
};

export default ScienceVisuals;

```

## src/components/MiniSpaceAnimation.tsx

**Explanation:** Reusable React UI component.

```ts
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';

const MiniSpaceAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Simulate loading animation data
    setIsAnimating(true);
  }, []);

  return (
    <div>
      {isAnimating && (
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <mesh>
            <sphereGeometry args={[1, 60, 60]} />
            <meshBasicMaterial color="hotpink" />
          </mesh>
        </Canvas>
      )}
    </div>
  );
};

export default MiniSpaceAnimation;

```

## src/components/PDFExport.tsx

**Explanation:** Reusable React UI component.

```ts
import React from 'react';
import { FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { Message } from '@/types';

interface PDFExportProps {
  messages: Message[];
  conversationTitle?: string;
  isProUser?: boolean;
}

export const PDFExport: React.FC<PDFExportProps> = ({ 
  messages, 
  conversationTitle = 'Science Lens Conversation',
  isProUser = false 
}) => {
  const { toast } = useToast();

  const generatePDF = async () => {
    if (!isProUser) {
      toast({
        title: "Pro Feature",
        description: "PDF export is available for Pro users. Upgrade to unlock!",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create a simple HTML structure for PDF generation
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>${conversationTitle}</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                text-align: center;
                border-bottom: 2px solid #e2e8f0;
                padding-bottom: 20px;
                margin-bottom: 30px;
              }
              .logo {
                font-size: 28px;
                font-weight: bold;
                background: linear-gradient(135deg, #3b82f6, #8b5cf6);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin-bottom: 10px;
              }
              .message {
                margin-bottom: 25px;
                padding: 15px;
                border-radius: 8px;
              }
              .user-message {
                background-color: #f1f5f9;
                border-left: 4px solid #3b82f6;
              }
              .assistant-message {
                background-color: #fafafa;
                border-left: 4px solid #8b5cf6;
              }
              .message-role {
                font-weight: bold;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 8px;
              }
              .user-role {
                color: #3b82f6;
              }
              .assistant-role {
                color: #8b5cf6;
              }
              .message-content {
                white-space: pre-wrap;
                word-wrap: break-word;
              }
              .timestamp {
                font-size: 12px;
                color: #64748b;
                margin-top: 8px;
              }
              .footer {
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #e2e8f0;
                text-align: center;
                font-size: 12px;
                color: #64748b;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="logo">Science Lens</div>
              <h1>${conversationTitle}</h1>
              <p>Generated on ${new Date().toLocaleDateString()}</p>
            </div>
            
            <div class="content">
              ${messages.map(message => `
                <div class="message ${message.type === 'user' ? 'user-message' : 'assistant-message'}">
                  <div class="message-role ${message.type === 'user' ? 'user-role' : 'assistant-role'}">
                    ${message.type === 'user' ? 'Question' : 'Science Lens Answer'}
                  </div>
                  <div class="message-content">${message.content}</div>
                  <div class="timestamp">
                    ${new Date(message.timestamp).toLocaleString()}
                  </div>
                </div>
              `).join('')}
            </div>
            
            <div class="footer">
              <p>Generated by Science Lens - Your AI Science Companion</p>
              <p>Visit us at science-lens.lovable.app</p>
            </div>
          </body>
        </html>
      `;

      // Create a blob with the HTML content
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);

      // Create a temporary link to download the file
      const link = document.createElement('a');
      link.href = url;
      link.download = `${conversationTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL
      URL.revokeObjectURL(url);

      // Show success message
      toast({
        title: "PDF Export Complete! 📄",
        description: "Your conversation has been exported as an HTML file. You can print it as PDF from your browser.",
      });

      // Provide instructions for PDF conversion
      setTimeout(() => {
        toast({
          title: "Convert to PDF",
          description: "Open the downloaded file in your browser and use Ctrl+P (Cmd+P) to print as PDF.",
        });
      }, 2000);

    } catch (error) {
      console.error('PDF export error:', error);
      toast({
        title: "Export Error",
        description: "Failed to export conversation. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (messages.length === 0) {
    return null;
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={generatePDF}
      className={`flex items-center space-x-2 ${!isProUser ? 'opacity-50' : ''}`}
      disabled={!isProUser}
    >
      <FileDown className="h-4 w-4" />
      <span>{isProUser ? 'Export PDF' : 'Export PDF (Pro)'}</span>
    </Button>
  );
};
```

## src/components/PersonalizedAIDashboard.tsx

**Explanation:** Reusable React UI component.

```ts
import React from 'react';
import { useQuery } from 'react-query';
import { getRecentQuestions, getAchievements, getFavoriteTopics } from '../api/ai-dashboard';

const AIDashboard = () => {
  const { data, error, isLoading } = useQuery(
    'ai-dashboard',
    async () => {
      const recentQuestions = await getRecentQuestions();
      const achievements = await getAchievements();
      const favoriteTopics = await getFavoriteTopics();
      return { recentQuestions, achievements, favoriteTopics };
    },
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Recent Questions</h1>
      <ul>
        {data.recentQuestions.map((question) => (
          <li key={question.id}>{question.text}</li>
        ))}
      </ul>

      <h1>Achievements</h1>
      <ul>
        {data.achievements.map((achievement) => (
          <li key={achievement.id}>{achievement.name}</li>
        ))}
      </ul>

      <h1>Favorite Topics</h1>
      <ul>
        {data.favoriteTopics.map((topic) => (
          <li key={topic.id}>{topic.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AIDashboard;

```

## src/components/PhotoUpload.tsx

**Explanation:** Reusable React UI component.

```ts
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image, Atom, Microscope, MessageCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface PhotoUploadProps {
  onPhotoUpload: (file: File, question: string) => void;
  isAnalyzing: boolean;
}

export const PhotoUpload = ({ onPhotoUpload, isAnalyzing }: PhotoUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [question, setQuestion] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setUploadedFile(file);
    }
  }, []);

  const handleAnalyze = () => {
    if (uploadedFile) {
      onPhotoUpload(uploadedFile, question);
    }
  };

  const handleReset = () => {
    setPreviewUrl(null);
    setUploadedFile(null);
    setQuestion('');
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false
  });

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className="p-8 bg-gradient-subtle border-primary/20">
        <div
          {...getRootProps()}
          className={`
            relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer 
            transition-smooth hover:border-primary hover:bg-primary/5
            ${isDragActive ? 'border-primary bg-primary/10 scale-105' : 'border-border'}
            ${isAnalyzing ? 'pointer-events-none opacity-70' : ''}
          `}
        >
          <input {...getInputProps()} disabled={isAnalyzing} />
          
          {previewUrl ? (
            <div className="space-y-4">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="max-h-64 mx-auto rounded-lg shadow-science"
              />
              {!isAnalyzing && (
                <p className="text-muted-foreground">
                  Great! Click here or drag another photo to try something new! 🔬
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center space-x-4">
                <Atom className="w-8 h-8 text-primary animate-float" />
                <Upload className="w-12 h-12 text-primary" />
                <Microscope className="w-8 h-8 text-secondary animate-float" style={{ animationDelay: '1s' }} />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">
                  {isDragActive ? "Drop your photo here! 🚀" : "Upload a Photo to Explore! 📸"}
                </h3>
                <p className="text-muted-foreground">
                  Drag and drop any image, or click to browse your files
                </p>
                <p className="text-sm text-muted-foreground">
                  Try photos of: plants 🌱, experiments 🧪, objects 🔍, or anything curious!
                </p>
              </div>
            </div>
          )}

          {isAnalyzing && (
            <div className="absolute inset-0 bg-background/80 rounded-xl flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="flex justify-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-3 h-3 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <p className="text-foreground font-medium">Analyzing your photo... 🔬</p>
              </div>
            </div>
          )}
        </div>

        {!previewUrl && (
          <div className="mt-6 text-center">
            <Button variant="hero" size="lg">
              <Image className="w-5 h-5" />
              Choose Photo
            </Button>
          </div>
        )}
      </Card>

      {/* Question Input */}
      {previewUrl && (
        <Card className="bg-gradient-subtle border-primary/20 p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                What would you like to know? 💭
              </h3>
            </div>
            <Textarea
              placeholder="Ask anything about your photo! For example: 'What type of plant is this?', 'How does this work?', 'What's happening here scientifically?'"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[100px] resize-none border-primary/20 focus:border-primary/40"
              disabled={isAnalyzing}
            />
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      {previewUrl && (
        <div className="flex justify-center space-x-4">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="font-semibold"
          >
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Analyzing Magic... ✨
              </>
            ) : (
              <>
                <Microscope className="w-5 h-5" />
                Discover the Science! 🔬
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleReset}
            disabled={isAnalyzing}
          >
            <RotateCcw className="w-5 h-5" />
            Try Different Photo
          </Button>
        </div>
      )}
    </div>
  );
};
```

## src/components/ProfilePage.tsx

**Explanation:** Reusable React UI component.

```ts
import { motion } from 'framer-motion';
import { Trophy, Star, Calendar, Award, TrendingUp, Coins } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AchievementBadge } from './AchievementBadge';
import { CreditsDisplay } from './CreditsDisplay';
import { useAchievements } from '@/hooks/useAchievements';
import { achievementCategories } from '@/data/achievements';

export function ProfilePage() {
  const { 
    achievements, 
    stats, 
    getUnlockedCount, 
    getTotalBonusCredits,
    getAchievementsByCategory 
  } = useAchievements();

  const achievementsByCategory = getAchievementsByCategory();
  const unlockedCount = getUnlockedCount();
  const totalAchievements = achievements.length;
  const progressPercentage = (unlockedCount / totalAchievements) * 100;

  const rarityStats = achievements.reduce((acc, achievement) => {
    if (achievement.unlocked) {
      acc[achievement.rarity] = (acc[achievement.rarity] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex justify-center">
          <div className="p-6 bg-gradient-cosmic rounded-full">
            <Trophy className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
          Science Explorer Profile
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Track your learning journey and celebrate your scientific discoveries
        </p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-2">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold">{unlockedCount}</div>
            <div className="text-sm text-muted-foreground">Achievements</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="p-3 bg-accent/10 rounded-lg w-fit mx-auto mb-2">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
            <div className="text-2xl font-bold">{stats.totalQuestions}</div>
            <div className="text-sm text-muted-foreground">Questions Asked</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="p-3 bg-secondary/10 rounded-lg w-fit mx-auto mb-2">
              <Calendar className="h-6 w-6 text-secondary" />
            </div>
            <div className="text-2xl font-bold">{stats.streakDays}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="p-3 bg-yellow-500/10 rounded-lg w-fit mx-auto mb-2">
              <Coins className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold">{getTotalBonusCredits()}</div>
            <div className="text-sm text-muted-foreground">Bonus Credits</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overall Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>Achievement Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{unlockedCount}/{totalAchievements}</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {Object.entries(rarityStats).map(([rarity, count]) => (
                  <div key={rarity} className="text-center">
                    <div className="text-lg font-bold">{count}</div>
                    <div className="text-xs text-muted-foreground capitalize">{rarity}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Category Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Category Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievementCategories.map(category => {
                  const categoryAchievements = achievementsByCategory[category.id] || [];
                  const unlockedInCategory = categoryAchievements.filter(a => a.unlocked).length;
                  const totalInCategory = categoryAchievements.length;
                  const percentage = totalInCategory > 0 ? (unlockedInCategory / totalInCategory) * 100 : 0;

                  return (
                    <div key={category.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{category.icon}</span>
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {unlockedInCategory}/{totalInCategory}
                        </span>
                      </div>
                      <Progress value={percentage} className="h-1" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Credits Display */}
        <div className="space-y-6">
          <CreditsDisplay />
          
          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5" />
                <span>Recent Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements
                  .filter(a => a.unlocked)
                  .sort((a, b) => (b.unlockedAt || 0) - (a.unlockedAt || 0))
                  .slice(0, 5)
                  .map(achievement => (
                    <div key={achievement.id} className="flex items-center space-x-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{achievement.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {achievement.unlockedAt ? 
                            new Date(achievement.unlockedAt).toLocaleDateString() : 
                            'Recently unlocked'
                          }
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {achievement.rarity}
                      </Badge>
                    </div>
                  ))}
                {achievements.filter(a => a.unlocked).length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Start asking questions to unlock achievements!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* All Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>All Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 xl:grid-cols-10">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unlocked">Unlocked</TabsTrigger>
              <TabsTrigger value="biology">Biology</TabsTrigger>
              <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
              <TabsTrigger value="physics">Physics</TabsTrigger>
              <TabsTrigger value="astronomy">Astronomy</TabsTrigger>
              <TabsTrigger value="earth-science">Earth</TabsTrigger>
              <TabsTrigger value="technology">Tech</TabsTrigger>
              <TabsTrigger value="mathematics">Math</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {achievements.map(achievement => (
                  <AchievementBadge key={achievement.id} achievement={achievement} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="unlocked" className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {achievements
                  .filter(a => a.unlocked)
                  .map(achievement => (
                    <AchievementBadge key={achievement.id} achievement={achievement} />
                  ))}
              </div>
            </TabsContent>

            {achievementCategories.map(category => (
              <TabsContent key={category.id} value={category.id} className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                    <div className="text-sm text-muted-foreground">
                      {(achievementsByCategory[category.id] || []).filter(a => a.unlocked).length}/
                      {(achievementsByCategory[category.id] || []).length}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {(achievementsByCategory[category.id] || []).map(achievement => (
                      <AchievementBadge key={achievement.id} achievement={achievement} />
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
```

## src/components/ProgressiveUnlocking.tsx

**Explanation:** Reusable React UI component.

```ts
import React, { useState, useEffect } from 'react';

const ProgressiveUnlocking = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const unlockedData = localStorage.getItem('unlocked');
    if (unlockedData) {
      setIsUnlocked(JSON.parse(unlockedData));
    }
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
    localStorage.setItem('unlocked', JSON.stringify(true));
  };

  return (
    <div>
      {isUnlocked ? (
        <p>Advanced topic unlocked!</p>
      ) : (
        <button onClick={handleUnlock}>Unlock Advanced Topic</button>
      )}
    </div>
  );
};

export default ProgressiveUnlocking;

```

## src/components/QuestionAnimation.tsx

**Explanation:** Reusable React UI component.

```ts
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  velocity: { x: number; y: number };
}

interface QuestionAnimationProps {
  isVisible: boolean;
  onComplete: () => void;
}

const scienceColors = [
  'hsl(217 91% 60%)', // primary blue
  'hsl(142 76% 55%)', // science green
  'hsl(45 93% 58%)', // chemistry yellow
  'hsl(260 60% 65%)', // cosmic purple
  'hsl(30 100% 50%)', // earth orange
];

export function QuestionAnimation({ isVisible, onComplete }: QuestionAnimationProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!isVisible) return;

    // Create science-themed particles
    const newParticles: Particle[] = [];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < 15; i++) {
      const angle = (i / 15) * Math.PI * 2;
      const radius = 50 + Math.random() * 30;
      
      newParticles.push({
        id: i,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        color: scienceColors[Math.floor(Math.random() * scienceColors.length)],
        size: Math.random() * 8 + 4,
        velocity: {
          x: Math.cos(angle) * (2 + Math.random() * 3),
          y: Math.sin(angle) * (2 + Math.random() * 3)
        }
      });
    }
    
    setParticles(newParticles);

    // Clean up after animation
    const timeout = setTimeout(() => {
      setParticles([]);
      onComplete();
    }, 1500);

    return () => clearTimeout(timeout);
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Central glow pulse */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 1], opacity: [0, 0.8, 0] }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 rounded-full blur-xl"
      />

      {/* Science particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: particle.x,
              y: particle.y,
              scale: 0,
              opacity: 1
            }}
            animate={{
              x: particle.x + particle.velocity.x * 100,
              y: particle.y + particle.velocity.y * 100,
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 1.5,
              ease: "easeOut"
            }}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              boxShadow: `0 0 20px ${particle.color}`,
              borderRadius: particle.id % 3 === 0 ? '50%' : '2px'
            }}
          />
        ))}
      </AnimatePresence>

      {/* Science symbols floating */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 0], scale: [0, 1, 1.2], rotate: [0, 180, 360] }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl"
      >
        🔬
      </motion.div>

      {/* Ripple effect */}
      <motion.div
        initial={{ scale: 0, opacity: 0.8 }}
        animate={{ scale: 3, opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-primary/50 rounded-full"
      />
      
      <motion.div
        initial={{ scale: 0, opacity: 0.6 }}
        animate={{ scale: 4, opacity: 0 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.1 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-accent/30 rounded-full"
      />
    </div>
  );
}
```

## src/components/ScienceExplanation.tsx

**Explanation:** Reusable React UI component.

```ts
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Atom, 
  Zap, 
  Dna, 
  Telescope, 
  Beaker,
  Calculator,
  Earth,
  Cpu,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DiagramProps {
  type: 'atom' | 'dna' | 'solar-system' | 'chemical-reaction' | 'wave' | 'cell' | 'circuit';
  animated?: boolean;
}

const AnimatedDiagram = ({ type, animated = true }: DiagramProps) => {
  const [isPlaying, setIsPlaying] = useState(animated);

  const AtomDiagram = () => (
    <div className="relative w-48 h-48 mx-auto">
      {/* Nucleus */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full"
        animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Electron orbits */}
      {[1, 2, 3].map((orbit, index) => (
        <motion.div
          key={orbit}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-blue-300 rounded-full"
          style={{ 
            width: `${60 + index * 40}px`, 
            height: `${60 + index * 40}px` 
          }}
          animate={isPlaying ? { rotate: 360 } : {}}
          transition={{ 
            duration: 3 + index, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {/* Electrons */}
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"
            animate={isPlaying ? { rotate: -360 } : {}}
            transition={{ 
              duration: 3 + index, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        </motion.div>
      ))}
    </div>
  );

  const DNADiagram = () => (
    <div className="relative w-48 h-48 mx-auto">
      <svg width="100%" height="100%" viewBox="0 0 200 200">
        {/* DNA double helix */}
        <motion.path
          d="M50 20 Q100 60 150 20 Q100 100 50 80 Q100 140 150 100 Q100 180 50 160"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={isPlaying ? { pathLength: 1 } : {}}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path
          d="M150 20 Q100 60 50 20 Q100 100 150 80 Q100 140 50 100 Q100 180 150 160"
          fill="none"
          stroke="#ef4444"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={isPlaying ? { pathLength: 1 } : {}}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
        />
        
        {/* Base pairs */}
        {[40, 80, 120, 160].map((y, index) => (
          <motion.line
            key={index}
            x1="70"
            y1={y}
            x2="130"
            y2={y}
            stroke="#10b981"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={isPlaying ? { opacity: [0, 1, 0] } : {}}
            transition={{ duration: 1, repeat: Infinity, delay: index * 0.2 }}
          />
        ))}
      </svg>
    </div>
  );

  const SolarSystemDiagram = () => (
    <div className="relative w-48 h-48 mx-auto">
      {/* Sun */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-yellow-400 rounded-full"
        animate={isPlaying ? { rotate: 360 } : {}}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Planetary orbits */}
      {[{ size: 60, color: 'bg-gray-400', duration: 5 }, 
        { size: 80, color: 'bg-blue-500', duration: 8 }, 
        { size: 100, color: 'bg-red-500', duration: 12 }].map((planet, index) => (
        <motion.div
          key={index}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300 rounded-full"
          style={{ 
            width: `${planet.size}px`, 
            height: `${planet.size}px` 
          }}
        >
          <motion.div
            className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 ${planet.color} rounded-full`}
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={{ 
              duration: planet.duration, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        </motion.div>
      ))}
    </div>
  );

  const WaveDiagram = () => (
    <div className="w-48 h-24 mx-auto">
      <svg width="100%" height="100%" viewBox="0 0 200 100">
        <motion.path
          d="M0 50 Q25 20 50 50 Q75 80 100 50 Q125 20 150 50 Q175 80 200 50"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="3"
          animate={isPlaying ? { 
            d: [
              "M0 50 Q25 20 50 50 Q75 80 100 50 Q125 20 150 50 Q175 80 200 50",
              "M0 50 Q25 80 50 50 Q75 20 100 50 Q125 80 150 50 Q175 20 200 50",
              "M0 50 Q25 20 50 50 Q75 80 100 50 Q125 20 150 50 Q175 80 200 50"
            ]
          } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Amplitude indicators */}
        <motion.circle
          cx="50"
          cy="20"
          r="3"
          fill="#8b5cf6"
          animate={isPlaying ? { cy: [20, 80, 20] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );

  const renderDiagram = () => {
    switch (type) {
      case 'atom':
        return <AtomDiagram />;
      case 'dna':
        return <DNADiagram />;
      case 'solar-system':
        return <SolarSystemDiagram />;
      case 'wave':
        return <WaveDiagram />;
      default:
        return (
          <div className="w-48 h-48 mx-auto flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
            <Atom className="h-16 w-16 text-primary" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
      </div>
      {renderDiagram()}
    </div>
  );
};

interface ExplanationSection {
  title: string;
  content: string;
  diagram?: DiagramProps;
  keyPoints?: string[];
  formula?: string;
  category: string;
}

interface ScienceExplanationProps {
  content: string;
  category?: string;
}

export function ScienceExplanation({ content, category = 'general' }: ScienceExplanationProps) {
  const [sections, setSections] = useState<ExplanationSection[]>([]);
  const [currentSection, setCurrentSection] = useState(0);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'biology': return <Dna className="h-5 w-5" />;
      case 'chemistry': return <Beaker className="h-5 w-5" />;
      case 'physics': return <Zap className="h-5 w-5" />;
      case 'astronomy': return <Telescope className="h-5 w-5" />;
      case 'earth-science': return <Earth className="h-5 w-5" />;
      case 'mathematics': return <Calculator className="h-5 w-5" />;
      case 'technology': return <Cpu className="h-5 w-5" />;
      default: return <Atom className="h-5 w-5" />;
    }
  };

  // Parse and structure the content into sections
  useEffect(() => {
    const parsedSections: ExplanationSection[] = [];
    
    // Split content into sections and analyze for diagrams
    const lines = content.split('\n').filter(line => line.trim());
    let currentTitle = 'Explanation';
    let currentContent = '';
    let currentKeyPoints: string[] = [];

    for (const line of lines) {
      if (line.includes('🧪') || line.includes('🔬') || line.includes('⚛️') || line.includes('🌟')) {
        if (currentContent) {
          parsedSections.push({
            title: currentTitle,
            content: currentContent,
            keyPoints: currentKeyPoints.length > 0 ? currentKeyPoints : undefined,
            category,
            diagram: detectDiagramType(currentContent + ' ' + currentKeyPoints.join(' '))
          });
          currentContent = '';
          currentKeyPoints = [];
        }
        currentTitle = line.replace(/[🧪🔬⚛️🌟]/g, '').trim() || 'Key Concept';
      } else if (line.startsWith('•') || line.startsWith('-')) {
        currentKeyPoints.push(line.substring(1).trim());
      } else {
        currentContent += line + '\n';
      }
    }

    // Add the final section
    if (currentContent || currentKeyPoints.length > 0) {
      parsedSections.push({
        title: currentTitle,
        content: currentContent,
        keyPoints: currentKeyPoints.length > 0 ? currentKeyPoints : undefined,
        category,
        diagram: detectDiagramType(currentContent + ' ' + currentKeyPoints.join(' '))
      });
    }

    // If no sections were created, create a default one
    if (parsedSections.length === 0) {
      parsedSections.push({
        title: 'Scientific Explanation',
        content,
        category,
        diagram: detectDiagramType(content)
      });
    }

    setSections(parsedSections);
  }, [content, category]);

  const detectDiagramType = (text: string): DiagramProps | undefined => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('atom') || lowerText.includes('electron') || lowerText.includes('nucleus')) {
      return { type: 'atom' };
    }
    if (lowerText.includes('dna') || lowerText.includes('genetic') || lowerText.includes('gene')) {
      return { type: 'dna' };
    }
    if (lowerText.includes('planet') || lowerText.includes('solar') || lowerText.includes('orbit')) {
      return { type: 'solar-system' };
    }
    if (lowerText.includes('wave') || lowerText.includes('frequency') || lowerText.includes('vibration')) {
      return { type: 'wave' };
    }
    
    return undefined;
  };

  if (sections.length === 0) {
    return (
      <Card className="p-6">
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {content}
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Badge */}
      <div className="flex items-center space-x-2">
        <Badge variant="secondary" className="flex items-center space-x-1">
          {getCategoryIcon(category)}
          <span className="capitalize">{category.replace('-', ' ')}</span>
        </Badge>
      </div>

      {/* Section Navigation */}
      {sections.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {sections.map((_, index) => (
            <Button
              key={index}
              variant={currentSection === index ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentSection(index)}
              className="whitespace-nowrap"
            >
              {index + 1}. {sections[index].title}
            </Button>
          ))}
        </div>
      )}

      {/* Current Section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                {getCategoryIcon(category)}
                <span>{sections[currentSection]?.title}</span>
              </h3>
              
              {sections.length > 1 && (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                    disabled={currentSection === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
                    disabled={currentSection === sections.length - 1}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </div>

            {/* Diagram */}
            {sections[currentSection]?.diagram && (
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-6">
                <AnimatedDiagram {...sections[currentSection].diagram!} />
              </div>
            )}

            {/* Content */}
            {sections[currentSection]?.content && (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div className="whitespace-pre-wrap leading-relaxed">
                  {sections[currentSection].content}
                </div>
              </div>
            )}

            {/* Key Points */}
            {sections[currentSection]?.keyPoints && (
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  Key Points
                </h4>
                <div className="space-y-2">
                  {sections[currentSection].keyPoints!.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs text-primary-foreground font-medium">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-sm">{point}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Formula */}
            {sections[currentSection]?.formula && (
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Formula:</h4>
                <code className="text-lg font-mono">{sections[currentSection].formula}</code>
              </div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

## src/components/ScienceParticles.tsx

**Explanation:** Reusable React UI component.

```ts
import { motion } from 'framer-motion';
import { Atom, Dna, Microscope, Telescope, Beaker, Zap } from 'lucide-react';

const particles = [
  { Icon: Atom, color: 'text-primary' },
  { Icon: Dna, color: 'text-secondary' },
  { Icon: Microscope, color: 'text-accent' },
  { Icon: Telescope, color: 'text-primary' },
  { Icon: Beaker, color: 'text-secondary' },
  { Icon: Zap, color: 'text-accent' },
];

export function ScienceParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className={`absolute ${particle.color} opacity-20`}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: 360,
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <particle.Icon className="h-6 w-6" />
        </motion.div>
      ))}
    </div>
  );
}
```

## src/components/ScienceUniverse.tsx

**Explanation:** Reusable React UI component.

```ts
import React from 'react';
import { motion } from 'framer-motion';

const ScienceUniverse: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Starfield Background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Floating Atoms */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`atom-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
            }}
            animate={{
              x: [0, 30, -30, 0],
              y: [0, -40, 40, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative w-8 h-8">
              {/* Nucleus */}
              <div className="absolute inset-0 w-3 h-3 bg-primary/40 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              
              {/* Electron orbits */}
              <motion.div
                className="absolute inset-0 border border-primary/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute w-1 h-1 bg-primary/60 rounded-full -top-0.5 left-1/2 transform -translate-x-1/2" />
              </motion.div>
              
              <motion.div
                className="absolute inset-0 border border-primary/20 rounded-full transform rotate-45"
                animate={{ rotate: [45, 405] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute w-1 h-1 bg-primary/60 rounded-full -top-0.5 left-1/2 transform -translate-x-1/2" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Rockets */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`rocket-${i}`}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 80}%`,
            }}
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -80, 60, 0],
              rotate: [0, 15, -10, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🚀
          </motion.div>
        ))}
      </div>

      {/* Floating Satellites */}
      <div className="absolute inset-0">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={`satellite-${i}`}
            className="absolute text-xl"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
            }}
            animate={{
              x: [0, -80, 80, 0],
              y: [0, 50, -50, 0],
            }}
            transition={{
              duration: 25 + Math.random() * 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🛰️
          </motion.div>
        ))}
      </div>

      {/* DNA Helixes */}
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`dna-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 85}%`,
              top: `${Math.random() * 85}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative w-6 h-12">
              <motion.div
                className="absolute inset-0 border-l-2 border-r-2 border-primary/30"
                animate={{ rotateY: [0, 180, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              {/* DNA base pairs */}
              {[...Array(4)].map((_, j) => (
                <div
                  key={j}
                  className="absolute w-full h-0.5 bg-primary/40"
                  style={{ top: `${j * 25}%` }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Molecules */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`molecule-${i}`}
            className="absolute text-lg"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
            }}
            animate={{
              x: [0, 40, -40, 0],
              y: [0, -30, 30, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 18 + Math.random() * 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ⚗️
          </motion.div>
        ))}
      </div>

      {/* Floating Numbers and Formulas */}
      <div className="absolute inset-0">
        {['E=mc²', 'π', '∞', 'Δ', '∫', '∑'].map((symbol, i) => (
          <motion.div
            key={`symbol-${i}`}
            className="absolute text-sm font-mono text-primary/20 select-none"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 4,
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ScienceUniverse;
```

## src/components/ScienceVisuals.tsx

**Explanation:** Reusable React UI component.

```ts
import React from 'react';
import { Canvas } from '@react-three/fiber';

const ScienceVisuals = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <sphereGeometry args={[1, 60, 60]} />
        <meshBasicMaterial color="hotpink" />
      </mesh>
    </Canvas>
  );
};

export default ScienceVisuals;

```

## src/components/ShareButton.tsx

**Explanation:** Reusable React UI component.

```ts
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { Message } from '@/types';

interface ShareButtonProps {
  messages: Message[];
  conversationTitle?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ 
  messages, 
  conversationTitle = 'Science Lens Conversation' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Create a shareable summary of the conversation
  const createShareableContent = () => {
    const lastExchange = messages.slice(-2); // Get last question and answer
    if (lastExchange.length < 2) return '';

    const question = lastExchange.find(m => m.type === 'user')?.content || '';
    const answer = lastExchange.find(m => m.type === 'assistant')?.content || '';

    return `🧪 Science Lens Q&A\n\n❓ Question: ${question}\n\n🤖 Answer: ${answer.substring(0, 200)}${answer.length > 200 ? '...' : ''}\n\n🔗 Explore more science at Science Lens!`;
  };

  const createShareableUrl = () => {
    const content = createShareableContent();
    const encoded = encodeURIComponent(content);
    return `${window.location.origin}?share=${btoa(encoded)}`;
  };

  const handleCopyLink = async () => {
    try {
      const shareUrl = createShareableUrl();
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "Link Copied! 🔗",
        description: "Share this link to show others your science discovery!",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy link. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCopyText = async () => {
    try {
      const content = createShareableContent();
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "Text Copied! 📋",
        description: "Paste this anywhere to share your science discovery!",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy text. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShareNative = async () => {
    const content = createShareableContent();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: conversationTitle,
          text: content,
          url: createShareableUrl(),
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          handleCopyText();
        }
      }
    } else {
      handleCopyText();
    }
  };

  if (messages.length === 0) {
    return null;
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2"
      >
        <Share2 className="h-4 w-4" />
        <span>Share</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Share2 className="h-5 w-5" />
              <span>Share Your Discovery</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Preview */}
            <div className="p-4 bg-muted/50 rounded-lg border">
              <Label className="text-xs text-muted-foreground">Preview</Label>
              <div className="mt-2 text-sm whitespace-pre-wrap">
                {createShareableContent().substring(0, 150)}...
              </div>
            </div>

            {/* Share Options */}
            <div className="space-y-3">
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={handleShareNative}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share with Apps
              </Button>

              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={handleCopyLink}
              >
                {copied ? (
                  <Check className="h-4 w-4 mr-2 text-green-600" />
                ) : (
                  <ExternalLink className="h-4 w-4 mr-2" />
                )}
                Copy Shareable Link
              </Button>

              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={handleCopyText}
              >
                {copied ? (
                  <Check className="h-4 w-4 mr-2 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4 mr-2" />
                )}
                Copy as Text
              </Button>
            </div>

            {/* Shareable URL Display */}
            <div className="space-y-2">
              <Label htmlFor="share-url" className="text-xs text-muted-foreground">
                Shareable URL
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="share-url"
                  value={createShareableUrl()}
                  readOnly
                  className="text-xs"
                />
                <Button size="icon" variant="outline" onClick={handleCopyLink}>
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
          >
            <div className="flex items-start space-x-2">
              <div className="text-blue-600 dark:text-blue-400 mt-0.5">🚀</div>
              <div className="text-xs text-blue-800 dark:text-blue-200">
                <strong>Science spreads when shared!</strong> Your discoveries might inspire others to explore the fascinating world of science.
              </div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
};
```

## src/components/ThemeProvider.tsx

**Explanation:** Reusable React UI component.

```ts
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'science-lens-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
```

## src/components/ThemeToggle.tsx

**Explanation:** Reusable React UI component.

```ts
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="relative overflow-hidden"
    >
      <motion.div
        key={theme}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {theme === 'light' ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
```

## src/components/UsageIndicator.tsx

**Explanation:** Reusable React UI component.

```ts
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Crown, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface UsageIndicatorProps {
  requestsToday: number;
  maxRequests: number;
  tier: 'free' | 'plus' | 'pro';
  onUpgrade: () => void;
}

export const UsageIndicator: React.FC<UsageIndicatorProps> = ({
  requestsToday,
  maxRequests,
  tier,
  onUpgrade,
}) => {
  const percentage = Math.min((requestsToday / maxRequests) * 100, 100);
  const isUnlimited = maxRequests >= 999999;
  const isNearLimit = percentage >= 80;
  const isAtLimit = requestsToday >= maxRequests;

  const getTierConfig = () => {
    switch (tier) {
      case 'free':
        return {
          icon: <Sparkles className="h-4 w-4" />,
          name: 'Free',
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
        };
      case 'plus':
        return {
          icon: <Zap className="h-4 w-4" />,
          name: 'Plus',
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
        };
      case 'pro':
        return {
          icon: <Crown className="h-4 w-4" />,
          name: 'Pro',
          color: 'text-purple-600',
          bgColor: 'bg-purple-100',
        };
    }
  };

  const config = getTierConfig();

  if (isUnlimited) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center space-x-2"
      >
        <Badge variant="secondary" className={`${config.bgColor} ${config.color} border-0`}>
          <span className="mr-1">{config.icon}</span>
          {config.name}
        </Badge>
        <span className="text-sm text-muted-foreground">Unlimited questions</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Card className={`${isAtLimit ? 'border-red-200 bg-red-50' : isNearLimit ? 'border-orange-200 bg-orange-50' : ''}`}>
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className={`${config.bgColor} ${config.color} border-0`}>
                  <span className="mr-1">{config.icon}</span>
                  {config.name}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {requestsToday} / {maxRequests} questions today
                </span>
              </div>
              
              {tier === 'free' && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onUpgrade}
                  className="text-xs"
                >
                  Upgrade
                </Button>
              )}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress 
                value={percentage} 
                className={`h-2 ${
                  isAtLimit ? '[&>div]:bg-red-500' : 
                  isNearLimit ? '[&>div]:bg-orange-500' : 
                  '[&>div]:bg-green-500'
                }`}
              />
              
              {/* Status Message */}
              <div className="flex items-center justify-between text-xs">
                <span className={`font-medium ${
                  isAtLimit ? 'text-red-600' : 
                  isNearLimit ? 'text-orange-600' : 
                  'text-green-600'
                }`}>
                  {isAtLimit ? (
                    '🚫 Daily limit reached'
                  ) : isNearLimit ? (
                    '⚠️ Approaching limit'
                  ) : (
                    '✅ Plenty of questions left'
                  )}
                </span>
                
                <span className="text-muted-foreground">
                  {maxRequests - requestsToday} remaining
                </span>
              </div>
            </div>

            {/* Upgrade Prompt */}
            {isAtLimit && tier === 'free' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg"
              >
                <div className="text-sm">
                  <p className="font-medium text-gray-800 mb-1">
                    🚀 Want to keep exploring?
                  </p>
                  <p className="text-gray-600 text-xs mb-2">
                    Upgrade to Plus for unlimited questions and enhanced features!
                  </p>
                  <Button 
                    size="sm" 
                    onClick={onUpgrade}
                    className="bg-gradient-science hover:shadow-glow text-xs"
                  >
                    Upgrade Now
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
```

## src/components/VisualAILoadingAnimation.tsx

**Explanation:** Reusable React UI component.

```ts
import React from 'react';
import Lottie from 'react-lottie';

const AILoader = () => {
  const animationData = require('../animations/spaceship.json');

  return (
    <div>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData,
          rendererSettings: {
            preserveAspectRatio: 'xMinYMin slice',
          },
        }}
        height={200}
        width={200}
      />
    </div>
  );
};

export default AILoader;

```

## src/components/VoiceMode.tsx

**Explanation:** Reusable React UI component.

```ts
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface VoiceModeProps {
  text: string;
  isProUser?: boolean;
}

const voices = [
  { id: 'alloy', name: 'Alloy', description: 'Neutral and clear' },
  { id: 'echo', name: 'Echo', description: 'Warm and engaging' },
  { id: 'fable', name: 'Fable', description: 'Expressive storyteller' },
  { id: 'onyx', name: 'Onyx', description: 'Deep and authoritative' },
  { id: 'nova', name: 'Nova', description: 'Bright and energetic' },
  { id: 'shimmer', name: 'Shimmer', description: 'Soft and gentle' },
];

export const VoiceMode: React.FC<VoiceModeProps> = ({ text, isProUser = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [selectedVoice, setSelectedVoice] = useState('alloy');
  const { toast } = useToast();

  const handlePlayPause = async () => {
    if (!isProUser) {
      toast({
        title: "Pro Feature",
        description: "Voice mode is available for Pro users. Upgrade to unlock!",
        variant: "destructive",
      });
      return;
    }

    if (isPlaying && currentAudio) {
      currentAudio.pause();
      setIsPlaying(false);
      return;
    }

    if (currentAudio && !currentAudio.ended) {
      currentAudio.play();
      setIsPlaying(true);
      return;
    }

    try {
      setLoading(true);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Please log in to use voice mode');
      }

      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { 
          text: text.substring(0, 4000), // Limit text length
          voice: selectedVoice 
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      if (data?.audioContent) {
        const audioBlob = new Blob(
          [Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0))],
          { type: 'audio/mpeg' }
        );
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);

        audio.onplay = () => setIsPlaying(true);
        audio.onpause = () => setIsPlaying(false);
        audio.onended = () => {
          setIsPlaying(false);
          URL.revokeObjectURL(audioUrl);
        };
        audio.onerror = () => {
          setIsPlaying(false);
          toast({
            title: "Playback Error",
            description: "Failed to play audio. Please try again.",
            variant: "destructive",
          });
        };

        setCurrentAudio(audio);
        audio.play();
      }
    } catch (error: any) {
      console.error('Voice mode error:', error);
      toast({
        title: "Voice Error",
        description: error.message || "Failed to generate speech. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setIsPlaying(false);
    }
  };

  if (!text.trim()) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg border"
    >
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePlayPause}
          disabled={loading}
          className={`h-8 w-8 ${!isProUser ? 'opacity-50' : ''}`}
        >
          {loading ? (
            <div className="h-4 w-4 animate-spin border-2 border-primary border-t-transparent rounded-full" />
          ) : isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>

        {isPlaying && (
          <Button
            variant="ghost"
            size="icon"
            onClick={stopAudio}
            className="h-8 w-8"
          >
            <VolumeX className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex-1 flex items-center space-x-2">
        <Volume2 className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          {isProUser ? 'Voice Mode' : 'Voice Mode (Pro Only)'}
        </span>
      </div>

      {isProUser && (
        <Select value={selectedVoice} onValueChange={setSelectedVoice}>
          <SelectTrigger className="w-32 h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {voices.map((voice) => (
              <SelectItem key={voice.id} value={voice.id} className="text-xs">
                <div>
                  <div className="font-medium">{voice.name}</div>
                  <div className="text-xs text-muted-foreground">{voice.description}</div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </motion.div>
  );
};
```

## src/components/WOWFeatures.tsx

**Explanation:** Reusable React UI component.

```ts
import React, { useState } from 'react';
import confetti from 'canvas-confetti';

const WOWFeatures = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
    });
  };

  return (
    <div>
      <button onClick={handleUnlock}>Unlock WOW Feature</button>
      {isUnlocked && <p>Congratulations!</p>}
    </div>
  );
};

export default WOWFeatures;

```

## src/components/ui/accordion.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

```

## src/components/ui/alert-dialog.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    )}
    {...props}
  />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}

```

## src/components/ui/alert.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }

```

## src/components/ui/aspect-ratio.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

const AspectRatio = AspectRatioPrimitive.Root

export { AspectRatio }

```

## src/components/ui/avatar.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }

```

## src/components/ui/badge.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

```

## src/components/ui/breadcrumb.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    )}
    {...props}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}

```

## src/components/ui/button.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-science transition-smooth",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-science transition-smooth",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-gradient-cosmic text-white hover:shadow-glow hover:scale-105 transform transition-smooth font-semibold",
        science: "bg-gradient-science text-white hover:shadow-glow hover:scale-105 transform transition-smooth",
        cosmic: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-science transition-smooth hover:animate-pulse-glow",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

```

## src/components/ui/calendar.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };

```

## src/components/ui/card.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

```

## src/components/ui/carousel.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}

```

## src/components/ui/chart.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([_, config]) => config.theme || config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
      nameKey?: string
      labelKey?: string
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      const key = `${labelKey || item.dataKey || item.name || "value"}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        )
      }

      if (!value) {
        return null
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color || item.payload.fill || item.color

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            }
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltip"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean
      nameKey?: string
    }
>(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref
  ) => {
    const { config } = useChart()

    if (!payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
      >
        {payload.map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div
              key={item.value}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          )
        })}
      </div>
    )
  }
)
ChartLegendContent.displayName = "ChartLegend"

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}

```

## src/components/ui/checkbox.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

```

## src/components/ui/collapsible.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }

```

## src/components/ui/command.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
      className
    )}
    {...props}
  />
))

CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}

```

## src/components/ui/context-menu.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const ContextMenu = ContextMenuPrimitive.Root

const ContextMenuTrigger = ContextMenuPrimitive.Trigger

const ContextMenuGroup = ContextMenuPrimitive.Group

const ContextMenuPortal = ContextMenuPrimitive.Portal

const ContextMenuSub = ContextMenuPrimitive.Sub

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
))
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
))
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
))
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
))
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
))
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName

const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
ContextMenuShortcut.displayName = "ContextMenuShortcut"

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}

```

## src/components/ui/dialog.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}

```

## src/components/ui/drawer.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
)
Drawer.displayName = "Drawer"

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
))
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}

```

## src/components/ui/dropdown-menu.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}

```

## src/components/ui/form.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}

```

## src/components/ui/hover-card.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/lib/utils"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }

```

## src/components/ui/input-otp.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Dot } from "lucide-react"

import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }

```

## src/components/ui/input.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

```

## src/components/ui/label.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }

```

## src/components/ui/menubar.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const MenubarMenu = MenubarPrimitive.Menu

const MenubarGroup = MenubarPrimitive.Group

const MenubarPortal = MenubarPrimitive.Portal

const MenubarSub = MenubarPrimitive.Sub

const MenubarRadioGroup = MenubarPrimitive.RadioGroup

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-10 items-center space-x-1 rounded-md border bg-background p-1",
      className
    )}
    {...props}
  />
))
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className
    )}
    {...props}
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenubarPrimitive.SubTrigger>
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
)
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
MenubarShortcut.displayname = "MenubarShortcut"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}

```

## src/components/ui/navigation-menu.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
)

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
      className
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

const NavigationMenuLink = NavigationMenuPrimitive.Link

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}

```

## src/components/ui/pagination.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}

```

## src/components/ui/popover.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }

```

## src/components/ui/progress.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }

```

## src/components/ui/radio-group.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }

```

## src/components/ui/resizable.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }

```

## src/components/ui/scroll-area.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }

```

## src/components/ui/select.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}

```

## src/components/ui/separator.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }

```

## src/components/ui/sheet.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
  VariantProps<typeof sheetVariants> { }

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet, SheetClose,
  SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger
}


```

## src/components/ui/sidebar.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import { PanelLeft } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar:state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isMobile = useIsMobile()
    const [openMobile, setOpenMobile] = React.useState(false)

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen)
    const open = openProp ?? _open
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value
        if (setOpenProp) {
          setOpenProp(openState)
        } else {
          _setOpen(openState)
        }

        // This sets the cookie to keep the sidebar state.
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
      },
      [setOpenProp, open]
    )

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open)
    }, [isMobile, setOpen, setOpenMobile])

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault()
          toggleSidebar()
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [toggleSidebar])

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? "expanded" : "collapsed"

    const contextValue = React.useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    )

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
              className
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    )
  }
)
SidebarProvider.displayName = "SidebarProvider"

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none"
  }
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    if (collapsible === "none") {
      return (
        <div
          className={cn(
            "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      )
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
              } as React.CSSProperties
            }
            side={side}
          >
            <div className="flex h-full w-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      )
    }

    return (
      <div
        ref={ref}
        className="group peer hidden md:block text-sidebar-foreground"
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
      >
        {/* This is what handles the sidebar gap on desktop */}
        <div
          className={cn(
            "duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear",
            "group-data-[collapsible=offcanvas]:w-0",
            "group-data-[side=right]:rotate-180",
            variant === "floating" || variant === "inset"
              ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
          )}
        />
        <div
          className={cn(
            "duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex",
            side === "left"
              ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
              : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
            // Adjust the padding for floating and inset variants.
            variant === "floating" || variant === "inset"
              ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
            className
          )}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
          >
            {children}
          </div>
        </div>
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
        "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props}
    />
  )
})
SidebarRail.displayName = "SidebarRail"

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"main">
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        "relative flex min-h-svh flex-1 flex-col bg-background",
        "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
        className
      )}
      {...props}
    />
  )
})
SidebarInset.displayName = "SidebarInset"

const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className
      )}
      {...props}
    />
  )
})
SidebarInput.displayName = "SidebarInput"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      {...props}
    />
  )
})
SidebarSeparator.displayName = "SidebarSeparator"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  )
})
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        "duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupAction.displayName = "SidebarGroupAction"

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("w-full text-sm", className)}
    {...props}
  />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn("flex w-full min-w-0 flex-col gap-1", className)}
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("group/menu-item relative", className)}
    {...props}
  />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    isActive?: boolean
    tooltip?: string | React.ComponentProps<typeof TooltipContent>
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const { isMobile, state } = useSidebar()

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    )

    if (!tooltip) {
      return button
    }

    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip,
      }
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state !== "collapsed" || isMobile}
          {...tooltip}
        />
      </Tooltip>
    )
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    showOnHover?: boolean
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuAction.displayName = "SidebarMenuAction"

const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn(
      "absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none",
      "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:hidden",
      className
    )}
    {...props}
  />
))
SidebarMenuBadge.displayName = "SidebarMenuBadge"

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean
  }
>(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("rounded-md h-8 flex gap-2 px-2 items-center", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 flex-1 max-w-[--skeleton-width]"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
})
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton"

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn(
      "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
      "group-data-[collapsible=icon]:hidden",
      className
    )}
    {...props}
  />
))
SidebarMenuSub.displayName = "SidebarMenuSub"

const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ ...props }, ref) => <li ref={ref} {...props} />)
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean
    size?: "sm" | "md"
    isActive?: boolean
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}

```

## src/components/ui/skeleton.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }

```

## src/components/ui/slider.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }

```

## src/components/ui/sonner.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }

```

## src/components/ui/switch.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }

```

## src/components/ui/table.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}

```

## src/components/ui/tabs.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }

```

## src/components/ui/textarea.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }

```

## src/components/ui/toast.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}

```

## src/components/ui/toaster.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}

```

## src/components/ui/toggle-group.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
})

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }

```

## src/components/ui/toggle.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }

```

## src/components/ui/tooltip.tsx

**Explanation:** UI primitive component (shared low-level UI).

```ts
import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

```

## src/components/ui/use-toast.ts

**Explanation:** UI primitive component (shared low-level UI).

```ts
import { useToast, toast } from "@/hooks/use-toast";

export { useToast, toast };

```

## src/data/achievements.ts

**Explanation:** Source code file.

```ts
export interface AchievementCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export const achievementCategories: AchievementCategory[] = [
  { id: 'biology', name: 'Biology', color: 'hsl(142 76% 55%)', icon: '🧬' },
  { id: 'chemistry', name: 'Chemistry', color: 'hsl(45 93% 58%)', icon: '⚗️' },
  { id: 'physics', name: 'Physics', color: 'hsl(217 91% 60%)', icon: '⚛️' },
  { id: 'astronomy', name: 'Astronomy', color: 'hsl(260 60% 65%)', icon: '🌟' },
  { id: 'earth-science', name: 'Earth Science', color: 'hsl(30 100% 50%)', icon: '🌍' },
  { id: 'technology', name: 'Technology', color: 'hsl(200 100% 50%)', icon: '💻' },
  { id: 'mathematics', name: 'Mathematics', color: 'hsl(300 60% 60%)', icon: '📊' },
  { id: 'general', name: 'General Science', color: 'hsl(220 25% 50%)', icon: '🔬' },
  { id: 'milestones', name: 'Milestones', color: 'hsl(50 100% 50%)', icon: '🏆' },
];

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  unlocked: boolean;
  unlockedAt?: number;
  bonusCredits?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirements: {
    type: 'questions_in_category' | 'total_questions' | 'streak_days' | 'photos_uploaded' | 'special';
    count?: number;
    category?: string;
    special?: string;
  };
}

export const achievements: Achievement[] = [
  // Biology (10 achievements)
  { id: 'bio-beginner', title: 'Biology Beginner', description: 'Ask 5 biology questions', icon: '🌱', category: 'biology', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'questions_in_category', count: 5, category: 'biology' } },
  { id: 'bio-explorer', title: 'Biology Explorer', description: 'Ask 10 biology questions', icon: '🔬', category: 'biology', unlocked: false, bonusCredits: 2, rarity: 'common', requirements: { type: 'questions_in_category', count: 10, category: 'biology' } },
  { id: 'bio-master', title: 'Biology Master', description: 'Ask 25 biology questions', icon: '🧬', category: 'biology', unlocked: false, bonusCredits: 3, rarity: 'rare', requirements: { type: 'questions_in_category', count: 25, category: 'biology' } },
  { id: 'bio-expert', title: 'Biology Expert', description: 'Ask 50 biology questions', icon: '🦋', category: 'biology', unlocked: false, bonusCredits: 5, rarity: 'epic', requirements: { type: 'questions_in_category', count: 50, category: 'biology' } },
  { id: 'bio-genius', title: 'Biology Genius', description: 'Ask 100 biology questions', icon: '🧠', category: 'biology', unlocked: false, bonusCredits: 10, rarity: 'legendary', requirements: { type: 'questions_in_category', count: 100, category: 'biology' } },
  { id: 'plant-lover', title: 'Plant Lover', description: 'Ask about plant life', icon: '🌿', category: 'biology', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'special', special: 'plants' } },
  { id: 'animal-researcher', title: 'Animal Researcher', description: 'Ask about animal behavior', icon: '🦁', category: 'biology', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'special', special: 'animals' } },
  { id: 'cell-scientist', title: 'Cell Scientist', description: 'Ask about cellular biology', icon: '🦠', category: 'biology', unlocked: false, bonusCredits: 2, rarity: 'rare', requirements: { type: 'special', special: 'cells' } },
  { id: 'dna-detective', title: 'DNA Detective', description: 'Ask about genetics', icon: '🧬', category: 'biology', unlocked: false, bonusCredits: 2, rarity: 'rare', requirements: { type: 'special', special: 'genetics' } },
  { id: 'evolution-scholar', title: 'Evolution Scholar', description: 'Ask about evolution', icon: '🐒', category: 'biology', unlocked: false, bonusCredits: 3, rarity: 'epic', requirements: { type: 'special', special: 'evolution' } },

  // Chemistry (10 achievements)
  { id: 'chem-beginner', title: 'Chemistry Beginner', description: 'Ask 5 chemistry questions', icon: '🧪', category: 'chemistry', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'questions_in_category', count: 5, category: 'chemistry' } },
  { id: 'chem-explorer', title: 'Chemistry Explorer', description: 'Ask 10 chemistry questions', icon: '⚗️', category: 'chemistry', unlocked: false, bonusCredits: 2, rarity: 'common', requirements: { type: 'questions_in_category', count: 10, category: 'chemistry' } },
  { id: 'chem-master', title: 'Chemistry Master', description: 'Ask 25 chemistry questions', icon: '💥', category: 'chemistry', unlocked: false, bonusCredits: 3, rarity: 'rare', requirements: { type: 'questions_in_category', count: 25, category: 'chemistry' } },
  { id: 'chem-expert', title: 'Chemistry Expert', description: 'Ask 50 chemistry questions', icon: '⚛️', category: 'chemistry', unlocked: false, bonusCredits: 5, rarity: 'epic', requirements: { type: 'questions_in_category', count: 50, category: 'chemistry' } },
  { id: 'chem-genius', title: 'Chemistry Genius', description: 'Ask 100 chemistry questions', icon: '🧙‍♂️', category: 'chemistry', unlocked: false, bonusCredits: 10, rarity: 'legendary', requirements: { type: 'questions_in_category', count: 100, category: 'chemistry' } },
  { id: 'element-hunter', title: 'Element Hunter', description: 'Ask about elements', icon: '📊', category: 'chemistry', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'special', special: 'elements' } },
  { id: 'reaction-master', title: 'Reaction Master', description: 'Ask about chemical reactions', icon: '💥', category: 'chemistry', unlocked: false, bonusCredits: 2, rarity: 'rare', requirements: { type: 'special', special: 'reactions' } },
  { id: 'molecule-builder', title: 'Molecule Builder', description: 'Ask about molecules', icon: '🔗', category: 'chemistry', unlocked: false, bonusCredits: 2, rarity: 'rare', requirements: { type: 'special', special: 'molecules' } },
  { id: 'acid-base-pro', title: 'Acid-Base Pro', description: 'Ask about acids and bases', icon: '🧪', category: 'chemistry', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'special', special: 'acid-base' } },
  { id: 'organic-chemist', title: 'Organic Chemist', description: 'Ask about organic chemistry', icon: '🌿', category: 'chemistry', unlocked: false, bonusCredits: 3, rarity: 'epic', requirements: { type: 'special', special: 'organic' } },

  // Physics (10 achievements)
  { id: 'physics-beginner', title: 'Physics Beginner', description: 'Ask 5 physics questions', icon: '📐', category: 'physics', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'questions_in_category', count: 5, category: 'physics' } },
  { id: 'physics-explorer', title: 'Physics Explorer', description: 'Ask 10 physics questions', icon: '⚛️', category: 'physics', unlocked: false, bonusCredits: 2, rarity: 'common', requirements: { type: 'questions_in_category', count: 10, category: 'physics' } },
  { id: 'physics-master', title: 'Physics Master', description: 'Ask 25 physics questions', icon: '⚡', category: 'physics', unlocked: false, bonusCredits: 3, rarity: 'rare', requirements: { type: 'questions_in_category', count: 25, category: 'physics' } },
  { id: 'physics-expert', title: 'Physics Expert', description: 'Ask 50 physics questions', icon: '🌀', category: 'physics', unlocked: false, bonusCredits: 5, rarity: 'epic', requirements: { type: 'questions_in_category', count: 50, category: 'physics' } },
  { id: 'physics-genius', title: 'Physics Genius', description: 'Ask 100 physics questions', icon: '🧠', category: 'physics', unlocked: false, bonusCredits: 10, rarity: 'legendary', requirements: { type: 'questions_in_category', count: 100, category: 'physics' } },
  { id: 'motion-detective', title: 'Motion Detective', description: 'Ask about motion and forces', icon: '🏃‍♂️', category: 'physics', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'special', special: 'motion' } },
  { id: 'energy-expert', title: 'Energy Expert', description: 'Ask about energy', icon: '⚡', category: 'physics', unlocked: false, bonusCredits: 2, rarity: 'rare', requirements: { type: 'special', special: 'energy' } },
  { id: 'quantum-explorer', title: 'Quantum Explorer', description: 'Ask about quantum physics', icon: '🌀', category: 'physics', unlocked: false, bonusCredits: 3, rarity: 'epic', requirements: { type: 'special', special: 'quantum' } },
  { id: 'wave-master', title: 'Wave Master', description: 'Ask about waves and sound', icon: '🌊', category: 'physics', unlocked: false, bonusCredits: 2, rarity: 'rare', requirements: { type: 'special', special: 'waves' } },
  { id: 'light-specialist', title: 'Light Specialist', description: 'Ask about light and optics', icon: '🌈', category: 'physics', unlocked: false, bonusCredits: 2, rarity: 'rare', requirements: { type: 'special', special: 'light' } },

  // Astronomy (10 achievements)
  { id: 'astro-beginner', title: 'Astronomy Beginner', description: 'Ask 5 astronomy questions', icon: '⭐', category: 'astronomy', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'questions_in_category', count: 5, category: 'astronomy' } },
  { id: 'astro-explorer', title: 'Astronomy Explorer', description: 'Ask 10 astronomy questions', icon: '🔭', category: 'astronomy', unlocked: false, bonusCredits: 2, rarity: 'common', requirements: { type: 'questions_in_category', count: 10, category: 'astronomy' } },
  { id: 'astro-master', title: 'Astronomy Master', description: 'Ask 25 astronomy questions', icon: '🌌', category: 'astronomy', unlocked: false, bonusCredits: 3, rarity: 'rare', requirements: { type: 'questions_in_category', count: 25, category: 'astronomy' } },
  { id: 'astro-expert', title: 'Astronomy Expert', description: 'Ask 50 astronomy questions', icon: '🚀', category: 'astronomy', unlocked: false, bonusCredits: 5, rarity: 'epic', requirements: { type: 'questions_in_category', count: 50, category: 'astronomy' } },
  { id: 'astro-genius', title: 'Astronomy Genius', description: 'Ask 100 astronomy questions', icon: '🌠', category: 'astronomy', unlocked: false, bonusCredits: 10, rarity: 'legendary', requirements: { type: 'questions_in_category', count: 100, category: 'astronomy' } },
  { id: 'star-gazer', title: 'Star Gazer', description: 'Ask about stars', icon: '⭐', category: 'astronomy', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'special', special: 'stars' } },
  { id: 'planet-hunter', title: 'Planet Hunter', description: 'Ask about planets', icon: '🪐', category: 'astronomy', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'special', special: 'planets' } },
  { id: 'galaxy-explorer', title: 'Galaxy Explorer', description: 'Ask about galaxies', icon: '🌌', category: 'astronomy', unlocked: false, bonusCredits: 2, rarity: 'rare', requirements: { type: 'special', special: 'galaxies' } },
  { id: 'space-pioneer', title: 'Space Pioneer', description: 'Ask about space exploration', icon: '🚀', category: 'astronomy', unlocked: false, bonusCredits: 2, rarity: 'rare', requirements: { type: 'special', special: 'space-exploration' } },
  { id: 'cosmic-detective', title: 'Cosmic Detective', description: 'Ask about black holes', icon: '🕳️', category: 'astronomy', unlocked: false, bonusCredits: 3, rarity: 'epic', requirements: { type: 'special', special: 'black-holes' } },

  // Earth Science (10 achievements)
  { id: 'earth-beginner', title: 'Earth Science Beginner', description: 'Ask 5 earth science questions', icon: '🌍', category: 'earth-science', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'questions_in_category', count: 5, category: 'earth-science' } },
  { id: 'earth-explorer', title: 'Earth Science Explorer', description: 'Ask 10 earth science questions', icon: '🗻', category: 'earth-science', unlocked: false, bonusCredits: 2, rarity: 'common', requirements: { type: 'questions_in_category', count: 10, category: 'earth-science' } },
  { id: 'earth-master', title: 'Earth Science Master', description: 'Ask 25 earth science questions', icon: '🌋', category: 'earth-science', unlocked: false, bonusCredits: 3, rarity: 'rare', requirements: { type: 'questions_in_category', count: 25, category: 'earth-science' } },
  { id: 'earth-expert', title: 'Earth Science Expert', description: 'Ask 50 earth science questions', icon: '🏔️', category: 'earth-science', unlocked: false, bonusCredits: 5, rarity: 'epic', requirements: { type: 'questions_in_category', count: 50, category: 'earth-science' } },
  { id: 'earth-genius', title: 'Earth Science Genius', description: 'Ask 100 earth science questions', icon: '🌎', category: 'earth-science', unlocked: false, bonusCredits: 10, rarity: 'legendary', requirements: { type: 'questions_in_category', count: 100, category: 'earth-science' } },
  { id: 'rock-hound', title: 'Rock Hound', description: 'Ask about rocks and minerals', icon: '🪨', category: 'earth-science', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'special', special: 'rocks' } },
  { id: 'weather-watcher', title: 'Weather Watcher', description: 'Ask about weather and climate', icon: '⛈️', category: 'earth-science', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'special', special: 'weather' } },
  { id: 'ocean-explorer', title: 'Ocean Explorer', description: 'Ask about oceans', icon: '🌊', category: 'earth-science', unlocked: false, bonusCredits: 2, rarity: 'rare', requirements: { type: 'special', special: 'oceans' } },
  { id: 'earthquake-expert', title: 'Earthquake Expert', description: 'Ask about earthquakes', icon: '🌋', category: 'earth-science', unlocked: false, bonusCredits: 2, rarity: 'rare', requirements: { type: 'special', special: 'earthquakes' } },
  { id: 'climate-champion', title: 'Climate Champion', description: 'Ask about climate change', icon: '🌡️', category: 'earth-science', unlocked: false, bonusCredits: 3, rarity: 'epic', requirements: { type: 'special', special: 'climate' } },

  // Technology (10 achievements)
  { id: 'tech-beginner', title: 'Technology Beginner', description: 'Ask 5 technology questions', icon: '💻', category: 'technology', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'questions_in_category', count: 5, category: 'technology' } },
  { id: 'tech-explorer', title: 'Technology Explorer', description: 'Ask 10 technology questions', icon: '🔧', category: 'technology', unlocked: false, bonusCredits: 2, rarity: 'common', requirements: { type: 'questions_in_category', count: 10, category: 'technology' } },
  { id: 'tech-master', title: 'Technology Master', description: 'Ask 25 technology questions', icon: '⚙️', category: 'technology', unlocked: false, bonusCredits: 3, rarity: 'rare', requirements: { type: 'questions_in_category', count: 25, category: 'technology' } },
  { id: 'tech-expert', title: 'Technology Expert', description: 'Ask 50 technology questions', icon: '🤖', category: 'technology', unlocked: false, bonusCredits: 5, rarity: 'epic', requirements: { type: 'questions_in_category', count: 50, category: 'technology' } },
  { id: 'tech-genius', title: 'Technology Genius', description: 'Ask 100 technology questions', icon: '🚀', category: 'technology', unlocked: false, bonusCredits: 10, rarity: 'legendary', requirements: { type: 'questions_in_category', count: 100, category: 'technology' } },
  { id: 'ai-enthusiast', title: 'AI Enthusiast', description: 'Ask about artificial intelligence', icon: '🤖', category: 'technology', unlocked: false, bonusCredits: 2, rarity: 'rare', requirements: { type: 'special', special: 'ai' } },
  { id: 'code-cracker', title: 'Code Cracker', description: 'Ask about programming', icon: '💻', category: 'technology', unlocked: false, bonusCredits: 2, rarity: 'rare', requirements: { type: 'special', special: 'programming' } },
  { id: 'robot-researcher', title: 'Robot Researcher', description: 'Ask about robotics', icon: '🤖', category: 'technology', unlocked: false, bonusCredits: 2, rarity: 'rare', requirements: { type: 'special', special: 'robotics' } },
  { id: 'internet-investigator', title: 'Internet Investigator', description: 'Ask about internet technology', icon: '🌐', category: 'technology', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'special', special: 'internet' } },
  { id: 'space-tech-specialist', title: 'Space Tech Specialist', description: 'Ask about space technology', icon: '🛰️', category: 'technology', unlocked: false, bonusCredits: 3, rarity: 'epic', requirements: { type: 'special', special: 'space-tech' } },

  // Mathematics (10 achievements)
  { id: 'math-beginner', title: 'Mathematics Beginner', description: 'Ask 5 mathematics questions', icon: '🔢', category: 'mathematics', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'questions_in_category', count: 5, category: 'mathematics' } },
  { id: 'math-explorer', title: 'Mathematics Explorer', description: 'Ask 10 mathematics questions', icon: '📊', category: 'mathematics', unlocked: false, bonusCredits: 2, rarity: 'common', requirements: { type: 'questions_in_category', count: 10, category: 'mathematics' } },
  { id: 'math-master', title: 'Mathematics Master', description: 'Ask 25 mathematics questions', icon: '📐', category: 'mathematics', unlocked: false, bonusCredits: 3, rarity: 'rare', requirements: { type: 'questions_in_category', count: 25, category: 'mathematics' } },
  { id: 'math-expert', title: 'Mathematics Expert', description: 'Ask 50 mathematics questions', icon: '🧮', category: 'mathematics', unlocked: false, bonusCredits: 5, rarity: 'epic', requirements: { type: 'questions_in_category', count: 50, category: 'mathematics' } },
  { id: 'math-genius', title: 'Mathematics Genius', description: 'Ask 100 mathematics questions', icon: '∞', category: 'mathematics', unlocked: false, bonusCredits: 10, rarity: 'legendary', requirements: { type: 'questions_in_category', count: 100, category: 'mathematics' } },
  { id: 'number-ninja', title: 'Number Ninja', description: 'Ask about numbers and arithmetic', icon: '🔢', category: 'mathematics', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'special', special: 'numbers' } },
  { id: 'geometry-guru', title: 'Geometry Guru', description: 'Ask about shapes and geometry', icon: '📐', category: 'mathematics', unlocked: false, bonusCredits: 2, rarity: 'rare', requirements: { type: 'special', special: 'geometry' } },
  { id: 'algebra-ace', title: 'Algebra Ace', description: 'Ask about algebra', icon: '🔤', category: 'mathematics', unlocked: false, bonusCredits: 2, rarity: 'rare', requirements: { type: 'special', special: 'algebra' } },
  { id: 'calculus-champion', title: 'Calculus Champion', description: 'Ask about calculus', icon: '📈', category: 'mathematics', unlocked: false, bonusCredits: 3, rarity: 'epic', requirements: { type: 'special', special: 'calculus' } },
  { id: 'statistics-specialist', title: 'Statistics Specialist', description: 'Ask about statistics', icon: '📊', category: 'mathematics', unlocked: false, bonusCredits: 2, rarity: 'rare', requirements: { type: 'special', special: 'statistics' } },

  // General Science (10 achievements)
  { id: 'science-beginner', title: 'Science Beginner', description: 'Ask 5 general science questions', icon: '🔬', category: 'general', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'questions_in_category', count: 5, category: 'general' } },
  { id: 'science-explorer', title: 'Science Explorer', description: 'Ask 10 general science questions', icon: '🧪', category: 'general', unlocked: false, bonusCredits: 2, rarity: 'common', requirements: { type: 'questions_in_category', count: 10, category: 'general' } },
  { id: 'science-master', title: 'Science Master', description: 'Ask 25 general science questions', icon: '🔬', category: 'general', unlocked: false, bonusCredits: 3, rarity: 'rare', requirements: { type: 'questions_in_category', count: 25, category: 'general' } },
  { id: 'science-expert', title: 'Science Expert', description: 'Ask 50 general science questions', icon: '👨‍🔬', category: 'general', unlocked: false, bonusCredits: 5, rarity: 'epic', requirements: { type: 'questions_in_category', count: 50, category: 'general' } },
  { id: 'science-genius', title: 'Science Genius', description: 'Ask 100 general science questions', icon: '🏆', category: 'general', unlocked: false, bonusCredits: 10, rarity: 'legendary', requirements: { type: 'questions_in_category', count: 100, category: 'general' } },
  { id: 'hypothesis-hero', title: 'Hypothesis Hero', description: 'Ask about scientific method', icon: '💡', category: 'general', unlocked: false, bonusCredits: 2, rarity: 'rare', requirements: { type: 'special', special: 'scientific-method' } },
  { id: 'experiment-expert', title: 'Experiment Expert', description: 'Ask about experiments', icon: '🧪', category: 'general', unlocked: false, bonusCredits: 2, rarity: 'rare', requirements: { type: 'special', special: 'experiments' } },
  { id: 'theory-thinker', title: 'Theory Thinker', description: 'Ask about scientific theories', icon: '🤔', category: 'general', unlocked: false, bonusCredits: 2, rarity: 'rare', requirements: { type: 'special', special: 'theories' } },
  { id: 'discovery-detective', title: 'Discovery Detective', description: 'Ask about scientific discoveries', icon: '🔍', category: 'general', unlocked: false, bonusCredits: 2, rarity: 'rare', requirements: { type: 'special', special: 'discoveries' } },
  { id: 'innovation-investigator', title: 'Innovation Investigator', description: 'Ask about scientific innovations', icon: '💡', category: 'general', unlocked: false, bonusCredits: 3, rarity: 'epic', requirements: { type: 'special', special: 'innovations' } },

  // Milestones (20 achievements)
  { id: 'first-question', title: 'First Question', description: 'Ask your very first question', icon: '🌟', category: 'milestones', unlocked: false, bonusCredits: 2, rarity: 'common', requirements: { type: 'total_questions', count: 1 } },
  { id: 'curious-mind', title: 'Curious Mind', description: 'Ask 10 questions total', icon: '🤔', category: 'milestones', unlocked: false, bonusCredits: 2, rarity: 'common', requirements: { type: 'total_questions', count: 10 } },
  { id: 'knowledge-seeker', title: 'Knowledge Seeker', description: 'Ask 25 questions total', icon: '🔍', category: 'milestones', unlocked: false, bonusCredits: 3, rarity: 'rare', requirements: { type: 'total_questions', count: 25 } },
  { id: 'science-enthusiast', title: 'Science Enthusiast', description: 'Ask 50 questions total', icon: '💪', category: 'milestones', unlocked: false, bonusCredits: 5, rarity: 'rare', requirements: { type: 'total_questions', count: 50 } },
  { id: 'dedicated-learner', title: 'Dedicated Learner', description: 'Ask 100 questions total', icon: '📚', category: 'milestones', unlocked: false, bonusCredits: 8, rarity: 'epic', requirements: { type: 'total_questions', count: 100 } },
  { id: 'master-questioner', title: 'Master Questioner', description: 'Ask 250 questions total', icon: '🎓', category: 'milestones', unlocked: false, bonusCredits: 15, rarity: 'epic', requirements: { type: 'total_questions', count: 250 } },
  { id: 'science-legend', title: 'Science Legend', description: 'Ask 500 questions total', icon: '👑', category: 'milestones', unlocked: false, bonusCredits: 25, rarity: 'legendary', requirements: { type: 'total_questions', count: 500 } },
  
  { id: 'photo-pioneer', title: 'Photo Pioneer', description: 'Upload your first photo', icon: '📷', category: 'milestones', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'photos_uploaded', count: 1 } },
  { id: 'visual-learner', title: 'Visual Learner', description: 'Upload 10 photos', icon: '📸', category: 'milestones', unlocked: false, bonusCredits: 3, rarity: 'rare', requirements: { type: 'photos_uploaded', count: 10 } },
  { id: 'photo-collector', title: 'Photo Collector', description: 'Upload 50 photos', icon: '🖼️', category: 'milestones', unlocked: false, bonusCredits: 8, rarity: 'epic', requirements: { type: 'photos_uploaded', count: 50 } },
  
  { id: 'daily-scholar', title: 'Daily Scholar', description: 'Maintain a 3-day streak', icon: '📅', category: 'milestones', unlocked: false, bonusCredits: 2, rarity: 'common', requirements: { type: 'streak_days', count: 3 } },
  { id: 'weekly-warrior', title: 'Weekly Warrior', description: 'Maintain a 7-day streak', icon: '🗓️', category: 'milestones', unlocked: false, bonusCredits: 5, rarity: 'rare', requirements: { type: 'streak_days', count: 7 } },
  { id: 'monthly-master', title: 'Monthly Master', description: 'Maintain a 30-day streak', icon: '📆', category: 'milestones', unlocked: false, bonusCredits: 15, rarity: 'epic', requirements: { type: 'streak_days', count: 30 } },
  { id: 'streak-legend', title: 'Streak Legend', description: 'Maintain a 100-day streak', icon: '🔥', category: 'milestones', unlocked: false, bonusCredits: 50, rarity: 'legendary', requirements: { type: 'streak_days', count: 100 } },
  
  { id: 'early-bird', title: 'Early Bird', description: 'Ask a question before 6 AM', icon: '🌅', category: 'milestones', unlocked: false, bonusCredits: 2, rarity: 'common', requirements: { type: 'special', special: 'early-question' } },
  { id: 'night-owl', title: 'Night Owl', description: 'Ask a question after 10 PM', icon: '🦉', category: 'milestones', unlocked: false, bonusCredits: 2, rarity: 'common', requirements: { type: 'special', special: 'night-question' } },
  { id: 'weekend-warrior', title: 'Weekend Warrior', description: 'Ask questions on weekends', icon: '🎉', category: 'milestones', unlocked: false, bonusCredits: 3, rarity: 'rare', requirements: { type: 'special', special: 'weekend-questions' } },
  { id: 'multi-disciplinary', title: 'Multi-Disciplinary', description: 'Ask questions in 5 different categories', icon: '🎯', category: 'milestones', unlocked: false, bonusCredits: 5, rarity: 'rare', requirements: { type: 'special', special: 'multi-category' } },
  { id: 'renaissance-scholar', title: 'Renaissance Scholar', description: 'Ask questions in all categories', icon: '👨‍🎓', category: 'milestones', unlocked: false, bonusCredits: 10, rarity: 'epic', requirements: { type: 'special', special: 'all-categories' } },
  { id: 'science-completionist', title: 'Science Completionist', description: 'Unlock 50 achievements', icon: '🏆', category: 'milestones', unlocked: false, bonusCredits: 20, rarity: 'legendary', requirements: { type: 'special', special: 'achievement-master' } },
];
```

## src/hooks/use-mobile.tsx

**Explanation:** Custom React hook.

```ts
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

```

## src/hooks/use-toast.ts

**Explanation:** Custom React hook.

```ts
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }

```

## src/hooks/useAchievements.ts

**Explanation:** Custom React hook.

```ts
import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { achievements as allAchievements, Achievement } from '@/data/achievements';
import { useCredits } from './useCredits';

interface AchievementStats {
  totalQuestions: number;
  photosUploaded: number;
  streakDays: number;
  lastActiveDate: string;
  categoryQuestions: Record<string, number>;
  specialFlags: Record<string, boolean>;
  timeSpent: number;
}

export function useAchievements() {
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>('science-lens-achievements', allAchievements);
  const [stats, setStats] = useLocalStorage<AchievementStats>('science-lens-stats', {
    totalQuestions: 0,
    photosUploaded: 0,
    streakDays: 0,
    lastActiveDate: '',
    categoryQuestions: {},
    specialFlags: {},
    timeSpent: 0
  });
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const { addBonusCredits } = useCredits();

  const checkAchievements = useCallback((newStats: Partial<AchievementStats>) => {
    const updatedStats = { ...stats, ...newStats };
    const unlockedAchievements: Achievement[] = [];

    const updatedAchievements = achievements.map(achievement => {
      if (achievement.unlocked) return achievement;

      let shouldUnlock = false;

      switch (achievement.requirements.type) {
        case 'total_questions':
          shouldUnlock = updatedStats.totalQuestions >= (achievement.requirements.count || 0);
          break;
        case 'questions_in_category':
          if (achievement.requirements.category) {
            const categoryCount = updatedStats.categoryQuestions[achievement.requirements.category] || 0;
            shouldUnlock = categoryCount >= (achievement.requirements.count || 0);
          }
          break;
        case 'photos_uploaded':
          shouldUnlock = updatedStats.photosUploaded >= (achievement.requirements.count || 0);
          break;
        case 'streak_days':
          shouldUnlock = updatedStats.streakDays >= (achievement.requirements.count || 0);
          break;
        case 'special':
          if (achievement.requirements.special) {
            shouldUnlock = updatedStats.specialFlags[achievement.requirements.special] || false;
          }
          break;
      }

      if (shouldUnlock) {
        const unlockedAchievement = {
          ...achievement,
          unlocked: true,
          unlockedAt: Date.now()
        };
        unlockedAchievements.push(unlockedAchievement);
        
        // Add bonus credits if achievement has them
        if (achievement.bonusCredits) {
          addBonusCredits(achievement.bonusCredits);
        }
        
        return unlockedAchievement;
      }

      return achievement;
    });

    if (unlockedAchievements.length > 0) {
      setAchievements(updatedAchievements);
      setStats(updatedStats);
      
      // Show the first new achievement
      setNewAchievement(unlockedAchievements[0]);
      
      return unlockedAchievements;
    }

    setStats(updatedStats);
    return [];
  }, [achievements, stats, setAchievements, setStats, addBonusCredits]);

  const recordQuestion = useCallback((category: string, content: string, hasPhoto: boolean) => {
    const today = new Date().toISOString().split('T')[0];
    const currentHour = new Date().getHours();
    
    // Update streak
    let newStreakDays = stats.streakDays;
    if (stats.lastActiveDate !== today) {
      const lastDate = new Date(stats.lastActiveDate);
      const todayDate = new Date(today);
      const daysDiff = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 1) {
        newStreakDays = stats.streakDays + 1;
      } else if (daysDiff > 1) {
        newStreakDays = 1;
      }
    }

    // Update category questions
    const categoryQuestions = { ...stats.categoryQuestions };
    categoryQuestions[category] = (categoryQuestions[category] || 0) + 1;

    // Check for special flags
    const specialFlags = { ...stats.specialFlags };
    
    // Time-based achievements
    if (currentHour >= 0 && currentHour < 6) {
      specialFlags['early-question'] = true;
    }
    if (currentHour >= 22 || currentHour < 2) {
      specialFlags['night-question'] = true;
    }

    // Weekend achievement
    const dayOfWeek = new Date().getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) { // Sunday or Saturday
      if (dayOfWeek === 0) specialFlags['sunday-question'] = true;
      if (dayOfWeek === 6) specialFlags['saturday-question'] = true;
      if (specialFlags['sunday-question'] && specialFlags['saturday-question']) {
        specialFlags['weekend-questions'] = true;
      }
    }

    // Multi-category achievement
    const uniqueCategories = Object.keys(categoryQuestions).filter(cat => categoryQuestions[cat] > 0);
    if (uniqueCategories.length >= 5) {
      specialFlags['multi-category'] = true;
    }
    if (uniqueCategories.length >= 8) {
      specialFlags['all-categories'] = true;
    }

    // Achievement completionist
    const unlockedCount = achievements.filter(a => a.unlocked).length;
    if (unlockedCount >= 50) {
      specialFlags['achievement-master'] = true;
    }

    // Content-based special flags (simplified - in real app would use NLP)
    const lowerContent = content.toLowerCase();
    
    // Biology flags
    if (lowerContent.includes('plant') || lowerContent.includes('flower') || lowerContent.includes('tree')) {
      specialFlags['plants'] = true;
    }
    if (lowerContent.includes('animal') || lowerContent.includes('mammal') || lowerContent.includes('bird')) {
      specialFlags['animals'] = true;
    }
    if (lowerContent.includes('cell') || lowerContent.includes('cellular') || lowerContent.includes('mitosis')) {
      specialFlags['cells'] = true;
    }
    if (lowerContent.includes('dna') || lowerContent.includes('gene') || lowerContent.includes('genetic')) {
      specialFlags['genetics'] = true;
    }
    if (lowerContent.includes('evolution') || lowerContent.includes('darwin') || lowerContent.includes('natural selection')) {
      specialFlags['evolution'] = true;
    }

    // Chemistry flags
    if (lowerContent.includes('element') || lowerContent.includes('periodic') || lowerContent.includes('atom')) {
      specialFlags['elements'] = true;
    }
    if (lowerContent.includes('reaction') || lowerContent.includes('chemical reaction') || lowerContent.includes('catalyst')) {
      specialFlags['reactions'] = true;
    }
    if (lowerContent.includes('molecule') || lowerContent.includes('compound') || lowerContent.includes('bond')) {
      specialFlags['molecules'] = true;
    }
    if (lowerContent.includes('acid') || lowerContent.includes('base') || lowerContent.includes('ph')) {
      specialFlags['acid-base'] = true;
    }
    if (lowerContent.includes('organic') || lowerContent.includes('carbon') || lowerContent.includes('hydrocarbon')) {
      specialFlags['organic'] = true;
    }

    // Physics flags
    if (lowerContent.includes('motion') || lowerContent.includes('force') || lowerContent.includes('velocity')) {
      specialFlags['motion'] = true;
    }
    if (lowerContent.includes('energy') || lowerContent.includes('kinetic') || lowerContent.includes('potential')) {
      specialFlags['energy'] = true;
    }
    if (lowerContent.includes('quantum') || lowerContent.includes('particle') || lowerContent.includes('photon')) {
      specialFlags['quantum'] = true;
    }
    if (lowerContent.includes('wave') || lowerContent.includes('sound') || lowerContent.includes('frequency')) {
      specialFlags['waves'] = true;
    }
    if (lowerContent.includes('light') || lowerContent.includes('optics') || lowerContent.includes('laser')) {
      specialFlags['light'] = true;
    }

    // Astronomy flags
    if (lowerContent.includes('star') || lowerContent.includes('sun') || lowerContent.includes('stellar')) {
      specialFlags['stars'] = true;
    }
    if (lowerContent.includes('planet') || lowerContent.includes('mars') || lowerContent.includes('jupiter')) {
      specialFlags['planets'] = true;
    }
    if (lowerContent.includes('galaxy') || lowerContent.includes('milky way') || lowerContent.includes('nebula')) {
      specialFlags['galaxies'] = true;
    }
    if (lowerContent.includes('space') || lowerContent.includes('astronaut') || lowerContent.includes('rocket')) {
      specialFlags['space-exploration'] = true;
    }
    if (lowerContent.includes('black hole') || lowerContent.includes('singularity') || lowerContent.includes('event horizon')) {
      specialFlags['black-holes'] = true;
    }

    // Earth Science flags
    if (lowerContent.includes('rock') || lowerContent.includes('mineral') || lowerContent.includes('geology')) {
      specialFlags['rocks'] = true;
    }
    if (lowerContent.includes('weather') || lowerContent.includes('climate') || lowerContent.includes('temperature')) {
      specialFlags['weather'] = true;
    }
    if (lowerContent.includes('ocean') || lowerContent.includes('sea') || lowerContent.includes('marine')) {
      specialFlags['oceans'] = true;
    }
    if (lowerContent.includes('earthquake') || lowerContent.includes('seismic') || lowerContent.includes('fault')) {
      specialFlags['earthquakes'] = true;
    }
    if (lowerContent.includes('climate change') || lowerContent.includes('global warming') || lowerContent.includes('greenhouse')) {
      specialFlags['climate'] = true;
    }
    
    const newStats = {
      totalQuestions: stats.totalQuestions + 1,
      photosUploaded: hasPhoto ? stats.photosUploaded + 1 : stats.photosUploaded,
      streakDays: newStreakDays,
      lastActiveDate: today,
      categoryQuestions,
      specialFlags,
      timeSpent: stats.timeSpent + 1 // Simplified time tracking
    };

    return checkAchievements(newStats);
  }, [stats, checkAchievements]);

  const dismissNewAchievement = useCallback(() => {
    setNewAchievement(null);
  }, []);

  const getUnlockedCount = useCallback(() => {
    return achievements.filter(a => a.unlocked).length;
  }, [achievements]);

  const getTotalBonusCredits = useCallback(() => {
    return achievements
      .filter(a => a.unlocked && a.bonusCredits)
      .reduce((total, a) => total + (a.bonusCredits || 0), 0);
  }, [achievements]);

  const getAchievementsByCategory = useCallback(() => {
    const grouped: Record<string, Achievement[]> = {};
    achievements.forEach(achievement => {
      if (!grouped[achievement.category]) {
        grouped[achievement.category] = [];
      }
      grouped[achievement.category].push(achievement);
    });
    return grouped;
  }, [achievements]);

  return {
    achievements,
    stats,
    newAchievement,
    recordQuestion,
    dismissNewAchievement,
    getUnlockedCount,
    getTotalBonusCredits,
    getAchievementsByCategory
  };
}
```

## src/hooks/useCredits.ts

**Explanation:** Custom React hook.

```ts
import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface CreditsData {
  credits: number;
  lastReset: string; // ISO date string
  bonusCredits: number;
  totalEarned: number;
}

const DAILY_CREDITS = 5;
const CREDITS_STORAGE_KEY = 'science-lens-credits';

export function useCredits() {
  const [creditsData, setCreditsData] = useLocalStorage<CreditsData>(CREDITS_STORAGE_KEY, {
    credits: DAILY_CREDITS,
    lastReset: new Date().toISOString().split('T')[0],
    bonusCredits: 0,
    totalEarned: DAILY_CREDITS
  });

  const [isLoading, setIsLoading] = useState(false);

  // Check if credits should be reset (new day)
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (creditsData.lastReset !== today) {
      setCreditsData(prev => ({
        ...prev,
        credits: DAILY_CREDITS,
        lastReset: today,
        totalEarned: prev.totalEarned + DAILY_CREDITS
      }));
    }
  }, [creditsData.lastReset, setCreditsData]);

  const useCredit = (): boolean => {
    if (creditsData.credits > 0) {
      setCreditsData(prev => ({
        ...prev,
        credits: prev.credits - 1
      }));
      return true;
    }
    return false;
  };

  const addBonusCredits = (amount: number) => {
    setCreditsData(prev => ({
      ...prev,
      bonusCredits: prev.bonusCredits + amount,
      credits: prev.credits + amount,
      totalEarned: prev.totalEarned + amount
    }));
  };

  const getTimeUntilReset = (): string => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const msUntilReset = tomorrow.getTime() - now.getTime();
    const hoursUntilReset = Math.floor(msUntilReset / (1000 * 60 * 60));
    const minutesUntilReset = Math.floor((msUntilReset % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hoursUntilReset > 0) {
      return `${hoursUntilReset}h ${minutesUntilReset}m`;
    }
    return `${minutesUntilReset}m`;
  };

  const hasCredits = creditsData.credits > 0;

  return {
    credits: creditsData.credits,
    bonusCredits: creditsData.bonusCredits,
    totalEarned: creditsData.totalEarned,
    hasCredits,
    useCredit,
    addBonusCredits,
    getTimeUntilReset,
    isLoading
  };
}
```

## src/hooks/useLocalStorage.ts

**Explanation:** Custom React hook.

```ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}
```

## src/hooks/useSubscription.ts

**Explanation:** Custom React hook.

```ts
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SubscriptionData {
  subscribed: boolean;
  tier: 'free' | 'plus' | 'pro';
  product_id: string | null;
  subscription_end: string | null;
  loading: boolean;
}

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<SubscriptionData>({
    subscribed: false,
    tier: 'free',
    product_id: null,
    subscription_end: null,
    loading: true,
  });
  const { toast } = useToast();

  const checkSubscription = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setSubscription(prev => ({ ...prev, loading: false }));
        return;
      }

      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      setSubscription({
        subscribed: data.subscribed,
        tier: data.tier,
        product_id: data.product_id,
        subscription_end: data.subscription_end,
        loading: false,
      });
    } catch (error) {
      console.error('Error checking subscription:', error);
      setSubscription(prev => ({ ...prev, loading: false }));
    }
  };

  const createCheckout = async (priceId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to subscribe.",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Checkout Error",
        description: "Failed to create checkout session. Please try again.",
        variant: "destructive",
      });
    }
  };

  const openCustomerPortal = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to manage your subscription.",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: "Portal Error",
        description: "Failed to open customer portal. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    checkSubscription();

    // Listen for auth changes
    const {
      data: { subscription: authSubscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        checkSubscription();
      } else if (event === 'SIGNED_OUT') {
        setSubscription({
          subscribed: false,
          tier: 'free',
          product_id: null,
          subscription_end: null,
          loading: false,
        });
      }
    });

    // Auto-refresh every minute
    const interval = setInterval(checkSubscription, 60000);

    return () => {
      authSubscription.unsubscribe();
      clearInterval(interval);
    };
  }, []);

  return {
    ...subscription,
    checkSubscription,
    createCheckout,
    openCustomerPortal,
  };
};
```

## src/hooks/useSupabaseAchievements.ts

**Explanation:** Custom React hook.

```ts
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Achievement } from '@/types';
import { achievements as achievementsData } from '@/data/achievements';

export const useSupabaseAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAchievements = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setAchievements(achievementsData);
        setLoading(false);
        return;
      }

      const { data: unlockedAchievements, error } = await supabase
        .from('achievements')
        .select('achievement_key, unlocked_at')
        .eq('user_id', session.user.id);

      if (error) throw error;

      // Merge with static achievement data
      const mergedAchievements = achievementsData.map(achievement => {
        const unlocked = unlockedAchievements.find(
          ua => ua.achievement_key === achievement.id
        );
        
        return {
          ...achievement,
          unlocked: !!unlocked,
          unlockedAt: unlocked ? new Date(unlocked.unlocked_at).getTime() : undefined,
        };
      });

      setAchievements(mergedAchievements);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching achievements:', error);
      setAchievements(achievementsData);
      setLoading(false);
    }
  };

  const unlockAchievement = async (achievementId: string): Promise<boolean> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return false;

      // Check if already unlocked
      const existing = achievements.find(a => a.id === achievementId);
      if (existing?.unlocked) return false;

      const { error } = await supabase
        .from('achievements')
        .insert({
          user_id: session.user.id,
          achievement_key: achievementId as any,
        });

      if (error) {
        // If it's a duplicate error, that's fine
        if (error.code === '23505') return false;
        throw error;
      }

      // Update local state
      setAchievements(prev => prev.map(achievement => 
        achievement.id === achievementId
          ? { ...achievement, unlocked: true, unlockedAt: Date.now() }
          : achievement
      ));

      // Show celebration
      const achievement = achievements.find(a => a.id === achievementId);
      if (achievement) {
        toast({
          title: "Achievement Unlocked! 🎉",
          description: `${achievement.icon} ${achievement.title}`,
        });
      }

      return true;
    } catch (error) {
      console.error('Error unlocking achievement:', error);
      return false;
    }
  };

  const checkAndUnlockAchievements = async (stats: {
    totalQuestions?: number;
    photosUploaded?: number;
    streakDays?: number;
    categoryQuestions?: Record<string, number>;
    tier?: string;
  }) => {
    const newlyUnlocked: string[] = [];

    // First steps achievement
    if (stats.totalQuestions === 1) {
      const unlocked = await unlockAchievement('first_steps');
      if (unlocked) newlyUnlocked.push('first_steps');
    }

    // Question milestone achievements
    if (stats.totalQuestions === 10) {
      const unlocked = await unlockAchievement('curious_learner');
      if (unlocked) newlyUnlocked.push('curious_learner');
    }

    if (stats.totalQuestions === 100) {
      const unlocked = await unlockAchievement('knowledge_seeker');
      if (unlocked) newlyUnlocked.push('knowledge_seeker');
    }

    // Upgrade achievements
    if (stats.tier === 'plus') {
      const unlocked = await unlockAchievement('upgrade_unlocked');
      if (unlocked) newlyUnlocked.push('upgrade_unlocked');
    }

    if (stats.tier === 'pro') {
      const unlocked = await unlockAchievement('pro_explorer');
      if (unlocked) newlyUnlocked.push('pro_explorer');
    }

    // Photo upload achievement
    if (stats.photosUploaded && stats.photosUploaded >= 5) {
      const unlocked = await unlockAchievement('pdf_master');
      if (unlocked) newlyUnlocked.push('pdf_master');
    }

    // Category-specific achievements
    if (stats.categoryQuestions) {
      Object.entries(stats.categoryQuestions).forEach(async ([category, count]) => {
        if (count >= 10 && category === 'physics') {
          const unlocked = await unlockAchievement('science_explorer');
          if (unlocked) newlyUnlocked.push('science_explorer');
        }
      });
    }

    return newlyUnlocked;
  };

  useEffect(() => {
    fetchAchievements();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        fetchAchievements();
      } else if (event === 'SIGNED_OUT') {
        setAchievements(achievementsData);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const getUnlockedCount = () => achievements.filter(a => a.unlocked).length;
  const getTotalBonusCredits = () => 
    achievements
      .filter(a => a.unlocked)
      .reduce((total, a) => total + (a.bonusCredits || 0), 0);

  return {
    achievements,
    loading,
    unlockAchievement,
    checkAndUnlockAchievements,
    getUnlockedCount,
    getTotalBonusCredits,
    refreshAchievements: fetchAchievements,
  };
};
```

## src/hooks/useUsageTracking.ts

**Explanation:** Custom React hook.

```ts
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UsageData {
  requestsToday: number;
  maxRequests: number;
  canMakeRequest: boolean;
  loading: boolean;
}

const TIER_LIMITS = {
  free: 5,
  plus: 999999,
  pro: 999999,
};

export const useUsageTracking = (tier: 'free' | 'plus' | 'pro') => {
  const [usage, setUsage] = useState<UsageData>({
    requestsToday: 0,
    maxRequests: TIER_LIMITS[tier],
    canMakeRequest: true,
    loading: true,
  });
  const { toast } = useToast();

  const fetchUsage = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setUsage(prev => ({ 
          ...prev, 
          requestsToday: 0, 
          canMakeRequest: tier !== 'free',
          loading: false 
        }));
        return;
      }

      const today = new Date().toISOString().split('T')[0];
      
      const { data: usageData, error } = await supabase
        .from('usage')
        .select('requests_today')
        .eq('user_id', session.user.id)
        .eq('date', today)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      const requestsToday = usageData?.requests_today || 0;
      const maxRequests = TIER_LIMITS[tier];
      const canMakeRequest = requestsToday < maxRequests;

      setUsage({
        requestsToday,
        maxRequests,
        canMakeRequest,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching usage:', error);
      setUsage(prev => ({ ...prev, loading: false }));
    }
  };

  const incrementUsage = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return false;

      if (!usage.canMakeRequest) {
        toast({
          title: "Daily Limit Reached",
          description: "You've reached your daily question limit. Upgrade for unlimited questions!",
          variant: "destructive",
        });
        return false;
      }

      const today = new Date().toISOString().split('T')[0];

      const { error } = await supabase
        .from('usage')
        .upsert({
          user_id: session.user.id,
          date: today,
          requests_today: usage.requestsToday + 1,
        }, {
          onConflict: 'user_id,date',
        });

      if (error) throw error;

      // Update local state
      setUsage(prev => ({
        ...prev,
        requestsToday: prev.requestsToday + 1,
        canMakeRequest: prev.requestsToday + 1 < prev.maxRequests,
      }));

      return true;
    } catch (error) {
      console.error('Error incrementing usage:', error);
      toast({
        title: "Usage Error",
        description: "Failed to track usage. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchUsage();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        fetchUsage();
      } else if (event === 'SIGNED_OUT') {
        setUsage({
          requestsToday: 0,
          maxRequests: TIER_LIMITS.free,
          canMakeRequest: true,
          loading: false,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [tier]);

  return {
    ...usage,
    incrementUsage,
    refreshUsage: fetchUsage,
  };
};
```

## src/index.css

**Explanation:** Repository file.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ScienceLens Design System - Bright, science-themed colors and effects
All colors MUST be HSL.
*/

@layer base {
  :root {
    /* Core background and text */
    --background: 220 30% 98%;
    --foreground: 225 25% 15%;

    /* Card components */
    --card: 220 40% 99%;
    --card-foreground: 225 25% 15%;

    /* Popover components */
    --popover: 220 40% 99%;
    --popover-foreground: 225 25% 15%;

    /* Primary - Science Blue */
    --primary: 217 91% 60%;
    --primary-foreground: 220 40% 99%;
    --primary-glow: 217 91% 70%;

    /* Secondary - Cosmic Purple */
    --secondary: 260 60% 65%;
    --secondary-foreground: 220 40% 99%;

    /* Muted tones */
    --muted: 220 25% 94%;
    --muted-foreground: 225 15% 55%;

    /* Accent - Science Green */
    --accent: 142 76% 55%;
    --accent-foreground: 225 25% 15%;

    /* Destructive */
    --destructive: 0 84% 60%;
    --destructive-foreground: 220 40% 99%;

    /* Borders and inputs */
    --border: 220 20% 88%;
    --input: 220 25% 92%;
    --ring: 217 91% 60%;

    /* Science-themed gradients */
    --gradient-cosmic: linear-gradient(135deg, hsl(217 91% 60%), hsl(260 60% 65%));
    --gradient-science: linear-gradient(135deg, hsl(142 76% 55%), hsl(217 91% 60%));
    --gradient-subtle: linear-gradient(180deg, hsl(220 40% 99%), hsl(220 30% 96%));

    /* Science-themed shadows */
    --shadow-science: 0 10px 40px -10px hsl(217 91% 60% / 0.3);
    --shadow-glow: 0 0 40px hsl(217 91% 70% / 0.4);

    /* Animations */
    --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --bounce-gentle: cubic-bezier(0.68, -0.55, 0.265, 1.55);

    --radius: 0.5rem;

    --sidebar-background: 0 0% 98%;

    --sidebar-foreground: 240 5.3% 26.1%;

    --sidebar-primary: 240 5.9% 10%;

    --sidebar-primary-foreground: 0 0% 98%;

    --sidebar-accent: 240 4.8% 95.9%;

    --sidebar-accent-foreground: 240 5.9% 10%;

    --sidebar-border: 220 13% 91%;

    --sidebar-ring: 217.2 91.2% 59.8%;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;

    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;

    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;

    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;

    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;

    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 224.3 76.3% 48%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }
}
```

## src/integrations/supabase/client.ts

**Explanation:** Source code file.

```ts
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://oyalgnheaxmlhnkkcduy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95YWxnbmhlYXhtbGhua2tjZHV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwNDAwMjQsImV4cCI6MjA3MzYxNjAyNH0.G6dUjoSbi6MMVy1mKdnvmIIheITZiiN0qLV66qdRg-g";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
```

## src/integrations/supabase/types.ts

**Explanation:** Source code file.

```ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          achievement_key: Database["public"]["Enums"]["achievement_key"]
          id: string
          unlocked_at: string
          user_id: string
        }
        Insert: {
          achievement_key: Database["public"]["Enums"]["achievement_key"]
          id?: string
          unlocked_at?: string
          user_id: string
        }
        Update: {
          achievement_key?: Database["public"]["Enums"]["achievement_key"]
          id?: string
          unlocked_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_logs: {
        Row: {
          created_at: string | null
          id: number
          prompt: string
          response: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          prompt: string
          response: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          prompt?: string
          response?: string
          user_id?: string | null
        }
        Relationships: []
      }
      articles: {
        Row: {
          content: string
          created_at: string | null
          id: number
          title: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: number
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      chat_history: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          message_role: string
          tokens_used: number | null
          user_id: string
        }
        Insert: {
          content: string
          conversation_id?: string
          created_at?: string
          id?: string
          message_role: string
          tokens_used?: number | null
          user_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          message_role?: string
          tokens_used?: number | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_expires_at: string | null
          subscription_status: string | null
          tier: Database["public"]["Enums"]["subscription_tier"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_expires_at?: string | null
          subscription_status?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_expires_at?: string | null
          subscription_status?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      usage: {
        Row: {
          created_at: string
          date: string
          id: string
          requests_today: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string
          id?: string
          requests_today?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          requests_today?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_activity: {
        Row: {
          activity_data: Json | null
          activity_type: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          activity_data?: Json | null
          activity_type: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          activity_data?: Json | null
          activity_type?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      achievement_key:
        | "first_steps"
        | "curious_learner"
        | "knowledge_seeker"
        | "marathon_session"
        | "science_explorer"
        | "night_owl"
        | "upgrade_unlocked"
        | "pro_explorer"
        | "pdf_master"
        | "time_traveler"
        | "lightning_brain"
        | "perfectionist"
        | "collector"
        | "mystery_badge"
      subscription_tier: "free" | "plus" | "pro"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      achievement_key: [
        "first_steps",
        "curious_learner",
        "knowledge_seeker",
        "marathon_session",
        "science_explorer",
        "night_owl",
        "upgrade_unlocked",
        "pro_explorer",
        "pdf_master",
        "time_traveler",
        "lightning_brain",
        "perfectionist",
        "collector",
        "mystery_badge",
      ],
      subscription_tier: ["free", "plus", "pro"],
    },
  },
} as const

```

## src/lib/supabase.ts

**Explanation:** Library helper utilities.

```ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a conditional Supabase client - null if env vars are missing
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Helper function to check if Supabase is available
export const isSupabaseAvailable = () => supabase !== null
```

## src/lib/utils.ts

**Explanation:** Library helper utilities.

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

## src/main.tsx

**Explanation:** Source code file.

```ts
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

```

## src/pages/ApiTest.tsx

**Explanation:** React page component used by the router.

```ts
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle, XCircle, TestTube } from 'lucide-react';

export default function ApiTest() {
  const [isTestingOpenAI, setIsTestingOpenAI] = useState(false);
  const [isTestingAsk, setIsTestingAsk] = useState(false);
  const [isTestingData, setIsTestingData] = useState(false);
  const [openAIResult, setOpenAIResult] = useState<any>(null);
  const [askResult, setAskResult] = useState<any>(null);
  const [dataResult, setDataResult] = useState<any>(null);
  const [testQuestion, setTestQuestion] = useState('Explain gravity in 5 words');
  const [articleTitle, setArticleTitle] = useState('Test Article');
  const [articleContent, setArticleContent] = useState('This is a test article content.');
  
  const { toast } = useToast();

  const testOpenAIEndpoint = async () => {
    setIsTestingOpenAI(true);
    setOpenAIResult(null);
    
    try {
      console.log('Testing OpenAI endpoint...');
      const { data, error } = await supabase.functions.invoke('test-openai');
      
      if (error) {
        console.error('OpenAI test error:', error);
        setOpenAIResult({ error: error.message, success: false });
        toast({
          title: "Test Failed",
          description: "OpenAI test endpoint failed",
          variant: "destructive",
        });
      } else {
        console.log('OpenAI test success:', data);
        setOpenAIResult({ ...data, success: true });
        toast({
          title: "Test Passed",
          description: "OpenAI connection is working!",
        });
      }
    } catch (error: any) {
      console.error('OpenAI test exception:', error);
      setOpenAIResult({ error: error.message, success: false });
      toast({
        title: "Test Error",
        description: "Failed to call OpenAI test endpoint",
        variant: "destructive",
      });
    } finally {
      setIsTestingOpenAI(false);
    }
  };

  const testAskEndpoint = async () => {
    if (!testQuestion.trim()) return;
    
    setIsTestingAsk(true);
    setAskResult(null);
    
    try {
      console.log('Testing Ask endpoint with question:', testQuestion);
      const { data, error } = await supabase.functions.invoke('ask', {
        body: { prompt: testQuestion }
      });
      
      if (error) {
        console.error('Ask test error:', error);
        setAskResult({ error: error.message, success: false });
        toast({
          title: "Test Failed",
          description: "Ask endpoint failed",
          variant: "destructive",
        });
      } else {
        console.log('Ask test success:', data);
        setAskResult({ ...data, success: true });
        toast({
          title: "Test Passed",
          description: "Ask endpoint is working and logged to database!",
        });
      }
    } catch (error: any) {
      console.error('Ask test exception:', error);
      setAskResult({ error: error.message, success: false });
      toast({
        title: "Test Error",
        description: "Failed to call Ask endpoint",
        variant: "destructive",
      });
    } finally {
      setIsTestingAsk(false);
    }
  };

  const testDataEndpoint = async () => {
    setIsTestingData(true);
    setDataResult(null);
    
    try {
      console.log('Testing Data endpoint - creating article...');
      
      // Test creating an article
      const { data: createData, error: createError } = await supabase.functions.invoke('data', {
        body: { 
          title: articleTitle,
          content: articleContent
        }
      });
      
      if (createError) {
        console.error('Data test error:', createError);
        setDataResult({ error: createError.message, success: false });
        toast({
          title: "Test Failed",
          description: "Data endpoint failed",
          variant: "destructive",
        });
        return;
      }

      // Test fetching articles
      const { data: fetchData, error: fetchError } = await supabase.functions.invoke('data');
      
      if (fetchError) {
        console.error('Data fetch error:', fetchError);
        setDataResult({ error: fetchError.message, success: false });
        return;
      }

      console.log('Data test success:', { created: createData, fetched: fetchData });
      setDataResult({ 
        created: createData, 
        fetched: fetchData,
        success: true 
      });
      
      toast({
        title: "Test Passed",
        description: "Data endpoint is working! Article created and fetched.",
      });
      
    } catch (error: any) {
      console.error('Data test exception:', error);
      setDataResult({ error: error.message, success: false });
      toast({
        title: "Test Error",
        description: "Failed to call Data endpoint",
        variant: "destructive",
      });
    } finally {
      setIsTestingData(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <TestTube className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">API Test Suite</h1>
          </div>
          <p className="text-muted-foreground">
            Test the Supabase Edge Functions for OpenAI integration
          </p>
        </div>

        {/* OpenAI Test */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Test OpenAI Connection
              {openAIResult && (
                <Badge variant={openAIResult.success ? "default" : "destructive"}>
                  {openAIResult.success ? (
                    <><CheckCircle className="h-4 w-4 mr-1" /> Pass</>
                  ) : (
                    <><XCircle className="h-4 w-4 mr-1" /> Fail</>
                  )}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Tests the /api/test-openai endpoint to verify OpenAI API key is working
            </p>
            
            <Button 
              onClick={testOpenAIEndpoint} 
              disabled={isTestingOpenAI}
              className="w-full"
            >
              {isTestingOpenAI ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Testing...</>
              ) : (
                'Test OpenAI Connection'
              )}
            </Button>
            
            {openAIResult && (
              <div className="mt-4 p-4 rounded-lg bg-muted">
                <h4 className="font-semibold mb-2">Result:</h4>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(openAIResult, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Ask Endpoint Test */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Test Ask Endpoint
              {askResult && (
                <Badge variant={askResult.success ? "default" : "destructive"}>
                  {askResult.success ? (
                    <><CheckCircle className="h-4 w-4 mr-1" /> Pass</>
                  ) : (
                    <><XCircle className="h-4 w-4 mr-1" /> Fail</>
                  )}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Tests the /api/ask endpoint to verify OpenAI integration and database logging
            </p>
            
            <Input
              value={testQuestion}
              onChange={(e) => setTestQuestion(e.target.value)}
              placeholder="Enter a question to test..."
            />
            
            <Button 
              onClick={testAskEndpoint} 
              disabled={isTestingAsk || !testQuestion.trim()}
              className="w-full"
            >
              {isTestingAsk ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Testing...</>
              ) : (
                'Test Ask Endpoint'
              )}
            </Button>
            
            {askResult && (
              <div className="mt-4 p-4 rounded-lg bg-muted">
                <h4 className="font-semibold mb-2">Result:</h4>
                {askResult.success && askResult.response && (
                  <div className="mb-4">
                    <h5 className="font-medium mb-1">AI Response:</h5>
                    <div className="p-3 rounded bg-background border">
                      {askResult.response}
                    </div>
                  </div>
                )}
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(askResult, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Data Endpoint Test */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Test Data Endpoint
              {dataResult && (
                <Badge variant={dataResult.success ? "default" : "destructive"}>
                  {dataResult.success ? (
                    <><CheckCircle className="h-4 w-4 mr-1" /> Pass</>
                  ) : (
                    <><XCircle className="h-4 w-4 mr-1" /> Fail</>
                  )}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Tests the /api/data endpoint for CRUD operations on articles
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value)}
                placeholder="Article title..."
              />
              <Textarea
                value={articleContent}
                onChange={(e) => setArticleContent(e.target.value)}
                placeholder="Article content..."
              />
            </div>
            
            <Button 
              onClick={testDataEndpoint} 
              disabled={isTestingData || !articleTitle.trim() || !articleContent.trim()}
              className="w-full"
            >
              {isTestingData ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Testing...</>
              ) : (
                'Test Data Endpoint'
              )}
            </Button>
            
            {dataResult && (
              <div className="mt-4 p-4 rounded-lg bg-muted">
                <h4 className="font-semibold mb-2">Result:</h4>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(dataResult, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

## src/pages/Index.tsx

**Explanation:** React page component used by the router.

```ts
import Landing from './Landing';

const Index = () => {
  return <Landing />;
};

export default Index;

```

## src/pages/Landing.tsx

**Explanation:** React page component used by the router.

```ts
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Camera, MessageCircle, Sparkles, Upload, Microscope, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <MessageCircle className="w-8 h-8 text-accent" />,
      title: "AI-Powered Science Assistant",
      description: "Upload photos or describe objects to get instant, accurate scientific explanations tailored to your curiosity level."
    },
    {
      icon: <Camera className="w-8 h-8 text-accent" />,
      title: "Visual Discovery Engine",
      description: "Capture the world around you and uncover the fascinating science behind everyday objects and phenomena."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-accent" />,
      title: "Interactive Learning Coach",
      description: "Guided questions that help you explore deeper scientific concepts and build understanding step by step."
    },
    {
      icon: <Microscope className="w-8 h-8 text-accent" />,
      title: "Detailed Scientific Analysis",
      description: "Get comprehensive explanations covering physics, chemistry, biology, and more with visual aids and examples."
    },
    {
      icon: <Upload className="w-8 h-8 text-accent" />,
      title: "Discovery History",
      description: "Keep track of your scientific journey with saved explanations, photos, and insights you can revisit anytime."
    },
    {
      icon: <Heart className="w-8 h-8 text-accent" />,
      title: "Wonder-Driven Learning",
      description: "Transform everyday curiosity into deep scientific understanding with personalized, engaging explanations."
    }
  ];

  const steps = [
    {
      number: "1",
      icon: <Upload className="w-6 h-6" />,
      title: "Upload or Describe",
      description: "Take a photo or tell us about something you're curious about."
    },
    {
      number: "2", 
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Let AI Explore with You",
      description: "Our science assistant analyzes and asks thoughtful questions to understand your curiosity."
    },
    {
      number: "3",
      icon: <Sparkles className="w-6 h-6" />,
      title: "Discover & Learn",
      description: "Receive detailed scientific explanations and explore deeper concepts at your own pace."
    }
  ];

  const testimonials = [
    {
      quote: "Science Lens helped me understand the physics behind my morning coffee brewing. The explanations are clear and make complex concepts accessible.",
      author: "Emma K.",
      role: "Curious Student"
    },
    {
      quote: "As a parent, I love how this app turns my kids' endless 'why' questions into amazing learning opportunities. The visual explanations are perfect.",
      author: "Michael R.", 
      role: "Parent & Educator"
    },
    {
      quote: "The AI assistant makes science feel approachable and exciting. I've learned more about the world around me in weeks than I did in years.",
      author: "Sofia L.",
      role: "Lifelong Learner"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent font-medium mb-6">
            <Microscope className="w-4 h-4" />
            Your AI-powered science companion
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-cosmic bg-clip-text text-transparent leading-tight">
            Explore with
            <br />
            <span className="text-accent">Wonder</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Turn your curiosity into scientific understanding with our AI-powered
            assistant. Upload photos, ask questions, and discover the fascinating
            science behind everything around you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="science"
              onClick={() => navigate('/explore')}
              className="group"
            >
              Start Exploring with Wonder
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline">
              See How It Works
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            How It <span className="text-accent">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A simple, step-by-step process designed to turn your curiosity into
            scientific discovery and understanding.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  {step.number}
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Smart Tools for <span className="text-accent">Scientific Discovery</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our thoughtfully designed features help you navigate the exciting journey of
            scientific exploration, making complex concepts accessible and engaging.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-science transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="mb-4 p-3 bg-accent/10 rounded-lg w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Stories of <span className="text-accent">Scientific Wonder</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real people sharing how Science Lens helped them discover the amazing
            science hidden in everyday life.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <CardContent className="p-0">
                <p className="text-muted-foreground italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-cosmic rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your <span className="text-accent">Scientific Journey</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of curious minds exploring the science behind everyday wonders.
          </p>
          <Button 
            size="lg" 
            variant="science"
            onClick={() => navigate('/explore')}
            className="group"
          >
            Begin Exploring Now
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
```

## src/pages/NotFound.tsx

**Explanation:** React page component used by the router.

```ts
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

```

## src/pages/Pricing.tsx

**Explanation:** React page component used by the router.

```ts
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSubscription } from '@/hooks/useSubscription';
import ScienceUniverse from '@/components/ScienceUniverse';

const Pricing: React.FC = () => {
  const { tier, createCheckout, openCustomerPortal, loading } = useSubscription();

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with science exploration',
      icon: <Sparkles className="h-6 w-6" />,
      features: [
        '5 questions per day',
        'Basic science explanations',
        'Standard response time',
        'Mobile responsive',
        'Basic achievements',
      ],
      limitations: [
        'Limited daily questions',
        'Shorter answer lengths',
        'No chat history',
        'No PDF export',
      ],
      cta: tier === 'free' ? 'Current Plan' : 'Downgrade',
      disabled: tier === 'free',
    },
    {
      id: 'plus',
      name: 'Science Lens Plus',
      price: '$9.99',
      period: 'per month',
      description: 'Unlimited learning with enhanced features',
      icon: <Zap className="h-6 w-6" />,
      priceId: 'price_1S91k2PaNATHSu6a5C1LtA1T',
      popular: true,
      features: [
        'Unlimited questions',
        'Detailed explanations',
        'Enhanced animations',
        'Priority support',
        'Advanced achievements',
        'Mobile optimized',
      ],
      cta: tier === 'plus' ? 'Current Plan' : 'Upgrade to Plus',
      disabled: tier === 'plus',
    },
    {
      id: 'pro',
      name: 'Science Lens Pro',
      price: '$19.99',
      period: 'per month',
      description: 'Everything you need for serious science exploration',
      icon: <Crown className="h-6 w-6" />,
      priceId: 'price_1S91nlPaNATHSu6aTyhGfZaM',
      features: [
        'Everything in Plus',
        'PDF export of answers',
        'Persistent chat history',
        'Voice mode (AI reads answers)',
        'Difficulty adjustment',
        'Share capabilities',
        'Priority support',
        'Exclusive achievements',
      ],
      cta: tier === 'pro' ? 'Current Plan' : 'Upgrade to Pro',
      disabled: tier === 'pro',
    },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <ScienceUniverse />
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-science bg-clip-text text-transparent mb-4">
            Choose Your Science Journey
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock the mysteries of science with our flexible pricing plans designed for every level of curiosity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              <Card className={`h-full relative overflow-hidden ${
                plan.popular 
                  ? 'border-primary/50 shadow-glow bg-gradient-to-b from-primary/5 to-background' 
                  : 'border-border hover:border-primary/30'
              } transition-all duration-300`}>
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-science text-white text-center py-2">
                    <Badge variant="secondary" className="bg-white/20 text-white border-0">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className={plan.popular ? 'pt-12' : 'pt-6'}>
                  <div className="flex items-center justify-center mb-4">
                    <div className={`p-3 rounded-full ${
                      plan.popular ? 'bg-primary/20' : 'bg-muted/50'
                    }`}>
                      {plan.icon}
                    </div>
                  </div>
                  
                  <CardTitle className="text-2xl text-center">{plan.name}</CardTitle>
                  <CardDescription className="text-center">{plan.description}</CardDescription>
                  
                  <div className="text-center py-4">
                    <div className="text-4xl font-bold">{plan.price}</div>
                    <div className="text-sm text-muted-foreground">{plan.period}</div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {plan.limitations && (
                    <div className="space-y-2 pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground font-medium">Limitations:</p>
                      {plan.limitations.map((limitation, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className="h-1 w-1 bg-muted-foreground rounded-full flex-shrink-0 ml-1.5" />
                          <span className="text-xs text-muted-foreground">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>

                <CardFooter className="pt-0">
                  <Button
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-science hover:shadow-glow' 
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                    disabled={plan.disabled || loading}
                    onClick={() => {
                      if (plan.priceId) {
                        createCheckout(plan.priceId);
                      } else if (tier !== 'free') {
                        openCustomerPortal();
                      }
                    }}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {tier !== 'free' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Button variant="ghost" onClick={openCustomerPortal}>
              Manage Subscription
            </Button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h3>
          <div className="max-w-2xl mx-auto space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I change plans anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! You can upgrade, downgrade, or cancel your subscription at any time through your account settings.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What happens to my data if I downgrade?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your achievements and profile data are always preserved. Chat history and premium features will be limited based on your new plan.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
```

## src/pages/ScienceLens.tsx

**Explanation:** React page component used by the router.

```ts
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Atom, 
  Award, 
  History, 
  ChevronLeft, 
  Menu,
  MessageSquare,
  Image as ImageIcon,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChatInterface } from '@/components/ChatInterface';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AchievementBadge } from '@/components/AchievementBadge';
import { AchievementNotification } from '@/components/AchievementNotification';
import { DiscoveryHistory } from '@/components/DiscoveryHistory';
import { ScienceParticles } from '@/components/ScienceParticles';
import { CreditsDisplay } from '@/components/CreditsDisplay';
import { CelebrationAnimation } from '@/components/CelebrationAnimation';
import { QuestionAnimation } from '@/components/QuestionAnimation';
import { ProfilePage } from '@/components/ProfilePage';
import { ScienceExplanation } from '@/components/ScienceExplanation';
import { ApiKeyPrompt } from '@/components/ApiKeyPrompt';
import { AuthModal } from '@/components/AuthModal';
import { supabase } from '@/integrations/supabase/client';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/use-toast';
import { useCredits } from '@/hooks/useCredits';
import { useAchievements } from '@/hooks/useAchievements';
import type { Message, Conversation, Achievement, UserProfile } from '@/types';

// Categories for question classification (simplified)
const scienceCategories = {
  biology: ['biology', 'life', 'organism', 'cell', 'gene', 'evolution', 'plant', 'animal', 'body', 'health', 'medicine', 'brain', 'heart', 'blood', 'DNA', 'protein', 'bacteria', 'virus', 'ecosystem', 'photosynthesis', 'mitosis', 'genetic', 'anatomy', 'physiology'],
  chemistry: ['chemistry', 'chemical', 'molecule', 'atom', 'element', 'reaction', 'compound', 'acid', 'base', 'catalyst', 'polymer', 'organic', 'inorganic', 'periodic', 'bond', 'formula', 'solution', 'ph', 'oxidation', 'reduction', 'electrochemistry'],
  physics: ['physics', 'force', 'energy', 'motion', 'gravity', 'light', 'wave', 'quantum', 'relativity', 'thermodynamics', 'electricity', 'magnetism', 'nuclear', 'particle', 'velocity', 'acceleration', 'momentum', 'optics', 'acoustics', 'mechanics'],
  astronomy: ['astronomy', 'space', 'star', 'planet', 'galaxy', 'universe', 'solar', 'moon', 'sun', 'cosmic', 'nebula', 'black hole', 'comet', 'asteroid', 'orbit', 'telescope', 'constellation', 'meteor', 'spacecraft', 'astronaut'],
  'earth-science': ['earth', 'geology', 'climate', 'weather', 'ocean', 'atmosphere', 'volcano', 'earthquake', 'mineral', 'rock', 'fossil', 'plate', 'tectonic', 'erosion', 'sediment', 'groundwater', 'hurricane', 'tornado', 'glacier'],
  technology: ['technology', 'computer', 'artificial intelligence', 'robot', 'programming', 'software', 'hardware', 'internet', 'digital', 'electronics', 'semiconductor', 'transistor', 'algorithm', 'database', 'network', 'cybersecurity', 'blockchain'],
  mathematics: ['mathematics', 'math', 'number', 'equation', 'formula', 'algebra', 'geometry', 'calculus', 'statistics', 'probability', 'trigonometry', 'graph', 'function', 'derivative', 'integral', 'matrix', 'vector', 'theorem', 'proof'],
  general: []
};

const categorizeQuestion = (content: string): string => {
  const lowerContent = content.toLowerCase();
  
  for (const [category, keywords] of Object.entries(scienceCategories)) {
    if (category === 'general') continue;
    if (keywords.some(keyword => lowerContent.includes(keyword))) {
      return category;
    }
  }
  
  return 'general';
};

export default function ScienceLens() {
  // State management
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [currentView, setCurrentView] = useState<'chat' | 'profile'>('chat');
  const [showQuestionAnimation, setShowQuestionAnimation] = useState(false);
  const [celebrationAchievement, setCelebrationAchievement] = useState<Achievement | null>(null);
  const [showApiKeyPrompt, setShowApiKeyPrompt] = useState(false);
  const [hasShownApiPrompt, setHasShownApiPrompt] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasAskedFirstQuestion, setHasAskedFirstQuestion] = useState(false);

  // Persistent storage
  const [conversations, setConversations] = useLocalStorage<Conversation[]>('science-lens-conversations', []);
  const [favorites, setFavorites] = useLocalStorage<string[]>('science-lens-favorites', []);

  // Custom hooks
  const { credits, hasCredits, useCredit } = useCredits();
  const { newAchievement, recordQuestion, dismissNewAchievement } = useAchievements();
  const { toast } = useToast();

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };
    
    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      if (session) {
        setShowAuthModal(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // AI response generator using Supabase Edge Function
  const generateAIResponse = async (question: string, hasImage: boolean, category: string): Promise<string> => {
    try {
      // Call the Supabase Edge Function
      console.log('Calling /api/ask endpoint with question:', question.slice(0, 100));
      
      const { data, error } = await supabase.functions.invoke('ask', {
        body: { prompt: question }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (data?.response) {
        console.log('Received AI response from backend');
        return data.response;
      } else {
        throw new Error('No response received from AI service');
      }
    } catch (error) {
      console.error('Backend AI service error:', error);
      // Fall back to enhanced mock response
    }
    
    // Enhanced mock response as fallback
    console.log('Using fallback mock response for category:', category);
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    
    const categoryResponses = {
      biology: `🧪 Biological Systems Analysis\n\nThis is a fascinating biological question! Let me break down the key life processes involved.\n\n🔬 Core Biological Principles:\n• Cellular metabolism and energy production\n• Molecular interactions in living systems\n• Evolutionary adaptations and natural selection\n• Homeostatic mechanisms maintaining balance\n• Genetic information flow from DNA to proteins\n\n⚛️ Molecular Foundation:\nAt the molecular level, all life processes involve precise chemical reactions. Enzymes catalyze reactions, proteins provide structure and function, and nucleic acids store and transmit information.\n\n🌟 Real-World Applications:\nUnderstanding these biological principles helps us develop medical treatments, improve agriculture, and conserve ecosystems.`,
      
      chemistry: `🧪 Chemical Analysis and Molecular Interactions\n\nExcellent chemistry question! Let me explain the molecular mechanisms at work.\n\n🔬 Chemical Principles:\n• Atomic structure and electron behavior\n• Chemical bonding and molecular geometry\n• Thermodynamics and reaction spontaneity\n• Kinetics and reaction mechanisms\n• Equilibrium and dynamic balance\n\n⚛️ Molecular Perspective:\nAtoms combine through sharing or transferring electrons to form stable compounds. The three-dimensional arrangement of atoms determines molecular properties and reactivity.\n\n🌟 Practical Applications:\nThese chemical principles are essential for drug design, materials science, and environmental chemistry.`,
      
      physics: `🧪 Physical Phenomena and Natural Laws\n\nGreat physics question! Let me explore the fundamental forces and principles involved.\n\n🔬 Physical Concepts:\n• Forces and their effects on matter and motion\n• Energy conservation and transformation\n• Wave behavior and electromagnetic radiation\n• Quantum mechanical effects at atomic scales\n• Relativistic effects in space and time\n\n⚛️ Mathematical Framework:\nPhysics uses mathematics to precisely describe natural phenomena. Equations capture the relationships between physical quantities and predict system behavior.\n\n🌟 Technological Impact:\nPhysical principles enable modern technology from computers to medical imaging devices.`,
      
      astronomy: `🧪 Cosmic Phenomena and Stellar Processes\n\nWonderful astronomy question! Let me explain the cosmic processes involved.\n\n🔬 Astronomical Concepts:\n• Gravitational interactions shaping cosmic structure\n• Nuclear fusion powering stars and creating elements\n• Light as a messenger carrying cosmic information\n• Planetary formation in stellar nurseries\n• Evolution of galaxies and cosmic structures\n\n⚛️ Scale and Time:\nAstronomical phenomena occur on vast scales of space and time, from seconds to billions of years, revealing the universe's dynamic history.\n\n🌟 Observational Methods:\nTelescopes and detectors across the electromagnetic spectrum reveal the universe's hidden processes.`,
      
      default: `🧪 Scientific Principles and Natural Understanding\n\nFascinating scientific question! Let me explain the underlying principles.\n\n🔬 Scientific Concepts:\n• Observable patterns in natural phenomena\n• Cause-and-effect relationships in nature\n• Mathematical models describing reality\n• Experimental methods revealing truth\n• Theoretical frameworks organizing knowledge\n\n⚛️ Interconnected Science:\nScientific disciplines connect to reveal nature's unified principles, from quantum mechanics to cosmic evolution.\n\n🌟 Human Discovery:\nScientific inquiry expands our understanding and enables technological progress for humanity's benefit.`
    };
    
    const response = categoryResponses[category as keyof typeof categoryResponses] || categoryResponses.default;
    
    if (hasImage) {
      return `${response}\n\n📸 Visual Analysis:\nBased on your uploaded image, I can identify key features that perfectly illustrate these scientific concepts. The visual elements demonstrate how theoretical principles manifest in observable phenomena, providing concrete examples of abstract scientific ideas.`;
    }
    
    return response;
  };

  // Handle achievement celebration
  useEffect(() => {
    if (newAchievement) {
      setCelebrationAchievement(newAchievement);
    }
  }, [newAchievement]);

  // Check if we should show API key prompt (deprecated - now handled by backend)
  const checkForApiKeyPrompt = () => {
    // No longer needed since API key is handled by backend
    console.log('API key prompt check skipped - using backend');
  };

  // Message handling
  const handleSendMessage = async (content: string, image?: File) => {
    console.log('handleSendMessage: Starting with content:', content.slice(0, 100));
    
    if (!content.trim() && !image) {
      console.log('handleSendMessage: No content or image provided');
      return;
    }

    // Check if user has credits
    if (!hasCredits) {
      console.log('handleSendMessage: No credits available');
      toast({
        title: "Out of Credits",
        description: "You've used all your daily credits. Come back tomorrow for more!",
        variant: "destructive",
      });
      return;
    }

    // Use a credit
    if (!useCredit()) {
      console.log('handleSendMessage: Failed to use credit');
      toast({
        title: "Error",
        description: "Failed to use credit. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Check if we should prompt for API key on first question
      checkForApiKeyPrompt();

      // Show question animation
      setShowQuestionAnimation(true);

      // Categorize the question
      const category = categorizeQuestion(content);
      console.log('handleSendMessage: Question categorized as:', category);

      // Create or update conversation with immutable updates
      let conversation = currentConversation;
      if (!conversation) {
        conversation = {
          id: Date.now().toString(),
          title: content.slice(0, 50) + (content.length > 50 ? '...' : ''),
          messages: [],
          timestamp: Date.now(),
          category,
        };
        console.log('handleSendMessage: Created new conversation:', conversation.id);
      }

      // Create user message
      const userMessage: Message = {
        id: `user_${Date.now()}`,
        type: 'user',
        content,
        image: image ? URL.createObjectURL(image) : undefined,
        timestamp: Date.now(),
        category,
      };
      console.log('handleSendMessage: Created user message:', userMessage.id);

      // Immutable update: create new conversation with new message
      const updatedConversation = {
        ...conversation,
        messages: [...conversation.messages, userMessage]
      };
      setCurrentConversation(updatedConversation);
      console.log('handleSendMessage: Updated conversation with user message, total messages:', updatedConversation.messages.length);

      // Record question for achievements
      recordQuestion(category, content, !!image);

      // Show auth modal after first question if not authenticated
      if (!hasAskedFirstQuestion && !isAuthenticated) {
        setHasAskedFirstQuestion(true);
        setShowAuthModal(true);
      }

      setIsLoading(true);

      // Generate AI response with category context
      const aiResponse = await generateAIResponse(content, !!image, category);
      console.log('handleSendMessage: Generated AI response, length:', aiResponse.length);
      
      const assistantMessage: Message = {
        id: `assistant_${Date.now()}`,
        type: 'assistant',
        content: aiResponse,
        timestamp: Date.now(),
        category,
      };
      console.log('handleSendMessage: Created assistant message:', assistantMessage.id);

      // Immutable update: create new conversation with assistant message
      const finalConversation = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, assistantMessage]
      };
      setCurrentConversation(finalConversation);
      console.log('handleSendMessage: Updated conversation with assistant message, total messages:', finalConversation.messages.length);

      // Update conversations list with immutable operations
      const updatedConversations = conversations.filter(c => c.id !== finalConversation.id);
      updatedConversations.unshift(finalConversation);
      setConversations(updatedConversations);
      console.log('handleSendMessage: Updated conversations list, total conversations:', updatedConversations.length);

    } catch (error) {
      console.error('handleSendMessage: Error occurred:', error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      console.log('handleSendMessage: Completed');
    }
  };

  const handleClearChat = () => {
    setCurrentConversation(null);
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setCurrentConversation(conversation);
    setActiveTab('chat');
    setCurrentView('chat');
    setSidebarOpen(false);
  };

  const handleDeleteConversation = (id: string) => {
    setConversations(conversations.filter(c => c.id !== id));
    if (currentConversation?.id === id) {
      setCurrentConversation(null);
    }
  };

  const handleToggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(f => f !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  if (currentView === 'profile') {
    return (
      <div className="min-h-screen bg-background relative">
        <ScienceParticles />
        
        {/* Header */}
        <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentView('chat')}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <div className="p-2 bg-gradient-cosmic rounded-lg">
                  <Atom className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
                  ScienceLens
                </h1>
              </motion.div>
            </div>

            <div className="flex items-center space-x-2">
              <CreditsDisplay compact />
              <ThemeToggle />
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <ProfilePage />
        </div>

        {/* Celebration Animation */}
        <CelebrationAnimation
          achievement={celebrationAchievement}
          onComplete={() => {
            setCelebrationAchievement(null);
            dismissNewAchievement();
          }}
        />

        {/* Question Animation */}
        <QuestionAnimation
          isVisible={showQuestionAnimation}
          onComplete={() => setShowQuestionAnimation(false)}
        />

        {/* API Key Prompt */}
        {showApiKeyPrompt && (
          <ApiKeyPrompt
            onApiKeySet={(key) => {
              localStorage.setItem('temp_openai_key', key);
              setShowApiKeyPrompt(false);
            }}
            onDismiss={() => setShowApiKeyPrompt(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <ScienceParticles />
      
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="p-2 bg-gradient-cosmic rounded-lg">
                <Atom className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
                ScienceLens
              </h1>
            </motion.div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentView('profile')}
              className="hidden sm:flex"
            >
              <User className="h-5 w-5" />
            </Button>
            <CreditsDisplay compact />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <AnimatePresence>
          {(sidebarOpen || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-80 border-r bg-card p-4 overflow-y-auto lg:relative absolute inset-y-0 left-0 z-30 lg:translate-x-0"
            >
              <div className="space-y-4">
                {/* Credits Display */}
                <CreditsDisplay />

                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="history" className="flex items-center space-x-2">
                      <History className="h-4 w-4" />
                      <span>History</span>
                    </TabsTrigger>
                    <TabsTrigger value="achievements" className="flex items-center space-x-2">
                      <Award className="h-4 w-4" />
                      <span>Badges</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="history" className="mt-4 h-[calc(100%-3rem)]">
                    <DiscoveryHistory
                      conversations={conversations}
                      onSelectConversation={handleSelectConversation}
                      onDeleteConversation={handleDeleteConversation}
                      onToggleFavorite={handleToggleFavorite}
                      favorites={favorites}
                    />
                  </TabsContent>

                  <TabsContent value="achievements" className="mt-4 h-[calc(100%-3rem)]">
                    <div className="space-y-4">
                      <div className="text-center">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentView('profile')}
                          className="w-full"
                        >
                          <User className="h-4 w-4 mr-2" />
                          View Full Profile
                        </Button>
                      </div>
                      
                      <Card className="h-[calc(100%-4rem)]">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Award className="h-5 w-5" />
                            <span>Recent Achievements</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center text-sm text-muted-foreground space-y-2">
                            <p>Start asking questions to unlock achievements!</p>
                            <p className="text-xs">🏆 100+ badges across 8 science categories</p>
                            <p className="text-xs">💎 Earn bonus credits for unlocking achievements</p>
                            <p className="text-xs">🔥 Build streaks and become a science master!</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-8">
            {!currentConversation ? (
              // Welcome Screen
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto text-center space-y-8"
              >
                <div className="space-y-4">
                  <div className="flex justify-center space-x-4 mb-8">
                    {[Atom, ImageIcon, MessageSquare].map((Icon, index) => (
                      <motion.div
                        key={index}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          delay: index * 0.5 
                        }}
                      >
                        <Icon className="h-12 w-12 text-primary" />
                      </motion.div>
                    ))}
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
                    Ask Science Anything
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Your AI-powered science companion. Ask questions, upload photos, 
                    and discover the fascinating science behind everything around you!
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  {[
                    "Why is the sky blue?",
                    "How do plants make oxygen?",
                    "What causes rainbows?",
                    "Why do ice cubes float?"
                  ].map((question, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleSendMessage(question)}
                      className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-muted/80 transition-colors"
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>

                <Card className="p-8 shadow-science">
                  <ChatInterface
                    messages={[]}
                    onSendMessage={handleSendMessage}
                    isLoading={isLoading}
                    onClearChat={handleClearChat}
                  />
                </Card>
              </motion.div>
            ) : (
              // Chat View
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCurrentConversation(null)}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <h2 className="text-2xl font-bold truncate">
                    {currentConversation.title}
                  </h2>
                </div>

                <ChatInterface
                  messages={currentConversation.messages}
                  onSendMessage={handleSendMessage}
                  isLoading={isLoading}
                  onClearChat={handleClearChat}
                />
              </motion.div>
            )}
          </div>
        </main>
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          toast({
            title: "Welcome to ScienceLens!",
            description: "Your learning journey is now being tracked.",
          });
        }}
      />

      {/* API Key Prompt - Only show conditionally */}
      {showApiKeyPrompt && (
        <ApiKeyPrompt
          onApiKeySet={() => setShowApiKeyPrompt(false)}
          onDismiss={() => setShowApiKeyPrompt(false)}
        />
      )}

      {/* Achievement Notification */}
      <AchievementNotification
        achievement={newAchievement}
        onClose={dismissNewAchievement}
      />

      {/* Celebration Animation */}
      <CelebrationAnimation
        achievement={celebrationAchievement}
        onComplete={() => {
          setCelebrationAchievement(null);
          dismissNewAchievement();
        }}
      />

      {/* Question Animation */}
      <QuestionAnimation
        isVisible={showQuestionAnimation}
        onComplete={() => setShowQuestionAnimation(false)}
      />

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
```

## src/services/openai.ts

**Explanation:** Service or helper script.

```ts
export async function askAI(question: string) {
  const resp = await fetch('/api/openai/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });
  if (!resp.ok) {
    const body = await resp.json().catch(() => ({}));
    throw new Error(body?.error || 'AI request failed');
  }
  const data = await resp.json();
  return data.reply;
}

export default askAI;
interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export class ScienceAIService {
  private apiKey: string;
  private baseUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async analyzeQuestion(question: string, category: string, hasImage: boolean = false): Promise<string> {
    const systemPrompt = `You are Science Lens, a detailed science explainer. Always give specific, step-by-step answers to questions in physics, chemistry, and biology. Use clear reasoning and avoid generic overviews.

RESPONSE REQUIREMENTS:
- Provide specific, contextual answers tailored to the exact question asked
- Break down complex processes into clear, logical steps
- Explain the underlying mechanisms and "why" behind each step
- Use concrete examples and real-world applications
- Include specific scientific terminology with clear explanations
- Show mathematical relationships, formulas, and calculations when relevant
- Address common misconceptions if applicable

FORMATTING GUIDELINES:
- Structure responses with clear sections using emojis (🧪, 🔬, ⚛️, 🌟)
- Use bullet points (•) for step-by-step explanations
- Include specific numerical values, measurements, or ranges when possible
- Suggest relevant visual demonstrations or diagrams that would illustrate the concept

CATEGORY FOCUS: This is a ${category} question. Provide detailed, field-specific explanations while connecting to related scientific principles.

${hasImage ? 'IMAGE ANALYSIS: The user has provided an image. Analyze and reference specific visual elements to enhance your detailed explanation.' : ''}

Provide a comprehensive, step-by-step scientific explanation:`;

    const userPrompt = `${question}

Please provide a detailed scientific explanation that includes:
1. The main scientific principles involved
2. Step-by-step explanation of processes or mechanisms
3. Real-world applications or examples
4. Key terminology and concepts
5. Any relevant formulas or equations
6. Common misconceptions (if applicable)

Make it educational, engaging, and scientifically accurate.`;

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          max_tokens: 800,
          temperature: 0.8,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data: OpenAIResponse = await response.json();
      return data.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response. Please try asking your question again.';
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      
      // Fallback to enhanced mock response
      return this.generateEnhancedMockResponse(question, category, hasImage);
    }
  }

  private generateEnhancedMockResponse(question: string, category: string, hasImage: boolean): string {
    const responses = {
      biology: {
        base: "🧪 Biological Systems and Life Processes\n\nLife is an intricate network of chemical reactions and biological processes. Every living organism, from the smallest bacteria to complex multicellular organisms, follows fundamental principles of biology.\n\n🔬 Key Mechanisms:\n• Cellular respiration converts glucose and oxygen into energy (ATP)\n• Photosynthesis captures light energy to produce glucose and oxygen\n• DNA replication ensures genetic information is passed to offspring\n• Protein synthesis translates genetic codes into functional molecules\n• Homeostasis maintains stable internal conditions despite external changes\n\n⚛️ Molecular Foundation:\nAll biological processes occur through molecular interactions. Enzymes act as biological catalysts, speeding up reactions essential for life. The structure of molecules determines their function - a principle seen everywhere from DNA's double helix to protein folding.\n\n🌟 Real-World Applications:\nUnderstanding these processes has led to breakthroughs in medicine, agriculture, and biotechnology. From developing new drugs to engineering crops that resist diseases, biology directly impacts human life.",
        withImage: "\n\n📸 Visual Analysis:\nBased on your image, I can identify several biological structures and processes at work. The visual elements demonstrate the incredible organization and complexity found in living systems, from cellular structures to tissue organization."
      },
      chemistry: {
        base: "🧪 Chemical Principles and Molecular Interactions\n\nChemistry is the science of matter and the changes it undergoes. Every chemical reaction follows fundamental laws that govern how atoms and molecules interact.\n\n🔬 Fundamental Concepts:\n• Atomic structure determines chemical behavior and bonding patterns\n• Chemical bonds form when atoms share or transfer electrons\n• Reaction mechanisms show the step-by-step pathway from reactants to products\n• Thermodynamics determines whether reactions will occur spontaneously\n• Kinetics controls how fast reactions proceed\n\n⚛️ Molecular Level Understanding:\nAtoms combine in specific ratios to form compounds with unique properties. The arrangement of electrons in atomic orbitals determines how atoms bond and react. Chemical equations represent these transformations in a concise, mathematical way.\n\n🌟 Practical Applications:\nChemical principles are essential for creating new materials, developing pharmaceuticals, and understanding environmental processes. From the plastics in everyday objects to the biochemical reactions in our bodies, chemistry shapes our world.",
        withImage: "\n\n📸 Chemical Analysis:\nYour image likely shows chemical structures, reactions, or laboratory equipment. These visual elements help illustrate how theoretical chemical concepts manifest in real, observable phenomena."
      },
      physics: {
        base: "🧪 Physical Laws and Natural Forces\n\nPhysics explores the fundamental forces and principles that govern the universe, from subatomic particles to cosmic structures.\n\n🔬 Core Principles:\n• Newton's laws describe how forces affect motion and acceleration\n• Energy conservation states that energy cannot be created or destroyed\n• Wave properties explain light, sound, and electromagnetic radiation\n• Quantum mechanics governs behavior at atomic and subatomic scales\n• Relativity describes space, time, and gravity at cosmic scales\n\n⚛️ Mathematical Framework:\nPhysics uses mathematics to describe natural phenomena precisely. Equations like F=ma, E=mc², and the wave equation capture fundamental relationships between physical quantities.\n\n🌟 Technological Impact:\nPhysical principles enable modern technology - from computers and smartphones to GPS systems and medical imaging. Understanding physics leads to innovations that improve human life.",
        withImage: "\n\n📸 Physical Phenomena:\nYour image demonstrates physics in action. Whether showing motion, forces, electromagnetic effects, or wave behavior, the visual elements reveal the underlying physical principles at work."
      },
      astronomy: {
        base: "🧪 Cosmic Phenomena and Stellar Processes\n\nAstronomy reveals the vast scales and incredible processes occurring throughout the universe, from planetary formation to stellar evolution.\n\n🔬 Astronomical Concepts:\n• Gravity shapes planetary orbits, star formation, and galaxy structure\n• Nuclear fusion in stellar cores creates elements and energy\n• Light from distant objects carries information about cosmic history\n• Planetary systems form from collapsing clouds of gas and dust\n• Dark matter and dark energy influence cosmic evolution\n\n⚛️ Scale and Perspective:\nThe universe operates on scales from kilometers to billions of light-years. Understanding these vast distances and time scales helps us appreciate our place in the cosmos and the processes that created the elements in our bodies.\n\n🌟 Observational Methods:\nTelescopes across the electromagnetic spectrum reveal different aspects of cosmic phenomena. From radio waves to gamma rays, each type of light provides unique insights into astronomical objects and processes.",
        withImage: "\n\n📸 Cosmic Observation:\nYour image captures astronomical phenomena that demonstrate the incredible scales and processes occurring in space. These observations help us understand the universe's structure and evolution."
      },
      default: {
        base: "🧪 Scientific Principles and Natural Phenomena\n\nScience seeks to understand the natural world through observation, experimentation, and logical reasoning. Every scientific field contributes to our understanding of reality.\n\n🔬 Scientific Method:\n• Observation identifies patterns and phenomena in nature\n• Hypothesis formation proposes explanations for observations\n• Experimentation tests hypotheses under controlled conditions\n• Analysis reveals whether data support or refute hypotheses\n• Theory development creates comprehensive explanations for natural phenomena\n\n⚛️ Interconnected Knowledge:\nScientific disciplines are deeply interconnected. Biology relies on chemistry, chemistry depends on physics, and physics explains astronomical phenomena. This unity reveals the underlying order in nature.\n\n🌟 Human Understanding:\nScience continuously expands human knowledge and capabilities. From understanding the molecular basis of life to exploring distant galaxies, scientific inquiry reveals the remarkable complexity and beauty of the universe.",
        withImage: "\n\n📸 Scientific Observation:\nYour image provides visual evidence of scientific principles in action. These observations are essential for understanding how theoretical concepts manifest in the real world."
      }
    };

    const categoryResponse = responses[category as keyof typeof responses] || responses.default;
    return categoryResponse.base + (hasImage ? categoryResponse.withImage : '');
  }
}

// Utility function to get API key from environment or local storage
export const getOpenAIApiKey = (): string | null => {
  // Try to get from environment first
  const envKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (envKey && envKey !== 'your_api_key_here') {
    return envKey;
  }
  
  // Try to get from localStorage (temporary session key)
  const tempKey = localStorage.getItem('temp_openai_key');
  if (tempKey) {
    return tempKey;
  }
  
  return null;
};

// Create a singleton instance
let aiServiceInstance: ScienceAIService | null = null;

export const getAIService = (): ScienceAIService | null => {
  const apiKey = getOpenAIApiKey();
  
  if (!apiKey) {
    return null;
  }
  
  if (!aiServiceInstance) {
    aiServiceInstance = new ScienceAIService(apiKey);
  }
  
  return aiServiceInstance;
};
```

## src/types/index.ts

**Explanation:** Source code file.

```ts
export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  image?: string;
  timestamp: number;
  category?: string; // Science category for achievement tracking
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  timestamp: number;
  category?: string; // Primary science category
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  unlocked: boolean;
  unlockedAt?: number;
  bonusCredits?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirements: {
    type: 'questions_in_category' | 'total_questions' | 'streak_days' | 'photos_uploaded' | 'special';
    count?: number;
    category?: string;
    special?: string;
  };
}

export interface UserProfile {
  questionsAsked: number;
  photosUploaded: number;
  achievements: Achievement[];
  favoriteTopics: string[];
  discoveryStreak: number;
}
```

## src/utils/sanitize.ts

**Explanation:** Source code file.

```ts
// Minimal sanitizer: strips HTML tags and trims whitespace.
// For richer sanitization (preserving safe HTML) consider using DOMPurify on the client
export function sanitize(input: string) {
  if (!input) return '';
  // remove tags
  return input.replace(/<[^>]*>/g, '').trim();
}

export default sanitize;

```

## src/vite-env.d.ts

**Explanation:** Source code file.

```ts
/// <reference types="vite/client" />

```

## supabase/config.toml

**Explanation:** Repository file.

```toml
project_id = "oyalgnheaxmlhnkkcduy"

[functions.ask]
verify_jwt = false

[functions.test-openai]
verify_jwt = false

[functions.data]
verify_jwt = false
```

## supabase/functions/ask/index.ts

**Explanation:** Supabase Edge Function handler.

```ts
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, userId } = await req.json();
    
    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get OpenAI API key
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error('OpenAI API key not found');
      return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Call OpenAI API
    console.log('Calling OpenAI with prompt:', prompt);
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are a helpful science assistant. Provide clear, accurate, and educational explanations about scientific concepts.' 
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      return new Response(JSON.stringify({ error: 'Failed to get AI response' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Log to database
    console.log('Logging to database:', { prompt, response: aiResponse });
    const { error: logError } = await supabase
      .from('ai_logs')
      .insert({
        prompt: prompt,
        response: aiResponse,
        user_id: userId || null
      });

    if (logError) {
      console.error('Database logging error:', logError);
      // Continue anyway - don't fail the request just because logging failed
    }

    return new Response(JSON.stringify({ 
      response: aiResponse,
      logged: !logError 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ask function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
```

## supabase/functions/check-subscription/index.ts

**Explanation:** Supabase Edge Function handler.

```ts
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    
    if (customers.data.length === 0) {
      logStep("No customer found, updating profile to free");
      
      // Update profile to free tier
      await supabaseClient.from('profiles').upsert({
        user_id: user.id,
        email: user.email,
        tier: 'free',
        subscription_status: null,
        stripe_customer_id: null,
        stripe_subscription_id: null,
        subscription_expires_at: null
      });
      
      return new Response(JSON.stringify({ 
        subscribed: false, 
        tier: 'free',
        product_id: null,
        subscription_end: null 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const customerId = customers.data[0].id;
    logStep("Found Stripe customer", { customerId });

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 1,
    });
    
    const hasActiveSub = subscriptions.data.length > 0;
    let productId = null;
    let subscriptionEnd = null;
    let tier = 'free';

    if (hasActiveSub) {
      const subscription = subscriptions.data[0];
      subscriptionEnd = new Date(subscription.current_period_end * 1000).toISOString();
      productId = subscription.items.data[0].price.product;
      
      // Determine tier based on product ID
      if (productId === 'prod_T5C8Pu1TLPzejj') {
        tier = 'plus';
      } else if (productId === 'prod_T5CCgc0MzWls1w') {
        tier = 'pro';
      }
      
      logStep("Active subscription found", { 
        subscriptionId: subscription.id, 
        endDate: subscriptionEnd,
        tier,
        productId 
      });

      // Update profile with subscription info
      await supabaseClient.from('profiles').upsert({
        user_id: user.id,
        email: user.email,
        tier: tier as 'free' | 'plus' | 'pro',
        subscription_status: 'active',
        stripe_customer_id: customerId,
        stripe_subscription_id: subscription.id,
        subscription_expires_at: subscriptionEnd
      });
    } else {
      logStep("No active subscription found");
      
      // Update profile to free tier
      await supabaseClient.from('profiles').upsert({
        user_id: user.id,
        email: user.email,
        tier: 'free',
        subscription_status: null,
        stripe_customer_id: customerId,
        stripe_subscription_id: null,
        subscription_expires_at: null
      });
    }

    return new Response(JSON.stringify({
      subscribed: hasActiveSub,
      tier,
      product_id: productId,
      subscription_end: subscriptionEnd
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in check-subscription", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "Content-Type" },
      status: 500,
    });
  }
});
```

## supabase/functions/create-checkout/index.ts

**Explanation:** Supabase Edge Function handler.

```ts
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    logStep("Function started");
    
    const { priceId } = await req.json();
    if (!priceId) throw new Error("Price ID is required");
    logStep("Price ID received", { priceId });

    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { 
      apiVersion: "2025-08-27.basil" 
    });

    // Check if customer exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Existing customer found", { customerId });
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/pricing`,
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-checkout", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
```

## supabase/functions/customer-portal/index.ts

**Explanation:** Supabase Edge Function handler.

```ts
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CUSTOMER-PORTAL] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    if (customers.data.length === 0) {
      throw new Error("No Stripe customer found for this user");
    }
    const customerId = customers.data[0].id;
    logStep("Found Stripe customer", { customerId });

    const origin = req.headers.get("origin") || "http://localhost:3000";
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/`,
    });
    logStep("Customer portal session created", { sessionId: portalSession.id, url: portalSession.url });

    return new Response(JSON.stringify({ url: portalSession.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in customer-portal", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
```

## supabase/functions/data/index.ts

**Explanation:** Supabase Edge Function handler.

```ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const url = new URL(req.url);
    const method = req.method;

    // GET - List all articles
    if (method === 'GET') {
      console.log('Fetching all articles...');
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching articles:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ articles: data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // POST - Create new article
    if (method === 'POST') {
      const { title, content } = await req.json();

      if (!title || !content) {
        return new Response(JSON.stringify({ error: 'Title and content are required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      console.log('Creating new article:', { title, content });
      const { data, error } = await supabase
        .from('articles')
        .insert({ title, content })
        .select()
        .single();

      if (error) {
        console.error('Error creating article:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ article: data }), {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // PUT - Update article
    if (method === 'PUT') {
      const { id, title, content } = await req.json();

      if (!id || !title || !content) {
        return new Response(JSON.stringify({ error: 'ID, title, and content are required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      console.log('Updating article:', { id, title, content });
      const { data, error } = await supabase
        .from('articles')
        .update({ title, content })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating article:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ article: data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // DELETE - Delete article
    if (method === 'DELETE') {
      const { id } = await req.json();

      if (!id) {
        return new Response(JSON.stringify({ error: 'ID is required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      console.log('Deleting article:', { id });
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting article:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Method not allowed
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in data function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
```

## supabase/functions/test-openai/index.ts

**Explanation:** Supabase Edge Function handler.

```ts
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get OpenAI API key
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error('OpenAI API key not found');
      return new Response(JSON.stringify({ 
        error: 'OpenAI API key not configured',
        message: 'Please set the OPENAI_API_KEY secret in Supabase'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Test OpenAI API call
    console.log('Testing OpenAI API connection...');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'user', content: 'Say "Hello from GPT!" and nothing else.' }
        ],
        max_tokens: 10,
        temperature: 0,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      return new Response(JSON.stringify({ 
        error: 'OpenAI API call failed',
        details: errorData 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const message = data.choices[0].message.content;

    console.log('OpenAI test successful:', message);
    return new Response(JSON.stringify({ 
      message: message,
      status: 'OpenAI connection successful',
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in test-openai function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      status: 'OpenAI connection failed'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
```

## supabase/functions/text-to-speech/index.ts

**Explanation:** Supabase Edge Function handler.

```ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { text, voice = 'alloy' } = await req.json()

    if (!text) {
      throw new Error('Text is required')
    }

    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1',
        input: text,
        voice: voice,
        response_format: 'mp3',
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error?.message || 'Failed to generate speech')
    }

    const arrayBuffer = await response.arrayBuffer()
    const base64Audio = btoa(
      String.fromCharCode(...new Uint8Array(arrayBuffer))
    )

    return new Response(
      JSON.stringify({ audioContent: base64Audio }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})
```

## supabase/migrations/20250917143042_a80b1453-ba58-45b2-ac7b-8e7f8aeaad97.sql

**Explanation:** Repository file.

```sql
-- Create articles table
CREATE TABLE IF NOT EXISTS public.articles (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ai_logs table
CREATE TABLE IF NOT EXISTS public.ai_logs (
  id SERIAL PRIMARY KEY,
  prompt TEXT NOT NULL,
  response TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for articles (public read, authenticated write)
CREATE POLICY "Anyone can view articles" 
ON public.articles 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create articles" 
ON public.articles 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update articles" 
ON public.articles 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete articles" 
ON public.articles 
FOR DELETE 
USING (true);

-- Create policies for ai_logs (public read/write for now)
CREATE POLICY "Anyone can view ai_logs" 
ON public.ai_logs 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create ai_logs" 
ON public.ai_logs 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates on articles
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
```

## supabase/migrations/20250918104735_481ca53e-802b-4488-8c91-1d1c1cd3135f.sql

**Explanation:** Repository file.

```sql
-- Create enum for subscription tiers
CREATE TYPE public.subscription_tier AS ENUM ('free', 'plus', 'pro');

-- Create enum for achievement keys
CREATE TYPE public.achievement_key AS ENUM (
  'first_steps', 'curious_learner', 'knowledge_seeker', 'marathon_session', 
  'science_explorer', 'night_owl', 'upgrade_unlocked', 'pro_explorer', 
  'pdf_master', 'time_traveler', 'lightning_brain', 'perfectionist', 
  'collector', 'mystery_badge'
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT NOT NULL,
  tier subscription_tier NOT NULL DEFAULT 'free',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  subscription_status TEXT,
  subscription_expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create usage tracking table
CREATE TABLE public.usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  requests_today INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Create achievements table
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  achievement_key achievement_key NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_key)
);

-- Create chat history table (Pro feature)
CREATE TABLE public.chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  conversation_id UUID NOT NULL DEFAULT gen_random_uuid(),
  message_role TEXT NOT NULL CHECK (message_role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  tokens_used INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for usage
CREATE POLICY "Users can view their own usage"
  ON public.usage FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own usage"
  ON public.usage FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own usage"
  ON public.usage FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for achievements
CREATE POLICY "Users can view their own achievements"
  ON public.achievements FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements"
  ON public.achievements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for chat_history
CREATE POLICY "Users can view their own chat history"
  ON public.chat_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own chat history"
  ON public.chat_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, tier)
  VALUES (NEW.id, NEW.email, 'free');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_usage_updated_at
  BEFORE UPDATE ON public.usage
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
```

## supabase/migrations/20250918104758_2b7eb14a-5189-4d16-a209-9cfee3f82d31.sql

**Explanation:** Repository file.

```sql
-- Fix security issues: Update functions with proper search_path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, tier)
  VALUES (NEW.id, NEW.email, 'free');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;
```

## supabase/migrations/20250918104819_1497e9c6-d186-4a2e-8d67-39df80bf5f47.sql

**Explanation:** Repository file.

```sql
-- Create enum for subscription tiers
CREATE TYPE public.subscription_tier AS ENUM ('free', 'plus', 'pro');

-- Create enum for achievement keys
CREATE TYPE public.achievement_key AS ENUM (
  'first_steps', 'curious_learner', 'knowledge_seeker', 'marathon_session', 
  'science_explorer', 'night_owl', 'upgrade_unlocked', 'pro_explorer', 
  'pdf_master', 'time_traveler', 'lightning_brain', 'perfectionist', 
  'collector', 'mystery_badge'
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT NOT NULL,
  tier subscription_tier NOT NULL DEFAULT 'free',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  subscription_status TEXT,
  subscription_expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create usage tracking table
CREATE TABLE public.usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  requests_today INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Create achievements table
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  achievement_key achievement_key NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_key)
);

-- Create chat history table (Pro feature)
CREATE TABLE public.chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  conversation_id UUID NOT NULL DEFAULT gen_random_uuid(),
  message_role TEXT NOT NULL CHECK (message_role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  tokens_used INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for usage
CREATE POLICY "Users can view their own usage"
  ON public.usage FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own usage"
  ON public.usage FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own usage"
  ON public.usage FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for achievements
CREATE POLICY "Users can view their own achievements"
  ON public.achievements FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements"
  ON public.achievements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for chat_history
CREATE POLICY "Users can view their own chat history"
  ON public.chat_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own chat history"
  ON public.chat_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, tier)
  VALUES (NEW.id, NEW.email, 'free');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_usage_updated_at
  BEFORE UPDATE ON public.usage
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
```

## supabase/migrations/20250919103123_3baa728d-62a3-4873-a712-bac778fb573a.sql

**Explanation:** Repository file.

```sql
-- Fix ai_logs security issues by adding user tracking
ALTER TABLE public.ai_logs ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Remove dangerous public policies from ai_logs
DROP POLICY IF EXISTS "Anyone can create ai_logs" ON public.ai_logs;
DROP POLICY IF EXISTS "Anyone can view ai_logs" ON public.ai_logs;

-- Add secure RLS policies for ai_logs
CREATE POLICY "Users can create ai_logs"
  ON public.ai_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Users can view their own ai_logs"
  ON public.ai_logs FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Remove dangerous public policies from articles
DROP POLICY IF EXISTS "Anyone can create articles" ON public.articles;
DROP POLICY IF EXISTS "Anyone can delete articles" ON public.articles;  
DROP POLICY IF EXISTS "Anyone can update articles" ON public.articles;
DROP POLICY IF EXISTS "Anyone can view articles" ON public.articles;

-- Add secure policies for articles (admin only for now)
CREATE POLICY "Authenticated users can view articles"
  ON public.articles FOR SELECT
  TO authenticated
  USING (true);

-- Add user activity tracking table
CREATE TABLE IF NOT EXISTS public.user_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  activity_type TEXT NOT NULL,
  activity_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own activity"
  ON public.user_activity FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own activity" 
  ON public.user_activity FOR SELECT
  USING (auth.uid() = user_id);
```

## tailwind.config.ts

**Explanation:** Source code file.

```ts
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundImage: {
				'gradient-cosmic': 'var(--gradient-cosmic)',
				'gradient-science': 'var(--gradient-science)',
				'gradient-subtle': 'var(--gradient-subtle)'
			},
			boxShadow: {
				'science': 'var(--shadow-science)',
				'glow': 'var(--shadow-glow)'
			},
			transitionTimingFunction: {
				'smooth': 'var(--transition-smooth)',
				'bounce-gentle': 'var(--bounce-gentle)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' },
					'50%': { boxShadow: '0 0 40px hsl(var(--primary) / 0.6)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

```

## tsconfig.app.json

**Explanation:** Repository file.

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": false,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noImplicitAny": false,
    "noFallthroughCasesInSwitch": false,

    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}

```

## tsconfig.json

**Explanation:** Repository file.

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "noImplicitAny": false,
    "noUnusedParameters": false,
    "skipLibCheck": true,
    "allowJs": true,
    "noUnusedLocals": false,
    "strictNullChecks": false
  }
}

```

## tsconfig.node.json

**Explanation:** Repository file.

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}

```

## vite.config.ts

**Explanation:** Source code file.

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

```

