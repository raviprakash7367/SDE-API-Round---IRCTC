const express = require('express');
const { addTrain, getTrains } = require('../controllers/trainController');
const { authenticate, authorizeAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/trains', authenticate, authorizeAdmin, addTrain);
router.get('/trains', getTrains);

module.exports = router;