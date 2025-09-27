import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';
import { requireAuth } from '../../../../lib/middleware/requireAuth';

async function handler(req: NextApiRequest & { user?: any }, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === 'GET') {
    const kase = await prisma.case.findUnique({
      where: { id: id as string },
      include: { documents: true, analyses: true },
    });
    if (!kase) return res.status(404).json({ error: 'Not found' });
    return res.json({ case: kase, documents: kase.documents, analyses: kase.analyses });
  }
  res.status(405).end();
}

export default requireAuth(handler);
