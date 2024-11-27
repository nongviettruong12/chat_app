import jwt from 'jsonwebtoken';
import { initializeUserTable } from '../database/database.js';  // Import hàm khởi tạo bảng

const SECRET_KEY = process.env.SECRET_KEY;  // Thay đổi khóa bí mật này

export const User = {
    // Tìm kiếm người dùng theo tên người dùng
    findByUsername: async (username) => {
        const db = await initializeUserTable();  // Khởi tạo kết nối DB
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
                if (err) {
                    reject(err);  // Nếu có lỗi, trả về lỗi
                } else {
                    resolve(row);  // Nếu không có lỗi, trả về kết quả
                }
            });
        });
    },

    // Tạo người dùng mới
    create: async (username, password) => {
        const db = await initializeUserTable();  // Khởi tạo kết nối DB
        return new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO users (username, password) VALUES (?, ?)',
                [username, password],
                function (err) {
                    if (err) {
                        reject(err);  // Nếu có lỗi, trả về lỗi
                    } else {
                        // Tạo token cho người dùng vừa tạo
                        const token = jwt.sign({ id: this.lastID, username }, SECRET_KEY, { expiresIn: '1h' });
                        resolve({ userId: this.lastID, token });  // Trả về ID người dùng và token
                    }
                }
            );
        });
    }
};

export default User;
