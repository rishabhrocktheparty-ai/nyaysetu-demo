import { Queue } from 'bullmq';
import { requireAuth } from '../../../lib/middleware/requireAuth';
const podcastQueue = new Queue('podcast', { connection: { url: process.env.REDIS_URL } });
async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(405).end();
    const { caseId } = req.body;
    await podcastQueue.add('podcast:generate', { caseId, citizenId: req.user.id });
    res.json({ jobId: caseId });
}
export default requireAuth(handler);
