import { prisma } from "../prisma";
import crypto from "crypto";
export async function anchorEvidence(hash) {
    // Stage: create anchor record and return txid null
    const anchorId = crypto.randomUUID();
    await prisma.auditLog.create({
        data: {
            action: "anchor_created",
            details: `Anchor created for hash ${hash}`,
        },
    });
    // Save to DB optional
    await prisma.evidence.updateMany({
        where: { hash },
        data: { anchorId },
    });
    return { anchorId, txid: null };
}
