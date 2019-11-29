const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
    value: {
        type: Number,
        default: 0
    }
});

const Counter = mongoose.model('counter', CounterSchema);

Counter.update = function(value) {
    return new Promise((resolve, reject) => {
        Counter.findOne().then((counter) => {
            if(counter) {
                counter.value = value;
                counter.save().then((saved) => resolve(saved));
            } else {
                reject();
            }
        }).catch(reject);
    });
};

module.exports = Counter;
