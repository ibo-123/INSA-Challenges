# Ibrahim Portfolio (Next.js)

Full-stack portfolio with Next.js App Router for both frontend and API.

## Run

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Owner settings (password protected): [http://localhost:3000/settings](http://localhost:3000/settings)

Set in `.env.local`:

- `MONGO_URI`
- `ADMIN_PASSWORD` — your private settings password
- `ADMIN_SECRET` — cookie signing secret

## API routes

- `GET /api/profile` · `POST/PUT` (admin only)
- `GET /api/skills` · `POST` / `PUT/DELETE /api/skills/[id]` (writes admin only)
- `GET /api/projects` · `POST` / `PUT/DELETE /api/projects/[id]` (writes admin only)
- `POST /api/auth/login` · `POST /api/auth/logout` · `GET /api/auth/me`
