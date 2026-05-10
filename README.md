> This project is made with the help of Claude (1M context).

# SideKaam

India's part-time job platform — connecting freelancers with employers across 20+ cities.

## Overview

SideKaam matches workers with side gigs and short-term work via AI-powered matching, verified profiles, and UPI-native payments. Dual dashboards serve both employers and freelancers, with a separate admin panel for moderation. Includes multi-language support for broader reach.

## Features

- **AI job matching** — Profile-based recommendations
- **Verified profiles** — Trust signals on both sides
- **Employer dashboard** — Post gigs, manage applicants, payments
- **Freelancer dashboard** — Browse, apply, track earnings
- **Admin panel** — User moderation and content review
- **Hourly rate calculator** — Transparent pricing
- **UPI payments** — Native Indian payment flows
- **Multi-language** — Localized for regional users
- **SEO + Schema.org** — JSON-LD structured data
- **Mobile-first** — Responsive across devices

## Tech Stack

- **Framework:** Next.js 16.2, React 19, TypeScript
- **Styling:** Tailwind CSS 3.4
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Database:** PostgreSQL via Prisma
- **SDK:** @buildwithdarsh/sdk
- **Deploy:** Vercel

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Live: [sidekaam.work.withdarsh.com](https://sidekaam.work.withdarsh.com)

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — run ESLint

## Project Structure

```
src/
├── app/
│   ├── (dashboard)/   # Authenticated dashboards
│   ├── login/         # Auth flow
│   ├── employer/      # Employer-specific routes
│   └── admin/         # Admin panel
└── lang/              # Translation files
```
