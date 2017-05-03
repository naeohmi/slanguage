console.log('click.js has awoken!');
const axios = require('axios');


class Click {
    constructor() {

        }
        //when the submit button is clicked, saved the text that was entered into a new variable
        //and invoke the displayDef method to display the definitions
    submitButton() {
        const submit = document.getElementById('clickSubmit');
        submit.addEventListener('click', () => {
            let sentence = document.getElementById('toDefine').value;
            displayDefs(sentence);
        });
    };

    //take the sentence that was input into the toDefine field and grab each individual word 
    //make an array and populate the fields with each new word at a unique index
    //add the words to the words.sql database
    sentenceToWords() {

    };
    //take the words and run them through one at a time to get the definitions
    getTheDefs() {

    };
    //after each definition has been retrieved, display them on the screen
    displayDefs(word) {
        let def1 = document.createElement('h3');
        def1.innerHTML = `First Definition: ${word.def}`;

        document.getElementById('defs').appendChild(def1);
    };
    //add the defintions of the words to the sql database for storage and alteration 
    addToDb() {

    };
};