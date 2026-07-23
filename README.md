# Badhte Kadam — NGO Website

A NGO website built with Next.js 15 + React Three Fiber. The site and its
API run as a single Next.js app — deployed entirely on Vercel — with API
route handlers under `frontend/src/app/api/*` talking directly to
MongoDB/Cloudinary. There is no separate backend service.

## Structure

```
bk/
└── frontend/   Next.js 15 (App Router) + React Three Fiber/Three.js + Tailwind CSS
    ├── src/app/api/   Route handlers (scholars, stories, settings, contact, auth, uploads)
    ├── src/lib/       MongoDB connection, Cloudinary config, admin auth helper
    └── src/models/    Mongoose models
```

## Local development

```
cd frontend
cp .env.example .env   # fill in MONGODB_URI and the other variables below
npm install
npm run seed            # optional: seed sample scholars
npm run dev
```

The app (site + API) runs on `http://localhost:3000` by default.

## Environment variables

Set these in `frontend/.env` locally and in the Vercel project's
Environment Variables settings for deployment:

- `MONGODB_URI` — MongoDB connection string.
- `JWT_SECRET` — long random string used to sign admin auth tokens.
- `ADMIN_USERNAME` / `ADMIN_PASSWORD` — admin login credentials.
- `CLOUDINARY_URL`, or the three separate `CLOUDINARY_CLOUD_NAME` /
  `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` values from your
  Cloudinary dashboard (image/video uploads).

## Deployment

Deploy on **Vercel** with the project root set to `frontend/` (framework
preset: Next.js, build command `next build` — Vercel detects this
automatically). Set the environment variables listed above in the Vercel
project settings. Every request — pages and `/api/*` routes alike — is
served by the same Vercel deployment, so there is nothing else to deploy
or configure elsewhere.

## Admin

Visit `/admin/login` and sign in with the `ADMIN_USERNAME` /
`ADMIN_PASSWORD` configured on the project. From the admin dashboard you
can manage scholars and stories, and on **Site Settings** you can replace
the homepage hero image/video. Every image placeholder (hero, scholar
photos, story images) has an "Upload" control backed by Cloudinary, or you
can paste an image URL directly.

## Tech stack

- Next.js 15 (App Router) — pages and API route handlers
- React Three Fiber + Three.js + @react-three/drei — 3D scenes (homepage
  hero emblem, the scholars archive bookshelf, poster-creator flourish)
- Framer Motion — page transitions, modals, poster/template animations
- GSAP (+ ScrollTrigger) — scroll-driven reveals and counters (impact
  stats, about timeline, hero text)
- Tailwind CSS
- Konva / react-konva — the poster editor's 2D canvas engine
- Mongoose / MongoDB — data storage, accessed directly from API routes
- Cloudinary — image/video uploads
- JWT-based admin auth
