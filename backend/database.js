import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const connectDB = () => {
  return open({
    fileName: "chat.db",
    driver: sqlite3.Database,
  });
};
export const intializeDB = async (db) => {
  await db.exec(`
        CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        is_online BOOLEAN DEFAULT FALSE
        );
        CREATE TABLE IF NOT EXISTS rooms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        owner_id INTEGER,
        max_members INTEGER DEFAULT 10,
        FOREIGN KEY(owner_id) REFERENCES users(id)
        );
        CREATE TABLE IF NOT EXISTS room_members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        room_id INTEGER,
        user_id INTEGER,
        FOREIGN KEY(room_id) REFERENCES rooms(id),
        FOREIGN KEY(user_id) REFERENCES users(id)
        )
        `);
};
