const express = require('express');
const router = express.Router();
var home = require('./home.js');

router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'SLANGUAGE',
    })
});

router.get('/yes', (req, res, next) => {
    res.render('index', {
        yes: home.grabDefs,
        title: 'yes'
    })
});

module.exports = router;