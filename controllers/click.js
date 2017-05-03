let click = () => {
    const submit = document.getElementById('clickSubmit');
    submit.addEventListener('click', () => {
        let input = document.getElementById('toDefine').value;
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