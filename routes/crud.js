console.log('crud.js is alive');

let pgp = require('pg-promise')();
let connString = process.env.DATABASE_URL;
let db = pgp(connString);

function getAllTasks(req, res, next) {
    db.any('select * from words') //.any() is one of PG-Promises methods
        .then(function(data) {
            // console.log('DATA:', data);
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'All Tasks Retrieved '
                });
        })
        .catch(function(err) {
            return next(err);
        });
};

function getOneTask(req, res, next) {
    let taskID = parseInt(req.params.id);
    db.one('select * from words where id = $1', taskID) //.one() selects one from tasks
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'One Task Was Retrieved'
                });
        })
        .catch(function(err) {
            return next(err);
        });
};

// function createTask(req, res, next) {
//     // req.body.age = parseInt(req.body.age);
//     // console.log('req.body ===>', req.body)
//     db.none('insert into words(item, minutes)' +
//             'values(${item}, ${minutes})',
//             req.body)
//         .then(function() {
//             res.status(200)
//                 .json({
//                     status: 'success',
//                     message: 'One Task Inserted'
//                 });
//         })
//         .catch(function(err) {
//             return next(err);
//         });
// };

// function updateTask(req, res, next) {
//     db.none('update tasks set item=$1, minutes=$2 where id=$3', [req.body.item, parseInt(req.body.minutes), parseInt(req.params.id)])
//         .then(function() {
//             res.status(200)
//                 .json({
//                     status: 'success',
//                     message: 'Task Updated'
//                 });
//         })
//         .catch(function(err) {
//             return next(err);
//         });
// };

function deleteTask(req, res, next) {
    let taskID = parseInt(req.params.id);
    db.result('delete from words where id = $1', taskID)
        .then(function(result) {
            res.status(200)
                .json({
                    status: 'success',
                    message: `Removed ${result.rowCount} task`
                });
        })
        .catch(function(err) {
            return next(err);
        });
};
//CRUD
module.exports = {
    // createTask: createTask, //CREATE
    getAllTasks: getAllTasks, //READ
    getOneTask: getOneTask, //READ
    // updateTask: updateTask, //UPDATE
    deleteTask: deleteTask //DELETE
};