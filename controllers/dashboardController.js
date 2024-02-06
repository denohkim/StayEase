const Hostel = require('../models/Hostel');
const Room = require('../models/Room');

exports.showAddHostelForm = (req, res) => {
    res.render('addHostel');
};

exports.addHostel = async (req, res) => {
    const { hostelName, location, numberOfRooms, amenities} = req.body;
    try {
        const newHostel = new Hostel({ hostelName, location, numberOfRooms, amenities });
        await newHostel.save();
        req.flash('success_msg', 'Hostel added successfully');
        res.redirect('/admin-hostel-management');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error adding hostel');
        res.redirect('/admin-hostel-management');
    }
};

exports.showAddRoomForm = async (req, res) => {
    try {
        const hostels = await Hostel.find({});
        res.render('addRoom', { hostels });
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error loading hostels');
        res.redirect('/admin/dashboard');
    }
};

exports.addRoom = async (req, res) => {
    const { hostelId, roomNumber, floor, type, price } = req.body;
    try {
        const newRoom = new Room({ hostelId, roomNumber,floor, type, price, isAvailable: true });
        await newRoom.save();
        req.flash('success_msg', 'Room added successfully');
        res.redirect('/admin-hostel-management');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error adding room');
        res.redirect('/admin-hostel-management');
    }
};