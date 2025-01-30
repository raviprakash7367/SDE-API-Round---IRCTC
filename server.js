const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const trainRoutes = require('./routes/trainRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());


db.query("SELECT 1")
    .then(() => console.log("MySQL Connected!"))
    .catch((err) => console.error(" MydSQL Connection Failed: ", err));

app.use('/api/auth', authRoutes);
app.use('/api', trainRoutes);
app.use('/api', bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});