const Room = require('../models/Room');

exports.showEditForm = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        res.render('editRoom', { room }); // Assuming you have an 'editRoom.ejs' view
    } catch (err) {
        console.error(err);
        res.redirect('/admin/dashboard');
    }
};

exports.updateRoomData = async (req, res) => {
    try {
        await Room.findByIdAndUpdate(req.params.id, req.body);
        req.flash('success_msg', 'Room updated successfully.');
        res.redirect('/admin-hostel-management');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error updating room.');
        res.redirect('/admin-hostel-management');
    }
};

exports.deleteRoom = async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        req.flash('success_msg', 'Room deleted successfully.');
        res.redirect('/admin-hostel-management');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error deleting room.');
        res.redirect('/admin-hostel-management');
    }
};