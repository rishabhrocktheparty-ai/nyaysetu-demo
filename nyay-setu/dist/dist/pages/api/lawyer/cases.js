import { prisma } from '../../../lib/prisma';
import { requireAuth } from '../../../lib/middleware/requireAuth';
async function handler(req, res) {
    const { lawyerId } = req.query;
    const assignments = await prisma.lawyerAssignment.findMany({ where: { lawyerId: lawyerId }, include: { case: true } });
    res.json({ cases: assignments.map(a => a.case) });
}
export default requireAuth(handler);
