const roomsModal = require("../models/rooms.modal");

class RoomService {
    async create(payload) {
        const {topic, roomType, ownerId} = payload;
        const room = await roomsModal.create({
            topic,
            roomType,
            ownerId,
            speakers: [ownerId]
        })
        return room;
    }
    async getAllRooms(types) {
        const rooms = await roomsModal.find({roomType: {$in: types}})
        .populate('speakers')
        .populate('ownerId')
        .exec() 
        return rooms;
    }

    async getRoom(roomId) {
        const room = await roomsModal.findOne({_id: roomId})
        return room;
    }
}

module.exports = new RoomService();