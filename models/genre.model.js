const mongoose = require('mongoose');
const Joi = require('joi');

const _schema = mongoose.Schema({
    name: {
       type: String,
       required: true,
       min: 3,
       max: 255
    }
});

module.exports.genreSchema = _schema;
module.exports.Genre = mongoose.model('Genre', _schema);

module.exports.validate = (genre) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).max(255).required()
    });

    const { error } = Joi.validate(genre, schema);
    return error ? error.details[0].message : null;
};
