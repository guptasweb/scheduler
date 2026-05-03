# Social Post Scheduler

Rails API backend for scheduling social media posts. The application lives under [`rails-api/`](rails-api/).

## Requirements

- Ruby 3.2.11 (see [`rails-api/Gemfile`](rails-api/Gemfile))
- Bundler

## Quick start

```bash
cd rails-api
bundle install
bin/rails db:prepare
bin/rails server -p 3000
```

`db:prepare` creates the SQLite databases, runs migrations, and loads seeds when appropriate.

### Frontend (Vite)

The React app lives in [`react-frontend/`](react-frontend/). The dev server is fixed to **port 5173** (see [`react-frontend/vite.config.js`](react-frontend/vite.config.js)).

```bash
cd react-frontend
npm install
npm run dev
```

Then open **http://localhost:5173**. The API defaults to **http://localhost:3000** (override with `VITE_API_BASE_URL` in `.env.development.local` if needed).

## Documentation

Endpoints, query parameters, and how to run tests are documented in [`rails-api/README.md`](rails-api/README.md).
