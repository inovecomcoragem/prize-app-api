require('dotenv').load();

const mongoose = require('mongoose');
const winston = require('winston');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const prize = require('./routes/prize.route');
const counter = require('./routes/counter.route');

const PORT = process.env.PORT || 5000;
const app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/prize-app').then(() => { 
    winston.log('info', 'Connected to database...');
});


const corsOptions = {
    origin: [ process.env.CORS_ORIGIN, process.env.CORS_TEST_ORIGIN ],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));
app.use(bodyParser.json({ limit: '5mb' }));

app.get('/', (req, res) => {
    res.status(200).json({ message: 'API OK' });
});

app.use('/prize', prize);
app.use('/premios', express.static('static/premios'));
app.use('/counter', counter);

let server = app.listen(PORT, () => {
    winston.log('info', `Listening @ ${PORT}`);
});

module.exports = server;
