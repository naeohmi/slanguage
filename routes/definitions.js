// console.log('definitions.js is alive');
const axios = require('axios');
const promise = require('bluebird');
const options = { promiseLib: promise };
const pgp = require('pg-promise')(options)
const connectionString = 'postgres://localhost:5432/slanguage';
const db = pgp(connectionString);
var apis = require('./apis.js');

let getSentence = (req, res, next) => {
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
    wordLoop(wordArray);
    return fullString;
};

let wordLoop = (wordArray) => {
    for (let i = 0; i <= wordArray.length; i++) {
        let currentWord = wordArray[i];
        let apis = new GrabDefs();
        apis.axiosDotAll(currentWord);
    }
};

class GrabDefs {
    constructor() {}
    grabUrbanDefs(word) {
        console.log('urban defs has awoken!');
        return axios.get(`http://api.urbandictionary.com/v0/define?term=${word}`)
    };

    grabOxfordDefs(word) {
        // console.log('oxford has arrived!');
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

                var urbanDef1 = urban.data.list[0].definition;
                var urbanSent1 = urban.data.list[0].example;

                var urbanDef2 = urban.data.list[1].definition;
                var urbanSent2 = urban.data.list[1].example;

                var oxfordDef1 = oxford.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
                var oxfordDef2 = oxford.data.results[0].lexicalEntries[0].entries[0].senses[0].subsenses[0].definitions[0];

                var oxfordSent1 = oxford.data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text;
                var oxfordSent2 = oxford.data.results[0].lexicalEntries[0].entries[0].senses[0].subsenses[0].examples[0].text;
                // console.log('OXFORD: ' + oxfordDef2, oxfordSent2);
                db.none(
                        "INSERT INTO words (sentenceId, word, urbanDef1, urbanDef2, urbanSent1, urbanSent2, oxfordDef1, oxfordDef2, oxfordSent1, oxfordSent2)" +
                        "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);", [7, currentWord, urbanDef1, urbanDef2, urbanSent1, urbanSent2, oxfordDef1, oxfordDef2, oxfordSent1, oxfordSent2]
                    )
                    //.then()
                    // return urbanDef1, urbanSent1, urbanDef2, urbanSent2;
                    // return oxfordDef1, oxfordSent1, oxfordDef2, oxfordSent2;

            }))
            .catch((err) => {
                return next(err);
            });
    };
};

class CRUD {
    constructor() {}

    allWords(req, res, next) {
        db.any('SELECT * FROM words')
            .then((data) => {
                res.status(200)
                    .json({
                        status: 'success',
                        data: data
                    });
            })
            .catch((err) => {
                return next(err);
            });
    };

    oneWord(req, res, next) {
        let wordId = parseInt(req.params.id);
        db.one('SELECT * FROM words WHERE id = $1', wordId) //.one() selects one from tasks
            .then((data) => {
                res.status(200)
                    .json({
                        status: 'success',
                        data: data
                    });
            })
            .catch((err) => {
                return next(err);
            });
    };

    updateWord(req, res, next) {
        db.none(
            `UPDATE words SET urbanDef1=$1, urbanDef2=$2, urbanSent1=$3, urbanSent2=$4, oxfordDef1=$5, oxfordDef2=$6, oxfordSent1=$7, oxfordSent2=$8 WHERE id=$9)`,

            [req.body.urbanDef1, req.body.urbanDef2, req.body.urbanSent1, req.body.urbanSent2, req.body.oxfordDef1, req.body.oxfordDef2, req.body.oxfordSent1, req.body.oxfordSent2, parseInt(req.params.id)]
        )

        .then(() => {
                res.status(200)
                    .json({
                        status: 'success',
                    });
            })
            .catch((err) => {
                return next(err);
            });
    };

    destroyWord(req, res, next) {
        let wordId = parseInt(req.params.id);
        db.result('DELETE from words WHERE id = $1', wordId)
            .then((result) => {
                res.status(200)
                    .json({
                        status: 'success',
                        message: `Removed ${result.rowCount} word`
                    });
            })
            .catch((err) => {
                return next(err);
            });
    };
};
let crudy = new CRUD();

//CRUD
module.exports = {
    getSentence: getSentence, //GET
    readAll: crudy.allWords, //READ
    readOne: crudy.oneWord, //READ
    update: crudy.updateWord, //UPDATE
    destroy: crudy.destroyWord //DELETE
};