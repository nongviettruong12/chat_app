import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
let db
const connectDB = async () => {
  if (!db) {
    db = await open({
      filename: './chatapp.db',
      driver: sqlite3.Database,
    })
  }
  return db
};

const initializeUserTable = async () => {
  console.log('[DB] Connected to database');
  try {
    const db = await connectDB();
  
  // Tạo bảng người dùng nếu chưa tồn tại
  await db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  // Tạo bảng phòng nếu chưa tồn tại
  await db.run(`
    CREATE TABLE IF NOT EXISTS rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  return db;
  } catch (error) {
      console.log('err',error);
  }
  
};

// Expose cả hàm kết nối và khởi tạo bảng
export { connectDB, initializeUserTable };
