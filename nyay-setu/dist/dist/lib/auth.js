import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = "NYAY_TOKEN";
const COOKIE_MAX_AGE = 60 * 60 * 24; // 1 day
export function signToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}
export function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}
export function setAuthCookie(res, token) {
    const cookie = `${COOKIE_NAME}=${token}; Max-Age=${COOKIE_MAX_AGE}; Path=/; HttpOnly; SameSite=Strict; Secure`;
    res.setHeader("Set-Cookie", cookie);
}
export function clearAuthCookie(res) {
    res.setHeader("Set-Cookie", `${COOKIE_NAME}=deleted; Max-Age=0; Path=/; HttpOnly; SameSite=Strict; Secure`);
}
