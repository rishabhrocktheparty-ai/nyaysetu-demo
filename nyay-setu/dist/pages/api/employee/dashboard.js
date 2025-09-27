import { prisma } from '../../lib/prisma';
import { requireAuth } from '../../lib/middleware/requireAuth';
async function handler(req, res) {
    // For demo: aggregate = all cases, all tasks
    const cases = await prisma.case.findMany({});
    const tasks = await prisma.task.findMany({});
    res.json({ cases, tasks });
}
export default requireAuth(handler);
