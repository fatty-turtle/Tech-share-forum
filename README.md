# Tech-Share-Forum (TSF)

## Project Setup Instructions

### Server Setup

1. **Install the dependencies**:

   ```
   cd server
   npm install
   ```

2. **Setup env.**:
   - Copy `.env.example` to `server/.env` if exists, or create `.env` in server/ with DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, JWT_SECRET, etc. (see root .env.example).

3. **Run server (npm run dev 1st time)**:

   ```
   npm run dev
   ```

   - Starts development server on port 4000, auto-initializes MySQL DB/tables.

4. **Run seed (npm run seed) to finish setup server**:
   ```
   npm run seed
   ```

   - Seeds admin user, sample posts/tags/users data.

### Client Setup

1. **Install dependencies**:

   ```
   cd client
   npm install
   ```

2. Run `npm run dev` to start (after server).

## Full Stack Run

```
# Terminal 1
cd server && npm install && npm run dev  # Wait for ready
# Then npm run seed

# Terminal 2
cd client && npm install && npm run dev
```

## Prerequisites

- Node.js >=20
- MySQL 8+ running
- Configure .env vars (DB, JWT)

Project structure: client/ (Next.js), server/ (Express + MySQL).

Enjoy TSF! 🚀
