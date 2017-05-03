const express = require('express');
const router = express.Router();
var home = require('./home.js');

router.get('/', (req, res, next) => {
    console.log(home.url());
    res.render('index', {
        title: 'SLANGUAGE'
    });
});

module.exports = router;