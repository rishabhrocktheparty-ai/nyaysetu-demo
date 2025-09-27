import crypto from "crypto";

export function sha256FromBuffer(buffer: Buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}
