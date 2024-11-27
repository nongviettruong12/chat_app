import express from 'express'
import {verifyToken} from '../middleware/authMiddleware.js'
const router = express.Router()

router.get('/',  (req, res) =>{
    Room.findAll((err, rooms)=>{
        if ( err ) return res.status(500).json({ error: err.message })
            res.json(rooms) 
    })
})
router.post('/',verifyToken, (req, res) =>{
    const { name } = req.body
    Room.create(name, (err)=>{
        if (err) return res.status(400).json({ error: err.message })
            res.json({ message: 'Room created successfully', id: room.lastID })
    })
})
router.delete('/:id',verifyToken, (req, res) =>{
    const { id } = req.params
    Room.delete(id, (err)=>{
        if (err) return res.status(400).json({ error: err.message })
            res.json({ message: 'Room deleted successfully' })
    })
})
export default router