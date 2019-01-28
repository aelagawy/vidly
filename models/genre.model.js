const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
    name: {
       type: String,
       required: true,
       min: 3,
       max: 255
    }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre){
    const schema = Joi.object().keys({
        name: Joi.string().min(3).max(255).required()
    });

    const { error } = Joi.validate(genre, schema);
    return error ? error.details[0].message : null;
}

module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.validateGenre = validateGenre;