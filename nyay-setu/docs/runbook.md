# NYAY-Setu Runbook

## Setup
1. Copy `.env.example` to `.env` and fill in secrets.
2. Run `npm install`
3. Run `npx prisma generate`
4. Run `npx prisma migrate dev --name init`
5. Start dev server: `npm run dev`

## Operations
- **Health check**: GET `/api/healthz`
- **Migrations**: `npx prisma migrate deploy`
- **Workers**: Run with `node workers/analysisWorker.ts` etc.
- **Deploy**: Push to Vercel or run `npm run build && npm start`

## Troubleshooting
- Check logs for errors
- Ensure Redis, Postgres, and S3 are reachable
- For auth issues, clear cookies and re-login

## See [arch.md](arch.md) and [security.md](security.md) for more.
