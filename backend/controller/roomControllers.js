import Room from '../model/room.js';  // Import model MongoDB

const RoomController = {
  findAll: async () => {
    try {
      return await Room.find();  // MongoDB query để lấy tất cả phòng
    } catch (err) {
      throw new Error('Error fetching rooms: ' + err.message);
    }
  },

  create: async (name) => {
    try {
      const room = new Room({ name });
      await room.save();  // Lưu phòng vào MongoDB
      return room;
    } catch (err) {
      throw new Error('Error creating room: ' + err.message);
    }
  },

  delete: async (id) => {
    try {
      await Room.findByIdAndDelete(id);  // Xóa phòng theo ID
    } catch (err) {
      throw new Error('Error deleting room: ' + err.message);
    }
  },
};

export default RoomController;
