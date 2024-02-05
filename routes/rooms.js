const express = require('express');
const router = express.Router();
// Assume you have a `roomsController` with the necessary logic
const { deleteRoom, showEditForm, updateRoomData } = require('../controllers/roomsController');

// Route to show edit form
router.get('/edit/:id', showEditForm);
// Route to handle the form submission for edit (Substitute GET with POST for actual form submission)
router.post('/update/:id', updateRoomData);

// Route for deleting a room (Consider using POST or DELETE in real implementations)
router.get('/delete/:id', deleteRoom);

module.exports = router;