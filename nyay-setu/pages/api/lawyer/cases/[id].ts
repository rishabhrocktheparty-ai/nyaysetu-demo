import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';
import { requireAuth } from '../../../../lib/middleware/requireAuth';

async function handler(req: NextApiRequest & { user?: any }, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === 'POST') {
    // Save draft
    const { content } = req.body;
    const assignment = await prisma.lawyerAssignment.findFirst({ where: { caseId: id as string, lawyerId: req.user.id } });
    if (!assignment) return res.status(404).json({ error: 'Not assigned' });
    const draft = await prisma.draft.create({
      data: { assignmentId: assignment.id, content },
    });
    return res.json({ draft });
  }
  res.status(405).end();
}

export default requireAuth(handler);
