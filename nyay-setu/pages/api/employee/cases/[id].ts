import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';
import { requireAuth } from '../../../../lib/middleware/requireAuth';

async function handler(req: NextApiRequest & { user?: any }, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === 'POST') {
    // Mark attendance
    const { userId, status } = req.body;
    const hearing = await prisma.hearing.findFirst({ where: { caseId: id as string } });
    if (!hearing) return res.status(404).json({ error: 'No hearing' });
    const attendance = await prisma.attendance.create({
      data: { hearingId: hearing.id, userId, status },
    });
    return res.json({ attendance });
  }
  res.status(405).end();
}

export default requireAuth(handler);
