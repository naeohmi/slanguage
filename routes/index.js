const express = require('express');
const router = express.Router();
let api = require('./definitions.js');

router.get('/', (req, res, next) => {
    if (req.query.sentence != null) {
        passThisAlong(req, res, next);
    }

    res.render('index', {
        title: 'SLANGUAGE',
        // definitions: api.grabOxfordDefs,
        // s: api.getSentence
    })
});

function passThisAlong(req, res, next) {
    console.log("Passed: " + req.query.sentence);
    api.getSentence(req, res, next);
}

/* GET home page. */
// router.get('/', (req, res, next) => {

//     api.getSentence
// });
// router.post('/', db.createContact);

// router.patch('/:', (req, res, next) => {
//     res.render('index', {
//         clickEvent: c,
//     })
// });

// router.get('/p', (req, res, send) => {
//     res.render('index', {
//         getSentence: api.getSentence
//     })
//     res.send("sentence is set to " + req.query.sentence);
// });

//http://localhost:3000/?sentence=sentence+to+words

module.exports = router;

// need to structure as a request
// POST / PATCH(need to check) request each word
// POST / PATCH and each definition(like the contact list and create meal)
// REQUEST in index.js