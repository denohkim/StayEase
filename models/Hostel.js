const mongoose = require('mongoose');

const HostelSchema = new mongoose.Schema({
    hostelName: { type: String, required: true },
    location: { type: String, required: true },
    numberOfRooms: {type: Number, required: true},
    amenities: { type: String, required: true },
});

module.exports = mongoose.model('Hostel', HostelSchema);