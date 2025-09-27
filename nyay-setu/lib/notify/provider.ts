// Notification provider stub (SMS/email)
export async function sendNotification({ to, type, message }: { to: string, type: string, message: string }) {
  // In production, integrate with Twilio, MSG91, etc.
  // For demo, just log
  console.log(`[NOTIFY] [${type}] to ${to}: ${message}`);
  return { status: "sent" };
}
