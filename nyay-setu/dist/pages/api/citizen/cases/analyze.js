import { Queue } from 'bullmq';
import { requireAuth } from '../../../../lib/middleware/requireAuth';
const analysisQueue = new Queue('analysis', { connection: { url: process.env.REDIS_URL } });
async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(405).end();
    const { id } = req.query;
    await analysisQueue.add('analysis:run', { caseId: id });
    res.json({ jobId: id });
}
export default requireAuth(handler);
