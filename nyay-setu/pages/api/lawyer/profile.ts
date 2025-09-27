import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { requireAuth } from '../../lib/middleware/requireAuth';

async function handler(req: NextApiRequest & { user?: any }, res: NextApiResponse) {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: { lawyerProfile: true },
  });
  res.json({ user });
}

export default requireAuth(handler);
