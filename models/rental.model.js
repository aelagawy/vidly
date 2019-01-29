const mongoose = require('mongoose');
const Joi = require('joi');

module.exports.Rental = mongoose.model('Rental', new mongoose.Schema({
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

module.exports.validate = (rental) => {
    const schema = Joi.object().keys({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });

    const { error } = Joi.validate(rental, schema);
    return error ? error.details[0].message : null;
};