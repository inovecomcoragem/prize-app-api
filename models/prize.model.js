const mongoose = require('mongoose');

const PrizeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});


const Prize = mongoose.model('prize', PrizeSchema);

Prize.update = function(slug ,value) {
    return new Promise((resolve, reject) => {
        Prize.findOne({ slug: slug}).then((prize) => {
            if(prize) {
                prize.quantity = value;
                prize.save().then((saved) => resolve(saved));
            } else {
                resolve(prize);
            }
        }).catch(reject);
    });
};

module.exports = Prize;
