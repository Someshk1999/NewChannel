# News Channel Project

A full-stack news website with admin controls.

## Setup

### Backend

1. Open a terminal in `backend`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start your local MongoDB server (for example with `mongod`).
4. Create a `.env` file from `.env.example`.
5. Start the backend:
   ```bash
   npm run dev
   ```

> The backend now seeds sample news automatically when the database is empty.

### Frontend

1. Open a terminal in `frontend`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npm run dev
   ```

## Default Admin Credentials

- Username: `admin`
- Password: `password123`

## Notes

- Backend runs on `http://localhost:5000`.
- Frontend runs on `http://localhost:3000`.
- Admin routes require a valid JWT from `/auth/login`.
