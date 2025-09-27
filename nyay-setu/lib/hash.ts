import crypto from "crypto";

export function sha256FromBuffer(buffer: Buffer): string {
  return crypto.createHash("sha256").update(buffer as unknown as crypto.BinaryLike).digest("hex");
}
