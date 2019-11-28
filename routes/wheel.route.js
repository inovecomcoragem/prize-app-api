const express = require('express');
const router = express.Router();
const winston = require('winston');
const Wheel = require('../models/wheel.model');

router.get('/', (req, res) => {
    res.status(200).json({ message: 'wheel API OK' });
});

module.exports = router;
