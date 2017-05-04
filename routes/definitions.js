console.log('definitions.js is alive');
const axios = require('axios');

const promise = require('bluebird');
const options = { promiseLib: promise };
const pgp = require('pg-promise')(options)
const connectionString = 'postgres://localhost:5432/sentences';
const db = pgp(connectionString);

//let word = 'lol';

let getSentence = (req, res, next) => {

    console.log('getSentence() awoke');

    var inputSentence = req.query.sentence;
    var word = inputSentence.split(' ');
    console.log(inputSentence)
        // db.none('SELECT * FROM sentences;')
    db.none('INSERT INTO sentences(word1, word2, word3, word4, word5, word6, word7)' +
            'VALUES(${word[0]}, ${word[1]}, ${word[2]}, ${word[3]}, ${word[4]}, ${word[5]}, ${word[6]}, ${word[7]})',
            req.query)
        .then(res.redirect('/'));
};

// FOR REFERENCE
// let createContact = (req, res, next) => {
// req.body.age = parseInt(req.body.age)
//     db.none('INSERT INTO contacts(first, last, age, gender)' +
//             'VALUES(${first}, ${last}, ${age}, ${gender})',
//             req.body)
//         .then(res.redirect('/'))
// };

// let getContacts = (req, res, next) => {
//     db.any('select * from contacts')
//         .then(function(data) {
//             res.render('index', {
//                 title: "All Contacts",
//                 data: data
//             })
//         })
// };


// getSentence(req, res, next);
class GrabDefs {
    constructor() {}

    grabUrbanDefs(word) {
        // console.log('urban defs has awoken!');
        axios.get(`http://api.urbandictionary.com/v0/define?term=${word}`)

        .then((res) => {
            console.log('urban awoke!');
            //console.log(res.data);
            var urbanDef1 = res.data.list[0].definition;
            var urbanDefExample1 = res.data.list[0].example;
            var urbanDef2 = res.data.list[1].definition;
            var urbanDefExample2 = res.data.list[1].example;
            console.log('urban' + urbanDef1, urbanDefExample1);
            console.log(urbanDef2, urbanDefExample2);
        });
    };

    grabOxfordDefs(word) {
        console.log('grabOxfordDefs is alive');
        //config headers with access to Oxford Dictionary API
        var config = {
            headers: {
                "Accept": "application/json",
                "app_id": "b61ef6b5",
                "app_key": "eca43cac97b86f34f9f5ae2bb04620fe"
            }
        };
        axios.get(`https://od-api.oxforddictionaries.com:443/api/v1/entries/en/${word}/regions=us`, config)

        .then((res) => {
                //console.log('grabDefs THEN is alive');
                //save whole object as a variable
                // console.log(res);
                var oxfordDef1 = res.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
                var oxfordDef2 = res.data.results[0].lexicalEntries[0].entries[0].subsenses[0].definitions[0];

                var oxfordExample1 = res.data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text;
                console.log('oxford' + oxfordDef1, oxfordExample1);
                console.log('2', oxfordDef2);
            })
            .catch((error) => {
                //console.log('im an errorrr');
                //console.log('error', error);
                // this.grabUrbanDefs();
            });
    };
};

let definitions = new GrabDefs();
// let def1 = definitions.grabUrbanDefs(word);
// let def2 = definitions.grabOxfordDefs(word);
// getSentence(req, res, next);
module.exports = {
    definitions: definitions,
    getSentence: getSentence
};