import User from '../model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY;

const UserController = {
  // Đăng ký người dùng mới
  register: async (req, res) => {
    const { username, password, email, confirmPassword, phone, address } = req.body;

    try {
      // Kiểm tra người dùng đã tồn tại
      const existingUser = await User.findOne({ username });
      if (existingUser) return res.status(400).json({ message: "Username already exists" });

      const existingUserEmail = await User.findOne({ email });
      if (existingUserEmail) return res.status(400).json({ message: "Email already exists" });

      // Kiểm tra mật khẩu và confirmPassword có khớp không
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      // Mã hóa mật khẩu trước khi lưu vào MongoDB
      const hashedPassword = await bcrypt.hash(password, 10);

      // Tạo người dùng mới và lưu vào MongoDB
      const newUser = new User({
        email,
        username,
        password: hashedPassword,
        phone,
        address,
      });
      await newUser.save();

      // Tạo token JWT
      const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: '1h' });
      console.log("process.env.SECRET_KEY:", process.env.SECRET_KEY);
      if (!SECRET_KEY) {
        throw new Error('secret key is not defined');
      }
      console.log('secret key',SECRET_KEY);
      
      await newUser.save();
      res.status(201).json({
        message: "User created successfully",
        username,
        email,
        phone,
        address,
        userId: newUser._id,
        token,
      });
    } catch (err) {
      console.error("Error in register:", err);
      res.status(500).json({ message: "Error creating user", error: err.message });
    }
  },

  // Đăng nhập người dùng
  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      // Tìm người dùng theo tên đăng nhập
      const user = await User.findOne({ username });
      if (!user) return res.status(404).json({ error: "User not found" });

      // Kiểm tra mật khẩu người dùng
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) return res.status(400).json({ error: "Invalid password" });

      // Tạo token JWT
      const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });

      res.json({ token });
    } catch (err) {
      console.error("Error in login:", err);
      res.status(500).json({ error: err.message });
    }
  },

  // Lấy thông tin người dùng
  getUserInfo: async (req, res) => {
    const { userId } = req.params;

    try {
      // Tìm người dùng theo ID
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: "User not found" });

      res.json({
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
      });
    } catch (err) {
      console.error("Error fetching user info:", err);
      res.status(500).json({ error: err.message });
    }
  },

  // Cập nhật thông tin người dùng
  updateUserInfo: async (req, res) => {
    const { userId } = req.params;
    const { email, username, phone, address } = req.body;

    try {
      // Tìm và cập nhật người dùng
      const updatedUser = await User.findByIdAndUpdate(userId, {
        email,
        username,
        phone,
        address,
      }, { new: true });

      if (!updatedUser) return res.status(404).json({ error: "User not found" });

      res.json({ message: "User updated successfully", user: updatedUser });
    } catch (err) {
      console.error("Error updating user info:", err);
      res.status(500).json({ error: err.message });
    }
  },
};

export default UserController;
