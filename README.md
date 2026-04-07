# StopWatch

A clean, modern stopwatch app built with React.

## Features

- Start, pause, and reset stopwatch
- Lap tracking with latest lap on top
- Fastest and slowest lap highlighting
- Mobile-friendly responsive UI

## Run Locally

```bash
npm install
npm start
```

Then open `http://localhost:3000`.

## Build for Production

```bash
npm run build
```

## Deploy to Vercel

### Option 1: Vercel Dashboard (recommended)

1. Push this repo to GitHub.
2. Go to Vercel and click **Add New Project**.
3. Import your `StopWatch` repo.
4. Vercel will detect Create React App automatically.
5. Click **Deploy**.

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the CLI prompts and then run:

```bash
vercel --prod
```

The included `vercel.json` is set up for proper SPA routing.
