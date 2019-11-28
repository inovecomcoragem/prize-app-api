const mongoose = require('mongoose');
const { Schema } = mongoose;
require('./prize.model');

const WheelSchema = new mongoose.Schema({
    prizes: {
        type: [{ type: Schema.Types.ObjectId, ref: 'prize' }]
    }
});

const Wheel = mongoose.model('wheel', WheelSchema);

module.exports = Wheel;
