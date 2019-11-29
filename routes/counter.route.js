const express = require('express');
const router = express.Router();
const Counter = require('../models/counter.model');

router.get('/', (req, res) => {
    Counter.findOne().then((result) => {
        if(result) {
            res.status(200).json({ value: result.value });  
        } else {
            const counter = new Counter();
            counter.save().then((saved) => {
                res.status(200).json({ value: saved.value });  
            });
        }
    });
});

router.post('/', (req, res) => {
    if('counter' in req.body) {
        Counter.update(req.body.counter).then(() => {
            res.status(200).json({ messsage: 'value updated' });
        }).catch(() => {
            res.status(200).json({ messsage: 'value NOT updated' });
        });
    } else {
        res.status(200).json({ messsage: 'value NOT updated' });
    }
});

module.exports = router;
