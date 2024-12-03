import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const Room = mongoose.model('Room', roomSchema);

export default Room;
