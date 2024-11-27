const express = require('express');
const http = require('http');
const { Server } = require('socket.io')
const cors = require('cors');
const { verifyToken } = require('./middleware/authMiddleware')
const authRoutes = require('./routes/auth')
const roomRoutes = require('./routes/room')

const app = express();
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*'} })

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/rooms', verifyToken, roomRoutes)

const users = {}

io.on('connection', (socket) =>{
    console.log('user connected', socket.id);
    
    socket.on('joinRoom', (room) =>{
        socket.join(room)
        io.to(room).emit('message', `user joined ${room}`)
    })
    socket.on('disconnect', () =>{
        console.log('user disconnect',socket.id);
    })
})
const PORT = 5000
server.listen(PORT, () => console.log(`server running on port ${PORT}`));
