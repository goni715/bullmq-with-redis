# BullMQ with Redis - Express Backend

A Node.js backend application demonstrating how to use [BullMQ](https://docs.bullmq.io/) and [Redis](https://redis.io/) for robust background job processing. This project implements specific queues for handling asynchronous tasks like sending emails (via Nodemailer) and notifications.

## About BullMQ & Project Aim

**[BullMQ](https://docs.bullmq.io/)** is a powerful, fast, and reliable Node.js library for handling distributed jobs and messages, built natively on top of Redis. 

**Aim of this Project:**
The primary goal of integrating BullMQ is to **decouple heavy, time-consuming tasks** from the main API thread. For instance, instead of making a user wait for an email to be sent during an API request, the server simply adds an "email job" to a Redis-backed queue and immediately responds to the user. A separate background worker then picks up this job and processes the email asynchronously. This architecture ensures that the main Express application remains blazing fast, highly responsive, and capable of handling high traffic without blocking the event loop.

## Project Structure

```text
bullmq-with-redis/
├── src/
│   ├── config/
│   │   ├── env.ts                  # Environment setup
│   │   └── redis.ts                # Redis connection configuration
│   ├── queues/
│   │   ├── email.queue.ts          # Queue for sending emails
│   │   └── notification.queue.ts   # Queue for notifications
│   ├── utils/
│   │   └── sendEmail.ts            # Nodemailer utility function
│   ├── workers/
│   │   ├── email.worker.ts         # Worker processing email jobs
│   │   └── notification.worker.ts  # Worker processing notification jobs
│   ├── index.ts                    # Main application entry point (Express)
│   ├── producer.ts                 # Script to add jobs to queues
│   └── worker.ts                   # Script to run all workers
├── .env.example                    # Example environment variables
├── package.json                    # Project dependencies and scripts
└── README.md                       # Project documentation
```

## Prerequisites

- [Node.js](https://nodejs.org/) installed
- [Redis](https://redis.io/docs/getting-started/installation/) server running (locally or remotely)

## Redis Setup

Ensure your Redis server is running. The Redis connection details (e.g., `REDIS_HOST`, `REDIS_PORT`, or `REDIS_URL`) should be specified in the `.env` file. Redis is utilized across the app as a message broker for queues.

If you don't have Redis installed locally, you can easily run it using Docker:

**Start a Redis container:**
```bash
docker run -d --name redis-container -p 6379:6379 redis
```

**(Optional) Access the Redis CLI inside the container:**
```bash
docker exec -it redis-container redis-cli
```

## Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables:
   Copy the `.env.example` file to create your own `.env` file, then fill in your specific credentials (especially your SMTP details for sending emails).

   ```bash
   cp .env.example .env
   ```

## Available Scripts

The project provides several scripts to run different components:

- `npm run dev`: Run the main application in development mode with automatic reloading (`tsx`).
- `npm run producer`: Run the producer to test adding new jobs to the queues.
- `npm run worker`: Run the workers to start processing the queued jobs.
- `npm run build`: Compile the TypeScript code to JavaScript in the `dist` folder.
- `npm start`: Run the compiled production application.
- `npm run lint`: Run ESLint to check for code issues.
- `npm run lint:fix`: Run ESLint and automatically fix issues.

## Technologies Used

- **TypeScript** - Strongly typed JavaScript
- **Express** - Web framework for handling APIs
- **BullMQ** - Fast, reliable, Redis-based queue for Node.js
- **ioredis** - A robust, performance-focused Redis client
- **Nodemailer** - Module for sending emails from Node.js

## What I Learned

Through building this project, I gained practical experience with several important backend concepts:

- **Background Job Processing:** Learned how to offload time-consuming tasks (like sending emails) from the main API thread using a message queue, significantly improving application response times.
- **BullMQ & Redis Integration:** Explored how to set up robust queues and workers using BullMQ backed by Redis, including connection handling and job lifecycle management.
- **Producer-Worker Architecture:** Understood the separation of concerns between producers (which add jobs to the queue) and workers (which process those jobs in the background).
- **Project Structuring:** Learned how to cleanly organize a backend project by separating configurations, queue definitions, worker logic, and utility functions into dedicated directories.

