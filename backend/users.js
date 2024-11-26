const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./database');
const { SECRET } = require('./auth');

const router = express.Router();

// Đăng ký người dùng
router.post('/users/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';

    db.run(sql, [username, hashedPassword], (err) => {
        if (err) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});

// Đăng nhập
router.post('/users/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ?';

    db.get(sql, [username], async (err, user) => {
        if (err || !user) return res.status(404).json({ error: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ error: 'Invalid password' });

        const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    });
});

module.exports = router;
