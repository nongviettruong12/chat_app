const db = require('../database/database');

const Room = {
    findAll: async () => {
        const db = await initializeUserTable();  // Khởi tạo kết nối DB
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM rooms', [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },

    create: async (name) => {
        const db = await initializeUserTable();
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO rooms (name) VALUES (?)', [name], function (err) {
                if (err) reject(err);
                else resolve({ id: this.lastID });
            });
        });
    },
// async fnc: async
    delete: async (id) => {
        const db = await initializeUserTable();
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM rooms WHERE id = ?', [id], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }
};

export default Room;
