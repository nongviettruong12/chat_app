const db = require('../database/database');

const User = {
    findByUsername: (username, callback) =>{
        db.get('SELECT * FROM users WHERE username = ?',[username], callback)
    },
    create: (username, password, callback) =>{
        db.run(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username, password],
            callback
        )
    }
}
module.exports = User;