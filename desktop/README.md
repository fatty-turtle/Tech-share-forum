# TSF Desktop (Electron + React + TypeScript)

## What this is

A separate desktop frontend for TSF. It’s a **standalone React+TS renderer** (Vite) wrapped in **Electron**.

## Prerequisites

- Node.js
- Your API (Express server) running on: `http://localhost:4000` (or set `VITE_API_BASE_URL`)

## Setup

```bash
cd desktop
npm install
```

## Run (dev)

In one terminal:

```bash
npm run dev
```

- Electron starts and loads the Vite dev server at `http://localhost:5173`.

## Build

```bash
npm run build
```

## Package

```bash
npm run package
```

## API base URL

- Default: `http://localhost:4000`
- Override via env var when launching:
  - `VITE_API_BASE_URL=http://localhost:4000`
