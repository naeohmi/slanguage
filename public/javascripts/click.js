// console.log('click.js has awoken!');

// class Click {
//     constructor() {
//             this.submitButton(e);

//         }
//         //when the submit button is clicked, saved the text that was entered into a new variable
//         //and invoke the displayDef method to display the definitions
//     submitButton(e) {
//         e.preventDefault();
//         const submit = document.getElementById('clickSubmit');
//         submit.addEventListener('click', () => {
//             let sentence = document.getElementById('toDefine').value;
//             let words = window.location.href.split(' ');
//             console.log(words);

//         });
//     };

//     //after each definition has been retrieved
//     //display them on the screen
//     displayDefs(word) {
//         let def1 = document.createElement('h3');
//         def1.innerHTML = `First Definition: ${word.def}`;

//         document.getElementById('defs').appendChild(def1);
//     };
// };