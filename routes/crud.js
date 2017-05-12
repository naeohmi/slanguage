var config = require('../models/config.js');

class Crud {
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
let crudy = new Crud();

//CRUD
module.exports = {
    getSentence: getSentence, //GET
    readAll: crudy.allWords, //READ
    readOne: crudy.oneWord, //READ
    update: crudy.updateWord, //UPDATE
    destroy: crudy.destroyWord //DELETE
};

module.exports = {
    Crud = Crud,
}