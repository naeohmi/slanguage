const express = require('express');
const router = express.Router();
var api = require('./definitions.js');

router.get('/', (req, res, next) => {
    if (req.query.sentence != null) {
        api.getSentence(req, res, next);
    }

    res.render('index', {
        title: 'SLANGUAGE',
    })
});

router.get('/words', api.readAll);
router.get('/words/:id', api.readOne);
router.put('/words/:id', api.update);
router.delete('/words/:id', api.destroy);

module.exports = router;