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

router.get('/tasks', api.getAllTasks);
router.get('/tasks/:id', api.getOneTask);
// router.post('/tasks', crud.createTask);
// router.put('/tasks/:id', crud.updateTask);
router.delete('/tasks/:id', api.deleteTask);

module.exports = router;