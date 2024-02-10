const express = require('express');
const router = express.Router();
const { deleteRoom, showEditForm, updateRoomData } = require('../controllers/roomsController');

// Route to show edit form
router.get('/edit/:id', showEditForm);
// Route to handle the form submission for edit
router.post('/update/:id', updateRoomData);

// Route for deleting a room
router.get('/delete/:id', deleteRoom);

module.exports = router;