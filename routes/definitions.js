console.log('definitions.js is alive');
const axios = require('axios');
const promise = require('bluebird');
const options = { promiseLib: promise };
const pgp = require('pg-promise')(options)
const connectionString = 'postgres://localhost:5432/slanguage';
const db = pgp(connectionString);


let getSentence = (req, res, next) => {
    // console.log("These are the query results: " + req.query.sentence);
    var inputSentence = req.query.sentence;
    var wordArray = inputSentence.split(' ');
    db.one(setWhere(wordArray))
        .then(res.redirect('/'))
        .catch((err) => {
            return next(err);
        });
};

let setWhere = (wordArray) => {
    let fullString = 'INSERT INTO sentences(';
    for (let i = 0; i < wordArray.length; i++) {
        let key = "word" + [i + 1];
        let more = i === wordArray.length - 1 ? '' : ', ';
        fullString += key + more;
    };
    fullString += ") VALUES(";
    for (let i = 0; i < wordArray.length; i++) {
        let key = wordArray[i];
        let more = i === wordArray.length - 1 ? '' : ', ';
        fullString += "'" + key + "'" + more;
    };
    fullString += ");";
    // console.log(wordArray);
    wordLoop(wordArray);
    return fullString;
};
// getSentence(req, res, next);
let wordLoop = (wordArray) => {
    for (let i = 0; i <= wordArray.length; i++) {
        let currentWord = wordArray[i];
        let yayApiFun = new GrabDefs();
        // yayApiFun.grabUrbanDefs(currentWord);
        // yayApiFun.grabOxfordDefs(currentWord);
        yayApiFun.axiosDotAll(currentWord);

    }
};

class GrabDefs {
    constructor() {}

    grabUrbanDefs(word) {
        // console.log('urban defs has awoken!');
        return axios.get(`http://api.urbandictionary.com/v0/define?term=${word}`)

    };

    grabOxfordDefs(word) {
        // console.log('oxford has arrived!');
        // console.log('OXFORDDDD: ' + );
        //config headers with access to Oxford Dictionary API
        var config = {
            headers: {
                "Accept": "application/json",
                "app_id": "b61ef6b5",
                "app_key": "eca43cac97b86f34f9f5ae2bb04620fe"
            }
        };
        return axios.get(`https://od-api.oxforddictionaries.com:443/api/v1/entries/en/${word}/regions=us`, config)

    };
    axiosDotAll(currentWord) {
        axios.all([this.grabUrbanDefs(currentWord), this.grabOxfordDefs(currentWord)])
            .then(axios.spread((urban, oxford) => {
                // console.log('word', currentWord);
                // console.log('axios', urban);
                var urbanDef1 = urban.data.list[0].definition;
                var urbanSent1 = urban.data.list[0].example;
                var urbanDef2 = urban.data.list[1].definition;
                var urbanSent2 = urban.data.list[1].example;
                // console.log('urban1: ' + urbanDef1, urbanSent1);
                // console.log('urban2: ' + urbanDef2, urbanSent2);

                // db.none(
                //     "INSERT INTO words (sentenceId, word, urbanDef1, urbanDef2, urbanSent1, urbanSent2)" +
                //     "VALUES ($1, $2, $3, $4, $5, $6);", [4, currentWord, urbanDef1, urbanDef2, urbanSent1, urbanSent2]
                // )

                var oxfordDef1 = oxford.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
                var oxfordDef2 = oxford.data.results[0].lexicalEntries[0].entries[0].senses[0].subsenses[0].definitions[0];
                // var oxfordDef2 = 'cool';
                var oxfordSent1 = oxford.data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text;
                var oxfordSent2 = oxford.data.results[0].lexicalEntries[0].entries[0].senses[0].subsenses[0].examples[0].text; //MIGHT NEED TO CHANGE LATER
                // console.log('oxford1: ' + oxfordDef1, oxfordSent1);
                // var oxfordSent2 = 'hi';
                console.log('OXFORD: ' + oxfordDef2, oxfordSent2);

                db.none(
                        "INSERT INTO words (sentenceId, word, urbanDef1, urbanDef2, urbanSent1, urbanSent2, oxfordDef1, oxfordDef2, oxfordSent1, oxfordSent2)" +
                        "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);", [7, currentWord, urbanDef1, urbanDef2, urbanSent1, urbanSent2, oxfordDef1, oxfordDef2, oxfordSent1, oxfordSent2]
                    )
                    //.then()

                // return urbanDef1, urbanSent1, urbanDef2, urbanSent2;
                // return oxfordDef1, oxfordSent1, oxfordDef2, oxfordSent2;

            }))
            .catch(error => {
                console.log(error);
            })
    };
};

class CRUD {
    constructor() {}

    getAllTasks(req, res, next) {
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

    getOneTask(req, res, next) {
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

    deleteTask(req, res, next) {
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
};
let crudy = new CRUD();

//CRUD
module.exports = {
    getSentence: getSentence,
    // createTask: createTask, //CREATE
    getAllTasks: crudy.getAllTasks, //READ
    getOneTask: crudy.getOneTask, //READ
    // updateTask: updateTask, //UPDATE
    deleteTask: crudy.deleteTask //DELETE
};