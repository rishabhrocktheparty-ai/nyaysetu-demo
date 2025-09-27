import { prisma } from '../../lib/prisma';
import { requireAuth } from '../../lib/middleware/requireAuth';
async function handler(req, res) {
    if (req.method === 'GET') {
        const citizen = await prisma.citizenProfile.findFirst({ where: { userId: req.user.id } });
        if (!citizen)
            return res.status(404).json({ error: 'Not found' });
        const notebook = await prisma.notebookEntry.findMany({ where: { citizenId: citizen.id } });
        return res.json({ notebook });
    }
    res.status(405).end();
}
export default requireAuth(handler);
