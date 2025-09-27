import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, phone, password, barId } = req.body;
  if (!email || !password || !barId) return res.status(400).json({ error: 'Missing fields' });
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, phone, password: hash, role: 'LAWYER', lawyerProfile: { create: { barId } } },
    include: { lawyerProfile: true },
  });
  res.status(201).json({ user });
}
