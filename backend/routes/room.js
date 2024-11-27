const express = require('express')
const db = require('../database/db')
const router = express.Router()

router.get('/', (req, res) =>{
    db.all('SELECT * FROM rooms', [], (err, rooms)=>{
        if ( err ) return res.status(500).json({ error: err.message })
            res.json(rooms) 
    })
})
router.post('/', (req, res) =>{
    const { name } = req.body
    if (!name) return res.status(400).json({ error: 'Room name is required' })

    db.run('INSERT INTO rooms (name) VALUES (?)', [name], (err)=>{
        if (err) return res.status(400).json({ error: err.message })
            res.json({ message: 'Room created successfully', id: room.lastID })
    })
})
router.delete('/:id', (req, res) =>{
    const { id } = req.params

    db.run('DELETE FROM rooms WHERE id = ?', [id], (err)=>{
        if (err) return res.status(400).json({ error: err.message })
            res.json({ message: 'Room deleted successfully' })
    })
})
module.exports = router