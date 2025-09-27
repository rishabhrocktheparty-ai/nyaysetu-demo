export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(405).end();
    // AI stub: echo query
    const { query } = req.body;
    res.json({ answer: `AI (stub): You asked '${query}'` });
}
