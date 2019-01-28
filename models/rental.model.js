const Joi = require('joi');
const mongoose = require('mongoose');

const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                min: 3,
                max: 255
             },
             phone: {
                 type: String,
                 required: true,
                 min: 3,
                 max: 10
             },
             isGold: {
                 type: Boolean,
                 default: false
             }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                min: 3,
                max: 255
             },
             dailyRentalRate: {
                 type: Number,
                 default: 0,
                 min: 0,
                 max: 255
             }
        }),
        required: true
    },
    dateOut: {
       type: Date,
       required: true,
       default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
}));

function validateRental(r){
    const schema = Joi.object().keys({
        customerId: Joi.string().required(),
        movieId: Joi.string().required(),
        dateOut: Joi.date(),
        dateReturned: Joi.date(),
        rentalFee: Joi.number().min(0),
    });

    const { error } = Joi.validate(r, schema);
    return error ? error.details[0].message : null;
}

module.exports.Rental = Rental;
module.exports.validateRental = validateRental;