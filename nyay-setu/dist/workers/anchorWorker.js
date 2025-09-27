import { Worker, Queue } from 'bullmq';
import { anchorEvidence } from '../lib/blockchain/anchor';
const connection = { url: process.env.REDIS_URL };
const anchorQueue = new Queue('anchor', { connection });
new Worker('anchor', async (job) => {
    const { hash } = job.data;
    await anchorEvidence(hash);
}, { connection, concurrency: 1 });
console.log('Anchor worker running...');
