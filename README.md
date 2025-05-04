# Project Readme

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It uses **tRPC** for type-safe API routing, **Prisma** for database management, **Supabase** for backend services, **Resend** for transactional emails, and **Stripe** for payment processing.

## Getting Started

1. Clone the repository and navigate into the project directory:

    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Configure the environment variables:

    ```bash
    cp .env.example .env
    ```

    Fill in the required values in the `.env` file:

    - Get `DATABASE_URL` from your Supabase project settings
    - Add necessary keys for Stripe, Resend, and other services

4. Set up Prisma:

    ```bash
    npx prisma generate
    npx prisma migrate dev
    npx prisma db push
    ```

    This will:

    - Generate the Prisma client
    - Apply database migrations
    - Push your schema to the database

5. Start the development server:
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application. You can edit `app/page.tsx`, and changes will reflect automatically in the browser.

## Features

-   Server-side rendering
-   Type-safe APIs
-   Secure payment processing
-   Database management
-   Email services

## Technologies

-   [Next.js](https://nextjs.org/)
-   [tRPC](https://trpc.io/)
-   [Prisma](https://www.prisma.io/)
-   [Supabase](https://supabase.com/)
-   [Resend](https://resend.com/)
-   [Stripe](https://stripe.com/)
