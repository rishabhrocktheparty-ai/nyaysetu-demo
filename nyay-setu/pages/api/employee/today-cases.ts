import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { requireAuth } from '../../../lib/middleware/requireAuth';

async function handler(req: NextApiRequest & { user?: any }, res: NextApiResponse) {
  const { courtId } = req.query;
  // For demo: today = all cases
  const cases = await prisma.case.findMany({});
  res.json({ cases });
}

export default requireAuth(handler);
