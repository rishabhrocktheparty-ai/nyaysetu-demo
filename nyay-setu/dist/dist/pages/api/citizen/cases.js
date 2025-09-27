import { prisma } from '../../../lib/prisma';
import { requireAuth } from '../../../lib/middleware/requireAuth';
async function handler(req, res) {
    if (req.method === 'POST') {
        const { title, description } = req.body;
        const citizen = await prisma.citizenProfile.findFirst({ where: { userId: req.user.id } });
        if (!citizen)
            return res.status(403).json({ error: 'Not a citizen' });
        const kase = await prisma.case.create({
            data: { title, description, citizenId: citizen.id },
        });
        return res.status(201).json({ case: kase });
    }
    if (req.method === 'GET') {
        const { userId } = req.query;
        const citizen = await prisma.citizenProfile.findFirst({ where: { userId: userId } });
        if (!citizen)
            return res.status(404).json({ error: 'Not found' });
        const cases = await prisma.case.findMany({ where: { citizenId: citizen.id } });
        return res.json({ cases });
    }
    res.status(405).end();
}
export default requireAuth(handler);
