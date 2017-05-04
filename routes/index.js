const express = require('express');
const router = express.Router();
let api = require('./definitions.js');
let c = require('../public/javascripts/click.js')

router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'SLANGUAGE',
        definitions: api.grabOxfordDefs,
        // getSentence: api.getSentence,
    })
});
// router.patch('/:', (req, res, next) => {
//     res.render('index', {
//         clickEvent: c,
//     })
// });

router.get('/p', (req, res, send) => {
    res.render('index', {
        getSentence: api.getSentence
    })
    res.send("sentence is set to " + req.query.sentence);
});

//http://localhost:3000/?sentence=sentence+to+words

module.exports = router;

// need to structure as a request
// POST / PATCH(need to check) request each word
// POST / PATCH and each definition(like the contact list and create meal)
// REQUEST in index.js