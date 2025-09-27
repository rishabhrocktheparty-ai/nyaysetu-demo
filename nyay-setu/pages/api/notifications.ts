import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../lib/middleware/requireAuth';

async function handler(req: NextApiRequest & { user?: any }, res: NextApiResponse) {
  if (req.method === 'GET') {
    const notifications = await prisma.notification.findMany({ where: { userId: req.user.id } });
    return res.json({ notifications });
  }
  res.status(405).end();
}

export default requireAuth(handler);
