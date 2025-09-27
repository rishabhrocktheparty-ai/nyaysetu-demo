# NYAY-Setu Security

- JWT auth (httpOnly, SameSite=Strict, Secure)
- No raw Aadhaar or sensitive PII stored
- Rate-limiting on sensitive endpoints
- S3 presigned URLs for uploads
- Passwords hashed (bcryptjs)
- No secrets in repo; use `.env`
- Sentry for error monitoring (optional)
- Audit logs for key actions
