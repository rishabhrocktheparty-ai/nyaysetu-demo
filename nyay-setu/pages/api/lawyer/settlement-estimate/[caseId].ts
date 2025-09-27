import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Heuristic stub
  res.json({ estimate: 'Settlement likely: 60% (stub)' });
}
