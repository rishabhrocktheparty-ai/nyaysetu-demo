import { prisma } from '../../lib/prisma';
import { requireAuth } from '../../lib/middleware/requireAuth';
async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(405).end();
    // Simulate subscription webhook
    const { provider, status } = req.body;
    const lawyer = await prisma.lawyerProfile.findFirst({ where: { userId: req.user.id } });
    if (!lawyer)
        return res.status(404).json({ error: 'Not found' });
    const subscription = await prisma.subscription.upsert({
        where: { lawyerId: lawyer.id },
        update: { provider, status },
        create: { lawyerId: lawyer.id, provider, status },
    });
    res.json({ subscription });
}
export default requireAuth(handler);
