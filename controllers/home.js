const urbanDictionary1 = 'http://api.urbandictionary.com/v0/define?';
const urbanDictionary2 = `term=${word}`;


const merwebDictionary1 = 'http://www.dictionaryapi.com/api/v1/references/collegiate/xml/hypocrite?key=';
const merwebDictionary2 = '764f81a5-669d-4172-b6f3-ae92a8403263'; //collegiate level dictionary key


const oxfordDictionary1 = ' https://od-api.oxforddictionaries.com/api/v1'; //base URL

//config headers with access to Oxford Dictionary API
var config = {
    headers: {
        "Accept": "application/json",
        "app_id": "b61ef6b5",
        "app_key": "eca43cac97b86f34f9f5ae2bb04620fe"
    }
};

axios.get(`https://od-api.oxforddictionaries.com:443/api/v1/entries/en/${word}/regions=us`, config);
//example from axios documentation:
//axios.post('/save', { firstName: 'Marlon' }, config);