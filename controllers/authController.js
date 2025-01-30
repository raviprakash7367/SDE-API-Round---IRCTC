const pool = require('../config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerUser = async (req, res) => {
    const { username, password, role } = req.body;
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const [existingUser] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUser.length > 0) {
            await connection.rollback();
            return res.status(400).json({ message: 'Username already exists' });
        }

        const [result] = await connection.execute(
            'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
            [username, password, role || 'user']
        );

        await connection.commit();
        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ message: 'Error registering user', error: error.message });
    } finally {
        connection.release();
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [users] = await pool.execute('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
        if (users.length === 0) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        const user = users[0];
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

module.exports = { registerUser, loginUser };