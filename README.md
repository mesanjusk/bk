# Mita Foundation — NGO Website

A clean, minimal MERN-stack website for an NGO. Monorepo with a React
frontend (deployed on Vercel) and an Express/MongoDB backend (deployed on
Render).

## Structure

```
bk/
├── frontend/   React + Vite + Tailwind CSS (Vercel)
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
cp .env.example .env   # set VITE_API_URL=http://localhost:5000/api
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` by default.

## Deployment

- **Frontend (Vercel)**: set the project root to `frontend/`, build command
  `npm run build`, output directory `dist`. Set the `VITE_API_URL`
  environment variable to your deployed backend URL (e.g.
  `https://your-api.onrender.com/api`).
- **Backend (Render)**: set the project root to `backend/`, build command
  `npm install`, start command `npm start`. Set `MONGODB_URI`,
  `CORS_ORIGIN` (your Vercel URL) and `PORT` environment variables.

## Tech stack

- React 18, React Router, Tailwind CSS, Vite
- Node.js, Express, Mongoose, MongoDB
