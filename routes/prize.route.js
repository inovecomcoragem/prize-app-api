const express = require('express');
const router = express.Router();
const winston = require('winston');
const Prize = require('../models/prize.model');

router.get('/', (req, res) => {
    res.status(200).json({ message: 'prize API OK' });
});

router.post('/', (req, res) => {
    const allPromises = [];
    Object.keys(req.body).forEach(k =>{
        allPromises.push(Prize.update(k, req.body[k]));
    });
    Promise.all(allPromises).then(() => {
        res.redirect('premios');
    });
});

router.get('/all', (req, res) => {
    Prize.find().sort('title').then((result) => {
        res.json({
            prizes: result
        });
    }, (err) => {
        res.send({ success: false, message: 'Erro buscando prêmios', data: err });
    });
});

module.exports = router;
