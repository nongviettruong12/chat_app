import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import RoomController from '../controller/roomControllers.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const rooms = await RoomController.findAll();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', verifyToken, async (req, res) => {
  const { name } = req.body;
  try {
    const room = await RoomController.create(name);
    res.json({ message: 'Room created successfully', room });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    await RoomController.delete(id);
    res.json({ message: 'Room deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
