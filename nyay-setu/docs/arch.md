# NYAY-Setu Architecture

NYAY-Setu is a modular, full-stack legal workflow platform for Indian courts, built with Next.js, TypeScript, Prisma, PostgreSQL, Redis, S3, and Vercel. It features role-based modules (Citizen, Court Employee, Lawyer, Judge), secure authentication, file uploads, background workers, AI/LLM stubs, blockchain anchor stub, notifications, and observability.

## Key Components
- **Frontend**: Next.js (TypeScript, TailwindCSS)
- **Backend**: Next.js API routes, Prisma ORM
- **Database**: PostgreSQL (Neon/hosted)
- **Queue/Workers**: Redis + BullMQ
- **File Storage**: AWS S3 (or compatible)
- **AI/LLM**: OpenAI API stub
- **Notifications**: SMS/email stub
- **Blockchain**: Anchor stub (Polygon testnet optional)
- **CI/CD**: GitHub Actions, Vercel
- **Observability**: Sentry, healthz

## Security
- JWT auth (httpOnly, SameSite=Strict)
- No raw Aadhaar storage
- Rate-limiting (Redis)
- Secure file uploads (S3, SHA-256)

## See [runbook.md](runbook.md) for operations and [security.md](security.md) for security details.
