import express from 'express';
import UserController from '../controller/userControllers.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route đăng ký người dùng mới
router.post('/register', UserController.register);

// Route đăng nhập người dùng
router.post('/login', UserController.login);

// Route lấy thông tin người dùng (có xác thực JWT)
router.get('/me', verifyToken, (req, res) => {
  // Xử lý trả về thông tin người dùng từ JWT token
  res.json({
    userId: req.userId, // Lấy userId từ middleware verifyToken
    message: 'User is authenticated',
  });
});

export default router;
