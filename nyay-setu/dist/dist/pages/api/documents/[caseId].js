import { prisma } from '../../../lib/prisma';
import { sha256FromBuffer } from '../../../lib/hash';
import { anchorEvidence } from '../../../lib/blockchain/anchor';
export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(405).end();
    const { caseId } = req.query;
    // For demo: expects base64 file in req.body.file
    const fileBuffer = Buffer.from(req.body.file, 'base64');
    const hash = sha256FromBuffer(fileBuffer);
    const doc = await prisma.document.create({
        data: {
            caseId: caseId,
            filename: req.body.filename,
            url: req.body.url,
            hash,
            uploadedById: req.body.userId,
        },
    });
    const evidence = await prisma.evidence.create({
        data: { caseId: caseId, hash },
    });
    const anchor = await anchorEvidence(hash);
    await prisma.evidence.update({
        where: { id: evidence.id },
        data: { anchorId: anchor.anchorId, anchoredAt: anchor.txid ? new Date() : null },
    });
    return res.json({ doc, evidence, anchor });
}
