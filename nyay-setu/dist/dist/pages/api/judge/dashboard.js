import { prisma } from '../../lib/prisma';
import { requireAuth } from '../../lib/middleware/requireAuth';
async function handler(req, res) {
    // For demo: prioritized cases = all cases
    const cases = await prisma.case.findMany({});
    res.json({ cases });
}
export default requireAuth(handler);
