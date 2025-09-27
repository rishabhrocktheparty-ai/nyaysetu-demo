import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  // LLM stub: always advisory, requires legal review
  res.json({ advisory: true, requiresLegalReview: true, draft: 'Draft content (stub)' });
}
