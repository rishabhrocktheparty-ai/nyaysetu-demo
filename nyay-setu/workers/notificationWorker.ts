import { Worker, Queue } from 'bullmq';
import { prisma } from '../lib/prisma';
import { sendNotification } from '../lib/notify/provider';

const connection = { url: process.env.REDIS_URL };
const notificationQueue = new Queue('notification', { connection });

new Worker('notification', async job => {
  const { userId, type, message } = job.data;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return;
  await sendNotification({ to: user.phone || user.email, type, message });
  await prisma.notification.updateMany({
    where: { userId, type, message, status: 'queued' },
    data: { status: 'sent', sentAt: new Date() },
  });
}, { connection, concurrency: 2 });

console.log('Notification worker running...');
