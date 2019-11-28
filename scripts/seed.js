require('dotenv').load();

const path = require('path');
const Prize = require('../models/prize.model');
const seeder = require('mongoose-seed');

seeder.connect(process.env.MONGODB_URI || 'mongodb://localhost/auras', () => {
    seeder.loadModels([
        path.resolve(__dirname, '../models/prize.model.js'),
    ]);

    seeder.clearModels(['prize'], function () {
        seeder.populateModels(data, function () {
            seeder.disconnect();
        });
    });
});


let data = [
    {
        'model': 'prize',
        'documents': []
    }
];

function setPrize(title, slug, quantity) {
    const prize = new Prize({
        title: title,
        slug: slug,
        quantity: quantity
    });

    data[0].documents.push(prize);
}

setPrize('Coragem 4', 'coragem4', 124);
setPrize('Coragem 3', 'coragem3', 90);
setPrize('Adesivo', 'adesivo', 90);
setPrize('Lean Inception', 'leaninception', 4);
