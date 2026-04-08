# Amplify Access — Vercel Setup

This project is a Vite + React wrapper around your Amplify Access website mock-up.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to Vercel

1. Create a new GitHub repository.
2. Upload all files from this folder to the repository.
3. In Vercel, choose **Add New Project**.
4. Import the GitHub repository.
5. Vercel should auto-detect **Vite**.
6. Keep the default settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
7. Click **Deploy**.

## Notes

- `vercel.json` includes a rewrite so the single-page app keeps working on refresh.
- Your main website component is in `src/App.jsx`.
