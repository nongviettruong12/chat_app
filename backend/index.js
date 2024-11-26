import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { connectDB, intializeDB } from './database'
import { authenticate, generateToken } from './auth'

const app = express()
const server = createServer(app)
const io = new Server(server, {cors: {origin: '*'} })

app.use(cors())
app.use(express.json())

const PORT = 3000
let db
(async () =>{
    db = await connectDB()
    await intializeDB(db)
})()

// ev socket
io.on('connection', (socket)=>{
    console.log('user connected', socket.id);
    // disconnect user
    socket.on('disconnect', ()=>{
        console.log('user disconnected', socket.id);
    })
    // chat message
    socket.on('chat message', (room, message)=>{
        io.to(room).emit('chat message', message)
    })
    // join room
    socket.on('join room', (room)=>{
        socket.join(room)
        io.to(room).emit('user joined',socket.id)
    })
})

app.post('/register', async(req, res)=>{
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const result = await db.run('INSERT INTO user (username, password) VALUES (? ?)',[username, hashedPassword])
        res.json({ id: result.lastID, message: 'User register'})
    } catch {
        res.status(400).json({ error: 'user already exists'})
    }
})
app.post('/login', async(req, res)=>{
    const { username, password } = req.body 
    const user = await db.get('SELECT * FROM users WHERE usernam = ?', [username])
    if (!user || !(await bcrypt.compare(password, user.password))){
        return res.status(401).json({ error:'invalid credentials'})
    }
    const token = generateToken(user)
    res.json({ token })
})
server.listen(PORT, () => console.log(` Server is running on http://localhost:${PORT}`))