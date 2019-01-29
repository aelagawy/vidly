const mongoose = require('mongoose');
const Joi = require('joi');

module.exports.Customer = mongoose.model('Customer', new  mongoose.Schema({
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
        max: 15
    },
    isGold: {
        type: Boolean,
        default: false
    }
}));

module.exports.validate = (customer) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).max(255).required(),
        phone: Joi.string().min(3).max(15).required(),
        isGold: Joi.boolean()
    });

    const { error } = Joi.validate(customer, schema);
    return error ? error.details[0].message : null;
}