export default function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        if (username === 'admin' && password === 'admin') {
            res.status(200).json({ success: true, message: 'Login successful' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
