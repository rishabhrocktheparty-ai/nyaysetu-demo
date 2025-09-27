import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { requireAuth } from '../../lib/middleware/requireAuth';

async function handler(req: NextApiRequest & { user?: any }, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, description, assigneeId, dueDate } = req.body;
    const task = await prisma.task.create({
      data: { title, description, assigneeId, dueDate },
    });
    return res.status(201).json({ task });
  }
  if (req.method === 'GET') {
    const { assignee } = req.query;
    const tasks = await prisma.task.findMany({ where: { assigneeId: assignee as string } });
    return res.json({ tasks });
  }
  res.status(405).end();
}

export default requireAuth(handler);
