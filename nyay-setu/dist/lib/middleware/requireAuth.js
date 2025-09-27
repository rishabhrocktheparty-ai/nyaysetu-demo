import { verifyToken } from "../auth";
export function requireAuth(handler) {
    return async (req, res) => {
        const token = req.cookies?.NYAY_TOKEN;
        if (!token)
            return res.status(401).json({ error: "Unauthorized" });
        try {
            const payload = verifyToken(token);
            req.user = payload;
            return handler(req, res);
        }
        catch (err) {
            return res.status(401).json({ error: "Invalid token" });
        }
    };
}
