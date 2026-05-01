# Social Post Scheduler — Rails API

A Rails 7 API-only backend for scheduling social media posts.

## Setup

```bash
bundle install
rails db:create db:migrate db:seed
rails server -p 3000
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

## Running Tests

```bash
bundle exec rspec
```
