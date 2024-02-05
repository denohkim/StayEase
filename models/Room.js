const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    hostelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hostel', required: true },
    roomNumber: { type: String, required: true },
    type: { type: String, required: true },
    floor: { type: Number, required: true },
    price: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('Room', RoomSchema);