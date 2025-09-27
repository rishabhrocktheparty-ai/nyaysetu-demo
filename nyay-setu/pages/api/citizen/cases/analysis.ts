import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';
import { requireAuth } from '../../../../lib/middleware/requireAuth';

async function handler(req: NextApiRequest & { user?: any }, res: NextApiResponse) {
  const { id } = req.query;
  const analyses = await prisma.analysis.findMany({ where: { caseId: id as string } });
  res.json({ analyses });
}

export default requireAuth(handler);
