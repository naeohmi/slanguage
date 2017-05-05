console.log('crud.js is alive');
const axios = require('axios');
const promise = require('bluebird');
const options = { promiseLib: promise };
const pgp = require('pg-promise')(options)
const connectionString = 'postgres://localhost:5432/sentences';
// const db = pgp(connectionString);

// FOR REFERENCE
// let createContact = (req, res, next) => {
// req.body.age = parseInt(req.body.age)
//     db.none('INSERT INTO contacts(first, last, age, gender)' +
//             'VALUES(${first}, ${last}, ${age}, ${gender})',
//             req.body)
//         .then(res.redirect('/'))
// };

// let getContacts = (req, res, next) => {
//db.any('select * from contacts')
//         .then(function(data) {
//             res.render('index', {
//                 title: "All Contacts",
//                 data: data
//             })
//         })
// };