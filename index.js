require('dotenv').load();

const mongoose = require('mongoose');
const winston = require('winston');
const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;
const app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/prize-app').then(() => { 
    winston.log('info', 'Connected to database...');
});

//routes
const prize = require('./routes/prize.route');
const wheel = require('./routes/wheel.route');

app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));
app.use(bodyParser.json({ limit: '5mb' }));

app.get('/', (req, res) => {
    res.status(200).json({ message: 'API OK' });
});

app.use('/prize', prize);
app.use('/premios', express.static('static/premios'));
app.use('/wheel', wheel);
app.use('/roleta', express.static('static/roleta'));

let server = app.listen(PORT, () => {
    winston.log('info', `Listening @ ${PORT}`);
});

module.exports = server;

