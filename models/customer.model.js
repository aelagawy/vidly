const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = mongoose.Schema({
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
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(c){
    const schema = Joi.object().keys({
        name: Joi.string().min(3).max(255).required(),
        phone: Joi.string().min(3).max(15).required(),
        isGold: Joi.boolean()
    });

    const { error } = Joi.validate(c, schema);
    return error ? error.details[0].message : null;
}

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;