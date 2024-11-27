import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import  {verifyToken}  from './middleware/authMiddleware.js';
import authRoutes from './routes/auth.js';
import roomRoutes from './routes/room.js';

const app = express();
const server = createServer(app)
const io = new Server(server, { cors: { origin: '*'} })

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/rooms', verifyToken, roomRoutes)

const users = {}

io.on('connection', (socket) =>{
    console.log('user connected', socket.id);
    
    socket.on('joinRoom', (room) =>{
        if (!room) {
            socket.emit('error','room does not exist')
            return
        }
        socket.join(room)
        io.to(room).emit('message', `user joined ${room}`)
    })
    socket.on('disconnect', () =>{
        console.log('user disconnect',socket.id);
    })
})
const PORT = 5000
server.listen(PORT, () => console.log(`server running on port ${PORT}`));
