const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genre.model');

const movieSchema = mongoose.Schema({
    title: {
       type: String,
       required: true
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        default: 0
    },
    dailyRentalRate: {
        type: Number,
        default: 0
    }
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(m){
    const schema = Joi.object().keys({
        title: Joi.string().min(3).required(),
        genre: Joi.any(),
        numberInStock: Joi.number(),
        dailyRentalRate: Joi.number()
    });

    const { error } = Joi.validate(m, schema);
    return error ? error.details[0].message : null;
}

module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;