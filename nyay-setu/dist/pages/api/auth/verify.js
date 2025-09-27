import { prisma } from '../../../lib/prisma';
import { signToken, setAuthCookie } from '../../../lib/auth';
export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(405).end();
    const { email, phone, otp } = req.body;
    // OTP stub: accept 123456
    if (otp !== '123456')
        return res.status(400).json({ error: 'Invalid OTP' });
    const user = await prisma.user.findFirst({ where: { OR: [{ email }, { phone }] } });
    if (!user)
        return res.status(404).json({ error: 'User not found' });
    const token = signToken({ id: user.id, role: user.role });
    setAuthCookie(res, token);
    res.status(200).json({ success: true });
}
