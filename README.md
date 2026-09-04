Barrison Gadget

Barrison Gadget is a full-featured, high-performance e-commerce platform for gadgets and electronics. Built with Next.js and TypeScript, the application leverages a modern, distributed architecture featuring state management, secure payment processing, caching, rate-limiting, and robust server-side validation.

🚀 Features
Secure Authentication: User sign-up and login powered by NextAuth.js with secure password hashing using crypto.
Data Validation: Strict runtime type checking and authentication validation schemas enforced via Zod.
Global State Management: Fast, lightweight, and reactive client-side store management using Zustand.
Secure Checkout: Seamless payment collection integrated via the Paystack API.
API Rate Limiting: Security infrastructure to prevent abuse and brute-force attacks powered by Redis.
Transactional Emailing: Automated purchase confirmations and communications sent using Resend.
Cloud Media Hosting: High-fidelity product gallery assets optimized and served through Cloudinary.

🛠️ Tech Stack
Framework: Next.js
Language: TypeScript
Database & ORM: MongoDB & Mongoose
State Management: Zustand
Authentication & Validation: NextAuth.js, Crypto, Zod
Infrastructure & Security: Redis (Upstash/Local) for Rate Limiting
Payment Gateway: Paystack
Email & Media: Resend, Cloudinary
Styling: Tailwind CSS

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
