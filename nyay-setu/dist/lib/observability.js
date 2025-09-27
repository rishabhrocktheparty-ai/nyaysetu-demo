import * as Sentry from "@sentry/node";
export function initObservability() {
    if (process.env.SENTRY_DSN) {
        Sentry.init({ dsn: process.env.SENTRY_DSN });
    }
}
export function captureError(error) {
    if (process.env.SENTRY_DSN) {
        Sentry.captureException(error);
    }
    else {
        // fallback: log
        console.error(error);
    }
}
