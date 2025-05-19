# Backend Setup Guide

Configuration for the Dashboard backend, built with **NestJS**, **Gemini API**, **PrismaORM**, and **PostgreSQL**.

## Prerequisites

- **Node.js**: Version 18.x or higher. Check with `node -v`.
- **Docker**: Installed and running.

## Setup

Follow these steps from the repository root:

1. **Navigate to Backend Directory**  
   Enter the backend folder:

   ```bash
   cd backend
   ```

2. **Start PostgreSQL Container**  
   With Docker running, start the database container:

   ```bash
   docker-compose up
   ```

   _Note_: The container may take a few minutes to be ready and the PostgreSQL database to be available. Check terminal logs to confirm.

3. **Install Dependencies**  
   Install project dependencies:

   ```bash
   npm i
   ```

4. **Configure Environment Variables**  
   Rename the example file to `.env`:

   ```bash
   mv .env.example .env
   ```

   In the `.env` file, add the `GEMINI_API_KEY` obtained from [Google AI Studio](https://aistudio.google.com/app/apikey). Verify other variables, like `DATABASE_URL`, are correct.

5. **Run Database Migrations**  
   With the PostgreSQL container active, apply Prisma migrations:

   ```bash
   npx prisma migrate dev
   ```

6. **(Optional) Seed Database**  
   Run the seed script to populate the database with initial data:

   ```bash
   npm run seed
   ```

7. **Build Application**  
   Generate the backend build:

   ```bash
   nest build
   ```

8. **Start Backend**  
   Run the application:

   ```bash
   node dist/src/main
   ```

9. **API Documentation via Swagger**  
   Access http://localhost:3000/api
