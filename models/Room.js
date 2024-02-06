const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    hostelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hostel', required: true },
    roomNumber: { type: String, required: true },
    type: { type: String, required: true },
    floor: { type: Number, required: true },
    price: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
});

module.exports = mongoose.model('Room', RoomSchema);