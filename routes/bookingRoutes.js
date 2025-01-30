const express = require('express');
const { bookSeat, getBookingDetails } = require('../controllers/bookingController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/book', authenticate, bookSeat);
router.get('/bookings', authenticate, getBookingDetails);

module.exports = router;