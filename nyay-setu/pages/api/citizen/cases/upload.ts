import type { NextApiRequest, NextApiResponse } from 'next';
import { getPresignedUploadUrl } from '../../../../lib/s3';
import { requireAuth } from '../../../../lib/middleware/requireAuth';

async function handler(req: NextApiRequest & { user?: any }, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { filename, contentType } = req.body;
  const key = `uploads/${Date.now()}-${filename}`;
  const url = await getPresignedUploadUrl(key, contentType);
  res.json({ url, key });
}

export default requireAuth(handler);
