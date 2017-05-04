const express = require('express');
const router = express.Router();
var d = require('./definitions.js');
var c = require('./click.js');

router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'SLANGUAGE',
    })
});
//NEED TO CHANGE
router.get('/yes', (req, res, next) => {
    res.render('index', {
        // yes1: home.grabUrbanDefs,
        yes2: d.grabOxfordDefs,
        yes3: c.click.submitButton(), //NEED TO CHANGE
        title: 'yes'

    })
});

module.exports = router;