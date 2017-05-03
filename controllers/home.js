//console.log('home.js is alive');
const axios = require('axios');
let word = 'today';

let grabOxfordDefs = () => {
    //console.log('grabDefs is alive');
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
            var oxfordDef1 = res.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
            var oxfordExample1 = res.data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text;
            console.log(oxfordDef1, oxfordExample1);
        })
        .catch((error) => {
            console.log(error);
        });
};

let grabUrbanDefs = () => {
    // console.log('urban defs has awoken!');

    axios.get(`http://api.urbandictionary.com/v0/define?term=${word}`)

    .then((res) => {
            console.log('urban awoke!');
            //console.log(res.data);
            var urbanDef1 = res.data.list[0].definition;
            var urbanDefExample1 = res.data.list[0].example;
            var urbanDef2 = res.data.list[1].definition;
            var urbanDefExample2 = res.data.list[1].example;
            // console.log(urbanDef1, urbanDef2);
            console.log(urbanDefExample1, urbanDefExample2);
        })
        // const urbanDictionaryUrl = 'http://api.urbandictionary.com/v0/define?term=';


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
grabOxfordDefs();
grabUrbanDefs();
module.exports = {
    grabOxfordDefs: grabOxfordDefs,
    grabUrbanDefs: grabUrbanDefs,
    click: click
}