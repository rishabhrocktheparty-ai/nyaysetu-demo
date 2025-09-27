import { prisma } from '../../../../lib/prisma';
import { requireAuth } from '../../../../lib/middleware/requireAuth';
async function handler(req, res) {
    const { id } = req.query;
    const analyses = await prisma.analysis.findMany({ where: { caseId: id } });
    res.json({ analyses });
}
export default requireAuth(handler);
