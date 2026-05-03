# Social Post Scheduler — Rails API

A Rails 7 API-only backend for scheduling social media posts.

## Prerequisites

- Ruby **3.2.11**
- Bundler

## Setup

```bash
bundle install
bin/rails db:prepare
bin/rails server -p 3000
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/v1/posts | List all posts |
| GET | /api/v1/posts/:id | Get a single post |
| POST | /api/v1/posts | Create a post |
| PATCH | /api/v1/posts/:id | Update a post |
| DELETE | /api/v1/posts/:id | Delete a post |
| GET | /api/v1/posts/:post_id/photos | List photos for a post |
| POST | /api/v1/posts/:post_id/photos | Add a photo to a post |
| DELETE | /api/v1/posts/:post_id/photos/:id | Remove a photo |

## Query Parameters (GET /api/v1/posts)

- `?status=scheduled|published|cancelled` — filter by status
- `?scope=upcoming` — only future posts
- `?scope=past` — only past posts

## Running tests

```bash
bundle exec rspec
```
