const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre.model');

module.exports.Movie = mongoose.model('Movie', new mongoose.Schema({
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
}));

module.exports.validate = (movie) => {
    const schema = Joi.object().keys({
        title: Joi.string().min(3).max(255).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).max(255),
        dailyRentalRate: Joi.number().min(0).max(255)
    });

    const { error } = Joi.validate(movie, schema);
    return error ? error.details[0].message : null;
};