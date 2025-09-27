# NYAY-Setu Full Stack Demo Implementation

This PR delivers a fully scaffolded, demo-ready NYAY Setu web app (Next.js + TypeScript) with Citizen, Court Employee, Lawyer, and Judge modules, cross-cutting auth, uploads, notifications, background workers, AI stubs, blockchain anchor stub, CI/CD, and observability — ready for a single integrated PR.

## What’s included
- All modules: Citizen, Court Employee, Lawyer, Judge
- Secure JWT auth, OTP stub, rate-limits
- File uploads (S3, SHA-256, blockchain anchor stub)
- Case management, evidence, analysis, podcast, notebook
- Background workers (BullMQ, Redis)
- OpenAI/LLM stubs for draft/analysis
- Notifications (SMS/email stub)
- CI/CD (GitHub Actions, Vercel-ready)
- Observability (Sentry, healthz)
- Security best practices
- Docs: arch, runbook, security

## Merge Checklist
- [ ] All modules/pages load and function as described
- [ ] Auth, uploads, and background jobs work end-to-end
- [ ] Prisma migrations applied and DB up
- [ ] CI pipeline passes (lint, test, build)
- [ ] Vercel deploys successfully
- [ ] Docs reviewed

---

See `/docs/arch.md`, `/docs/runbook.md`, `/docs/security.md` for details.
