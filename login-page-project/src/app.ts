import express from 'express';
import bodyParser from 'body-parser';
import { LoginRequest, LoginResponse } from './types/index';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/login', (req: LoginRequest, res: LoginResponse) => {
    const { username, password } = req.body;

    // Simple validation
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Dummy authentication logic
    if (username === 'admin' && password === 'password') {
        return res.status(200).json({ message: 'Login successful!' });
    } else {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});