export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(405).end();
    // Proxy to /api/ai/notebook-query
    const { query } = req.body;
    res.json({ answer: `AI (stub): You asked '${query}'` });
}
