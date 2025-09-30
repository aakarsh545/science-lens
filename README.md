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
