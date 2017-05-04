const express = require('express');
const router = express.Router();
var d = require('./definitions.js');
var c = require('../public/javascripts/click.js')
    // var m = require('../main.js');

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

// need to structure as a request
// POST / PATCH(need to check) request each word
// POST / PATCH and each definition(like the contact list and create meal)
// REQUEST in index.js