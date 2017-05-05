const express = require('express');
const router = express.Router();
var api = require('./definitions.js');

router.get('/', (req, res, next) => {
    if (req.query.sentence != null) {
        api.getSentence(req, res, next);

    }
    res.render('index', {
        title: 'SLANGUAGE',
        // definitions: api.grabOxfordDefs,
        // s: api.getSentence
    })
});
router.get('/tasks', api.getAllTasks);
router.get('/tasks/:id', api.getOneTask);
// router.post('/tasks', crud.createTask);
// router.put('/tasks/:id', crud.updateTask);
router.delete('/tasks/:id', api.deleteTask);

// let passThisAlong = (req, res, next) => {
//     //console.log("Passed: " + req.query.sentence);
//     api.getSentence(req, res, next);
// };

// router.get('/p', (req, res, send) => {
//     res.render('index', {
//         getSentence: api.getSentence
//     })
//     res.send("sentence is set to " + req.query.sentence);
// });

module.exports = router;