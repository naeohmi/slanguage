const express = require('express');
const router = express.Router();
var home = require('./home.js');
var click = require('./click.js');

router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'SLANGUAGE',
    })
});
//NEED TO CHANGE
router.get('/yes', (req, res, next) => {
    res.render('index', {
        // yes1: home.grabUrbanDefs,
        yes2: home.grabOxfordDefs,
        yes3: click.c, //NEED TO CHANGE
        title: 'yes'

    })
});

module.exports = router;