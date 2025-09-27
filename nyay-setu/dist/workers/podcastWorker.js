import { Worker, Queue } from 'bullmq';
import { prisma } from '../lib/prisma';
const connection = { url: process.env.REDIS_URL };
const podcastQueue = new Queue('podcast', { connection });
new Worker('podcast', async (job) => {
    const { caseId } = job.data;
    // Simulate podcast generation
    await prisma.podcast.create({
        data: {
            citizenId: job.data.citizenId,
            url: 'https://example.com/audio.mp3',
        },
    });
}, { connection, concurrency: 1 });
console.log('Podcast worker running...');
