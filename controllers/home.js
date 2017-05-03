const axios = require('axios');
let word = 'hello';

const urbanDictionaryUrl = 'http://api.urbandictionary.com/v0/define?term=';
//const merwebDictionary1 = 'http://www.dictionaryapi.com/api/v1/references/collegiate/xml/hypocrite?key=';
//const merwebDictionary2 = '764f81a5-669d-4172-b6f3-ae92a8403263'; //collegiate level dictionary key

const oxfordDictionary1 = 'https://od-api.oxforddictionaries.com/api/v1'; //base URL
let grabDefs = (req, res, next) => {
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
            console.log(res.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]);
            var oxfordExample = res.data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0];
            //console.log(oxfordDef1);
            console.log(oxfordExample);
        })
        .catch((error) => {
            console.log(error);
        });
    //example from axios documentation:
    //axios.post('/save', { firstName: 'Marlon' }, config);
};


let click = (req, res, next) => {
    const submit = document.getElementById('submit');
    submit.addEventListener('click', () => {
        let input = document.getElementById('zip').value;
        displayDefs(input)
    });
};

let displayDefs = (word) => {
    axios(urbanDictionaryUrl + word)
        .then((d) => {
            return d.data;
            console.log(d.data);
        })
};

module.exports = {
    grabDefs: grabDefs,
    click: click
}