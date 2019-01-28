const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genre.model');

const movieSchema = mongoose.Schema({
    title: {
       type: String,
       required: true,
       trim: true,
       min: 3,
       max: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        default: 0,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        default: 0,
        min: 0,
        max: 255
    }
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(m){
    const schema = Joi.object().keys({
        title: Joi.string().min(3).max(255).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).max(255),
        dailyRentalRate: Joi.number().min(0).max(255)
    });

    const { error } = Joi.validate(m, schema);
    return error ? error.details[0].message : null;
}

module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;