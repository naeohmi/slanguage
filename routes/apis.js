// var defs = require('./definitions.js');
// const axios = require('axios');

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
                // var oxfordDef2 = oxford.data.results[0].lexicalEntries[0].entries[0].senses[0].subsenses[0].definitions[0];
                var oxfordDef2 = 'somrthing';
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
                console.log(err);
            });
    };
};
// let apis = new GrabDefs();
// module.exports = GrabDefs;