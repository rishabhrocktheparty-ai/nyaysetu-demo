import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { requireAuth } from '../../lib/middleware/requireAuth';

async function handler(req: NextApiRequest & { user?: any }, res: NextApiResponse) {
  // For demo: aggregate = all cases, all tasks
  const cases = await prisma.case.findMany({});
  const tasks = await prisma.task.findMany({});
  res.json({ cases, tasks });
}

export default requireAuth(handler);
