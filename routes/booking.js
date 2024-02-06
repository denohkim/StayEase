const express = require('express');
const router = express.Router();
const { handleBookingSubmission, paymentSuccess, paymentCancel } = require('../controllers/bookingController');

router.post('/book-room', handleBookingSubmission);
router.get('/success', paymentSuccess);
router.get('/cancel', paymentCancel);


module.exports = router;