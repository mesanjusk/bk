# Badhte Kadam — NGO Website

A NGO website with a Next.js 15 + React Three Fiber frontend (deployed on
Vercel) and a separate Express/MongoDB backend (deployed on Render). The two
are independent deployments that talk to each other over HTTP — the frontend
never touches MongoDB directly.

## Structure

```
bk/
├── frontend/   Next.js 15 (App Router) + React Three Fiber/Three.js + Tailwind CSS (Vercel)
└── backend/    Node + Express + MongoDB/Mongoose (Render)
```

## Local development

### Backend

```
cd backend
cp .env.example .env   # fill in MONGODB_URI
npm install
npm run seed            # optional: seed sample scholars
npm run dev
```

Backend runs on `http://localhost:5000` by default.

### Frontend

```
cd frontend
cp .env.example .env   # set NEXT_PUBLIC_API_URL=http://localhost:5000/api
npm install
npm run dev
```

Frontend runs on `http://localhost:3000` by default.

## Deployment

- **Frontend (Vercel)**: set the project root to `frontend/` (framework
  preset: Next.js, build command `next build` — Vercel detects this
  automatically). Set the `NEXT_PUBLIC_API_URL` environment variable to your
  deployed backend URL (e.g. `https://your-api.onrender.com/api`).
- **Backend (Render)**: set the project root to `backend/`, build command
  `npm install`, start command `npm start`. Set `MONGODB_URI`,
  `CORS_ORIGIN` (your Vercel URL) and `PORT` environment variables. Also set
  `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `JWT_SECRET` (admin login) and either
  `CLOUDINARY_URL` or the three separate `CLOUDINARY_CLOUD_NAME` /
  `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` values from your Cloudinary
  dashboard (image uploads) — these are declared in `render.yaml` but must
  be filled in with real values in the Render dashboard.

The frontend and backend are deployed and scaled independently. The frontend
is a static/edge-rendered Next.js app that calls the backend's REST API over
`NEXT_PUBLIC_API_URL`; it holds no database credentials and can be redeployed
or rolled back without touching the backend, and vice versa.

## Admin

Visit `/admin/login` and sign in with the `ADMIN_USERNAME` /
`ADMIN_PASSWORD` configured on the backend. From the admin dashboard you
can manage scholars and stories, and on **Site Settings** you can replace
the homepage hero image/video. Every image placeholder (hero, scholar
photos, story images) has an "Upload" control backed by Cloudinary, or you
can paste an image URL directly.

## Tech stack

**Frontend**
- Next.js 15 (App Router)
- React Three Fiber + Three.js + @react-three/drei — 3D scenes (homepage
  hero emblem, the scholars archive bookshelf, poster-creator flourish)
- Framer Motion — page transitions, modals, poster/template animations
- GSAP (+ ScrollTrigger) — scroll-driven reveals and counters (impact
  stats, about timeline, hero text)
- Tailwind CSS
- Konva / react-konva — the poster editor's 2D canvas engine

**Backend**
- Node.js, Express, Mongoose, MongoDB
- Cloudinary (image/video uploads)
- JWT-based admin auth
