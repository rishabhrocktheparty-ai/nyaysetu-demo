import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { requireAuth } from '../../../lib/middleware/requireAuth';

async function handler(req: NextApiRequest & { user?: any }, res: NextApiResponse) {
  const { lawyerId } = req.query;
  const assignments = await prisma.lawyerAssignment.findMany({ where: { lawyerId: lawyerId as string }, include: { case: true } });
  res.json({ cases: assignments.map(a => a.case) });
}

export default requireAuth(handler);
