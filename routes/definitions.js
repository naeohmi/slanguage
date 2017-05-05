console.log('definitions.js is alive');
// const config = require('../models/config.js')

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
    for (let i = 0; i < wordArray.length; i++) {
        let currentWord = wordArray[i + 1];
        let yayApiFun = new GrabDefs();
        yayApiFun.grabUrbanDefs(currentWord);
        // yayApiFun.grabOxfordDefs(currentWord);
    }
};

class GrabDefs {
    constructor() {}

    grabUrbanDefs(word) {
        // console.log('urban defs has awoken!');
        axios.get(`http://api.urbandictionary.com/v0/define?term=${word}`)

        .then((res) => {
            // let body = req.body;
            console.log('urban awoke!');
            //console.log(res.data);
            var urbanDef1 = res.data.list[0].definition;
            var urbanSent1 = res.data.list[0].example;
            var urbanDef2 = res.data.list[1].definition;
            var urbanSent2 = res.data.list[1].example;
            console.log('urban1: ' + urbanDef1, urbanSent1);
            // console.log('urban2: ' + urbanDef2, urbanSent2);
            // return urbanDef1, urban

            db.none(
                "INSERT INTO words (sentenceId, word, urbanDef1, urbanDef2, urbanSent1, urbanSent2)" +
                "VALUES ($1, $2, $3, $4, $5, $6)", [4, word, urbanDef1, urbanDef2, urbanSent1, urbanSent2]
            )

            // .then(res.redirect('/'))
        });


        // .catch(err => {
        //     res.status(400).json(err);
        // });
    };


    grabOxfordDefs(word) {
        console.log('oxford has arrived!');
        // console.log('OXFORDDDD: ' + );
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
                //save whole object as a variable
                // console.log(res);
                // res.locals.FUNCTION = rsponse.data...
                var oxfordDef1 = res.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
                var oxfordDef2 = res.data.results[0].lexicalEntries[0].entries[0].subsenses[0].definitions[0];

                var oxfordSent1 = res.data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text;
                // var oxfordSent2 = res.data.results[0].lexicalEntries[0].entries[0].senses[0].examples[1].text; //MIGHT NEED TO CHANGE LATER
                console.log('oxford1: ' + oxfordDef1, oxfordSent1);
                console.log('oxford2: ' + oxfordDef2);
            })
            // .catch((err) => {
            // return next(err);

        //console.log('im an errorrr');
        // console.log('sorry can/t find that word');   
        //this.grabUrbanDefs(word);
        // });
    };
};
// let definitions = new GrabDefs();

// let definitions = new GrabDefs();
// let def1 = definitions.grabUrbanDefs(word);
// let def2 = definitions.grabOxfordDefs(word);
// getSentence(req, res, next);
module.exports = {
    // definitions: definitions,
    getSentence: getSentence
};


//axios race condition 
//axios.all -- can call end number of reqs then manage 
//promise to complete before