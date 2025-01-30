const pool = require('../config/db');
const { authenticate } = require('../middleware/authMiddleware');

const bookSeat = async (req, res) => {
    const { trainId, seats } = req.body;
    const userId = req.user.id;

    try {
        const [train] = await pool.execute('SELECT * FROM trains WHERE id = ?', [trainId]);
        if (train.length === 0) {
            return res.status(404).json({ message: 'Train not found' });
        }

        if (train[0].available_seats < seats) {
            return res.status(400).json({ message: 'Not enough seats available' });
        }

        await pool.execute('UPDATE trains SET available_seats = available_seats - ? WHERE id = ?', [seats, trainId]);
        const [result] = await pool.execute(
            'INSERT INTO bookings (user_id, train_id, seats_booked) VALUES (?, ?, ?)',
            [userId, trainId, seats]
        );

        res.status(201).json({ message: 'Seat booked successfully', bookingId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error booking seat', error: error.message });
    }
};

const getBookingDetails = async (req, res) => {
    const userId = req.user.id;
    try {
        const [bookings] = await pool.execute(
            'SELECT * FROM bookings WHERE user_id = ?',
            [userId]
        );
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching booking details', error: error.message });
    }
};

module.exports = { bookSeat, getBookingDetails };