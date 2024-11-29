import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY;

router.post("/register", async (req, res) => {
  console.log('[Register Route] Body:', req.body);
  const { username, password } = req.body;

  try {
    // Kiểm tra xem người dùng đã tồn tại chưa
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Băm mật khẩu trước khi lưu vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(password, 10); // 10 là số lần băm

    // Tạo người dùng mới và nhận ID và token
    const { userId, token } = await User.create(username, hashedPassword);

    // Trả về ID và token cho client
    console.log("User created:", userId);
    res.status(201).json({
      message: "User created successfully",
      userId,
      token,
    });
  } catch (err) {
    console.error("Error in register:", err);
    res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findByUsername(username);
    if (!user) return res.status(404).json({ error: "User not found" });

    // So sánh mật khẩu với bcrypt.compare (bất đồng bộ)
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;
