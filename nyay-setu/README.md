# NYAY-Setu

A full-stack, production-ready legal workflow platform for Indian courts, built with Next.js, TypeScript, Prisma, PostgreSQL, Redis, S3, and Vercel. Includes Citizen, Court Employee, Lawyer, and Judge modules, secure authentication, uploads, notifications, background workers, AI stubs, blockchain anchor stub, CI/CD, and observability.

## Features
- Modular roles: Citizen, Court Employee, Lawyer, Judge
- Secure JWT auth (httpOnly cookies)
- File uploads (S3, SHA-256, blockchain anchor stub)
- Case management, evidence, analysis, podcast, notebook
- Background workers (BullMQ, Redis)
- OpenAI/LLM stubs for draft/analysis
- Notifications (SMS/email stub)
- CI/CD (GitHub Actions, Vercel-ready)
- Observability (Sentry, healthz)
- Security best practices

## Quickstart

```sh
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

## Deployment
- Vercel deploy-ready
- See `.env.example` for required environment variables

## Docs
- [Architecture](docs/arch.md)
- [Runbook](docs/runbook.md)
- [Security](docs/security.md)
- [PR Template](docs/pr_template.md)
