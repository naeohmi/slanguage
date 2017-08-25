const express = require('express');
const router = express.Router();
const api = require('./definitions.js');
const config = require('../models/config.js');

//set routes to grab words from input and run API
router.get('/', (req, res, next) => {
    if (req.query.sentence != null) {
        api.getSentence(req, res, next);
    }
    res.render('index', {
        title: 'slanguage',
    })
});

router.get('/words', (req, res, next) => {
    api.readOne(req, res, next);
});

router.get('/words/:id', api.readOne);
router.put('/words/:id', api.update);
router.delete('/words/:id', api.destroy);

module.exports = router;