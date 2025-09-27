import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';
import { requireAuth } from '../../../../lib/middleware/requireAuth';

async function handler(req: NextApiRequest & { user?: any }, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === 'POST') {
    // Order drafting stub
    res.json({ order: 'Order drafted (stub)' });
  }
  res.status(405).end();
}

export default requireAuth(handler);
