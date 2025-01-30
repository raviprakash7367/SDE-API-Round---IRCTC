const pool = require('../config/db');
const { authorizeAdmin } = require('../middleware/authMiddleware');

const addTrain = async (req, res) => {
    const { name, source, destination, total_seats } = req.body;
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const [existingTrain] = await connection.execute(
            'SELECT * FROM trains WHERE name = ? AND source = ? AND destination = ?',
            [name, source, destination]
        );
        if (existingTrain.length > 0) {
            await connection.rollback();
            return res.status(400).json({ message: 'Train already exists' });
        }

        const [result] = await connection.execute(
            'INSERT INTO trains (name, source, destination, total_seats, available_seats) VALUES (?, ?, ?, ?, ?)',
            [name, source, destination, total_seats, total_seats]
        );

        await connection.commit();
        res.status(201).json({ message: 'Train added successfully', trainId: result.insertId });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ message: 'Error adding train', error: error.message });
    } finally {
        connection.release();
    }
};

const getTrains = async (req, res) => {
    const { source, destination } = req.query;
    try {
        const [trains] = await pool.execute(
            'SELECT * FROM trains WHERE source = ? AND destination = ?',
            [source, destination]
        );
        res.json(trains);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching trains', error: error.message });
    }
};

module.exports = { addTrain, getTrains };