# News Channel Backend

A simple Express backend for the News Channel Project.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file based on `.env.example`.
3. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `POST /auth/login` - Admin login returns JWT.
- `GET /news` - Get all news articles.
- `GET /news/:id` - Get a single news article.
- `POST /news` - Create a news article (admin only).
- `PUT /news/:id` - Update a news article (admin only).
- `DELETE /news/:id` - Delete a news article (admin only).

## Notes

- Use `Authorization: Bearer <token>` for protected requests.
- Search query supported on `/api/news?search=term`.
- Pagination supported with `/api/news?page=1&limit=8`.
