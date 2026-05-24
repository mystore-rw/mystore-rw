# MyStore RW

Hyperlocal neighborhood commerce platform for Kigali, Rwanda.

Shop from trusted local vendors in your neighborhood. Pay with MoMo. Get it fast.

## Tech Stack

- **Next.js 16** — App Router
- **Chakra UI v3** — Component library
- **Prisma 7** — ORM (PostgreSQL via Neon)
- **Clerk** — Phone OTP authentication
- **TanStack Query** — Data fetching
- **Zustand** — Cart state
- **Cloudinary** — Image uploads
- **Africa's Talking** — SMS notifications
- **Flutterwave** — MoMo payments

## Getting Started

1. Fill in `.env.local` with your keys (see the file for all required vars)
2. Set up a [Neon](https://neon.tech) PostgreSQL database
3. Run `npx prisma migrate dev` to apply the schema
4. Run `npm run dev`

## Routes

| Path | Description |
|------|-------------|
| `/` | Homepage + neighborhood selector |
| `/[neighborhood]` | Neighborhood product feed |
| `/shop/[slug]` | Vendor storefront |
| `/product/[id]` | Product detail |
| `/cart` | Cart |
| `/checkout` | Checkout + MoMo payment |
| `/vendor/onboarding` | Vendor signup |
| `/vendor/dashboard` | Vendor dashboard |
| `/vendor/products` | Product management |
| `/vendor/orders` | Order management |
