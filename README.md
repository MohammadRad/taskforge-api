# TaskForge API

TaskForge API is a robust task management backend built with TypeScript, Express.js and Prisma. It uses PostgreSQL as the database and aims to provide a simple and secure interface for registering, updating and managing users' tasks.

## Features
- Authentication with JSON Web Tokens (access and refresh tokens)
- Secure password hashing using bcrypt
- CRUD operations for tasks (create, read, update and delete)
- Rate limiting to prevent abuse
- Prisma ORM as the data access layer
- Docker and docker-compose configuration for easy setup

## Getting Started
1. Copy `.env.example` to `.env` and fill in the required environment variables.
2. Run a PostgreSQL database (you can use `docker compose up -d db`).
3. Install dependencies and apply Prisma migrations: `npm ci` and `npx prisma migrate dev`.
4. Start the development server: `npm run dev`.
5. The API will be available at `http://localhost:4000`.

For more details, please refer to the code files.
