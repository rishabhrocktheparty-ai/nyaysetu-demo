import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { signToken, setAuthCookie } from '../../../lib/auth';
import { checkRateLimit } from '../../../lib/rateLimit';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  if (!(await checkRateLimit(`register:${req.body.email}`))) return res.status(429).json({ error: 'Rate limit' });
  const { email, phone, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, phone, password: hash, role: 'CITIZEN' },
  });
  // OTP stub: log OTP
  const otp = '123456';
  // In production, send via SMS/email
  console.log(`[OTP] for ${email || phone}: ${otp}`);
  res.status(201).json({ userId: user.id, otp });
}
