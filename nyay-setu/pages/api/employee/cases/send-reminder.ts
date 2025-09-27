import type { NextApiRequest, NextApiResponse } from 'next';
import { Queue } from 'bullmq';
import { prisma } from '../../../../lib/prisma';
import { requireAuth } from '../../../../lib/middleware/requireAuth';

const notificationQueue = new Queue('notification', { connection: { url: process.env.REDIS_URL } });

async function handler(req: NextApiRequest & { user?: any }, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { id } = req.query;
  const { userId, message } = req.body;
  await notificationQueue.add('notification:send', { userId, type: 'reminder', message });
  await prisma.notification.create({ data: { userId, type: 'reminder', message } });
  res.json({ status: 'queued' });
}

export default requireAuth(handler);
