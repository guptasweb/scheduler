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

## Documentation

Endpoints, query parameters, and how to run tests are documented in [`rails-api/README.md`](rails-api/README.md).
