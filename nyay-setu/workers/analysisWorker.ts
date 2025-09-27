import { Worker, Queue } from 'bullmq';
import { prisma } from '../lib/prisma';
import { captureError } from '../lib/observability';

const connection = { url: process.env.REDIS_URL };
const analysisQueue = new Queue('analysis', { connection });

new Worker('analysis', async job => {
  const { caseId } = job.data;
  // Simulate analysis
  await prisma.analysis.create({
    data: {
      caseId,
      result: 'AI analysis result (stub)',
      meta: { advisory: true, requiresLegalReview: true },
    },
  });
}, { connection, concurrency: 2 });

console.log('Analysis worker running...');
