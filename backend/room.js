const express = require('express');
const db = require('./database');
const { verifyToken } = require('./auth');

const router = express.Router();

// Lấy danh sách tất cả các phòng
router.get('/rooms', verifyToken, (req, res) => {
    const sql = 'SELECT * FROM rooms';

    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch rooms' });
        res.status(200).json(rows);
    });
});

// Tạo phòng mới
router.post('/rooms', verifyToken, (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Room name is required' });
    }

    const sql = 'INSERT INTO rooms (name) VALUES (?)';

    db.run(sql, [name], (err) => {
        if (err) return res.status(400).json({ error: 'Room already exists' });
        res.status(201).json({ message: 'Room created successfully' });
    });
});

// Xóa phòng
router.delete('/rooms/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM rooms WHERE id = ?';

    db.run(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete room' });
        res.status(200).json({ message: 'Room deleted successfully' });
    });
});

module.exports = router;
