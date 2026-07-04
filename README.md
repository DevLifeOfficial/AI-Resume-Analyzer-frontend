<div align="center">

# 📄 AI Resume Analyzer — Frontend

**Drop a resume in, get real ATS feedback out.**

A full marketing site + auth flow + AI resume analyzer, built with Next.js App Router and a GraphQL backend.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen?style=for-the-badge)](https://ai-resume-analyzer-frontend-nu-ruby.vercel.app/)
![Next.js](https://img.shields.io/badge/Next.js-App_Router-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)

**🔗 [ai-resume-analyzer-frontend-nu-ruby.vercel.app](https://ai-resume-analyzer-frontend-nu-ruby.vercel.app/)**

</div>

---

### 📸 Preview

<div align="center">

<!-- Swap these for real screenshots or a screen-recorded GIF: landing page hero, upload flow, animated results -->
<img src="https://via.placeholder.com/800x420/0b1220/05c8c8?text=Landing+Page" width="48%" alt="Landing page" />
<img src="https://via.placeholder.com/800x420/0b1220/05c8c8?text=Animated+ATS+Results" width="48%" alt="Analyzer results" />

</div>

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Routes](#-routes)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Authentication](#-authentication)
- [Roadmap](#-roadmap)

---

## ✨ Features

| | |
|---|---|
| 🏠 **Marketing landing page** | Hero, Features, How It Works, Live Demo, Pricing, Testimonials, Trusted-by, World Impact, and CTA sections |
| 🔐 **Auth flow** | Login (`Authentication`) and `Register` routes under a dedicated `(auth)` route group |
| 🗂️ **Drag-and-drop resume upload** | PDF/DOCX with inline validation |
| 🤖 **AI-powered analysis** | Live GraphQL calls via Apollo Client — no mock data |
| 🎬 **Animated results** | ATS score, identified skills, strengths, and suggested fixes |
| 🗃️ **Global state via Zustand** | Lightweight client state in `/store` |

## 🛠️ Tech Stack

<div align="left">

![Next.js](https://img.shields.io/badge/Next.js-App_Router-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-Styling-38BDF8?logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Components-000000)
![Apollo Client](https://img.shields.io/badge/Apollo_Client-GraphQL-311C87?logo=apollographql&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-State-orange)
![pnpm](https://img.shields.io/badge/pnpm-Package_Manager-F69220?logo=pnpm&logoColor=white)

</div>

## 📁 Project Structure

```
frontend/
├── app/
│   ├── (auth)/
│   │   ├── Authentication/     # Login
│   │   ├── Register/
│   │   └── layout.tsx
│   ├── (main)/
│   │   ├── Analyzer/
│   │   │   └── Components/
│   │   │       ├── ResumeAnalyzer.tsx   # Upload, options, GraphQL call, results
│   │   │       └── Spinner.tsx
│   │   ├── Home/
│   │   │   ├── Components/
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── FeaturesSection.tsx
│   │   │   │   ├── HowitsWorkSection.tsx
│   │   │   │   ├── LiveDemoSection.tsx
│   │   │   │   ├── PricingSection.tsx
│   │   │   │   ├── TestimonialsSection.tsx
│   │   │   │   ├── TrustedSelection.tsx
│   │   │   │   ├── WorldImpactSection.tsx
│   │   │   │   └── CtaSection.tsx
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── globals.css
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Root entry (redirects into (main)/Home)
├── components/                  # Shared / shadcn UI primitives
├── data/
│   ├── index.ts
│   └── site-data.ts             # Landing page copy & content
├── GraphQL/
│   ├── apollo.ts                # Apollo Client instance
│   ├── apolloProvider.tsx       # Client provider wrapper
│   └── graphql.ts               # Queries & mutations
├── layout/
│   ├── header.tsx
│   └── footer.tsx
├── lib/
│   ├── config/
│   ├── context/
│   ├── hooks/
│   ├── utils.ts
│   └── validation.ts            # Custom form validators (no external library)
├── store/                       # Zustand stores
├── utils/
├── public/
├── .env
└── components.json              # shadcn/ui config
```

## 🧭 Routes

| Route group | Path | Purpose |
|---|---|---|
| `(main)` | `/` | Landing page — hero, features, pricing, testimonials, etc. |
| `(main)` | `/analyzer` | Resume upload + AI analysis tool |
| `(auth)` | `/authentication` | Login |
| `(auth)` | `/register` | Sign up |

> Route groups `(auth)` and `(main)` don't add to the URL path — they just let each area share its own `layout.tsx` (e.g. auth pages get a minimal layout, main pages get the header/footer).

## 🚀 Getting Started

This project uses **pnpm**.

```bash
pnpm install
cp .env.example .env   # see Environment Variables below
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_GRAPHQL_ENDPOINT` | URL of the GraphQL API (Apollo Client target) |

## 🔐 Authentication

Login and registration live under `app/(auth)`. On success, the backend issues a JWT (see the backend README) which Apollo Client attaches to subsequent GraphQL requests — check `GraphQL/apollo.ts` for exactly how the auth link is wired up before changing token storage.

## 🗺️ Roadmap

- [ ] Resume history view (past analyses per user)
- [ ] Re-analyze against a new job description without re-uploading
- [ ] Downloadable PDF of the analysis report
- [ ] Replace preview placeholders with real screenshots/GIF

---

<div align="center">

Built by [Ram](https://github.com/) · [Live Demo](https://ai-resume-analyzer-frontend-nu-ruby.vercel.app/) · MIT License

</div>