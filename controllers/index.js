const express = require('express');
const router = express.Router();
var home = require('./home.js');

router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'SLANGUAGE',
    });
});

router.get('/', home.grabDefs);
router.get('/', home.click);

module.exports = router;