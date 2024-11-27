const db = require('../database/database');

const Room = {
    findAll: (callback) =>{
        db.all('SELECT * FROM rooms', [], callback)
    },
    findById: (id, callback) =>{
        db.get('SELECT * FROM rooms WHERE id =?', [id], callback)
    },
    create: (name, callback) =>{
        db.run('INSERT INTO rooms (name) VALUES (?)', [name], callback)
    },
    delete: (id, callback) =>{
        db.run('DELETE FROM rooms WHERE id =?', [id], callback)
    }
}
module.exports = Room;